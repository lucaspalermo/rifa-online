import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Zap, ArrowRight, Shield, Sparkles } from 'lucide-react'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { JsonLd } from '@/components/seo/JsonLd'
import { getFaqJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Preços - Crie Rifas Online Grátis | Apenas 5% por Venda',
  description:
    'Crie rifas online 100% grátis no RifaFlow. Sem mensalidade, sem taxa de adesão. Pague apenas 5% sobre as vendas — a menor taxa do mercado. Sem taxas extras para compradores.',
  alternates: { canonical: '/precos' },
  openGraph: {
    title: 'Preços RifaFlow - Crie Rifas Grátis, Pague Só 5%',
    description: 'Sem mensalidade. Sem taxa de adesão. Apenas 5% sobre vendas. A menor taxa do mercado.',
    url: '/precos',
  },
}

const faqsPrecos = [
  {
    question: 'Preciso pagar para criar uma rifa?',
    answer: 'Não! Criar e publicar sua rifa é 100% gratuito. Você só paga a taxa de 5% sobre cada número efetivamente vendido.',
  },
  {
    question: 'O comprador paga alguma taxa?',
    answer: 'Não. O preço do número é o preço final para o comprador. Sem taxas adicionais, sem surpresas.',
  },
  {
    question: 'Quando a taxa de 5% é cobrada?',
    answer: 'A taxa é descontada automaticamente no momento da venda. Você recebe 95% do valor de cada número vendido diretamente na sua conta.',
  },
  {
    question: 'Existe limite de rifas ou vendas?',
    answer: 'Não. Você pode criar quantas rifas quiser e vender quantos números precisar. Sem limites.',
  },
  {
    question: 'Como compara com outras plataformas?',
    answer: 'A maioria cobra entre 8% e 15% de taxa. Com apenas 5%, o RifaFlow oferece a menor taxa do mercado para criadores de rifas online no Brasil.',
  },
]

export default function PrecosPage() {
  return (
    <>
      <JsonLd data={getFaqJsonLd(faqsPrecos)} />

      <div className="mesh-bg min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <Breadcrumb items={[{ name: 'Preços', url: '/precos' }]} />
        </div>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-neon" />
            <span className="text-neon text-sm font-semibold tracking-widest uppercase">Transparente e Simples</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Crie Grátis.{' '}
            <span className="gradient-text">Pague Só 5%.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            Sem mensalidade, sem taxa de adesão, sem custos ocultos.
            A menor taxa do mercado para você maximizar seus lucros.
          </p>
        </section>

        {/* Card de Preço */}
        <section className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="glass-neon rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-neon text-bg text-xs font-bold px-4 py-1 rounded-bl-xl">
              MELHOR CUSTO
            </div>

            <h2 className="text-xl font-bold text-white mt-4">Plano Único</h2>
            <p className="text-gray-400 text-sm mt-1">Tudo incluído, sem limites</p>

            <div className="mt-6">
              <span className="text-6xl font-black text-white">5%</span>
              <p className="text-gray-400 text-sm mt-2">por número vendido</p>
            </div>

            <div className="mt-8 space-y-3 text-left">
              {[
                'Criação ilimitada de rifas',
                'Sorteio criptográfico verificável',
                'PIX instantâneo automático',
                'Painel com relatórios em tempo real',
                'Bilhetes premiados e promoções',
                'Ranking de compradores',
                'Página personalizada com sua marca',
                'Suporte por email',
                'Sem taxa para o comprador',
                'Sem mensalidade ou adesão',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-neon flex-shrink-0" />
                  <span className="text-sm text-gray-200">{feature}</span>
                </div>
              ))}
            </div>

            <Link
              href="/criar-rifa"
              className="mt-8 w-full btn-neon py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Criar Minha Rifa Grátis
            </Link>
          </div>
        </section>

        {/* Comparativo */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-2xl font-extrabold text-white text-center mb-8">
            Compare com Outras Plataformas
          </h2>
          <div className="glass rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="text-left px-5 py-4 text-gray-400 font-medium">Recurso</th>
                  <th className="text-center px-5 py-4 text-neon font-bold">RifaFlow</th>
                  <th className="text-center px-5 py-4 text-gray-500 font-medium">Outros</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  ['Taxa por venda', '5%', '8-15%'],
                  ['Taxa de adesão', 'Grátis', 'R$ 50-200'],
                  ['Mensalidade', 'Grátis', 'R$ 30-100/mês'],
                  ['Taxa para comprador', 'Nenhuma', '3-5%'],
                  ['Sorteio verificável', 'SHA-256', 'Nem sempre'],
                  ['PIX instantâneo', 'Automático', 'Manual/Lento'],
                  ['Relatórios tempo real', 'Incluído', 'Plano premium'],
                  ['Promoções e ranking', 'Incluído', 'Pago à parte'],
                ].map(([feature, ours, theirs]) => (
                  <tr key={feature}>
                    <td className="px-5 py-3 text-gray-300">{feature}</td>
                    <td className="px-5 py-3 text-center font-medium text-neon">{ours}</td>
                    <td className="px-5 py-3 text-center text-gray-500">{theirs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Calculadora */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-2xl font-extrabold text-white text-center mb-8">
            Calcule Sua Receita
          </h2>
          <div className="glass rounded-2xl p-6">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-xs text-gray-400 mb-1">500 números x R$ 10</p>
                <p className="text-sm text-gray-400">Receita bruta</p>
                <p className="text-2xl font-bold text-white">R$ 5.000</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">5% de taxa</p>
                <p className="text-sm text-gray-400">Taxa RifaFlow</p>
                <p className="text-2xl font-bold text-hot">- R$ 250</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Você recebe</p>
                <p className="text-sm text-gray-400">Líquido</p>
                <p className="text-2xl font-bold text-neon">R$ 4.750</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-2xl font-extrabold text-white text-center mb-8">
            Dúvidas sobre Preços
          </h2>
          <div className="space-y-3">
            {faqsPrecos.map((faq) => (
              <details
                key={faq.question}
                className="group glass rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-white hover:text-neon transition-colors">
                  <span>{faq.question}</span>
                  <span className="ml-4 text-neon group-open:rotate-45 transition-transform text-xl font-bold">+</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-300 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <Shield className="w-12 h-12 text-neon mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold text-white">Zero Risco. Comece Agora.</h2>
            <p className="mt-4 text-gray-300">
              Não paga nada para criar. Só paga quando vender. Simples assim.
            </p>
            <Link
              href="/criar-rifa"
              className="btn-neon mt-8 inline-flex items-center gap-2 px-10 py-5 rounded-2xl text-lg font-bold"
            >
              <Zap className="w-5 h-5" />
              Começar Grátis Agora
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
