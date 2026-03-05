'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Zap, Search, User, Plus, Flame } from 'lucide-react'

const navLinks = [
  { href: '/rifas', label: 'Explorar' },
  { href: '/como-funciona', label: 'Como Funciona' },
  { href: '/precos', label: 'Preços' },
  { href: '/blog', label: 'Blog' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="glass-strong sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-neon/10 flex items-center justify-center border border-neon/30 group-hover:neon-glow transition-all duration-300">
              <Zap className="w-5 h-5 text-neon" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              Rifa<span className="neon-text">Flow</span>
            </span>
          </Link>

          {/* Nav Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-gray-200 hover:text-neon text-sm font-medium transition-all duration-200 rounded-lg hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/rifas"
              className="p-2.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              aria-label="Buscar rifas"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link
              href="/criar-rifa"
              className="btn-neon inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm"
            >
              <Plus className="w-4 h-4" />
              Criar Rifa
            </Link>
            <Link
              href="/entrar"
              className="btn-ghost inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
            >
              <User className="w-4 h-4" />
              Entrar
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
            aria-label="Abrir menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Nav Mobile */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/5 py-4 space-y-1 animate-slide-up">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2.5 text-gray-200 hover:text-neon hover:bg-white/5 rounded-lg text-sm font-medium transition-all"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-3 border-t border-white/5 space-y-2">
              <Link
                href="/criar-rifa"
                className="btn-neon block text-center px-4 py-3 rounded-xl text-sm"
                onClick={() => setMenuOpen(false)}
              >
                Criar Rifa Grátis
              </Link>
              <Link
                href="/entrar"
                className="btn-ghost block text-center px-4 py-3 rounded-xl text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Entrar
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
