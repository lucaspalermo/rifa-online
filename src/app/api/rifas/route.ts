import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'
import { slugify } from '@/lib/utils'
import { v4 as uuidv4 } from 'uuid'

// GET /api/rifas — listar rifas ativas (público)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const sort = searchParams.get('sort') || 'recent' // recent | popular | ending

  const where: Record<string, unknown> = { status: 'active' }
  if (category) where.category = { slug: category }
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { prizeTitle: { contains: search } },
    ]
  }

  const orderBy: Record<string, string> = {}
  if (sort === 'recent') orderBy.createdAt = 'desc'
  else if (sort === 'ending') orderBy.endDate = 'asc'
  else orderBy.createdAt = 'desc'

  const [raffles, total] = await Promise.all([
    prisma.raffle.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        slug: true,
        title: true,
        prizeTitle: true,
        prizeValue: true,
        ticketPrice: true,
        totalTickets: true,
        status: true,
        featured: true,
        endDate: true,
        createdAt: true,
        creator: { select: { name: true, verified: true } },
        category: { select: { name: true, slug: true } },
        images: { select: { url: true, alt: true }, orderBy: { order: 'asc' }, take: 1 },
        _count: { select: { tickets: { where: { status: 'paid' } } } },
      },
    }),
    prisma.raffle.count({ where }),
  ])

  const data = raffles.map((r) => ({
    ...r,
    soldTickets: r._count.tickets,
    prizeImageUrl: r.images[0]?.url || null,
    _count: undefined,
    images: undefined,
  }))

  return NextResponse.json({
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  })
}

// POST /api/rifas — criar nova rifa (autenticado)
export async function POST(request: Request) {
  const user = await getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const {
      title,
      description,
      prizeTitle,
      prizeDescription,
      prizeValue,
      ticketPrice,
      totalTickets,
      maxTicketsPerUser,
      endDate,
      rules,
      categoryId,
      // Personalização
      instagramUrl,
      whatsappUrl,
      facebookUrl,
      youtubeUrl,
      tiktokUrl,
      // Extras
      rankingEnabled,
      prizeTickets,
      promotions,
      rankingPrizes,
    } = body

    if (!title || !prizeTitle || !prizeValue || !ticketPrice || !totalTickets) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: title, prizeTitle, prizeValue, ticketPrice, totalTickets' },
        { status: 400 }
      )
    }

    // Gerar slug único
    let slug = slugify(title)
    const existingSlug = await prisma.raffle.findUnique({ where: { slug } })
    if (existingSlug) {
      slug = `${slug}-${uuidv4().slice(0, 6)}`
    }

    const raffle = await prisma.raffle.create({
      data: {
        slug,
        title,
        description: description || '',
        prizeTitle,
        prizeDescription: prizeDescription || null,
        prizeValue: parseFloat(prizeValue),
        ticketPrice: parseFloat(ticketPrice),
        totalTickets: parseInt(totalTickets),
        maxTicketsPerUser: maxTicketsPerUser ? parseInt(maxTicketsPerUser) : null,
        endDate: endDate ? new Date(endDate) : null,
        drawDate: endDate ? new Date(endDate) : null,
        rules: rules || null,
        categoryId: categoryId || null,
        creatorId: user.id,
        status: 'active',
        metaTitle: `${title} | RifaFlow`,
        metaDescription: `Concorra a ${prizeTitle} por apenas R$ ${ticketPrice}. Sorteio verificável e pagamento via PIX.`,
        // Personalização
        instagramUrl: instagramUrl || null,
        whatsappUrl: whatsappUrl || null,
        facebookUrl: facebookUrl || null,
        youtubeUrl: youtubeUrl || null,
        tiktokUrl: tiktokUrl || null,
        // Ranking
        rankingEnabled: rankingEnabled || false,
        // Relações
        ...(prizeTickets?.length > 0 && {
          prizeTickets: {
            create: prizeTickets.map((pt: { number: number; prize: string; prizeValue?: number }) => ({
              number: parseInt(String(pt.number)),
              prize: pt.prize,
              prizeValue: pt.prizeValue ? parseFloat(String(pt.prizeValue)) : 0,
            })),
          },
        }),
        ...(promotions?.length > 0 && {
          promotions: {
            create: promotions.map((p: { buyQuantity: number; bonusQuantity: number; label?: string }) => ({
              buyQuantity: parseInt(String(p.buyQuantity)),
              bonusQuantity: parseInt(String(p.bonusQuantity)),
              label: p.label || null,
            })),
          },
        }),
        ...(rankingPrizes?.length > 0 && {
          rankingPrizes: {
            create: rankingPrizes.map((rp: { position: number; prize: string; prizeValue?: number }) => ({
              position: parseInt(String(rp.position)),
              prize: rp.prize,
              prizeValue: rp.prizeValue ? parseFloat(String(rp.prizeValue)) : 0,
            })),
          },
        }),
      },
    })

    return NextResponse.json({ raffle, message: 'Rifa criada com sucesso!' }, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar rifa:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
