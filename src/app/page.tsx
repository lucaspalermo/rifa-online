import Link from 'next/link'
import {
  Shield,
  Zap,
  BarChart3,
  ArrowRight,
  Star,
  Lock,
  Smartphone,
  TrendingUp,
  Eye,
  Timer,
  Flame,
  ChevronRight,
  Users,
  Sparkles,
} from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { getWebsiteJsonLd, getFaqJsonLd } from '@/lib/seo'

const faqs = [
  {
    question: 'Como criar uma rifa online grátis?',
    answer:
      'Cadastre-se, clique em "Criar Rifa", preencha os dados e compartilhe. Não paga nada para criar — cobramos apenas 5% sobre vendas.',
  },
  {
    question: 'Rifa online é legal no Brasil?',
    answer:
      'Rifas entre particulares são prática comum no Brasil. O RifaFlow é uma plataforma de tecnologia, não uma loteria.',
  },
  {
    question: 'Como funciona o sorteio verificável?',
    answer:
      'Geramos um hash SHA-256 antes do sorteio. Qualquer pessoa pode verificar matematicamente que o resultado não foi manipulado.',
  },
  {
    question: 'Quais formas de pagamento são aceitas?',
    answer:
      'PIX instantâneo com QR Code automático. Pagamento confirmado em segundos.',
  },
  {
    question: 'Quanto custa usar o RifaFlow?',
    answer:
      'Criar é 100% grátis. Taxa de apenas 5% sobre vendas — sem mensalidades ou custos ocultos.',
  },
  {
    question: 'Como recebo o dinheiro?',
    answer:
      'Transferido automaticamente via PIX. Acompanhe tudo em tempo real pelo painel.',
  },
]

const featuredPrizes = [
  {
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80',
    title: 'iPhone 15 Pro Max',
    price: 'R$ 10,00',
    sold: 72,
    tag: 'POPULAR',
  },
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80',
    title: 'Honda CG 160 0km',
    price: 'R$ 20,00',
    sold: 58,
    tag: 'DESTAQUE',
  },
  {
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600&q=80',
    title: 'PlayStation 5 Slim',
    price: 'R$ 8,00',
    sold: 85,
    tag: 'QUASE LÁ',
  },
  {
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&q=80',
    title: 'R$ 5.000 via PIX',
    price: 'R$ 5,00',
    sold: 91,
    tag: 'HOT',
  },
]

