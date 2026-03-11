'use client'

import { useState } from 'react'
import {
  Camera,
  DollarSign,
  Hash,
  Calendar,
  FileText,
  Gift,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Instagram,
  Phone,
  Facebook,
  Youtube,
  Image,
  Trophy,
  Percent,
  Plus,
  X,
  Medal,
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface PrizeTicketInput {
  number: string
  prize: string
  prizeValue: string
}

interface PromotionInput {
  buyQuantity: string
  bonusQuantity: string
  label: string
}

interface RankingPrizeInput {
  position: string
  prize: string
  prizeValue: string
}

interface FormData {
  title: string
  description: string
  prizeTitle: string
  prizeDescription: string
  prizeValue: string
  ticketPrice: string
  totalTickets: string
  maxTicketsPerUser: string
  endDate: string
  rules: string
  category: string
  // Personalização
  instagramUrl: string
  whatsappUrl: string
  facebookUrl: string
  youtubeUrl: string
  tiktokUrl: string
  // Extras
  rankingEnabled: boolean
  prizeTickets: PrizeTicketInput[]
  promotions: PromotionInput[]
  rankingPrizes: RankingPrizeInput[]
}

const categories = [
  { value: 'eletronicos', label: 'Eletrônicos' },
  { value: 'veiculos', label: 'Veículos' },
  { value: 'dinheiro', label: 'Dinheiro / PIX' },
  { value: 'casa', label: 'Casa e Decoração' },
  { value: 'moda', label: 'Moda e Acessórios' },
  { value: 'experiencias', label: 'Experiências' },
  { value: 'beneficente', label: 'Beneficente' },
  { value: 'outros', label: 'Outros' },
]

const TOTAL_STEPS = 5

const inputClass =
  'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-neon/50 focus:ring-1 focus:ring-neon/20 outline-none transition-all'
const labelClass = 'block text-sm font-medium text-gray-200 mb-1.5'

export function CreateRaffleForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>({
    title: '',
    description: '',
    prizeTitle: '',
    prizeDescription: '',
    prizeValue: '',
    ticketPrice: '',
    totalTickets: '100',
    maxTicketsPerUser: '',
    endDate: '',
    rules: '',
    category: '',
    instagramUrl: '',
    whatsappUrl: '',
    facebookUrl: '',
    youtubeUrl: '',
    tiktokUrl: '',
    rankingEnabled: false,
    prizeTickets: [],
    promotions: [],
    rankingPrizes: [],
  })

  const totalRevenue =
    parseFloat(form.ticketPrice || '0') * parseInt(form.totalTickets || '0')
  const platformFee = totalRevenue * 0.05
  const netRevenue = totalRevenue - platformFee

  function updateField<K extends keyof FormData>(field: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function addPrizeTicket() {
    setForm((prev) => ({
      ...prev,
      prizeTickets: [...prev.prizeTickets, { number: '', prize: '', prizeValue: '' }],
    }))
  }

  function removePrizeTicket(index: number) {
    setForm((prev) => ({
      ...prev,
      prizeTickets: prev.prizeTickets.filter((_, i) => i !== index),
    }))
  }

  function updatePrizeTicket(index: number, field: keyof PrizeTicketInput, value: string) {
    setForm((prev) => ({
      ...prev,
      prizeTickets: prev.prizeTickets.map((pt, i) => (i === index ? { ...pt, [field]: value } : pt)),
    }))
  }

  function addPromotion() {
    setForm((prev) => ({
      ...prev,
      promotions: [...prev.promotions, { buyQuantity: '', bonusQuantity: '', label: '' }],
    }))
  }

  function removePromotion(index: number) {
    setForm((prev) => ({
      ...prev,
      promotions: prev.promotions.filter((_, i) => i !== index),
    }))
  }

  function updatePromotion(index: number, field: keyof PromotionInput, value: string) {
    setForm((prev) => ({
      ...prev,
      promotions: prev.promotions.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
    }))
  }

  function addRankingPrize() {
    setForm((prev) => ({
      ...prev,
      rankingPrizes: [
        ...prev.rankingPrizes,
        { position: String(prev.rankingPrizes.length + 1), prize: '', prizeValue: '' },
      ],
    }))
  }

  function removeRankingPrize(index: number) {
    setForm((prev) => ({
      ...prev,
      rankingPrizes: prev.rankingPrizes.filter((_, i) => i !== index),
    }))
  }

  function updateRankingPrize(index: number, field: keyof RankingPrizeInput, value: string) {
    setForm((prev) => ({
      ...prev,
      rankingPrizes: prev.rankingPrizes.map((rp, i) => (i === index ? { ...rp, [field]: value } : rp)),
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    alert('Rifa criada com sucesso! (Implementar API)')
  }

  const stepLabels = [
    'Dados do Prêmio',
    'Configuração da Rifa',
    'Extras e Promoções',
    'Personalização',
    'Revisão e Publicação',
  ]

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-8">
      {/* Indicador de passos */}
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
          <div key={s} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setStep(s)}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                s === step
                  ? 'bg-neon text-bg shadow-[0_0_15px_rgba(0,232,123,0.3)]'
                  : s < step
                  ? 'bg-neon/30 text-neon'
                  : 'bg-white/5 text-gray-500 border border-white/10'
              }`}
            >
              {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
            </button>
            {s < TOTAL_STEPS && (
              <div className={`w-8 sm:w-12 h-0.5 ${s < step ? 'bg-neon/50' : 'bg-white/10'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="text-center text-sm text-gray-400">{stepLabels[step - 1]}</div>

      {/* PASSO 1: Prêmio */}
      {step === 1 && (
        <div className="glass rounded-2xl p-6 space-y-5">
          <div>
            <label className={labelClass}>Título da Rifa *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Ex: Rifa do iPhone 15 Pro Max"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>
              <Gift className="w-4 h-4 inline mr-1 text-neon" />
              Nome do Prêmio *
            </label>
            <input
              type="text"
              value={form.prizeTitle}
              onChange={(e) => updateField('prizeTitle', e.target.value)}
              placeholder="Ex: iPhone 15 Pro Max 256GB"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Descrição do Prêmio</label>
            <textarea
              value={form.prizeDescription}
              onChange={(e) => updateField('prizeDescription', e.target.value)}
              placeholder="Descreva o prêmio em detalhes: modelo, cor, estado, etc."
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                <DollarSign className="w-4 h-4 inline mr-1 text-neon" />
                Valor do Prêmio (R$) *
              </label>
              <input
                type="number"
                value={form.prizeValue}
                onChange={(e) => updateField('prizeValue', e.target.value)}
                placeholder="5000"
                min="1"
                step="0.01"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Categoria *</label>
              <select
                value={form.category}
                onChange={(e) => updateField('category', e.target.value)}
                className={`${inputClass} bg-[#0a0a12]`}
                required
              >
                <option value="">Selecione</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>
              <Camera className="w-4 h-4 inline mr-1 text-neon" />
              Fotos do Prêmio
            </label>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-neon/30 transition-colors cursor-pointer group">
              <Camera className="w-10 h-10 text-gray-500 mx-auto mb-2 group-hover:text-neon transition-colors" />
              <p className="text-sm text-gray-400">Clique ou arraste para fazer upload</p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG ou WEBP (máx. 5MB cada, até 10 fotos)
              </p>
            </div>
          </div>

          <div>
            <label className={labelClass}>
              <FileText className="w-4 h-4 inline mr-1 text-neon" />
              Descrição da Rifa
            </label>
            <textarea
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Conte mais sobre sua rifa: motivação, regras de participação, etc."
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full btn-neon py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            Próximo: Configuração
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* PASSO 2: Configuração */}
      {step === 2 && (
        <div className="glass rounded-2xl p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                <DollarSign className="w-4 h-4 inline mr-1 text-neon" />
                Preço do Número (R$) *
              </label>
              <input
                type="number"
                value={form.ticketPrice}
                onChange={(e) => updateField('ticketPrice', e.target.value)}
                placeholder="10.00"
                min="0.50"
                step="0.50"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>
                <Hash className="w-4 h-4 inline mr-1 text-neon" />
                Quantidade de Números *
              </label>
              <input
                type="number"
                value={form.totalTickets}
                onChange={(e) => updateField('totalTickets', e.target.value)}
                placeholder="100"
                min="10"
                max="100000"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Calculadora */}
          {form.ticketPrice && form.totalTickets && (
            <div className="glass-neon rounded-xl p-4 space-y-2">
              <h4 className="font-semibold text-white text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-neon" />
                Simulação de Receita
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-400">Receita Total</p>
                  <p className="text-lg font-bold text-white">{formatCurrency(totalRevenue)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Taxa (5%)</p>
                  <p className="text-lg font-bold text-hot">{formatCurrency(platformFee)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Você Recebe</p>
                  <p className="text-lg font-bold text-neon">{formatCurrency(netRevenue)}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Máximo por Pessoa</label>
              <input
                type="number"
                value={form.maxTicketsPerUser}
                onChange={(e) => updateField('maxTicketsPerUser', e.target.value)}
                placeholder="Sem limite"
                min="1"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                <Calendar className="w-4 h-4 inline mr-1 text-neon" />
                Data do Sorteio *
              </label>
              <input
                type="datetime-local"
                value={form.endDate}
                onChange={(e) => updateField('endDate', e.target.value)}
                className={inputClass}
                required
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Regras Adicionais</label>
            <textarea
              value={form.rules}
              onChange={(e) => updateField('rules', e.target.value)}
              placeholder="Regras específicas da sua rifa (opcional)"
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 btn-ghost py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="flex-1 btn-neon py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              Próximo: Extras
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* PASSO 3: Extras e Promoções */}
      {step === 3 && (
        <div className="space-y-6">
          {/* Bilhetes Premiados */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Gift className="w-5 h-5 text-gold" />
                Bilhetes Premiados
              </h3>
              <button
                type="button"
                onClick={addPrizeTicket}
                className="text-sm text-neon hover:text-white flex items-center gap-1 transition-colors"
              >
                <Plus className="w-4 h-4" /> Adicionar
              </button>
            </div>
            <p className="text-sm text-gray-400">
              Defina bilhetes com prêmios extras. Os compradores sabem que existem, mas não quais números são.
            </p>

            {form.prizeTickets.length === 0 ? (
              <div className="text-center py-6 text-gray-500 text-sm">
                Nenhum bilhete premiado adicionado
              </div>
            ) : (
              <div className="space-y-3">
                {form.prizeTickets.map((pt, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/5 rounded-xl p-3">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="number"
                        value={pt.number}
                        onChange={(e) => updatePrizeTicket(i, 'number', e.target.value)}
                        placeholder="Número"
                        className={`${inputClass} text-sm py-2`}
                        min="0"
                      />
                      <input
                        type="text"
                        value={pt.prize}
                        onChange={(e) => updatePrizeTicket(i, 'prize', e.target.value)}
                        placeholder="Prêmio (ex: AirPods)"
                        className={`${inputClass} text-sm py-2`}
                      />
                      <input
                        type="number"
                        value={pt.prizeValue}
                        onChange={(e) => updatePrizeTicket(i, 'prizeValue', e.target.value)}
                        placeholder="Valor (R$)"
                        className={`${inputClass} text-sm py-2`}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removePrizeTicket(i)}
                      className="text-gray-500 hover:text-hot transition-colors mt-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Promoções */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Percent className="w-5 h-5 text-cyan" />
                Promoções
              </h3>
              <button
                type="button"
                onClick={addPromotion}
                className="text-sm text-neon hover:text-white flex items-center gap-1 transition-colors"
              >
                <Plus className="w-4 h-4" /> Adicionar
              </button>
            </div>
            <p className="text-sm text-gray-400">
              Crie promoções do tipo &quot;Compre X, leve Y&quot; para incentivar vendas maiores.
            </p>

            {form.promotions.length === 0 ? (
              <div className="text-center py-6 text-gray-500 text-sm">
                Nenhuma promoção adicionada
              </div>
            ) : (
              <div className="space-y-3">
                {form.promotions.map((promo, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/5 rounded-xl p-3">
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-2">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Compre</p>
                        <input
                          type="number"
                          value={promo.buyQuantity}
                          onChange={(e) => updatePromotion(i, 'buyQuantity', e.target.value)}
                          placeholder="10"
                          className={`${inputClass} text-sm py-2`}
                          min="2"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Ganhe bônus</p>
                        <input
                          type="number"
                          value={promo.bonusQuantity}
                          onChange={(e) => updatePromotion(i, 'bonusQuantity', e.target.value)}
                          placeholder="2"
                          className={`${inputClass} text-sm py-2`}
                          min="1"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <p className="text-xs text-gray-400 mb-1">Label (opcional)</p>
                        <input
                          type="text"
                          value={promo.label}
                          onChange={(e) => updatePromotion(i, 'label', e.target.value)}
                          placeholder="Compre 10, leve 12"
                          className={`${inputClass} text-sm py-2`}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removePromotion(i)}
                      className="text-gray-500 hover:text-hot transition-colors mt-5"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Ranking */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-electric" />
                Ranking de Compradores
              </h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm text-gray-400">Ativar</span>
                <div
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    form.rankingEnabled ? 'bg-neon' : 'bg-white/10'
                  }`}
                  onClick={() => updateField('rankingEnabled', !form.rankingEnabled)}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                      form.rankingEnabled ? 'translate-x-[22px]' : 'translate-x-0.5'
                    }`}
                  />
                </div>
              </label>
            </div>
            <p className="text-sm text-gray-400">
              Mostre os maiores compradores e defina prêmios extras para o top ranking.
            </p>

            {form.rankingEnabled && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-200">Prêmios do Ranking</p>
                  <button
                    type="button"
                    onClick={addRankingPrize}
                    className="text-sm text-neon hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Adicionar
                  </button>
                </div>

                {form.rankingPrizes.length === 0 ? (
                  <div className="text-center py-4 text-gray-500 text-sm">
                    Nenhum prêmio de ranking (ranking será exibido sem prêmios extras)
                  </div>
                ) : (
                  form.rankingPrizes.map((rp, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white/5 rounded-xl p-3">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                        <Medal className={`w-5 h-5 ${i === 0 ? 'text-gold' : i === 1 ? 'text-gray-300' : 'text-amber-600'}`} />
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={rp.prize}
                          onChange={(e) => updateRankingPrize(i, 'prize', e.target.value)}
                          placeholder={`Prêmio ${i + 1}° lugar`}
                          className={`${inputClass} text-sm py-2`}
                        />
                        <input
                          type="number"
                          value={rp.prizeValue}
                          onChange={(e) => updateRankingPrize(i, 'prizeValue', e.target.value)}
                          placeholder="Valor (R$)"
                          className={`${inputClass} text-sm py-2`}
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeRankingPrize(i)}
                        className="text-gray-500 hover:text-hot transition-colors mt-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex-1 btn-ghost py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="flex-1 btn-neon py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              Próximo: Personalização
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* PASSO 4: Personalização */}
      {step === 4 && (
        <div className="glass rounded-2xl p-6 space-y-5">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Image className="w-5 h-5 text-electric" />
            Personalize sua Rifa
          </h3>
          <p className="text-sm text-gray-400">
            Adicione suas redes sociais para que os compradores conheçam mais sobre você.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Instagram className="w-5 h-5 text-pink-400" />
              </div>
              <input
                type="url"
                value={form.instagramUrl}
                onChange={(e) => updateField('instagramUrl', e.target.value)}
                placeholder="https://instagram.com/seu_perfil"
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-green-400" />
              </div>
              <input
                type="url"
                value={form.whatsappUrl}
                onChange={(e) => updateField('whatsappUrl', e.target.value)}
                placeholder="https://wa.me/5511999999999"
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Facebook className="w-5 h-5 text-blue-400" />
              </div>
              <input
                type="url"
                value={form.facebookUrl}
                onChange={(e) => updateField('facebookUrl', e.target.value)}
                placeholder="https://facebook.com/sua_pagina"
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Youtube className="w-5 h-5 text-red-400" />
              </div>
              <input
                type="url"
                value={form.youtubeUrl}
                onChange={(e) => updateField('youtubeUrl', e.target.value)}
                placeholder="https://youtube.com/@seu_canal"
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.89a8.18 8.18 0 0 0 3.76.97V6.69Z" />
                </svg>
              </div>
              <input
                type="url"
                value={form.tiktokUrl}
                onChange={(e) => updateField('tiktokUrl', e.target.value)}
                placeholder="https://tiktok.com/@seu_perfil"
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="flex-1 btn-ghost py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
            <button
              type="button"
              onClick={() => setStep(5)}
              className="flex-1 btn-neon py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              Revisar
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* PASSO 5: Revisão */}
      {step === 5 && (
        <div className="space-y-6">
          <div className="glass rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Resumo da Rifa</h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Título</p>
                <p className="font-medium text-white">{form.title || '—'}</p>
              </div>
              <div>
                <p className="text-gray-400">Prêmio</p>
                <p className="font-medium text-white">{form.prizeTitle || '—'}</p>
              </div>
              <div>
                <p className="text-gray-400">Valor do Prêmio</p>
                <p className="font-medium text-white">
                  {form.prizeValue ? formatCurrency(parseFloat(form.prizeValue)) : '—'}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Preço por Número</p>
                <p className="font-medium text-white">
                  {form.ticketPrice ? formatCurrency(parseFloat(form.ticketPrice)) : '—'}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Total de Números</p>
                <p className="font-medium text-white">{form.totalTickets || '—'}</p>
              </div>
              <div>
                <p className="text-gray-400">Receita Estimada</p>
                <p className="font-bold text-neon">{formatCurrency(netRevenue)}</p>
              </div>
            </div>

            {/* Extras summary */}
            {(form.prizeTickets.length > 0 || form.promotions.length > 0 || form.rankingEnabled) && (
              <div className="border-t border-white/10 pt-4 space-y-2">
                <h4 className="text-sm font-semibold text-white">Extras</h4>
                {form.prizeTickets.length > 0 && (
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    <Gift className="w-4 h-4 text-gold" />
                    {form.prizeTickets.length} bilhete{form.prizeTickets.length > 1 ? 's' : ''} premiado{form.prizeTickets.length > 1 ? 's' : ''}
                  </p>
                )}
                {form.promotions.length > 0 && (
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    <Percent className="w-4 h-4 text-cyan" />
                    {form.promotions.length} promoção{form.promotions.length > 1 ? 'ões' : ''}
                  </p>
                )}
                {form.rankingEnabled && (
                  <p className="text-sm text-gray-400 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-electric" />
                    Ranking ativado{form.rankingPrizes.length > 0 ? ` com ${form.rankingPrizes.length} prêmio${form.rankingPrizes.length > 1 ? 's' : ''}` : ''}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="glass rounded-xl p-4 flex items-start gap-3 border-l-2 border-gold">
            <AlertCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-white">Antes de publicar</p>
              <p className="text-gray-400 mt-1">
                Sua rifa será revisada e ficará ativa em poucos minutos. A taxa de 5% será cobrada
                apenas sobre os números efetivamente vendidos.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(4)}
              className="flex-1 btn-ghost py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
            <button
              type="submit"
              className="flex-1 btn-neon py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              Publicar Rifa
            </button>
          </div>
        </div>
      )}
    </form>
  )
}
