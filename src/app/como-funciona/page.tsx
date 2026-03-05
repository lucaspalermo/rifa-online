import type { Metadata } from 'next'
import Link from 'next/link'
import {
  UserPlus,
  Camera,
  Settings,
  Share2,
  CreditCard,
  Trophy,
  Shield,
  ArrowRight,
  Gift,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { JsonLd } from '@/components/seo/JsonLd'
import { getFaqJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Como Funciona - Crie Sua Rifa Online em 4 Passos',
  description:
    'Aprenda como criar uma rifa online grátis no RifaFlow. Cadastre-se, configure sua rifa, compartilhe e receba pagamentos via PIX instantaneamente. Sorteio verificável e transparente.',
  alternates: { canonical: '/como-funciona' },
  openGraph: {
    title: 'Como Funciona o RifaFlow - Crie Sua Rifa Online em 4 Passos',
    description: 'Aprenda como criar uma rifa online grátis com sorteio verificável e PIX instantâneo.',
    url: '/como-funciona',
  },
}

const stepsCreator = [
  {
    icon: UserPlus,
    title: 'Cadastre-se Grátis',
    description:
      'Crie sua conta em segundos usando email ou Google. Sem taxa de adesão, sem mensalidade.',
    details: ['Cadastro rápido com email', 'Verificação de identidade opcional', 'Painel de controle completo'],
    color: 'neon',
  },
  {
    icon: Camera,
    title: 'Configure Sua Rifa',
    description:
      'Adicione fotos do prêmio, defina o preço dos números, quantidade total e data do sorteio.',
    details: ['Upload de até 10 fotos', 'Defina regras e descrição', 'Escolha a categoria'],
    color: 'cyan',
  },
  {
    icon: Settings,
    title: 'Personalize',
    description:
      'Escolha o visual da sua página, defina limite de números por pessoa e regras especiais.',
    details: ['Link personalizado', 'Limite por comprador', 'Data e hora do sorteio'],
    color: 'electric',
  },
  {
    icon: Share2,
    title: 'Compartilhe',
    description:
      'Divulgue seu link exclusivo nas redes sociais, WhatsApp e onde mais quiser.',
    details: ['Link único para sua rifa', 'Kit de artes para redes sociais', 'Textos prontos para copiar'],
    color: 'gold',
  },
  {
    icon: CreditCard,
    title: 'Receba Pagamentos',
    description:
      'Cada compra gera um PIX instantâneo. O dinheiro é confirmado em segundos no seu painel.',
    details: ['PIX com QR Code automático', 'Confirmação instantânea', 'Acompanhe vendas em tempo real'],
    color: 'neon',
  },
  {
    icon: Trophy,
    title: 'Sorteie com Transparência',
    description:
      'Na data marcada, o sorteio é feito automaticamente com hash criptográfico verificável.',
    details: ['Sorteio automático na data', 'Hash público para auditoria', 'Notificação ao ganhador'],
    color: 'cyan',
  },
]

const faqsComoFunciona = [
  {
    question: 'Preciso pagar algo para criar uma rifa?',
    answer:
      'Não! Criar sua rifa é 100% gratuito. Cobramos apenas 5% sobre cada número vendido, uma das menores taxas do mercado.',
  },
  {
    question: 'Quanto tempo leva para criar uma rifa?',
    answer:
      'Menos de 5 minutos. Basta preencher os dados do prêmio, definir preço e quantidade, e sua rifa já estará pronta para compartilhar.',
  },
  {
    question: 'Como os compradores pagam?',
    answer:
      'Via PIX instantâneo. Ao escolher os números, o comprador recebe um QR Code e código copia-e-cola. O pagamento é confirmado automaticamente em segundos.',
  },
  {
    question: 'O sorteio é realmente transparente?',
    answer:
      'Sim. Usamos criptografia para gerar um hash único de cada sorteio, que é publicado antes do resultado. Qualquer pessoa pode verificar matematicamente que o resultado não foi alterado.',
  },
  {
    question: 'Posso cancelar minha rifa?',
    answer:
      'Sim. Se nenhum número foi vendido, você pode cancelar a qualquer momento. Se já houver vendas, o cancelamento reembolsa automaticamente todos os compradores.',
  },
  {
    question: 'O comprador paga alguma taxa extra?',
    answer:
      'Não! O preço do número é o preço final para o comprador. Sem taxas adicionais, sem surpresas. A taxa de 5% é descontada apenas da receita do criador.',
  },
]

const colorMap: Record<string, string> = {
  neon: 'text-neon bg-neon/10 shadow-[0_0_20px_rgba(0,232,123,0.15)]',
  cyan: 'text-cyan bg-cyan/10 shadow-[0_0_20px_rgba(0,210,255,0.15)]',
  electric: 'text-electric bg-electric/10 shadow-[0_0_20px_rgba(108,92,231,0.15)]',
  gold: 'text-gold bg-gold/10 shadow-[0_0_20px_rgba(255,212,59,0.15)]',
}

const colorText: Record<string, string> = {
  neon: 'text-neon',
  cyan: 'text-cyan',
  electric: 'text-electric',
  gold: 'text-gold',
}

export default function ComoFuncionaPage() {
  return (
    <>
      <JsonLd data={getFaqJsonLd(faqsComoFunciona)} />

      <div className="mesh-bg min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <Breadcrumb items={[{ name: 'Como Funciona', url: '/como-funciona' }]} />
        </div>

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-neon" />
            <span className="text-neon text-sm font-semibold tracking-widest uppercase">Simples e Rápido</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Como Criar uma{' '}
            <span className="gradient-text">Rifa Online</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            Criar sua rifa no RifaFlow é simples, rápido e gratuito.
            Siga os passos abaixo e comece a vender em menos de 5 minutos.
          </p>
        </section>

        {/* Passos */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="space-y-8">
            {stepsCreator.map((step, index) => (
              <div
                key={step.title}
                className={`glass rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start gap-6 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${colorMap[step.color]}`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-bold mb-1 ${colorText[step.color]}`}>
                    Passo {index + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-gray-300 leading-relaxed">{step.description}</p>
                  <ul className="mt-4 space-y-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-sm text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-neon flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Segurança */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-neon/5 via-transparent to-electric/5" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <div className="w-16 h-16 bg-neon/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-neon" />
            </div>
            <h2 className="text-3xl font-extrabold text-white">Segurança em Primeiro Lugar</h2>
            <p className="mt-4 text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Cada sorteio no RifaFlow gera um <strong className="text-neon">hash criptográfico único</strong> que é
              registrado publicamente antes do resultado. Isso garante matematicamente que nenhum
              resultado pode ser manipulado. Transparência total para criadores e compradores.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white text-center mb-10">
              Dúvidas Frequentes
            </h2>
            <div className="space-y-3">
              {faqsComoFunciona.map((faq) => (
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
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-neon/10 via-electric/10 to-cyan/10 blur-3xl" />
          <div className="max-w-3xl mx-auto px-4 text-center relative">
            <h2 className="text-3xl font-extrabold text-white">Pronto Para Começar?</h2>
            <p className="mt-4 text-gray-300">
              Crie sua primeira rifa agora mesmo. É grátis e leva menos de 5 minutos.
            </p>
            <Link
              href="/criar-rifa"
              className="mt-8 inline-flex items-center gap-2 btn-neon px-8 py-4 rounded-xl text-lg font-bold"
            >
              <Gift className="w-5 h-5" />
              Criar Minha Rifa Grátis
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
