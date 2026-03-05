import Link from 'next/link'
import { Zap } from 'lucide-react'

const footerLinks = {
  plataforma: [
    { href: '/como-funciona', label: 'Como Funciona' },
    { href: '/criar-rifa', label: 'Criar Rifa Grátis' },
    { href: '/rifas', label: 'Explorar Rifas' },
    { href: '/precos', label: 'Preços' },
    { href: '/sobre', label: 'Sobre o RifaFlow' },
  ],
  recursos: [
    { href: '/blog', label: 'Blog' },
    { href: '/blog/como-criar-rifa-online', label: 'Como Criar Rifa' },
    { href: '/blog/dicas-vender-rifa', label: 'Dicas para Vender' },
    { href: '/contato', label: 'Contato' },
  ],
  legal: [
    { href: '/termos-de-uso', label: 'Termos de Uso' },
    { href: '/politica-de-privacidade', label: 'Política de Privacidade' },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      {/* Glow top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-neon/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-neon/10 flex items-center justify-center border border-neon/30">
                <Zap className="w-4 h-4 text-neon" />
              </div>
              <span className="font-extrabold text-lg text-white">
                Rifa<span className="neon-text">Flow</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-200 leading-relaxed">
              A plataforma mais segura do Brasil para criar e participar de rifas online.
              Sorteio criptográfico verificável.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              <span className="text-xs text-gray-200">Plataforma online 24/7</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-xs uppercase tracking-widest text-gray-300 mb-4">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-200 hover:text-neon transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-300">
            &copy; {new Date().getFullYear()} RifaFlow. Todos os direitos reservados.
          </p>
          <p className="text-xs text-gray-400">
            Plataforma de tecnologia. Não somos uma loteria.
          </p>
        </div>
      </div>
    </footer>
  )
}
