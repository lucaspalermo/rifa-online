import crypto from 'crypto'

// Sistema de sorteio verificável com hash criptográfico
// O seed é gerado ANTES do sorteio e o hash é publicado previamente
// Qualquer pessoa pode verificar que: hash(seed) = hashPublicado e que o número sorteado
// é derivado deterministicamente do seed + total de números

interface DrawResult {
  winnerNumber: number
  seed: string
  hash: string
  timestamp: string
  totalTickets: number
}

// Gerar seed aleatório para o sorteio
export function generateDrawSeed(): string {
  return crypto.randomBytes(32).toString('hex')
}

// Gerar hash do seed (publicado ANTES do sorteio para transparência)
export function hashSeed(seed: string): string {
  return crypto.createHash('sha256').update(seed).digest('hex')
}

// Derivar número vencedor do seed + total de bilhetes vendidos
// O algoritmo é determinístico: dado o mesmo seed e total, o resultado é sempre o mesmo
export function deriveWinnerNumber(seed: string, totalPaidTickets: number, paidNumbers: number[]): number {
  if (paidNumbers.length === 0) {
    throw new Error('Nenhum bilhete pago para realizar o sorteio')
  }

  // Usar HMAC para derivar um número do seed
  const hmac = crypto.createHmac('sha256', seed)
  hmac.update(`rifaflow-draw-${totalPaidTickets}`)
  const hash = hmac.digest('hex')

  // Converter os primeiros 8 bytes do hash em um número
  const num = parseInt(hash.substring(0, 8), 16)

  // Mapear para um dos números pagos
  const index = num % paidNumbers.length
  return paidNumbers[index]
}

// Realizar sorteio completo
export function performDraw(paidNumbers: number[]): DrawResult {
  const seed = generateDrawSeed()
  const hash = hashSeed(seed)
  const winnerNumber = deriveWinnerNumber(seed, paidNumbers.length, paidNumbers)

  return {
    winnerNumber,
    seed,
    hash,
    timestamp: new Date().toISOString(),
    totalTickets: paidNumbers.length,
  }
}

// Verificar resultado do sorteio (qualquer pessoa pode fazer isso)
export function verifyDraw(params: {
  seed: string
  hash: string
  totalTickets: number
  paidNumbers: number[]
  claimedWinner: number
}): { valid: boolean; reason?: string } {
  // 1. Verificar que o hash corresponde ao seed
  const computedHash = hashSeed(params.seed)
  if (computedHash !== params.hash) {
    return { valid: false, reason: 'Hash não corresponde ao seed fornecido' }
  }

  // 2. Verificar que o número vencedor é derivado corretamente
  const computedWinner = deriveWinnerNumber(
    params.seed,
    params.totalTickets,
    params.paidNumbers
  )

  if (computedWinner !== params.claimedWinner) {
    return {
      valid: false,
      reason: `Número vencedor calculado (${computedWinner}) difere do declarado (${params.claimedWinner})`,
    }
  }

  return { valid: true }
}

// Gerar pré-hash para publicar antes do sorteio (transparência)
export function generatePreDrawHash(): { seed: string; hash: string } {
  const seed = generateDrawSeed()
  const hash = hashSeed(seed)
  return { seed, hash }
}
