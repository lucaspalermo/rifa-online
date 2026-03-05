import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://rifaflow.com.br'
const SITE_NAME = 'RifaFlow'

interface SeoParams {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  noIndex?: boolean
}

export function generateSeoMetadata({
  title,
  description,
  path = '',
  image = '/images/og-default.jpg',
  type = 'website',
  publishedTime,
  modifiedTime,
  noIndex = false,
}: SeoParams): Metadata {
  const url = `${SITE_URL}${path}`
  const fullTitle = path === '' ? title : `${title} | ${SITE_NAME}`

  return {
    title: fullTitle,
    description,
    ...(noIndex && { robots: { index: false, follow: false } }),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: 'pt_BR',
      images: [
        {
          url: image.startsWith('http') ? image : `${SITE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image.startsWith('http') ? image : `${SITE_URL}${image}`],
    },
  }
}

// Schema.org JSON-LD para a homepage
export function getWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Plataforma de rifas online com sorteio verificável e pagamento via PIX.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/rifas?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

// Schema.org JSON-LD para uma rifa específica
export function getRaffleJsonLd(raffle: {
  title: string
  description: string
  slug: string
  prizeValue: number
  ticketPrice: number
  totalTickets: number
  prizeImageUrl?: string | null
  startDate?: string | null
  endDate?: string | null
  creator: { name: string }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: raffle.title,
    description: raffle.description,
    url: `${SITE_URL}/rifa/${raffle.slug}`,
    ...(raffle.prizeImageUrl && { image: raffle.prizeImageUrl }),
    ...(raffle.startDate && { startDate: raffle.startDate }),
    ...(raffle.endDate && { endDate: raffle.endDate }),
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: {
      '@type': 'VirtualLocation',
      url: `${SITE_URL}/rifa/${raffle.slug}`,
    },
    organizer: {
      '@type': 'Person',
      name: raffle.creator.name,
    },
    offers: {
      '@type': 'Offer',
      price: raffle.ticketPrice,
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      validFrom: raffle.startDate || undefined,
    },
  }
}

// Schema.org JSON-LD para artigos do blog
export function getBlogPostJsonLd(post: {
  title: string
  excerpt: string
  slug: string
  coverImageUrl?: string | null
  publishedAt: string
  updatedAt?: string
  author: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    ...(post.coverImageUrl && { image: post.coverImageUrl }),
    datePublished: post.publishedAt,
    ...(post.updatedAt && { dateModified: post.updatedAt }),
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

// Schema.org JSON-LD para FAQ (ótimo para SEO)
export function getFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Schema.org para Organization (rodapé global)
export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Plataforma líder de rifas online no Brasil com sorteio criptograficamente verificável e pagamento via PIX.',
    foundingDate: '2025',
    email: 'contato@rifaflow.com.br',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contato@rifaflow.com.br',
      contactType: 'customer service',
      availableLanguage: 'Portuguese',
    },
  }
}

// Schema.org para breadcrumbs
export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}
