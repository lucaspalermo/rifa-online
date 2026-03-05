import Link from 'next/link'
import { getAuthUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { PlusCircle, ArrowRight, Trophy } from 'lucide-react'
import { formatCurrency, calculateProgress } from '@/lib/utils'

export default async function MinhasRifasPage() {
  const user = await getAuthUser()
  if (!user) return null

  const raffles = await prisma.raffle.findMany({
    where: { creatorId: user.id },
    include: {
      category: { select: { name: true } },
      _count: { select: { tickets: { where: { status: 'paid' } } } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-white">Minhas Rifas</h1>
        <Link
          href="/criar-rifa"
          className="inline-flex items-center gap-2 btn-neon px-4 py-2.5 rounded-xl text-sm font-medium"
        >
          <PlusCircle className="w-4 h-4" />
          Nova Rifa
        </Link>
      </div>

      {raffles.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white">Nenhuma rifa criada ainda</h3>
          <p className="text-gray-400 text-sm mt-2 mb-4">
            Crie sua primeira rifa e comece a vender!
          </p>
          <Link
            href="/criar-rifa"
            className="inline-flex items-center gap-2 btn-neon px-6 py-3 rounded-xl font-semibold"
          >
            <PlusCircle className="w-5 h-5" />
            Criar Primeira Rifa
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {raffles.map((raffle) => {
            const progress = calculateProgress(raffle._count.tickets, raffle.totalTickets)
            const revenue = raffle._count.tickets * raffle.ticketPrice * 0.95

            return (
              <Link
                key={raffle.id}
                href={`/painel/minhas-rifas/${raffle.id}`}
                className="block glass rounded-xl p-5 hover:border-neon/30 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white truncate">{raffle.title}</h3>
                      <span
                        className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${
                          raffle.status === 'active'
                            ? 'bg-neon/10 text-neon'
                            : raffle.status === 'drawn'
                            ? 'bg-electric/10 text-electric'
                            : 'bg-white/5 text-gray-500'
                        }`}
                      >
                        {raffle.status === 'active' ? 'Ativa' : raffle.status === 'drawn' ? 'Sorteada' : raffle.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{raffle.prizeTitle}</p>

                    <div className="flex items-center gap-6 mt-3 text-xs text-gray-500">
                      <span>Preço: {formatCurrency(raffle.ticketPrice)}</span>
                      <span>Vendidos: {raffle._count.tickets}/{raffle.totalTickets}</span>
                      <span>Receita: {formatCurrency(revenue)}</span>
                      {raffle.category && <span>{raffle.category.name}</span>}
                    </div>

                    <div className="mt-3 w-full bg-white/5 rounded-full h-2">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-neon to-cyan"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>

                  <ArrowRight className="w-5 h-5 text-gray-600 flex-shrink-0 mt-2" />
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
