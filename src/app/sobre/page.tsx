import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Zap, Users, Target, ArrowRight, CheckCircle2, Heart } from 'lucide-react'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { JsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Sobre o RifaFlow - A Plataforma #1 de Rifas Online do Brasil',
  description:
    'Conheça o RifaFlow, a plataforma líder de rifas online no Brasil. Sorteio verificável com criptografia, pagamento PIX instantâneo e transparência total. Saiba nossa história e missão.',
  alternates: { canonical: '/sobre' },
  openGraph: {
    title: 'Sobre o RifaFlow - Plataforma de Rifas Online',
    description: 'Conheça nossa história, missão e por que somos a plataforma mais confiável de rifas do Brasil.',
    url: '/sobre',
  },
}

export default function SobrePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'RifaFlow',
          url: process.env.NEXT_PUBLIC_APP_URL || 'https://rifaflow.com.br',
          description: 'Plataforma líder de rifas online no Brasil com sorteio criptograficamente verificável.',
          foundingDate: '2025',
          email: 'contato@rifaflow.com.br',
          sameAs: [],
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'contato@rifaflow.com.br',
            contactType: 'customer service',
            availableLanguage: 'Portuguese',
          },
        }}
      />

      <div className="mesh-bg min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <Breadcrumb items={[{ name: 'Sobre', url: '/sobre' }]} />
        </div>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            A Plataforma de Rifas que o{' '}
            <span className="gradient-text">Brasil Merece</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Nascemos da frustração com rifas online sem transparência, sem confiança e sem
            tecnologia. O RifaFlow existe para resolver isso — com criptografia, PIX instantâneo
            e sorteios que qualquer pessoa pode auditar.
          </p>
        </section>

        {/* Números */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { number: '50K+', label: 'Rifas Criadas' },
              { number: 'R$ 10M+', label: 'Arrecadados' },
              { number: '200K+', label: 'Participantes' },
              { number: '4.9/5', label: 'Avaliação Média' },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-6 text-center">
                <p className="text-3xl font-black text-white">{stat.number}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Missão */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-2xl p-6 space-y-3">
              <div className="w-12 h-12 bg-neon/10 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-neon" />
              </div>
              <h3 className="text-lg font-bold text-white">Nossa Missão</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Democratizar rifas online no Brasil com tecnologia que garante transparência
                total e confiança entre criadores e compradores.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 space-y-3">
              <div className="w-12 h-12 bg-electric/10 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-electric" />
              </div>
              <h3 className="text-lg font-bold text-white">Nossos Valores</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Transparência radical. Cada sorteio é criptograficamente verificável.
                Cada pagamento é rastreável. Sem caixas pretas.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 space-y-3">
              <div className="w-12 h-12 bg-cyan/10 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-cyan" />
              </div>
              <h3 className="text-lg font-bold text-white">Para Quem</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Para qualquer pessoa que queira criar uma rifa justa: empreendedores,
                igrejas, ONGs, influenciadores e pessoas comuns.
              </p>
            </div>
          </div>
        </section>

        {/* Por que somos diferentes */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-neon/5 via-transparent to-electric/5" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <h2 className="text-3xl font-extrabold text-white text-center mb-10">
              Por que o RifaFlow é Diferente
            </h2>

            <div className="space-y-4">
              {[
                'Sorteio com hash SHA-256 público — verificável por qualquer pessoa',
                'PIX instantâneo via Asaas — confirmação automática em segundos',
                'Painel em tempo real com vendas, ranking e relatórios completos',
                'Promoções, bilhetes premiados e ranking de compradores',
                'Sem taxas para o comprador — preço final é o preço do número',
                'SEO otimizado — cada rifa tem página indexável no Google',
                'Página personalizada com redes sociais, logo e banner do criador',
                'Plataforma 100% mobile — compre direto pelo celular via WhatsApp',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 glass rounded-xl p-4">
                  <CheckCircle2 className="w-5 h-5 text-neon flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-extrabold text-white">Pronto para Começar?</h2>
            <p className="mt-4 text-gray-300">
              Crie sua rifa em menos de 2 minutos. Grátis, sem mensalidade.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/criar-rifa"
                className="btn-neon px-8 py-4 rounded-xl text-lg font-bold flex items-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Criar Minha Rifa Grátis
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/como-funciona"
                className="btn-ghost px-8 py-4 rounded-xl text-lg font-medium flex items-center gap-2"
              >
                <Users className="w-5 h-5" />
                Ver Como Funciona
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
