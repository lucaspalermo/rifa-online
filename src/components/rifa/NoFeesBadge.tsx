import { Shield } from 'lucide-react'

export function NoFeesBadge({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-neon">
        <Shield className="w-3.5 h-3.5" />
        <span className="font-medium">Sem taxas extras</span>
      </div>
    )
  }

  return (
    <div className="glass rounded-xl p-4 border border-neon/20">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-neon/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Shield className="w-5 h-5 text-neon" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Sem taxas extras</p>
          <p className="text-xs text-gray-400">
            O preço do número é o preço final. Sem surpresas.
          </p>
        </div>
      </div>
    </div>
  )
}
