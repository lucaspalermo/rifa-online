import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, MessageSquare, Clock, Shield, ArrowRight } from 'lucide-react'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { JsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Contato - Fale com o RifaFlow',
  description:
    'Entre em contato com a equipe RifaFlow. Suporte ao cliente, dúvidas sobre rifas, pagamentos e sorteios. Atendimento em até 24 horas.',
  alternates: { canonical: '/contato' },
}

export default function ContatoPage() {
  return (
    <div className="mesh-bg min-h-screen">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contato RifaFlow',
          url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://rifaflow.com.br'}/contato`,
          mainEntity: {
            '@type': 'Organization',
            name: 'RifaFlow',
            email: 'contato@rifaflow.com.br',
            url: process.env.NEXT_PUBLIC_APP_URL || 'https://rifaflow.com.br',
          },
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Breadcrumb items={[{ name: 'Contato', url: '/contato' }]} />
      </div>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Fale <span className="gradient-text">Conosco</span>
        </h1>
        <p className="mt-3 text-gray-300 max-w-xl mx-auto">
          Estamos aqui para ajudar. Envie sua mensagem e responderemos em até 24 horas.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="glass rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-neon/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-neon" />
            </div>
            <h3 className="font-bold text-white">Email</h3>
            <p className="text-sm text-gray-400 mt-1">contato@rifaflow.com.br</p>
          </div>

          <div className="glass rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-cyan/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-cyan" />
            </div>
            <h3 className="font-bold text-white">Horário</h3>
            <p className="text-sm text-gray-400 mt-1">Seg-Sex, 9h às 18h</p>
          </div>

          <div className="glass rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-electric/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-electric" />
            </div>
            <h3 className="font-bold text-white">Resposta</h3>
            <p className="text-sm text-gray-400 mt-1">Em até 24 horas</p>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white mb-6">Enviar Mensagem</h2>
          <form className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1.5">Nome *</label>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-neon/50 focus:ring-1 focus:ring-neon/20 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1.5">Email *</label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-neon/50 focus:ring-1 focus:ring-neon/20 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1.5">Assunto *</label>
              <select className="w-full px-4 py-3 bg-[#0a0a12] border border-white/10 rounded-xl text-white focus:border-neon/50 focus:ring-1 focus:ring-neon/20 outline-none transition-all">
                <option value="">Selecione o assunto</option>
                <option value="duvida">Dúvida sobre a plataforma</option>
                <option value="pagamento">Problema com pagamento</option>
                <option value="sorteio">Dúvida sobre sorteio</option>
                <option value="conta">Problema com minha conta</option>
                <option value="parceria">Proposta de parceria</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1.5">Mensagem *</label>
              <textarea
                placeholder="Descreva sua dúvida ou problema em detalhes..."
                rows={5}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-neon/50 focus:ring-1 focus:ring-neon/20 outline-none transition-all resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-neon px-8 py-3 rounded-xl font-semibold flex items-center gap-2"
            >
              Enviar Mensagem
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="mt-10 glass rounded-xl p-5 flex items-start gap-3 border-l-2 border-neon">
          <Shield className="w-5 h-5 text-neon flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-white">Antes de entrar em contato</p>
            <p className="text-gray-400 mt-1">
              Confira nossa página{' '}
              <Link href="/como-funciona" className="text-neon hover:underline">Como Funciona</Link>{' '}
              e o{' '}
              <Link href="/blog" className="text-neon hover:underline">Blog</Link>{' '}
              — sua dúvida pode já ter sido respondida.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
