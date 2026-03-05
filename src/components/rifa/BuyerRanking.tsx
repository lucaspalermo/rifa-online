'use client'

import { useState, useEffect } from 'react'
import { Trophy, Medal, Crown } from 'lucide-react'

interface RankingEntry {
  name: string
  ticketCount: number
  position: number
}

interface RankingPrize {
  position: number
  prize: string
  prizeValue: number
}

interface BuyerRankingProps {
  raffleId: string
  rankingPrizes?: RankingPrize[]
}

export function BuyerRanking({ raffleId, rankingPrizes = [] }: BuyerRankingProps) {
  const [ranking, setRanking] = useState<RankingEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRanking() {
      try {
        const res = await fetch(`/api/rifas/${raffleId}/ranking`)
        if (res.ok) {
          const data = await res.json()
          setRanking(data.ranking || [])
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false)
      }
    }
    fetchRanking()
    const interval = setInterval(fetchRanking, 30000)
    return () => clearInterval(interval)
  }, [raffleId])

  if (loading) {
    return (
      <div className="glass rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-electric" />
          Ranking de Compradores
        </h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (ranking.length === 0) {
    return (
      <div className="glass rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
          <Trophy className="w-5 h-5 text-electric" />
          Ranking de Compradores
        </h3>
        <p className="text-sm text-gray-400">
          Nenhuma compra confirmada ainda. Seja o primeiro!
        </p>
      </div>
    )
  }

  function getPositionIcon(pos: number) {
    if (pos === 1) return <Crown className="w-5 h-5 text-gold" />
    if (pos === 2) return <Medal className="w-5 h-5 text-gray-300" />
    if (pos === 3) return <Medal className="w-5 h-5 text-amber-600" />
    return <span className="text-sm font-bold text-gray-500 w-5 text-center">{pos}</span>
  }

  function getPrizeForPosition(pos: number) {
    return rankingPrizes.find((rp) => rp.position === pos)
  }

  function maskName(name: string) {
    if (name.length <= 3) return name[0] + '***'
    const parts = name.split(' ')
    return parts
      .map((p, i) => {
        if (i === 0) return p
        return p[0] + '***'
      })
      .join(' ')
  }

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-electric" />
        Ranking de Compradores
      </h3>

      <div className="space-y-2">
        {ranking.map((entry) => {
          const prize = getPrizeForPosition(entry.position)
          return (
            <div
              key={entry.position}
              className={`flex items-center gap-3 rounded-xl p-3 transition-all ${
                entry.position <= 3
                  ? 'bg-white/5 border border-white/5'
                  : ''
              }`}
            >
              <div className="w-8 flex items-center justify-center flex-shrink-0">
                {getPositionIcon(entry.position)}
              </div>

              <div className="w-8 h-8 bg-gradient-to-br from-neon/20 to-electric/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-neon">{entry.name.charAt(0)}</span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{maskName(entry.name)}</p>
                <p className="text-xs text-gray-500">{entry.ticketCount} número{entry.ticketCount > 1 ? 's' : ''}</p>
              </div>

              {prize && (
                <span className="text-xs bg-gold/10 text-gold px-2 py-1 rounded-lg font-medium flex-shrink-0">
                  {prize.prize}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
