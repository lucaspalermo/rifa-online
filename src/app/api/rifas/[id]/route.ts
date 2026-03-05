import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/rifas/[id] — detalhes da rifa (público, busca por slug ou id)
export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params

  const raffle = await prisma.raffle.findFirst({
    where: {
      OR: [{ id }, { slug: id }],
    },
    include: {
      creator: {
        select: { id: true, name: true, verified: true, avatarUrl: true },
      },
      category: { select: { name: true, slug: true } },
      images: { orderBy: { order: 'asc' } },
      tickets: {
        where: { status: { in: ['paid', 'reserved'] } },
        select: { number: true, status: true },
      },
      _count: {
        select: {
          tickets: { where: { status: 'paid' } },
          reviews: true,
        },
      },
    },
  })

  if (!raffle) {
    return NextResponse.json({ error: 'Rifa não encontrada' }, { status: 404 })
  }

  // Separar números vendidos e reservados
  const soldNumbers = raffle.tickets.filter((t) => t.status === 'paid').map((t) => t.number)
  const reservedNumbers = raffle.tickets.filter((t) => t.status === 'reserved').map((t) => t.number)

  return NextResponse.json({
    ...raffle,
    soldTickets: raffle._count.tickets,
    soldNumbers,
    reservedNumbers,
    tickets: undefined,
    _count: undefined,
  })
}

// PUT /api/rifas/[id] — atualizar rifa (dono apenas)
export async function PUT(request: Request, { params }: RouteParams) {
  const user = await getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { id } = await params

  const raffle = await prisma.raffle.findUnique({ where: { id } })
  if (!raffle) {
    return NextResponse.json({ error: 'Rifa não encontrada' }, { status: 404 })
  }
  if (raffle.creatorId !== user.id && user.role !== 'admin') {
    return NextResponse.json({ error: 'Sem permissão' }, { status: 403 })
  }

  const body = await request.json()
  const { title, description, rules, status, endDate } = body

  const updated = await prisma.raffle.update({
    where: { id },
    data: {
      ...(title && { title }),
      ...(description !== undefined && { description }),
      ...(rules !== undefined && { rules }),
      ...(status && { status }),
      ...(endDate && { endDate: new Date(endDate) }),
    },
  })

  return NextResponse.json({ raffle: updated })
}
