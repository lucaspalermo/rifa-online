'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, Copy, CheckCircle2, Clock, AlertTriangle, Zap } from 'lucide-react'

interface PixPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  transactionId: string
  amount: number
  qrCodeBase64: string | null
  copyPaste: string | null
  expiresAt: string
  numbers: number[]
  bonusNumbers?: number[]
}

export function PixPaymentModal({
  isOpen,
  onClose,
  transactionId,
  amount,
  qrCodeBase64,
  copyPaste,
  expiresAt,
  numbers,
  bonusNumbers = [],
}: PixPaymentModalProps) {
  const [status, setStatus] = useState<'pending' | 'approved' | 'expired'>('pending')
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState('')

  const checkStatus = useCallback(async () => {
    try {
      const res = await fetch(`/api/pagamento/${transactionId}/status`)
      if (res.ok) {
        const data = await res.json()
        if (data.status === 'approved') {
          setStatus('approved')
        } else if (data.status === 'expired' || data.status === 'rejected') {
          setStatus('expired')
        }
      }
    } catch {
      // silently fail
    }
  }, [transactionId])

  // Polling para status
  useEffect(() => {
    if (!isOpen || status !== 'pending') return
    const interval = setInterval(checkStatus, 5000)
    return () => clearInterval(interval)
  }, [isOpen, status, checkStatus])

  // Timer
  useEffect(() => {
    if (!isOpen || status !== 'pending') return
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const expires = new Date(expiresAt).getTime()
      const diff = expires - now

      if (diff <= 0) {
        setTimeLeft('Expirado')
        setStatus('expired')
        return
      }

      const minutes = Math.floor(diff / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)
      setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`)
    }, 1000)
    return () => clearInterval(interval)
  }, [isOpen, expiresAt, status])

  async function handleCopy() {
    if (!copyPaste) return
    await navigator.clipboard.writeText(copyPaste)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md glass rounded-2xl p-6 space-y-5 animate-slide-up">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-neon" />
            Pagamento PIX
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {status === 'approved' ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-20 h-20 bg-neon/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-neon" />
            </div>
            <h4 className="text-xl font-bold text-white">Pagamento Confirmado!</h4>
            <p className="text-sm text-gray-400">
              Seus {numbers.length + bonusNumbers.length} número(s) foram confirmados.
            </p>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {numbers.map((n) => (
                <span key={n} className="bg-neon/10 text-neon text-xs font-bold px-2 py-1 rounded-lg">
                  {String(n).padStart(3, '0')}
                </span>
              ))}
              {bonusNumbers.map((n) => (
                <span key={`b-${n}`} className="bg-gold/10 text-gold text-xs font-bold px-2 py-1 rounded-lg">
                  {String(n).padStart(3, '0')} (bônus)
                </span>
              ))}
            </div>
          </div>
        ) : status === 'expired' ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-20 h-20 bg-hot/10 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-10 h-10 text-hot" />
            </div>
            <h4 className="text-xl font-bold text-white">Pagamento Expirado</h4>
            <p className="text-sm text-gray-400">
              O tempo para pagamento expirou. Os números foram liberados.
            </p>
            <button
              onClick={onClose}
              className="btn-ghost px-6 py-2.5 rounded-xl text-sm font-medium"
            >
              Fechar
            </button>
          </div>
        ) : (
          <>
            <div className="text-center">
              <p className="text-sm text-gray-400">Valor a pagar</p>
              <p className="text-3xl font-extrabold text-white mt-1">
                R$ {amount.toFixed(2).replace('.', ',')}
              </p>
            </div>

            {/* QR Code */}
            {qrCodeBase64 ? (
              <div className="bg-white rounded-xl p-4 mx-auto w-fit">
                <img
                  src={`data:image/png;base64,${qrCodeBase64}`}
                  alt="QR Code PIX"
                  className="w-48 h-48"
                />
              </div>
            ) : (
              <div className="bg-white/5 rounded-xl p-8 text-center">
                <p className="text-sm text-gray-400">QR Code indisponível</p>
                <p className="text-xs text-gray-500 mt-1">Use o código copia-e-cola abaixo</p>
              </div>
            )}

            {/* Copy paste */}
            {copyPaste && (
              <div>
                <p className="text-xs text-gray-400 mb-1.5">PIX Copia e Cola:</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-xs text-gray-300 truncate font-mono">
                    {copyPaste}
                  </div>
                  <button
                    onClick={handleCopy}
                    className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      copied
                        ? 'bg-neon/10 text-neon'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Timer */}
            <div className="flex items-center justify-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">Expira em:</span>
              <span className="font-bold text-white">{timeLeft}</span>
            </div>

            <div className="flex items-center gap-2 bg-neon/5 rounded-xl p-3">
              <div className="w-2 h-2 bg-neon rounded-full animate-pulse" />
              <p className="text-xs text-gray-300">
                Aguardando pagamento... A confirmação é automática.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
