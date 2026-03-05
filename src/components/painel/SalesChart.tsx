'use client'

import { useState, useEffect } from 'react'
import { BarChart3 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface SalesDay {
  date: string
  count: number
  revenue: number
}

interface SalesChartProps {
  raffleId: string
}

export function SalesChart({ raffleId }: SalesChartProps) {
  const [data, setData] = useState<SalesDay[]>([])
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState<7 | 15 | 30>(7)

  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await fetch(`/api/rifas/${raffleId}/relatorio`, {
          credentials: 'include',
        })
        if (res.ok) {
          const report = await res.json()
          setData(report.salesByDay || [])
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false)
      }
    }
    fetchReport()
  }, [raffleId])

  const filtered = data.slice(-period)
  const maxCount = Math.max(...filtered.map((d) => d.count), 1)

  if (loading) {
    return (
      <div className="glass rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-neon" />
          Vendas por Dia
        </h3>
        <div className="h-40 flex items-end gap-1">
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className="flex-1 bg-white/5 rounded-t animate-pulse" style={{ height: `${20 + Math.random() * 60}%` }} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-neon" />
          Vendas por Dia
        </h3>
        <div className="flex gap-1">
          {([7, 15, 30] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`text-xs px-2.5 py-1 rounded-lg transition-all ${
                period === p
                  ? 'bg-neon/10 text-neon font-medium'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {p}d
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="h-40 flex items-center justify-center text-sm text-gray-500">
          Nenhuma venda no período
        </div>
      ) : (
        <div className="space-y-2">
          <div className="h-40 flex items-end gap-1">
            {filtered.map((day) => (
              <div
                key={day.date}
                className="flex-1 group relative"
              >
                <div
                  className="w-full bg-gradient-to-t from-neon/60 to-neon/20 rounded-t hover:from-neon/80 hover:to-neon/40 transition-all cursor-pointer"
                  style={{ height: `${(day.count / maxCount) * 100}%`, minHeight: day.count > 0 ? '4px' : '0' }}
                />
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-bg border border-white/10 rounded-lg px-2.5 py-1.5 text-xs whitespace-nowrap shadow-xl">
                    <p className="font-medium text-white">{day.count} venda{day.count !== 1 ? 's' : ''}</p>
                    <p className="text-gray-400">{formatCurrency(day.revenue)}</p>
                    <p className="text-gray-500">{new Date(day.date + 'T12:00:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>
              {filtered[0] && new Date(filtered[0].date + 'T12:00:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
            </span>
            <span>
              {filtered[filtered.length - 1] && new Date(filtered[filtered.length - 1].date + 'T12:00:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
