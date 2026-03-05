import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, Sparkles } from 'lucide-react'
import { Breadcrumb } from '@/components/seo/Breadcrumb'

export const metadata: Metadata = {
  title: 'Blog - Dicas e Guias sobre Rifas Online',
  description:
    'Aprenda tudo sobre rifas online: como criar, dicas para vender mais, legislação, estratégias de divulgação e muito mais. Guias completos e atualizados.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog RifaFlow - Dicas e Guias sobre Rifas Online',
    description: 'Guias completos sobre como criar e gerenciar rifas online com sucesso.',
    url: '/blog',
  },
}

const articles = [
  {
    slug: 'como-criar-rifa-online',
    title: 'Como Criar uma Rifa Online: Guia Completo 2026',
    excerpt:
      'Passo a passo detalhado para criar sua primeira rifa online. Aprenda a configurar, precificar e divulgar sua rifa para vender todos os números rapidamente.',
    category: 'Guia',
    readTime: '8 min',
    date: '2026-03-01',
  },
  {
    slug: 'rifa-e-legal',
    title: 'Rifa Online é Legal no Brasil? Entenda a Legislação',
    excerpt:
      'Descubra o que diz a lei sobre rifas online no Brasil, quais os limites legais e como organizar sua rifa de forma segura e dentro da lei.',
    category: 'Legislação',
    readTime: '6 min',
    date: '2026-02-28',
  },
  {
    slug: 'dicas-vender-rifa',
    title: '15 Dicas Infalíveis Para Vender Sua Rifa Online Rápido',
    excerpt:
      'Estratégias testadas para vender todos os números da sua rifa. Desde a precificação até a divulgação em redes sociais e grupos de WhatsApp.',
    category: 'Estratégia',
    readTime: '10 min',
    date: '2026-02-25',
  },
  {
    slug: 'melhores-premios-rifa',
    title: 'Os Melhores Prêmios Para Rifa Online em 2026',
    excerpt:
      'Descubra quais prêmios mais vendem em rifas online. Análise completa de categorias: eletrônicos, motos, carros, dinheiro e experiências.',
    category: 'Dicas',
    readTime: '7 min',
    date: '2026-02-20',
  },
  {
    slug: 'como-divulgar-rifa-online',
    title: 'Como Divulgar Sua Rifa Online: Guia de Marketing',
    excerpt:
      'Aprenda a usar redes sociais, SEO, WhatsApp e outras estratégias para divulgar sua rifa online e alcançar mais compradores.',
    category: 'Marketing',
    readTime: '9 min',
    date: '2026-02-15',
  },
  {
    slug: 'sorteio-transparente-blockchain',
    title: 'Como Funciona o Sorteio Verificável com Criptografia',
    excerpt:
      'Entenda a tecnologia por trás do sorteio verificável: hash criptográfico, seeds aleatórios e como qualquer pessoa pode auditar o resultado.',
    category: 'Tecnologia',
    readTime: '5 min',
    date: '2026-02-10',
  },
]

const categoryColors: Record<string, string> = {
  Guia: 'bg-neon/10 text-neon',
  Legislação: 'bg-electric/10 text-electric',
  Estratégia: 'bg-gold/10 text-gold',
  Dicas: 'bg-cyan/10 text-cyan',
  Marketing: 'bg-hot/10 text-hot',
  Tecnologia: 'bg-neon/10 text-neon',
}

export default function BlogPage() {
  return (
    <div className="mesh-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Breadcrumb items={[{ name: 'Blog', url: '/blog' }]} />
      </div>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-neon" />
          <span className="text-neon text-sm font-semibold tracking-widest uppercase">Conteúdo</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Blog sobre <span className="gradient-text">Rifas Online</span>
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Guias completos, dicas e estratégias para criar e vender rifas online com sucesso.
          Conteúdo atualizado semanalmente.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group block glass rounded-2xl p-6 hover:border-neon/30 transition-all"
            >
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                <span className={`font-medium px-2.5 py-0.5 rounded-full ${categoryColors[article.category] || 'bg-white/10 text-gray-300'}`}>
                  {article.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(article.date).toLocaleDateString('pt-BR')}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime} de leitura
                </span>
              </div>

              <h2 className="text-xl font-bold text-white group-hover:text-neon transition-colors">
                {article.title}
              </h2>

              <p className="mt-2 text-gray-400 text-sm leading-relaxed">
                {article.excerpt}
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-neon text-sm font-medium group-hover:gap-2 transition-all">
                Ler artigo completo <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
