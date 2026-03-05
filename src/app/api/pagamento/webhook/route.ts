import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/pagamento/webhook — webhook do Asaas para confirmar pagamentos
export async function POST(request: Request) {
  try {
    // Verificar token do webhook
    const webhookToken = process.env.ASAAS_WEBHOOK_TOKEN
    const receivedToken = request.headers.get('asaas-access-token')

    if (webhookToken && receivedToken !== webhookToken) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    const body = await request.json()
    const { event, payment } = body

    console.log(`[Webhook Asaas] Evento: ${event}, Payment: ${payment?.id}`)

    if (!payment?.externalReference) {
      return NextResponse.json({ received: true })
    }

    const transactionId = payment.externalReference

    // Idempotência: verificar se já foi processado
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      select: { status: true },
    })

    if (!existingTransaction) {
      console.log(`[Webhook] Transação não encontrada: ${transactionId}`)
      return NextResponse.json({ received: true })
    }

    switch (event) {
      // Pagamento confirmado
      case 'PAYMENT_CONFIRMED':
      case 'PAYMENT_RECEIVED': {
        // Idempotência: ignorar se já aprovado
        if (existingTransaction.status === 'approved') {
          console.log(`[Webhook] Pagamento já processado: ${transactionId}`)
          break
        }

        // Atualizar transação
        await prisma.transaction.update({
          where: { id: transactionId },
          data: { status: 'approved' },
        })

        // Confirmar bilhetes
        await prisma.ticket.updateMany({
          where: {
            transactionId,
            status: 'reserved',
          },
          data: {
            status: 'paid',
            paidAt: new Date(),
          },
        })

        // Verificar bilhetes premiados
        const paidTickets = await prisma.ticket.findMany({
          where: { transactionId, status: 'paid' },
          select: { number: true, raffleId: true },
        })

        if (paidTickets.length > 0) {
          const raffleId = paidTickets[0].raffleId
          const ticketNumbers = paidTickets.map((t) => t.number)

          const prizeTicketsWon = await prisma.prizeTicket.findMany({
            where: {
              raffleId,
              number: { in: ticketNumbers },
              claimed: false,
            },
          })

          if (prizeTicketsWon.length > 0) {
            await prisma.prizeTicket.updateMany({
              where: {
                id: { in: prizeTicketsWon.map((pt) => pt.id) },
              },
              data: { claimed: true },
            })
            console.log(`[Webhook] ${prizeTicketsWon.length} bilhete(s) premiado(s) revelado(s)!`)
          }
        }

        console.log(`[Webhook] Pagamento confirmado: ${transactionId}`)
        break
      }

      // Pagamento estornado
      case 'PAYMENT_REFUNDED': {
        await prisma.transaction.update({
          where: { id: transactionId },
          data: { status: 'refunded' },
        })

        // Liberar bilhetes
        await prisma.ticket.deleteMany({
          where: { transactionId },
        })

        console.log(`[Webhook] Pagamento estornado: ${transactionId}`)
        break
      }

      // Pagamento expirado/cancelado
      case 'PAYMENT_OVERDUE':
      case 'PAYMENT_DELETED': {
        await prisma.transaction.update({
          where: { id: transactionId },
          data: { status: 'expired' },
        })

        // Liberar bilhetes reservados
        await prisma.ticket.deleteMany({
          where: {
            transactionId,
            status: 'reserved',
          },
        })

        console.log(`[Webhook] Pagamento expirado: ${transactionId}`)
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[Webhook] Erro:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
