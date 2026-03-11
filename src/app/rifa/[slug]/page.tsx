import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Shield, Clock, Users, Share2, CheckCircle2, Zap, Star, TrendingUp } from 'lucide-react'
import { NoFeesBadge } from '@/components/rifa/NoFeesBadge'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { JsonLd } from '@/components/seo/JsonLd'
import { getRaffleJsonLd } from '@/lib/seo'
import { formatCurrency, calculateProgress } from '@/lib/utils'
import { TicketSelector } from '@/components/rifa/TicketSelector'
import { prisma } from '@/lib/prisma'

async function getRaffle(slug: string) {
  const raffle = await prisma.raffle.findUnique({
    where: { slug },
    include: {
      creator: {
        select: { name: true, verified: true },
      },
      tickets: {
        where: { status: { in: ['paid', 'reserved'] } },
        select: { id: true },
      },
    },
  })

  if (!raffle) return null

  return {
    ...raffle,
    soldTickets: raffle.tickets.length,
  }
}

interface RafflePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: RafflePageProps): Promise<Metadata> {
  const { slug } = await params
  const raffle = await getRaffle(slug)

  if (!raffle) {
    return { title: 'Rifa não encontrada' }
  }

  return {
    title: `${raffle.metaTitle || raffle.title} - Compre Números`,
    description: raffle.metaDescription || raffle.description,
    alternates: { canonical: `/rifa/${slug}` },
    openGraph: {
      title: raffle.title,
      description: raffle.description,
      url: `/rifa/${slug}`,
      type: 'website',
      images: raffle.prizeImageUrl
        ? [{ url: raffle.prizeImageUrl, width: 1200, height: 630 }]
        : undefined,
    },
  }
}

