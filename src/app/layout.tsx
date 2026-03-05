import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { JsonLd } from '@/components/seo/JsonLd'
import { getOrganizationJsonLd } from '@/lib/seo'
import { GoogleAnalytics } from '@/components/layout/GoogleAnalytics'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://rifaflow.com.br'),
  title: {
    default: 'RifaFlow - Crie Sua Rifa Online Grátis | Sorteio Seguro e Transparente',
    template: '%s | RifaFlow',
  },
  description:
    'Crie sua rifa online grátis com sorteio verificável e transparente. Pagamento via PIX instantâneo, painel completo e compartilhamento fácil. A plataforma #1 de rifas do Brasil.',
  keywords: [
    'rifa online',
    'criar rifa',
    'rifa digital',
    'plataforma de rifas',
    'sorteio online',
    'rifa online grátis',
    'como fazer rifa',
    'rifa com pix',
    'rifa segura',
    'sorteio transparente',
    'rifa online confiável',
    'criar rifa online grátis',
  ],
  authors: [{ name: 'RifaFlow' }],
  creator: 'RifaFlow',
  publisher: 'RifaFlow',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: 'RifaFlow',
    title: 'RifaFlow - Crie Sua Rifa Online Grátis',
    description: 'Plataforma de rifas online com sorteio verificável e pagamento via PIX instantâneo.',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RifaFlow - Crie Sua Rifa Online Grátis',
    description: 'Plataforma de rifas online com sorteio verificável e pagamento via PIX instantâneo.',
  },
  verification: {
    google: '', // Adicionar ID do Google Search Console
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-bg">
        <GoogleAnalytics />
        <JsonLd data={getOrganizationJsonLd()} />
        <Header />
        <main className="flex-1 relative">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
