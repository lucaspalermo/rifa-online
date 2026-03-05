import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { CreateRaffleForm } from '@/components/rifa/CreateRaffleForm'
import { Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Criar Rifa Online Grátis - Comece em 2 Minutos',
  description:
    'Crie sua rifa online grátis agora. Configure o prêmio, defina preço e quantidade de números, e comece a vender via PIX instantâneo. Sem mensalidade, sem burocracia.',
  alternates: { canonical: '/criar-rifa' },
  openGraph: {
    title: 'Criar Rifa Online Grátis | RifaFlow',
    description: 'Crie sua rifa online em menos de 2 minutos. Sorteio verificável e PIX instantâneo.',
    url: '/criar-rifa',
  },
}

export default function CriarRifaPage() {
  return (
    <div className="mesh-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Breadcrumb items={[{ name: 'Criar Rifa', url: '/criar-rifa' }]} />
      </div>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-neon" />
          <span className="text-neon text-sm font-semibold tracking-widest uppercase">Nova Rifa</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Criar Sua <span className="gradient-text">Rifa Online</span>
        </h1>
        <p className="mt-3 text-gray-300">
          Preencha os dados abaixo e sua rifa estará pronta para vender em minutos.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <CreateRaffleForm />
      </section>
    </div>
  )
}
