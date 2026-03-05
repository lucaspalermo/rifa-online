import Link from 'next/link'
import { getAuthUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import {
  Trophy,
  DollarSign,
  Users,
  TrendingUp,
  PlusCircle,
  ArrowRight,
  Zap,
} from 'lucide-react'
import { formatCurrency, calculateProgress } from '@/lib/utils'

export default async function PainelPage() {
  const user = await getAuthUser()
  if (!user) return null

  const [raffles, transactions] = await Promise.all([
    prisma.raffle.findMany({
      where: { creatorId: user.id },
      include: {
        _count: { select: { tickets: { where: { status: 'paid' } } } },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.transaction.findMany({
      where: {
        status: 'approved',
        tickets: { some: { raffle: { creatorId: user.id } } },
      },
      select: { netAmount: true, createdAt: true },
    }),
  ])

  const totalRevenue = transactions.reduce((sum, t) => sum + t.netAmount, 0)
  const totalSold = raffles.reduce((sum, r) => sum + r._count.tickets, 0)
  const activeRaffles = raffles.filter((r) => r.status === 'active').length
  const completedRaffles = raffles.filter((r) => r.status === 'drawn').length

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">
            Olá, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Aqui está o resumo das suas rifas
          </p>
        </div>
        <Link
          href="/criar-rifa"
          className="inline-flex items-center gap-2 btn-neon px-4 py-2.5 rounded-xl text-sm font-medium"
        >
          <PlusCircle className="w-4 h-4" />
          Nova Rifa
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neon/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-neon" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Receita Total</p>
              <p className="text-xl font-bold text-white">{formatCurrency(totalRevenue)}</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-electric/10 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-electric" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Rifas Ativas</p>
              <p className="text-xl font-bold text-white">{activeRaffles}</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-cyan" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Números Vendidos</p>
              <p className="text-xl font-bold text-white">{totalSold}</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Sorteios Feitos</p>
              <p className="text-xl font-bold text-white">{completedRaffles}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rifas Recentes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Suas Rifas</h2>
          <Link
            href="/painel/minhas-rifas"
            className="text-sm text-neon hover:text-white font-medium flex items-center gap-1 transition-colors"
          >
            Ver todas <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {raffles.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white">Nenhuma rifa criada</h3>
            <p className="text-gray-400 text-sm mt-2">
              Crie sua primeira rifa e comece a vender agora mesmo!
            </p>
            <Link
              href="/criar-rifa"
              className="mt-4 inline-flex items-center gap-2 btn-neon px-6 py-3 rounded-xl font-semibold"
            >
              <PlusCircle className="w-5 h-5" />
              Criar Primeira Rifa
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {raffles.slice(0, 5).map((raffle) => {
              const progress = calculateProgress(raffle._count.tickets, raffle.totalTickets)
              const revenue = raffle._count.tickets * raffle.ticketPrice * 0.95

              return (
                <Link
                  key={raffle.id}
                  href={`/painel/minhas-rifas/${raffle.id}`}
                  className="flex items-center gap-4 glass rounded-xl p-4 hover:border-neon/30 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-white text-sm truncate">{raffle.title}</h3>
                      <span
                        className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${
                          raffle.status === 'active'
                            ? 'bg-neon/10 text-neon'
                            : raffle.status === 'drawn'
                            ? 'bg-electric/10 text-electric'
                            : 'bg-white/5 text-gray-500'
                        }`}
                      >
                        {raffle.status === 'active' && 'Ativa'}
                        {raffle.status === 'drawn' && 'Sorteada'}
                        {raffle.status === 'draft' && 'Rascunho'}
                        {raffle.status === 'paused' && 'Pausada'}
                        {raffle.status === 'cancelled' && 'Cancelada'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-500">
                      <span>{raffle._count.tickets}/{raffle.totalTickets} vendidos</span>
                      <span>{formatCurrency(revenue)} arrecadado</span>
                    </div>
                  </div>

                  {/* Mini barra de progresso */}
                  <div className="w-24 flex-shrink-0">
                    <div className="w-full bg-white/5 rounded-full h-2">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-neon to-cyan"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 text-right mt-1">{progress}%</p>
                  </div>

                  <ArrowRight className="w-4 h-4 text-gray-600 flex-shrink-0" />
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
