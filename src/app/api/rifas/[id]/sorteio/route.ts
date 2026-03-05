import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'
import { performDraw, verifyDraw } from '@/lib/draw'

interface RouteParams {
  params: Promise<{ id: string }>
}

// POST /api/rifas/[id]/sorteio — realizar sorteio (dono da rifa)
export async function POST(request: Request, { params }: RouteParams) {
  const user = await getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { id } = await params

  const raffle = await prisma.raffle.findUnique({
    where: { id },
    include: {
      tickets: {
        where: { status: 'paid' },
        select: { number: true, buyerId: true },
      },
    },
  })

  if (!raffle) {
    return NextResponse.json({ error: 'Rifa não encontrada' }, { status: 404 })
  }

  if (raffle.creatorId !== user.id && user.role !== 'admin') {
    return NextResponse.json({ error: 'Sem permissão' }, { status: 403 })
  }

  if (raffle.status === 'drawn') {
    return NextResponse.json({ error: 'Sorteio já realizado' }, { status: 400 })
  }

  if (raffle.tickets.length === 0) {
    return NextResponse.json(
      { error: 'Nenhum bilhete pago. Não é possível sortear.' },
      { status: 400 }
    )
  }

  // Realizar sorteio criptográfico
  const paidNumbers = raffle.tickets.map((t) => t.number)
  const result = performDraw(paidNumbers)

  // Buscar ganhador
  const winnerTicket = raffle.tickets.find((t) => t.number === result.winnerNumber)
  const winner = winnerTicket
    ? await prisma.user.findUnique({
        where: { id: winnerTicket.buyerId! },
        select: { id: true, name: true, email: true, phone: true },
      })
    : null

  // Atualizar rifa com resultado
  await prisma.raffle.update({
    where: { id },
    data: {
      status: 'drawn',
      winnerTicket: result.winnerNumber,
      drawHash: result.hash,
      drawSeed: result.seed,
      drawnAt: new Date(),
    },
  })

  // Marcar bilhete vencedor
  await prisma.ticket.updateMany({
    where: {
      raffleId: id,
      number: result.winnerNumber,
    },
    data: { status: 'won' },
  })

  return NextResponse.json({
    draw: {
      winnerNumber: result.winnerNumber,
      hash: result.hash,
      seed: result.seed,
      timestamp: result.timestamp,
      totalPaidTickets: paidNumbers.length,
    },
    winner: winner
      ? { name: winner.name, email: winner.email }
      : null,
    verification: {
      message: 'Qualquer pessoa pode verificar este sorteio',
      howToVerify:
        'Use o seed e o hash para verificar: SHA256(seed) deve ser igual ao hash, e o número vencedor é derivado deterministicamente do seed + números pagos.',
    },
  })
}

// GET /api/rifas/[id]/sorteio — verificar resultado do sorteio (público)
export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params

  const raffle = await prisma.raffle.findFirst({
    where: {
      OR: [{ id }, { slug: id }],
      status: 'drawn',
    },
    select: {
      id: true,
      title: true,
      winnerTicket: true,
      drawHash: true,
      drawSeed: true,
      drawnAt: true,
      totalTickets: true,
    },
  })

  if (!raffle) {
    return NextResponse.json(
      { error: 'Sorteio não encontrado ou ainda não realizado' },
      { status: 404 }
    )
  }

  // Buscar números pagos para verificação
  const paidTickets = await prisma.ticket.findMany({
    where: { raffleId: raffle.id, status: { in: ['paid', 'won'] } },
    select: { number: true },
    orderBy: { number: 'asc' },
  })

  const paidNumbers = paidTickets.map((t) => t.number)

  // Verificação automática
  const verification = verifyDraw({
    seed: raffle.drawSeed!,
    hash: raffle.drawHash!,
    totalTickets: paidNumbers.length,
    paidNumbers,
    claimedWinner: raffle.winnerTicket!,
  })

  return NextResponse.json({
    raffle: raffle.title,
    draw: {
      winnerNumber: raffle.winnerTicket,
      hash: raffle.drawHash,
      seed: raffle.drawSeed,
      drawnAt: raffle.drawnAt,
      totalPaidTickets: paidNumbers.length,
    },
    verification: {
      valid: verification.valid,
      reason: verification.reason || 'Sorteio verificado com sucesso',
      paidNumbers,
    },
  })
}
