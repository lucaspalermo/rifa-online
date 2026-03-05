import Link from 'next/link'
import { Clock, Users, Zap, Flame } from 'lucide-react'
import { formatCurrency, calculateProgress } from '@/lib/utils'

interface RaffleCardProps {
  slug: string
  title: string
  prizeTitle: string
  prizeImageUrl?: string | null
  ticketPrice: number
  totalTickets: number
  soldTickets: number
  endDate?: string | null
  creator: { name: string; verified: boolean }
  featured?: boolean
}

// Placeholder images por categoria
const placeholderImages = [
  'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500&q=80',
  'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500&q=80',
  'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=500&q=80',
  'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&q=80',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
]

export function RaffleCard({
  slug,
  title,
  prizeTitle,
  prizeImageUrl,
  ticketPrice,
  totalTickets,
  soldTickets,
  endDate,
  creator,
  featured,
}: RaffleCardProps) {
  const progress = calculateProgress(soldTickets, totalTickets)
  const isHot = progress >= 80
  const imgSrc = prizeImageUrl || placeholderImages[title.length % placeholderImages.length]

  return (
    <Link
      href={`/rifa/${slug}`}
      className={`group card-3d block rounded-2xl overflow-hidden bg-bg-card border transition-all ${
        featured ? 'border-neon/20 neon-glow' : 'border-white/5'
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imgSrc}
          alt={prizeTitle}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/20 to-transparent" />

        {/* Tags */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {featured && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-neon/15 text-neon border border-neon/25">
              DESTAQUE
            </span>
          )}
          {isHot && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-hot/15 text-hot border border-hot/25 flex items-center gap-1">
              <Flame className="w-3 h-3" /> HOT
            </span>
          )}
        </div>

        {/* Price badge */}
        <div className="absolute bottom-3 right-3 glass px-3 py-1.5 rounded-lg">
          <span className="text-sm font-bold text-neon">{formatCurrency(ticketPrice)}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 space-y-3">
        <h3 className="font-bold text-white line-clamp-2 group-hover:text-neon transition-colors duration-200">
          {title}
        </h3>

        <p className="text-xs text-gray-200 line-clamp-1">{prizeTitle}</p>

        {/* Progress */}
        <div>
          <div className="flex items-center justify-between text-xs text-gray-300 mb-1.5">
            <span className={isHot ? 'text-hot font-medium' : ''}>{progress}% vendido</span>
            <span>{soldTickets}/{totalTickets}</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                isHot
                  ? 'bg-gradient-to-r from-hot to-gold shadow-[0_0_10px_rgba(255,107,107,0.4)]'
                  : 'progress-bar'
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-300 pt-1">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            <span>
              {creator.name}
              {creator.verified && (
                <span className="text-neon ml-1">✓</span>
              )}
            </span>
          </div>
          {endDate && (
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Encerra em breve</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
