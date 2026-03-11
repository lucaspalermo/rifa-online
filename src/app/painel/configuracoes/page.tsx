'use client'

import { useState } from 'react'
import { User, Lock, Save, CheckCircle2 } from 'lucide-react'

export default function ConfiguracoesPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [loaded, setLoaded] = useState(false)

  // Carrega dados do usuário
  if (!loaded) {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setName(data.user.name || '')
          setEmail(data.user.email || '')
          setPhone(data.user.phone || '')
        }
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const res = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
      })

      if (res.ok) {
        setMessage('Perfil atualizado com sucesso!')
      } else {
        const data = await res.json()
        setMessage(data.error || 'Erro ao atualizar perfil')
      }
    } catch {
      setMessage('Erro ao atualizar perfil')
    } finally {
      setSaving(false)
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setMessage('As senhas não coincidem')
      return
    }
    if (newPassword.length < 6) {
      setMessage('A nova senha deve ter pelo menos 6 caracteres')
      return
    }

    setSaving(true)
    setMessage('')

    try {
      const res = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      if (res.ok) {
        setMessage('Senha alterada com sucesso!')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        const data = await res.json()
        setMessage(data.error || 'Erro ao alterar senha')
      }
    } catch {
      setMessage('Erro ao alterar senha')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Configurações</h1>
        <p className="text-gray-400 text-sm mt-1">Gerencie seu perfil e segurança</p>
      </div>

      {message && (
        <div className={`flex items-center gap-2 p-3 rounded-xl text-sm ${
          message.includes('sucesso') ? 'bg-neon/10 text-neon' : 'bg-hot/10 text-hot'
        }`}>
          <CheckCircle2 className="w-4 h-4" />
          {message}
        </div>
      )}

      {/* Perfil */}
      <form onSubmit={handleSaveProfile} className="glass rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <User className="w-5 h-5 text-neon" />
          <h2 className="text-lg font-bold text-white">Perfil</h2>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-neon/50 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-500 text-sm cursor-not-allowed"
          />
          <p className="text-xs text-gray-600 mt-1">O email não pode ser alterado</p>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Telefone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(11) 99999-9999"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-neon/50 focus:outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="btn-neon px-6 py-3 rounded-xl font-medium text-sm flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Salvando...' : 'Salvar Perfil'}
        </button>
      </form>

      {/* Alterar Senha */}
      <form onSubmit={handleChangePassword} className="glass rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <Lock className="w-5 h-5 text-electric" />
          <h2 className="text-lg font-bold text-white">Alterar Senha</h2>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Senha Atual</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-neon/50 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Nova Senha</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-neon/50 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Confirmar Nova Senha</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-neon/50 focus:outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="btn-neon px-6 py-3 rounded-xl font-medium text-sm flex items-center gap-2 disabled:opacity-50"
        >
          <Lock className="w-4 h-4" />
          {saving ? 'Alterando...' : 'Alterar Senha'}
        </button>
      </form>
    </div>
  )
}
