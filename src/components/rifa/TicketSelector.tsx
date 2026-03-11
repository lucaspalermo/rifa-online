'use client'

import { useState, useMemo } from 'react'
import { formatCurrency } from '@/lib/utils'
import { Sparkles, Zap } from 'lucide-react'

interface TicketSelectorProps {
  totalTickets: number
  soldTickets: number
  ticketPrice: number
}

export function TicketSelector({ totalTickets, soldTickets, ticketPrice }: TicketSelectorProps) {
  const [selectedNumbers, setSelectedNumbers] = useState<Set<number>>(new Set())

  const soldNumbers = useMemo(() => {
    const sold = new Set<number>()
    for (let i = 1; i <= soldTickets; i++) {
      sold.add(((i * 7 + 3) % totalTickets) + 1)
    }
    return sold
  }, [soldTickets, totalTickets])

  function toggleNumber(num: number) {
    if (soldNumbers.has(num)) return
    setSelectedNumbers((prev) => {
      const next = new Set(prev)
      if (next.has(num)) {
        next.delete(num)
      } else {
        next.add(num)
      }
      return next
    })
  }

  const total = selectedNumbers.size * ticketPrice

  const [showAll, setShowAll] = useState(false)
  const visibleCount = showAll ? totalTickets : Math.min(100, totalTickets)

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-neon" />
          <h2 className="text-lg font-bold text-white">Escolha seus números</h2>
        </div>
        {selectedNumbers.size > 0 && (
          <span className="text-sm font-semibold text-neon">
            {selectedNumbers.size} selecionado{selectedNumbers.size > 1 ? 's' : ''} = {formatCurrency(total)}
          </span>
        )}
      </div>

      {/* Legenda */}
      <div className="flex items-center gap-5 mb-5 text-xs text-gray-400">
        <span className="flex items-center gap-2">
          <span className="w-5 h-5 bg-white/5 border border-white/10 rounded-lg" /> Disponível
        </span>
        <span className="flex items-center gap-2">
          <span className="w-5 h-5 bg-neon rounded-lg shadow-[0_0_10px_rgba(0,232,123,0.4)]" /> Selecionado
        </span>
        <span className="flex items-center gap-2">
          <span className="w-5 h-5 bg-white/[0.03] rounded-lg" /> Vendido
        </span>
      </div>

      {/* Grade de números */}
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-1.5">
        {Array.from({ length: visibleCount }, (_, i) => i + 1).map((num) => {
          const isSold = soldNumbers.has(num)
          const isSelected = selectedNumbers.has(num)

          return (
            <button
              key={num}
              onClick={() => toggleNumber(num)}
              disabled={isSold}
              className={`aspect-square flex items-center justify-center text-xs font-medium rounded-lg transition-all duration-200 ${
                isSold
                  ? 'bg-white/[0.03] text-gray-700 cursor-not-allowed'
                  : isSelected
                  ? 'bg-neon text-bg font-bold shadow-[0_0_15px_rgba(0,232,123,0.3)] scale-110 z-10'
                  : 'bg-white/5 text-gray-300 border border-white/10 hover:border-neon/40 hover:bg-neon/10 hover:text-neon hover:scale-105'
              }`}
            >
              {num}
            </button>
          )
        })}
      </div>

      {totalTickets > 100 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-5 w-full text-center text-sm text-neon hover:text-white font-semibold transition-colors"
        >
          Mostrar todos os {totalTickets} números
        </button>
      )}

      {/* Barra de compra */}
      {selectedNumbers.size > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 glass-neon rounded-xl p-4">
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-300">
              {selectedNumbers.size} número{selectedNumbers.size > 1 ? 's' : ''} selecionado{selectedNumbers.size > 1 ? 's' : ''}
            </p>
            <p className="text-2xl font-extrabold text-neon">{formatCurrency(total)}</p>
          </div>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-neon hover:shadow-[0_0_30px_rgba(0,232,123,0.4)] text-bg px-6 py-3 rounded-xl font-bold transition-all hover:scale-105">
            <Zap className="w-5 h-5" />
            Pagar via PIX
          </button>
        </div>
      )}
    </div>
  )
}
