import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

// GET /api/rifas/[id]/relatorio — relatório de vendas (autenticado, só o criador)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { id } = await params

  const raffle = await prisma.raffle.findUnique({
    where: { id },
    select: { creatorId: true, totalTickets: true, ticketPrice: true },
  })

  if (!raffle || raffle.creatorId !== user.id) {
    return NextResponse.json({ error: 'Rifa não encontrada' }, { status: 404 })
  }

  // Buscar tickets pagos com dados
  const tickets = await prisma.ticket.findMany({
    where: { raffleId: id, status: 'paid' },
    select: {
      buyerId: true,
      paidAt: true,
      number: true,
      buyer: { select: { name: true } },
    },
    orderBy: { paidAt: 'desc' },
  })

  // Vendas por dia (últimos 30 dias)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const salesByDay: Record<string, { count: number; revenue: number }> = {}
  for (const ticket of tickets) {
    if (!ticket.paidAt) continue
    const date = ticket.paidAt.toISOString().split('T')[0]
    if (!salesByDay[date]) {
      salesByDay[date] = { count: 0, revenue: 0 }
    }
    salesByDay[date].count++
    salesByDay[date].revenue += raffle.ticketPrice * 0.95
  }

  const salesByDayArray = Object.entries(salesByDay)
    .map(([date, data]) => ({ date, ...data }))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-30)

  // Compradores únicos
  const uniqueBuyerIds = new Set(tickets.map((t) => t.buyerId).filter(Boolean))
  const uniqueBuyers = uniqueBuyerIds.size

  // Ticket médio
  const averageTicketsPerBuyer = uniqueBuyers > 0 ? tickets.length / uniqueBuyers : 0

  // Últimas 20 vendas
  const recentSales = tickets.slice(0, 20).map((t) => ({
    number: t.number,
    buyerName: t.buyer?.name || 'Anônimo',
    paidAt: t.paidAt,
  }))

  return NextResponse.json({
    totalSold: tickets.length,
    totalRevenue: tickets.length * raffle.ticketPrice * 0.95,
    uniqueBuyers,
    averageTicketsPerBuyer: Math.round(averageTicketsPerBuyer * 10) / 10,
    salesByDay: salesByDayArray,
    recentSales,
  })
}
