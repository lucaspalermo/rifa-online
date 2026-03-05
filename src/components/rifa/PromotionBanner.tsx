import { Percent } from 'lucide-react'

interface Promotion {
  id: string
  buyQuantity: number
  bonusQuantity: number
  label?: string | null
}

export function PromotionBanner({ promotions }: { promotions: Promotion[] }) {
  const active = promotions.filter((p) => p.buyQuantity > 0 && p.bonusQuantity > 0)
  if (active.length === 0) return null

  return (
    <div className="glass rounded-xl p-4 border border-cyan/20 space-y-2">
      <h4 className="font-semibold text-white text-sm flex items-center gap-2">
        <Percent className="w-4 h-4 text-cyan" />
        Promoções Ativas
      </h4>
      <div className="flex flex-wrap gap-2">
        {active.map((promo) => (
          <span
            key={promo.id}
            className="inline-flex items-center gap-1.5 bg-cyan/10 text-cyan text-xs font-semibold px-3 py-1.5 rounded-lg border border-cyan/20"
          >
            {promo.label || `Compre ${promo.buyQuantity}, leve ${promo.buyQuantity + promo.bonusQuantity}`}
          </span>
        ))}
      </div>
    </div>
  )
}
