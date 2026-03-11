// Integração com Asaas para pagamento PIX
// Docs: https://docs.asaas.com/reference

let _cachedKey: string | null = null

function getAsaasApiKey(): string {
  if (_cachedKey !== null) return _cachedKey
  // Ler de arquivo separado (evita problema com $ no dotenv do Next.js)
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('fs')
    _cachedKey = fs.readFileSync('/var/www/rifa-online/.asaas-key', 'utf8').trim()
  } catch {
    _cachedKey = process.env.ASAAS_API_KEY || ''
  }
  return _cachedKey
}

const ASAAS_BASE_URL = process.env.ASAAS_SANDBOX === 'true'
  ? 'https://sandbox.asaas.com/api/v3'
  : 'https://www.asaas.com/api/v3'

interface AsaasCustomer {
  name: string
  email?: string
  cpfCnpj: string
  phone?: string
}

interface AsaasPixPayment {
  customer: string // ID do customer no Asaas
  billingType: 'PIX'
  value: number
  dueDate: string
  description?: string
  externalReference?: string // Nosso ID interno (transactionId)
}

interface AsaasPixQrCode {
  encodedImage: string // Base64 da imagem QR
  payload: string // Código copia-e-cola
  expirationDate: string
}

async function asaasFetch(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${ASAAS_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'access_token': getAsaasApiKey(),
      ...options.headers,
    },
  })

  const text = await response.text()
  let data
  try {
    data = text ? JSON.parse(text) : {}
  } catch {
    console.error('Asaas response not JSON:', response.status, text.substring(0, 200))
    throw new Error(`Asaas retornou resposta inválida (HTTP ${response.status})`)
  }

  if (!response.ok) {
    console.error('Asaas API error:', response.status, data)
    throw new Error(data.errors?.[0]?.description || `Erro na API do Asaas (HTTP ${response.status})`)
  }

  return data
}

// Criar ou buscar cliente no Asaas
export async function createOrFindCustomer(customer: AsaasCustomer): Promise<string> {
  // Buscar por CPF/CNPJ
  const existing = await asaasFetch(`/customers?cpfCnpj=${customer.cpfCnpj}`)
  if (existing.data?.length > 0) {
    return existing.data[0].id
  }

  // Criar novo
  const created = await asaasFetch('/customers', {
    method: 'POST',
    body: JSON.stringify(customer),
  })

  return created.id
}

// Criar cobrança PIX
export async function createPixPayment(params: {
  customerId: string
  value: number
  description: string
  externalReference: string
}): Promise<{ paymentId: string; dueDate: string }> {
  const today = new Date()
  const dueDate = new Date(today.getTime() + 30 * 60 * 1000) // 30 minutos

  const payment = await asaasFetch('/payments', {
    method: 'POST',
    body: JSON.stringify({
      customer: params.customerId,
      billingType: 'PIX',
      value: params.value,
      dueDate: dueDate.toISOString().split('T')[0],
      description: params.description,
      externalReference: params.externalReference,
    } satisfies AsaasPixPayment),
  })

  return {
    paymentId: payment.id,
    dueDate: payment.dueDate,
  }
}

// Obter QR Code PIX de uma cobrança
export async function getPixQrCode(paymentId: string): Promise<AsaasPixQrCode> {
  const qrCode = await asaasFetch(`/payments/${paymentId}/pixQrCode`)
  return {
    encodedImage: qrCode.encodedImage,
    payload: qrCode.payload,
    expirationDate: qrCode.expirationDate,
  }
}

// Verificar status de um pagamento
export async function getPaymentStatus(paymentId: string): Promise<string> {
  const payment = await asaasFetch(`/payments/${paymentId}`)
  return payment.status // PENDING, RECEIVED, CONFIRMED, OVERDUE, REFUNDED, etc.
}

// Estornar pagamento
export async function refundPayment(paymentId: string): Promise<void> {
  await asaasFetch(`/payments/${paymentId}/refund`, {
    method: 'POST',
  })
}

// Validar webhook do Asaas
export function isValidAsaasWebhook(token: string): boolean {
  const webhookToken = process.env.ASAAS_WEBHOOK_TOKEN || ''
  return token === webhookToken
}