export default async function RaffleDetailPage({ params }: RafflePageProps) {
  const { slug } = await params
  const raffle = await getRaffle(slug)

  if (!raffle) {
    notFound()
  }

  const progress = calculateProgress(raffle.soldTickets, raffle.totalTickets)
  const availableTickets = raffle.totalTickets - raffle.soldTickets
  const isHot = progress >= 70

  return (
    <>
      <JsonLd
        data={getRaffleJsonLd({
          ...raffle,
          startDate: raffle.startDate?.toISOString() || raffle.createdAt.toISOString(),
          endDate: raffle.endDate?.toISOString() || '',
          creator: raffle.creator,
        })}
      />

      <div className="mesh-bg min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <Breadcrumb
            items={[
              { name: 'Rifas', url: '/rifas' },
              { name: raffle.title, url: `/rifa/${slug}` },
            ]}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            {/* Coluna principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Imagem do prêmio */}
              <div className="relative aspect-video rounded-2xl overflow-hidden group">
                {raffle.prizeImageUrl ? (
                  <img
                    src={raffle.prizeImageUrl}
                    alt={raffle.prizeTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-neon/20 via-electric/20 to-cyan/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-7xl mb-3">🎁</div>
                      <p className="text-gray-400 text-sm">Foto do prêmio</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />

                {/* Tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {isHot && (
                    <span className="flex items-center gap-1 bg-hot/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      <TrendingUp className="w-3.5 h-3.5" /> HOT
                    </span>
                  )}
                  {raffle.status === 'active' && (
                    <span className="flex items-center gap-1 bg-neon/90 backdrop-blur-sm text-bg text-xs font-bold px-3 py-1.5 rounded-full">
                      <Zap className="w-3.5 h-3.5" /> AO VIVO
                    </span>
                  )}
                </div>
              </div>

              {/* Título e info */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {raffle.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 text-sm text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    {raffle.creator.name}
                    {raffle.creator.verified && (
                      <CheckCircle2 className="w-4 h-4 text-neon" />
                    )}
                  </span>
                  {raffle.endDate && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      Sorteio: {new Date(raffle.endDate).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  )}
                </div>
              </div>

              {/* Sobre o Prêmio */}
              <div className="glass rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-gold" />
                  Sobre o Prêmio
                </h2>
                <h3 className="font-semibold text-neon">{raffle.prizeTitle}</h3>
                {raffle.prizeDescription && (
                  <p className="mt-2 text-gray-300 text-sm leading-relaxed">
                    {raffle.prizeDescription}
                  </p>
                )}
                <p className="mt-3 text-sm text-gray-400">
                  Valor estimado: <strong className="text-white">{formatCurrency(raffle.prizeValue)}</strong>
                </p>
              </div>

              {/* Descrição */}
              <div className="glass rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white mb-3">Descrição</h2>
                <p className="text-gray-300 text-sm leading-relaxed">{raffle.description}</p>
              </div>

              {/* Regras */}
              {raffle.rules && (
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-lg font-bold text-white mb-3">Regras do Sorteio</h2>
                  <p className="text-gray-300 text-sm leading-relaxed">{raffle.rules}</p>
                </div>
              )}

              {/* Sorteio verificável */}
              <div className="glass-neon rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-neon flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="text-lg font-bold text-white">Sorteio Verificável</h2>
                    <p className="mt-1 text-sm text-gray-300 leading-relaxed">
                      Este sorteio utiliza <strong className="text-neon">hash criptográfico</strong> para garantir transparência total.
                      O resultado é gerado de forma aleatória e verificável — impossível de ser manipulado.
                      Após o sorteio, qualquer pessoa poderá auditar o resultado.
                    </p>
                  </div>
                </div>
              </div>

              {/* Seletor de números */}
              <TicketSelector
                totalTickets={raffle.totalTickets}
                soldTickets={raffle.soldTickets}
                ticketPrice={raffle.ticketPrice}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Card de compra */}
              <div className="glass rounded-2xl p-6 sticky top-20 space-y-5">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Preço por número</p>
                  <p className="text-5xl font-extrabold gradient-text mt-1">
                    {formatCurrency(raffle.ticketPrice)}
                  </p>
                </div>

                {/* Progresso */}
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span className="text-neon font-semibold">{progress}% vendido</span>
                    <span>{availableTickets} disponíveis</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isHot
                          ? 'bg-gradient-to-r from-hot via-gold to-hot'
                          : 'bg-gradient-to-r from-neon to-cyan'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1.5">
                    <span>{raffle.soldTickets} vendidos</span>
                    <span>{raffle.totalTickets} total</span>
                  </div>
                </div>

                {/* Compra rápida */}
                <div className="space-y-2">
                  {[1, 3, 5, 10].map((qty) => (
                    <button
                      key={qty}
                      className="w-full flex items-center justify-between px-4 py-3 glass rounded-xl hover:border-neon/40 hover:bg-neon/5 transition-all text-sm group"
                    >
                      <span className="font-medium text-gray-200 group-hover:text-white">
                        {qty} número{qty > 1 ? 's' : ''}
                      </span>
                      <span className="font-bold text-neon">
                        {formatCurrency(raffle.ticketPrice * qty)}
                      </span>
                    </button>
                  ))}
                </div>

                <button className="w-full btn-neon py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  Comprar via PIX
                </button>

                <NoFeesBadge />

                {/* Compartilhar */}
                <button className="w-full btn-ghost py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Compartilhar Rifa
                </button>
              </div>

              {/* Info do criador */}
              <div className="glass rounded-2xl p-4">
                <p className="text-xs text-gray-500 mb-3">Organizado por</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-neon/30 to-electric/30 rounded-full flex items-center justify-center">
                    <span className="font-bold text-neon text-sm">
                      {raffle.creator.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm flex items-center gap-1.5">
                      {raffle.creator.name}
                      {raffle.creator.verified && (
                        <CheckCircle2 className="w-4 h-4 text-neon" />
                      )}
                    </p>
                    <p className="text-xs text-gray-400">Criador verificado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
