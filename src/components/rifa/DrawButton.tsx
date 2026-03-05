'use client'

import { useState } from 'react'
import { Trophy, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'

interface DrawButtonProps {
  raffleId: string
  raffleTitle: string
}

export function DrawButton({ raffleId, raffleTitle }: DrawButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    winnerNumber: number
    hash: string
    seed: string
  } | null>(null)
  const [error, setError] = useState('')

  async function handleDraw() {
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`/api/rifas/${raffleId}/sorteio`, {
        method: 'POST',
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erro ao realizar sorteio')
        return
      }

      setResult(data.draw)
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
      setShowConfirm(false)
    }
  }

  if (result) {
    return (
      <div className="glass-neon rounded-xl p-6 text-center">
        <CheckCircle2 className="w-12 h-12 text-neon mx-auto mb-3" />
        <h3 className="text-xl font-bold text-white">Sorteio Realizado!</h3>
        <p className="text-5xl font-extrabold text-neon mt-3">
          Número {result.winnerNumber}
        </p>
        <div className="mt-4 text-xs text-gray-500 font-mono space-y-1">
          <p>Hash: {result.hash}</p>
          <p>Seed: {result.seed}</p>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          Recarregue a página para ver os detalhes completos.
        </p>
      </div>
    )
  }

  return (
    <div className="glass rounded-xl p-6 border-l-2 border-electric">
      {error && (
        <div className="bg-hot/10 border border-hot/30 text-hot text-sm p-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      {!showConfirm ? (
        <div className="text-center">
          <Trophy className="w-10 h-10 text-electric mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">Realizar Sorteio</h3>
          <p className="text-sm text-gray-400 mt-1 mb-4">
            O sorteio é irreversível e usa hash criptográfico verificável.
          </p>
          <button
            onClick={() => setShowConfirm(true)}
            className="inline-flex items-center gap-2 bg-electric hover:bg-electric/80 text-white px-6 py-3 rounded-xl font-bold transition-colors"
          >
            <Trophy className="w-5 h-5" />
            Sortear Agora
          </button>
        </div>
      ) : (
        <div className="text-center">
          <AlertCircle className="w-10 h-10 text-hot mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">Confirmar Sorteio</h3>
          <p className="text-sm text-gray-400 mt-1 mb-4">
            Tem certeza que deseja sortear a rifa <strong className="text-white">{raffleTitle}</strong>?
            Esta ação é <strong className="text-hot">irreversível</strong>.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setShowConfirm(false)}
              className="btn-ghost px-6 py-3 rounded-xl font-medium"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              onClick={handleDraw}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-hot hover:bg-hot/80 text-white px-6 py-3 rounded-xl font-bold transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sorteando...
                </>
              ) : (
                <>
                  <Trophy className="w-5 h-5" />
                  Confirmar Sorteio
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
