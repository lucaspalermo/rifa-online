import { Gift, Sparkles } from 'lucide-react'

interface PrizeTicket {
  prize: string
  prizeValue: number
}

export function PrizeTicketsBanner({ prizeTickets }: { prizeTickets: PrizeTicket[] }) {
  if (prizeTickets.length === 0) return null

  const uniquePrizes = [...new Set(prizeTickets.map((pt) => pt.prize))]

  return (
    <div className="glass rounded-xl p-4 border border-gold/20 space-y-3">
      <h4 className="font-semibold text-white text-sm flex items-center gap-2">
        <Gift className="w-4 h-4 text-gold" />
        <span>{prizeTickets.length} Bilhete{prizeTickets.length > 1 ? 's' : ''} Premiado{prizeTickets.length > 1 ? 's' : ''}!</span>
        <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
      </h4>
      <p className="text-xs text-gray-400">
        Compre seus números e concorra também a prêmios extras escondidos!
      </p>
      <div className="flex flex-wrap gap-1.5">
        {uniquePrizes.map((prize) => (
          <span
            key={prize}
            className="inline-flex items-center gap-1 bg-gold/10 text-gold text-xs font-medium px-2.5 py-1 rounded-lg"
          >
            <Gift className="w-3 h-3" />
            {prize}
          </span>
        ))}
      </div>
    </div>
  )
}
