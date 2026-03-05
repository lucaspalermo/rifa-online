import type { Metadata } from 'next'
import { RaffleCard } from '@/components/rifa/RaffleCard'
import { Search, SlidersHorizontal, Flame } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Rifas Online - Explore e Participe das Melhores Rifas',
  description:
    'Explore as melhores rifas online do Brasil. Encontre prêmios incríveis como iPhones, motos, dinheiro e muito mais. Pagamento via PIX e sorteio verificável.',
  alternates: { canonical: '/rifas' },
}

const mockRaffles = [
  {
    slug: 'iphone-15-pro-max-256gb',
    title: 'Rifa do iPhone 15 Pro Max 256GB',
    prizeTitle: 'iPhone 15 Pro Max 256GB Titânio',
    prizeImageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80',
    ticketPrice: 10,
    totalTickets: 500,
    soldTickets: 237,
    endDate: '2026-03-15',
    creator: { name: 'João Silva', verified: true },
    featured: true,
  },
  {
    slug: 'pix-5000-reais',
    title: 'PIX R$ 5.000 - Concorra Agora!',
    prizeTitle: 'R$ 5.000 via PIX instantâneo',
    prizeImageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=500&q=80',
    ticketPrice: 5,
    totalTickets: 2000,
    soldTickets: 1820,
    endDate: '2026-03-10',
    creator: { name: 'Maria Santos', verified: true },
    featured: true,
  },
  {
    slug: 'playstation-5-slim',
    title: 'PlayStation 5 Slim + 2 Controles',
    prizeTitle: 'PS5 Slim Digital + 2 DualSense',
    prizeImageUrl: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500&q=80',
    ticketPrice: 8,
    totalTickets: 300,
    soldTickets: 89,
    endDate: '2026-03-20',
    creator: { name: 'Pedro Oliveira', verified: false },
  },
  {
    slug: 'moto-honda-cg-160',
    title: 'Honda CG 160 Start 0km',
    prizeTitle: 'Honda CG 160 Start 2026 0km',
    prizeImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500&q=80',
    ticketPrice: 20,
    totalTickets: 1000,
    soldTickets: 620,
    endDate: '2026-03-25',
    creator: { name: 'Lucas Ferreira', verified: true },
    featured: true,
  },
  {
    slug: 'smart-tv-65-samsung',
    title: 'Smart TV Samsung 65" Crystal UHD 4K',
    prizeTitle: 'Samsung 65" Crystal UHD 4K',
    prizeImageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80',
    ticketPrice: 7,
    totalTickets: 400,
    soldTickets: 156,
    endDate: '2026-03-18',
    creator: { name: 'Ana Costa', verified: true },
  },
  {
    slug: 'airpods-pro-2',
    title: 'AirPods Pro 2 - Lacrado',
    prizeTitle: 'Apple AirPods Pro 2ª Geração',
    prizeImageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&q=80',
    ticketPrice: 3,
    totalTickets: 200,
    soldTickets: 178,
    endDate: '2026-03-08',
    creator: { name: 'Carlos Lima', verified: false },
  },
  {
    slug: 'macbook-air-m3',
    title: 'MacBook Air M3 15" - Lacrado',
    prizeTitle: 'MacBook Air M3 15" 256GB',
    prizeImageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
    ticketPrice: 15,
    totalTickets: 800,
    soldTickets: 340,
    endDate: '2026-03-22',
    creator: { name: 'Fernanda Reis', verified: true },
  },
  {
    slug: 'pix-1000-reais',
    title: 'PIX R$ 1.000 - Números Baratos!',
    prizeTitle: 'R$ 1.000 via PIX',
    prizeImageUrl: 'https://images.unsplash.com/photo-1554672723-b208dc85134f?w=500&q=80',
    ticketPrice: 2,
    totalTickets: 500,
    soldTickets: 460,
    endDate: '2026-03-07',
    creator: { name: 'Thiago Santos', verified: true },
  },
]

const categories = [
  'Todos',
  'Eletrônicos',
  'Veículos',
  'Dinheiro',
  'Casa',
  'Experiências',
  'Beneficente',
]

export default function RifasPage() {
  return (
    <div className="mesh-bg min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <Flame className="w-5 h-5 text-neon" />
          <span className="text-neon text-sm font-semibold tracking-widest uppercase">Ao vivo</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Explorar <span className="gradient-text">Rifas</span>
        </h1>
        <p className="mt-3 text-gray-200 max-w-xl">
          Encontre prêmios incríveis. Todos com sorteio criptográfico verificável.
        </p>
      </section>

      {/* Search & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
            <input
              type="text"
              placeholder="Buscar por prêmio, criador..."
              className="w-full pl-11 pr-4 py-3 glass rounded-xl text-white placeholder:text-gray-300 focus:border-neon/30 focus:outline-none transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 glass rounded-xl text-gray-100 hover:border-neon/20 transition-all text-sm font-medium">
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </button>
        </div>

        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                cat === 'Todos'
                  ? 'bg-neon text-bg font-bold'
                  : 'bg-white/5 text-gray-200 hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {mockRaffles.map((raffle) => (
            <RaffleCard key={raffle.slug} {...raffle} />
          ))}
        </div>
      </section>
    </div>
  )
}
