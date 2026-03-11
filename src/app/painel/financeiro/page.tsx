import { getAuthUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatCurrency } from '@/lib/utils'
import {
  DollarSign,
  TrendingUp,
  ArrowDownCircle,
  Clock,
  CheckCircle2,
  XCircle,
} from 'lucide-react'

export default async function FinanceiroPage() {
  const user = await getAuthUser()
  if (!user) return null

  const transactions = await prisma.transaction.findMany({
    where: {
      tickets: { some: { raffle: { creatorId: user.id } } },
    },
    include: {
      tickets: {
        include: {
          raffle: { select: { title: true, slug: true } },
        },
        take: 1,
      },
      user: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  const approved = transactions.filter((t) => t.status === 'approved')
  const pending = transactions.filter((t) => t.status === 'pending')
  const totalRevenue = approved.reduce((sum, t) => sum + t.netAmount, 0)
  const totalFees = approved.reduce((sum, t) => sum + t.fee, 0)
  const pendingAmount = pending.reduce((sum, t) => sum + t.amount, 0)

  const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
    approved: { label: 'Aprovado', color: 'text-neon bg-neon/10', icon: CheckCircle2 },
    pending: { label: 'Pendente', color: 'text-gold bg-gold/10', icon: Clock },
    expired: { label: 'Expirado', color: 'text-gray-500 bg-white/5', icon: XCircle },
    refunded: { label: 'Reembolsado', color: 'text-hot bg-hot/10', icon: ArrowDownCircle },
    rejected: { label: 'Rejeitado', color: 'text-hot bg-hot/10', icon: XCircle },
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Financeiro</h1>
        <p className="text-gray-400 text-sm mt-1">Acompanhe suas receitas e transações</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neon/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-neon" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Receita Líquida</p>
              <p className="text-xl font-bold text-white">{formatCurrency(totalRevenue)}</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Pendente</p>
              <p className="text-xl font-bold text-white">{formatCurrency(pendingAmount)}</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-electric/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-electric" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Taxa Plataforma</p>
              <p className="text-xl font-bold text-white">{formatCurrency(totalFees)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transações */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Transações Recentes</h2>

        {transactions.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <DollarSign className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white">Nenhuma transação</h3>
            <p className="text-gray-400 text-sm mt-2">
              As transações aparecerão aqui quando alguém comprar números nas suas rifas.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {transactions.map((t) => {
              const config = statusConfig[t.status] || statusConfig.pending
              const StatusIcon = config.icon
              const raffleName = t.tickets[0]?.raffle?.title || 'Rifa'

              return (
                <div
                  key={t.id}
                  className="glass rounded-xl p-4 flex items-center gap-4"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${config.color}`}>
                    <StatusIcon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {t.user.name} - {raffleName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t.tickets.length} número(s) - {new Date(t.createdAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold text-white">{formatCurrency(t.amount)}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
