import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/rifas/[id]/ranking — ranking público de compradores
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const raffle = await prisma.raffle.findUnique({
    where: { id },
    select: { rankingEnabled: true },
  })

  if (!raffle || !raffle.rankingEnabled) {
    return NextResponse.json({ ranking: [] })
  }

  const tickets = await prisma.ticket.findMany({
    where: {
      raffleId: id,
      status: 'paid',
      buyerId: { not: null },
    },
    select: {
      buyerId: true,
      buyer: { select: { name: true } },
    },
  })

  // Agrupar por comprador
  const buyerMap = new Map<string, { name: string; count: number }>()
  for (const ticket of tickets) {
    if (!ticket.buyerId) continue
    const existing = buyerMap.get(ticket.buyerId)
    if (existing) {
      existing.count++
    } else {
      buyerMap.set(ticket.buyerId, {
        name: ticket.buyer?.name || 'Anônimo',
        count: 1,
      })
    }
  }

  // Ordenar por quantidade e limitar top 10
  const sorted = Array.from(buyerMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  const ranking = sorted.map((entry, index) => ({
    name: entry.name,
    ticketCount: entry.count,
    position: index + 1,
  }))

  return NextResponse.json({ ranking })
}
