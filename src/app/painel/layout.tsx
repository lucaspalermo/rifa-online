import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getAuthUser } from '@/lib/auth'
import {
  LayoutDashboard,
  PlusCircle,
  Trophy,
  DollarSign,
  Settings,
  LogOut,
  Zap,
} from 'lucide-react'

const sidebarLinks = [
  { href: '/painel', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/painel/minhas-rifas', label: 'Minhas Rifas', icon: Trophy },
  { href: '/criar-rifa', label: 'Nova Rifa', icon: PlusCircle },
  { href: '/painel/financeiro', label: 'Financeiro', icon: DollarSign },
  { href: '/painel/configuracoes', label: 'Configurações', icon: Settings },
]

export default async function PainelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getAuthUser()

  if (!user) {
    redirect('/entrar')
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 glass flex-col border-r border-white/10">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-neon/30 to-electric/30 rounded-full flex items-center justify-center">
              <span className="font-bold text-neon">{user.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white text-sm truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-400 hover:text-neon hover:bg-white/5 rounded-lg transition-colors"
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <Link
            href="/api/auth/logout"
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-500 hover:text-hot rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </Link>
        </div>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 md:pb-8 overflow-auto">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-strong border-t border-white/10 flex items-center justify-around px-1 py-2" style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}>
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex flex-col items-center gap-0.5 px-2 py-1 text-gray-400 hover:text-neon transition-colors min-w-0"
          >
            <link.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium truncate max-w-[60px]">{link.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
