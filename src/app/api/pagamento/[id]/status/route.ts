import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/pagamento/[id]/status — verificar status do pagamento
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const transaction = await prisma.transaction.findUnique({
    where: { id },
    select: {
      id: true,
      status: true,
      amount: true,
      expiresAt: true,
      createdAt: true,
      tickets: {
        select: { number: true, status: true },
        orderBy: { number: 'asc' },
      },
    },
  })

  if (!transaction) {
    return NextResponse.json({ error: 'Transação não encontrada' }, { status: 404 })
  }

  // Verificar se expirou
  if (
    transaction.status === 'pending' &&
    transaction.expiresAt &&
    new Date() > transaction.expiresAt
  ) {
    await prisma.$transaction([
      prisma.transaction.update({
        where: { id },
        data: { status: 'expired' },
      }),
      prisma.ticket.updateMany({
        where: { transactionId: id },
        data: { status: 'available', buyerId: null, transactionId: null },
      }),
    ])

    return NextResponse.json({
      id: transaction.id,
      status: 'expired',
      message: 'Pagamento expirado. Os números foram liberados.',
    })
  }

  return NextResponse.json({
    id: transaction.id,
    status: transaction.status,
    amount: transaction.amount,
    expiresAt: transaction.expiresAt,
    numbers: transaction.tickets.map((t) => t.number),
  })
}
