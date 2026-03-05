import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { getAuthUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import {
  ArrowLeft,
  DollarSign,
  Users,
  Trophy,
  ExternalLink,
  Copy,
  BarChart3,
  Clock,
  CheckCircle2,
  Gift,
  Percent,
  Medal,
} from 'lucide-react'
import { formatCurrency, calculateProgress } from '@/lib/utils'
import { DrawButton } from '@/components/rifa/DrawButton'
import { SalesChart } from '@/components/painel/SalesChart'
import { RealtimeSales } from '@/components/painel/RealtimeSales'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function RifaDetailPanel({ params }: PageProps) {
  const user = await getAuthUser()
  if (!user) redirect('/entrar')

  const { id } = await params

  const raffle = await prisma.raffle.findUnique({
    where: { id },
    include: {
      category: { select: { name: true } },
      tickets: {
        where: { status: 'paid' },
        include: {
          buyer: { select: { name: true, email: true, phone: true } },
        },
        orderBy: { paidAt: 'desc' },
      },
      prizeTickets: true,
      promotions: true,
      rankingPrizes: { orderBy: { position: 'asc' } },
      _count: {
        select: {
          tickets: { where: { status: 'paid' } },
        },
      },
    },
  })

  if (!raffle || raffle.creatorId !== user.id) notFound()

  const progress = calculateProgress(raffle._count.tickets, raffle.totalTickets)
  const totalRevenue = raffle._count.tickets * raffle.ticketPrice
  const fee = totalRevenue * 0.05
  const netRevenue = totalRevenue - fee
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const raffleUrl = `${appUrl}/rifa/${raffle.slug}`

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/painel/minhas-rifas"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-neon mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar
          </Link>
          <h1 className="text-2xl font-extrabold text-white">{raffle.title}</h1>
          <div className="flex items-center gap-3 mt-2">
            <span
              className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                raffle.status === 'active'
                  ? 'bg-neon/10 text-neon'
                  : raffle.status === 'drawn'
                  ? 'bg-electric/10 text-electric'
                  : 'bg-white/5 text-gray-500'
              }`}
            >
              {raffle.status === 'active' ? 'Ativa' : raffle.status === 'drawn' ? 'Sorteada' : raffle.status}
            </span>
            {raffle.category && (
              <span className="text-xs text-gray-500">{raffle.category.name}</span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/rifa/${raffle.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 btn-ghost px-3 py-2 rounded-lg text-sm"
          >
            <ExternalLink className="w-4 h-4" /> Ver Rifa
          </Link>
        </div>
      </div>

      {/* Link para compartilhar */}
      <div className="glass rounded-xl p-4">
        <p className="text-sm font-medium text-white mb-2">Link para divulgar:</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={raffleUrl}
            readOnly
            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300"
          />
          <button className="inline-flex items-center gap-1.5 btn-neon px-4 py-2 rounded-lg text-sm font-medium">
            <Copy className="w-4 h-4" /> Copiar
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-electric" />
            <span className="text-xs text-gray-500">Vendidos</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {raffle._count.tickets}
            <span className="text-sm font-normal text-gray-500">/{raffle.totalTickets}</span>
          </p>
        </div>

        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-4 h-4 text-cyan" />
            <span className="text-xs text-gray-500">Progresso</span>
          </div>
          <p className="text-2xl font-bold text-white">{progress}%</p>
        </div>

        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-neon" />
            <span className="text-xs text-gray-500">Receita Líquida</span>
          </div>
          <p className="text-2xl font-bold text-neon">{formatCurrency(netRevenue)}</p>
        </div>

        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-4 h-4 text-gold" />
            <span className="text-xs text-gray-500">Prêmio</span>
          </div>
          <p className="text-lg font-bold text-white truncate">{raffle.prizeTitle}</p>
        </div>
      </div>

      {/* Barra de progresso grande */}
      <div className="glass rounded-xl p-5">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Progresso de vendas</span>
          <span className="font-medium text-white">{raffle._count.tickets} de {raffle.totalTickets}</span>
        </div>
        <div className="w-full bg-white/5 rounded-full h-4">
          <div
            className="h-full rounded-full bg-gradient-to-r from-neon to-cyan transition-all"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Arrecadado: {formatCurrency(totalRevenue)}</span>
          <span>Taxa (5%): {formatCurrency(fee)}</span>
          <span>Você recebe: {formatCurrency(netRevenue)}</span>
        </div>
      </div>

      {/* Botão de sorteio */}
      {raffle.status === 'active' && raffle._count.tickets > 0 && (
        <DrawButton raffleId={raffle.id} raffleTitle={raffle.title} />
      )}

      {/* Resultado do sorteio */}
      {raffle.status === 'drawn' && raffle.winnerTicket && (
        <div className="glass-neon rounded-xl p-6 text-center">
          <CheckCircle2 className="w-12 h-12 text-neon mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white">Sorteio Realizado!</h3>
          <p className="text-4xl font-extrabold text-neon mt-2">
            Número {raffle.winnerTicket}
          </p>
          {raffle.drawHash && (
            <p className="text-xs text-gray-500 mt-3 font-mono break-all">
              Hash: {raffle.drawHash}
            </p>
          )}
        </div>
      )}

      {/* Extras: Bilhetes Premiados, Promoções, Ranking */}
      {(raffle.prizeTickets.length > 0 || raffle.promotions.length > 0 || raffle.rankingEnabled) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {raffle.prizeTickets.length > 0 && (
            <div className="glass rounded-xl p-4 border border-gold/20">
              <h4 className="font-semibold text-white text-sm flex items-center gap-2 mb-3">
                <Gift className="w-4 h-4 text-gold" />
                Bilhetes Premiados ({raffle.prizeTickets.length})
              </h4>
              <div className="space-y-2">
                {raffle.prizeTickets.map((pt) => (
                  <div key={pt.id} className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">
                      Nº <span className="text-gold font-bold">{String(pt.number).padStart(3, '0')}</span> — {pt.prize}
                    </span>
                    <span className={pt.claimed ? 'text-neon' : 'text-gray-500'}>
                      {pt.claimed ? 'Revelado' : 'Oculto'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {raffle.promotions.length > 0 && (
            <div className="glass rounded-xl p-4 border border-cyan/20">
              <h4 className="font-semibold text-white text-sm flex items-center gap-2 mb-3">
                <Percent className="w-4 h-4 text-cyan" />
                Promoções ({raffle.promotions.length})
              </h4>
              <div className="space-y-2">
                {raffle.promotions.map((p) => (
                  <div key={p.id} className="text-xs">
                    <span className="text-cyan font-medium">
                      {p.label || `Compre ${p.buyQuantity}, leve ${p.buyQuantity + p.bonusQuantity}`}
                    </span>
                    <span className={`ml-2 ${p.active ? 'text-neon' : 'text-gray-500'}`}>
                      {p.active ? 'Ativa' : 'Inativa'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {raffle.rankingEnabled && (
            <div className="glass rounded-xl p-4 border border-electric/20">
              <h4 className="font-semibold text-white text-sm flex items-center gap-2 mb-3">
                <Trophy className="w-4 h-4 text-electric" />
                Ranking Ativado
              </h4>
              {raffle.rankingPrizes.length > 0 ? (
                <div className="space-y-2">
                  {raffle.rankingPrizes.map((rp, i) => (
                    <div key={rp.id} className="flex items-center gap-2 text-xs">
                      <Medal className={`w-3.5 h-3.5 ${i === 0 ? 'text-gold' : i === 1 ? 'text-gray-300' : 'text-amber-600'}`} />
                      <span className="text-white">{rp.position}° — {rp.prize}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500">Ranking sem prêmios extras</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Relatório de Vendas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart raffleId={raffle.id} />
        <RealtimeSales raffleId={raffle.id} />
      </div>

      {/* Lista de compradores */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">
          Compradores ({raffle.tickets.length})
        </h2>

        {raffle.tickets.length === 0 ? (
          <div className="glass rounded-xl p-8 text-center">
            <Clock className="w-10 h-10 text-gray-600 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">Nenhum número vendido ainda</p>
          </div>
        ) : (
          <div className="glass rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Número</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Comprador</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium hidden sm:table-cell">Email</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium hidden md:table-cell">Telefone</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {raffle.tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-white/5">
                    <td className="px-4 py-3">
                      <span className={`font-bold ${
                        ticket.number === raffle.winnerTicket
                          ? 'text-neon'
                          : 'text-electric'
                      }`}>
                        {String(ticket.number).padStart(3, '0')}
                        {ticket.number === raffle.winnerTicket && ' (Ganhador!)'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white">{ticket.buyer?.name || '—'}</td>
                    <td className="px-4 py-3 text-gray-400 hidden sm:table-cell">
                      {ticket.buyer?.email || '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-400 hidden md:table-cell">
                      {ticket.buyer?.phone || '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {ticket.paidAt
                        ? new Date(ticket.paidAt).toLocaleDateString('pt-BR')
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