export default function HomePage() {
  return (
    <>
      <JsonLd data={getWebsiteJsonLd()} />
      <JsonLd data={getFaqJsonLd(faqs)} />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background effects */}
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute inset-0 grid-bg opacity-40" />

        {/* Floating orbs */}
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-neon/5 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-electric/5 rounded-full blur-[120px] animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan/3 rounded-full blur-[150px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-neon px-4 py-2 rounded-full mb-8 animate-slide-up">
              <Flame className="w-4 h-4 text-neon" />
              <span className="text-sm font-medium text-neon">Plataforma #1 de Rifas do Brasil</span>
              <ChevronRight className="w-4 h-4 text-neon/60" />
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.9] tracking-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <span className="text-white">Sua rifa.</span>
              <br />
              <span className="gradient-text">Outro nível.</span>
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-gray-100 leading-relaxed max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Sorteio com <span className="text-neon font-semibold">criptografia verificável</span>.
              Pagamento <span className="text-neon font-semibold">PIX em segundos</span>.
              A única plataforma que compradores realmente <span className="underline decoration-neon/50 underline-offset-4">confiam</span>.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link
                href="/criar-rifa"
                className="btn-neon w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-lg"
              >
                <Zap className="w-5 h-5" />
                Criar Rifa Grátis
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/rifas"
                className="btn-ghost w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-lg font-medium"
              >
                <Eye className="w-5 h-5" />
                Explorar Rifas
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex items-center justify-center gap-8 sm:gap-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-black neon-text">50K+</p>
                <p className="text-xs text-gray-200 mt-1">Rifas Criadas</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-black text-white">R$ 10M+</p>
                <p className="text-xs text-gray-200 mt-1">Arrecadados</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-black text-white">200K+</p>
                <p className="text-xs text-gray-200 mt-1">Participantes</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center flex flex-col items-center">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-xs text-gray-200 mt-1">4.9/5 Avaliação</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
      </section>

      {/* ============ PRÊMIOS EM DESTAQUE ============ */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-neon text-sm font-semibold tracking-widest uppercase">Ao vivo agora</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white mt-2">
                Rifas em <span className="gradient-text">Destaque</span>
              </h2>
            </div>
            <Link
              href="/rifas"
              className="hidden sm:inline-flex items-center gap-2 text-neon hover:text-white font-medium transition-colors"
            >
              Ver todas <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredPrizes.map((prize, i) => (
              <Link
                href="/rifas"
                key={i}
                className="group card-3d rounded-2xl overflow-hidden bg-bg-card border border-white/5"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={prize.image}
                    alt={prize.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />

                  {/* Tag */}
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                      prize.tag === 'HOT'
                        ? 'bg-hot/20 text-hot border border-hot/30'
                        : prize.tag === 'QUASE LÁ'
                        ? 'bg-gold/20 text-gold border border-gold/30'
                        : 'bg-neon/10 text-neon border border-neon/20'
                    }`}>
                      {prize.tag}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-3 right-3 glass px-3 py-1.5 rounded-lg">
                    <span className="text-sm font-bold text-white">{prize.price}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-bold text-white text-base group-hover:text-neon transition-colors">
                    {prize.title}
                  </h3>

                  {/* Progress */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-200 mb-1.5">
                      <span>{prize.sold}% vendido</span>
                      <span className="flex items-center gap-1">
                        <Timer className="w-3 h-3" /> Encerra em breve
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="progress-bar h-full"
                        style={{ width: `${prize.sold}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/rifas" className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium">
              Ver Todas as Rifas <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ POR QUE RIFAFLOW ============ */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 mesh-bg opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-neon text-sm font-semibold tracking-widest uppercase">Diferenciais</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-2">
              Por que o RifaFlow é <span className="gradient-text">diferente</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Shield,
                title: 'Sorteio Criptográfico',
                desc: 'Hash SHA-256 público e verificável. Impossível de manipular. Qualquer pessoa pode auditar.',
                glow: 'neon',
              },
              {
                icon: Zap,
                title: 'PIX Instantâneo',
                desc: 'QR Code gerado automaticamente via Asaas. Pagamento confirmado em segundos, sem espera.',
                glow: 'cyan',
              },
              {
                icon: BarChart3,
                title: 'Painel em Tempo Real',
                desc: 'Dashboard com vendas ao vivo, lista de compradores, receita e ferramentas de marketing.',
                glow: 'electric',
              },
              {
                icon: Lock,
                title: 'Dinheiro Protegido',
                desc: 'Sistema de garantia protege compradores e vendedores. Reembolso automático em cancelamentos.',
                glow: 'gold',
              },
              {
                icon: Smartphone,
                title: 'Mobile First',
                desc: '100% otimizado para celular. Seus compradores escolhem números e pagam direto pelo WhatsApp.',
                glow: 'neon',
              },
              {
                icon: TrendingUp,
                title: 'SEO que Rankeia',
                desc: 'Cada rifa tem página otimizada para Google. Seus compradores te encontram organicamente.',
                glow: 'cyan',
              },
              {
                icon: Users,
                title: 'Zero Taxa para Comprador',
                desc: 'O preço do número é o preço final. Sem taxas extras, sem surpresas. Mais confiança e mais vendas.',
                glow: 'gold',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group glass rounded-2xl p-6 hover:border-neon/20 transition-all duration-300 hover:bg-bg-card-hover"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                  feature.glow === 'neon'
                    ? 'bg-neon/10 border border-neon/20'
                    : feature.glow === 'cyan'
                    ? 'bg-cyan/10 border border-cyan/20'
                    : feature.glow === 'electric'
                    ? 'bg-electric/10 border border-electric/20'
                    : 'bg-gold/10 border border-gold/20'
                }`}>
                  <feature.icon className={`w-6 h-6 ${
                    feature.glow === 'neon' ? 'text-neon'
                    : feature.glow === 'cyan' ? 'text-cyan'
                    : feature.glow === 'electric' ? 'text-electric'
                    : 'text-gold'
                  }`} />
                </div>
                <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-100 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COMO FUNCIONA ============ */}
      <section className="py-20 sm:py-28 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-neon text-sm font-semibold tracking-widest uppercase">Simples assim</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-2">
              4 passos. <span className="gradient-text">2 minutos.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { n: '01', title: 'Cadastre-se grátis', desc: 'Conta criada em 10 segundos. Sem taxa, sem mensalidade.', color: 'neon' },
              { n: '02', title: 'Configure sua rifa', desc: 'Fotos, preço, quantidade de números e data do sorteio.', color: 'cyan' },
              { n: '03', title: 'Compartilhe o link', desc: 'Link exclusivo para redes sociais e WhatsApp com kit marketing.', color: 'electric' },
              { n: '04', title: 'Sorteie com prova', desc: 'Hash criptográfico público. Resultado verificável por qualquer pessoa.', color: 'gold' },
            ].map((step) => (
              <div key={step.n} className="glass rounded-2xl p-6 flex items-start gap-5 hover:border-neon/10 transition-all">
                <span className={`text-5xl font-black opacity-20 leading-none ${
                  step.color === 'neon' ? 'text-neon'
                  : step.color === 'cyan' ? 'text-cyan'
                  : step.color === 'electric' ? 'text-electric'
                  : 'text-gold'
                }`}>
                  {step.n}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-1 text-sm text-gray-100 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SOCIAL PROOF ============ */}
      <section className="py-20 sm:py-28 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-neon text-sm font-semibold tracking-widest uppercase">Depoimentos</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-2">
              Quem usa, <span className="gradient-text">recomenda</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: 'Mariana S.', role: 'Criadora', text: 'Vendi todos os 500 números em 3 dias. O PIX instantâneo fez toda a diferença. Incrível!' },
              { name: 'Lucas F.', role: 'Comprador', text: 'Primeira vez que confio numa rifa online. O hash do sorteio prova que é justo. Top demais.' },
              { name: 'Ana Paula R.', role: 'Criadora', text: 'O painel é absurdo. Vejo as vendas em tempo real e o kit marketing pronto facilita muito.' },
            ].map((t) => (
              <div key={t.name} className="glass rounded-2xl p-6 hover:border-neon/10 transition-all">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-sm text-gray-100 leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-neon/10 border border-neon/20 flex items-center justify-center">
                    <span className="text-neon font-bold text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-gray-200">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <Sparkles className="w-12 h-12 text-neon mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl sm:text-6xl font-black text-white">
            Comece <span className="gradient-text">agora</span>
          </h2>
          <p className="mt-4 text-lg text-gray-100 max-w-xl mx-auto">
            Sua rifa no ar em menos de 2 minutos. Grátis. Sem cartão de crédito.
          </p>
          <Link
            href="/criar-rifa"
            className="btn-neon mt-8 inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg animate-pulse-neon"
          >
            <Zap className="w-5 h-5" />
            Criar Minha Rifa Grátis
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-4 text-sm text-gray-300 flex items-center justify-center gap-4">
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-neon" /> 50.000+ rifas criadas</span>
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-neon" /> Sorteio verificável</span>
          </p>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-20 sm:py-28 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-neon text-sm font-semibold tracking-widest uppercase">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group glass rounded-xl overflow-hidden hover:border-neon/10 transition-all"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-white hover:text-neon transition-colors">
                  <span>{faq.question}</span>
                  <span className="ml-4 text-neon/60 group-open:rotate-45 transition-transform duration-200 text-xl font-light">+</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-100 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
