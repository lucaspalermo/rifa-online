import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createOrFindCustomer, createPixPayment, getPixQrCode } from '@/lib/asaas'

interface RouteParams {
  params: Promise<{ id: string }>
}

// POST /api/rifas/[id]/numeros — comprar números (gera PIX via Asaas)
export async function POST(request: Request, { params }: RouteParams) {
  const { id: raffleId } = await params

  try {
    const body = await request.json()
    const { numbers, buyerName, buyerEmail, buyerPhone, buyerCpf } = body

    if (!numbers?.length || !buyerName || !buyerEmail || !buyerCpf) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: numbers, buyerName, buyerEmail, buyerCpf' },
        { status: 400 }
      )
    }

    // Buscar rifa com promoções
    const raffle = await prisma.raffle.findFirst({
      where: { OR: [{ id: raffleId }, { slug: raffleId }] },
      include: {
        promotions: { where: { active: true } },
      },
    })

    if (!raffle) {
      return NextResponse.json({ error: 'Rifa não encontrada' }, { status: 404 })
    }

    if (raffle.status !== 'active') {
      return NextResponse.json({ error: 'Esta rifa não está ativa' }, { status: 400 })
    }

    // Verificar limite por pessoa
    if (raffle.maxTicketsPerUser && numbers.length > raffle.maxTicketsPerUser) {
      return NextResponse.json(
        { error: `Máximo de ${raffle.maxTicketsPerUser} números por pessoa` },
        { status: 400 }
      )
    }

    // Verificar se números estão disponíveis
    const existingTickets = await prisma.ticket.findMany({
      where: {
        raffleId: raffle.id,
        number: { in: numbers },
        status: { in: ['paid', 'reserved'] },
      },
    })

    if (existingTickets.length > 0) {
      const taken = existingTickets.map((t) => t.number)
      return NextResponse.json(
        { error: `Números já vendidos ou reservados: ${taken.join(', ')}` },
        { status: 409 }
      )
    }

    // Calcular bônus de promoções
    let bonusNumbers: number[] = []
    if (raffle.promotions.length > 0) {
      // Aplicar a melhor promoção
      const sortedPromos = [...raffle.promotions].sort(
        (a, b) => (b.bonusQuantity / b.buyQuantity) - (a.bonusQuantity / a.buyQuantity)
      )

      for (const promo of sortedPromos) {
        if (numbers.length >= promo.buyQuantity) {
          const bonusCount = Math.floor(numbers.length / promo.buyQuantity) * promo.bonusQuantity

          if (bonusCount > 0) {
            // Buscar números disponíveis para bônus
            const allReserved = await prisma.ticket.findMany({
              where: {
                raffleId: raffle.id,
                status: { in: ['paid', 'reserved'] },
              },
              select: { number: true },
            })
            const reservedSet = new Set([...allReserved.map((t) => t.number), ...numbers])
            const available: number[] = []
            for (let n = 0; n < raffle.totalTickets; n++) {
              if (!reservedSet.has(n)) available.push(n)
            }

            // Selecionar bônus aleatoriamente
            for (let i = 0; i < Math.min(bonusCount, available.length); i++) {
              const randomIdx = Math.floor(Math.random() * available.length)
              bonusNumbers.push(available[randomIdx])
              available.splice(randomIdx, 1)
            }
            break // Aplicar apenas a melhor promoção
          }
        }
      }
    }

    const allNumbers = [...numbers, ...bonusNumbers]
    // Cobrar apenas pelos números originais (bônus são grátis)
    const totalAmount = raffle.ticketPrice * numbers.length
    const fee = totalAmount * 0.05
    const netAmount = totalAmount - fee

    // Criar ou buscar comprador
    let buyer = await prisma.user.findUnique({ where: { email: buyerEmail } })
    if (!buyer) {
      const bcrypt = await import('bcryptjs')
      buyer = await prisma.user.create({
        data: {
          name: buyerName,
          email: buyerEmail,
          phone: buyerPhone || null,
          cpf: buyerCpf,
          passwordHash: await bcrypt.hash(buyerCpf, 10), // Senha temporária = CPF
        },
      })
    }

    // Criar transação
    const transaction = await prisma.transaction.create({
      data: {
        amount: totalAmount,
        fee,
        netAmount,
        method: 'pix',
        status: 'pending',
        userId: buyer.id,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutos
      },
    })

    // Reservar bilhetes (originais + bônus)
    await prisma.ticket.createMany({
      data: allNumbers.map((num: number) => ({
        number: num,
        status: 'reserved',
        raffleId: raffle.id,
        buyerId: buyer!.id,
        transactionId: transaction.id,
        reservedAt: new Date(),
      })),
    })

    // Gerar PIX via Asaas
    let pixData = null
    try {
      const customerId = await createOrFindCustomer({
        name: buyerName,
        email: buyerEmail,
        cpfCnpj: buyerCpf.replace(/\D/g, ''),
        phone: buyerPhone,
      })

      const payment = await createPixPayment({
        customerId,
        value: totalAmount,
        description: `Rifa: ${raffle.title} - ${numbers.length} número(s)`,
        externalReference: transaction.id,
      })

      const qrCode = await getPixQrCode(payment.paymentId)

      // Atualizar transação com dados do Asaas
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: {
          externalId: payment.paymentId,
          pixQrCodeBase64: qrCode.encodedImage,
          pixCopyPaste: qrCode.payload,
        },
      })

      pixData = {
        qrCodeBase64: qrCode.encodedImage,
        copyPaste: qrCode.payload,
        expirationDate: qrCode.expirationDate,
      }
    } catch (asaasError) {
      console.error('Erro Asaas (usando fallback):', asaasError)
      // Se Asaas falhar, retornar transação sem PIX (configurar depois)
      pixData = {
        qrCodeBase64: null,
        copyPaste: null,
        message: 'Configure ASAAS_API_KEY no .env para gerar PIX automático',
      }
    }

    return NextResponse.json({
      transaction: {
        id: transaction.id,
        amount: totalAmount,
        numbers: allNumbers,
        bonusNumbers,
        expiresAt: transaction.expiresAt,
      },
      pix: pixData,
      message: bonusNumbers.length > 0
        ? `${numbers.length} número(s) + ${bonusNumbers.length} bônus reservado(s)! Pague via PIX para confirmar.`
        : `${numbers.length} número(s) reservado(s)! Pague via PIX para confirmar.`,
    }, { status: 201 })
  } catch (error) {
    console.error('Erro na compra:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
