'use client'

import { useState, useEffect } from 'react'
import { Activity, User } from 'lucide-react'

interface Sale {
  number: number
  buyerName: string
  paidAt: string
}

interface RealtimeSalesProps {
  raffleId: string
}

export function RealtimeSales({ raffleId }: RealtimeSalesProps) {
  const [sales, setSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSales() {
      try {
        const res = await fetch(`/api/rifas/${raffleId}/relatorio`, {
          credentials: 'include',
        })
        if (res.ok) {
          const report = await res.json()
          setSales(report.recentSales || [])
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false)
      }
    }
    fetchSales()
    const interval = setInterval(fetchSales, 10000)
    return () => clearInterval(interval)
  }, [raffleId])

  function maskName(name: string) {
    const parts = name.split(' ')
    return parts
      .map((p, i) => {
        if (i === 0) return p
        return p[0] + '***'
      })
      .join(' ')
  }

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime()
    const minutes = Math.floor(diff / 60000)
    if (minutes < 1) return 'agora'
    if (minutes < 60) return `${minutes}min`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h`
    const days = Math.floor(hours / 24)
    return `${days}d`
  }

  if (loading) {
    return (
      <div className="glass rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-electric" />
          Vendas Recentes
        </h3>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 bg-white/5 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-electric" />
          Vendas Recentes
        </h3>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-neon rounded-full animate-pulse" />
          <span className="text-xs text-gray-500">Ao vivo</span>
        </div>
      </div>

      {sales.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-6">Nenhuma venda ainda</p>
      ) : (
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {sales.map((sale, i) => (
            <div
              key={`${sale.number}-${i}`}
              className="flex items-center gap-3 bg-white/[0.03] rounded-lg px-3 py-2.5"
            >
              <div className="w-7 h-7 bg-neon/10 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-3.5 h-3.5 text-neon" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{maskName(sale.buyerName)}</p>
                <p className="text-xs text-gray-500">
                  Número <span className="text-neon font-medium">{String(sale.number).padStart(3, '0')}</span>
                </p>
              </div>
              <span className="text-xs text-gray-500 flex-shrink-0">
                {sale.paidAt ? timeAgo(sale.paidAt) : '—'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
