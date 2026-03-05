import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, Zap } from 'lucide-react'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { JsonLd } from '@/components/seo/JsonLd'
import { getBlogPostJsonLd } from '@/lib/seo'

const blogPosts: Record<string, {
  title: string
  metaDescription: string
  excerpt: string
  content: string
  category: string
  readTime: string
  date: string
  author: string
}> = {
  'como-criar-rifa-online': {
    title: 'Como Criar uma Rifa Online: Guia Completo 2026',
    metaDescription:
      'Aprenda como criar uma rifa online grátis passo a passo. Guia completo com dicas de precificação, divulgação e sorteio transparente.',
    excerpt:
      'Passo a passo detalhado para criar sua primeira rifa online com sucesso.',
    content: `
## O que é uma rifa online?

Uma rifa online é uma forma de arrecadação onde os participantes compram números (bilhetes) para concorrer a um prêmio. O sorteio define o ganhador de forma aleatória e transparente.

Com plataformas como o **RifaFlow**, todo o processo é digitalizado: criação, pagamento, gestão e sorteio — tudo online e automatizado.

## Passo 1: Escolha o prêmio ideal

O sucesso da sua rifa começa pela escolha do prêmio. Os prêmios que mais vendem são:

- **Smartphones** (iPhone, Samsung Galaxy)
- **Dinheiro via PIX** (R$ 500, R$ 1.000, R$ 5.000)
- **Motos** (Honda CG, Biz)
- **Eletrônicos** (PlayStation, TV Smart)
- **Experiências** (viagens, jantares)

**Dica:** Prêmios em dinheiro tendem a vender mais rápido pois agradam a todos.

## Passo 2: Defina preço e quantidade

A precificação é crucial. Siga esta fórmula:

**Valor total dos bilhetes = Valor do prêmio × 2 a 3**

Exemplo: Prêmio de R$ 1.000
- 200 números a R$ 10 cada = R$ 2.000 arrecadados
- 500 números a R$ 5 cada = R$ 2.500 arrecadados

**Dicas de precificação:**
- Preços baixos (R$ 1–5) vendem mais rápido mas precisam de mais números
- Preços altos (R$ 20–50) vendem mais devagar mas precisam de menos números
- O ponto ideal geralmente é entre R$ 5 e R$ 15

## Passo 3: Crie sua rifa no RifaFlow

1. Acesse o RifaFlow e clique em "Criar Rifa"
2. Preencha o título e descrição do prêmio
3. Faça upload de fotos de alta qualidade
4. Defina preço e quantidade de números
5. Escolha a data do sorteio
6. Publique!

## Passo 4: Divulgue sua rifa

A divulgação é o que faz sua rifa vender. Use estas estratégias:

- **WhatsApp:** Compartilhe em grupos e envie para contatos
- **Instagram:** Poste stories e reels mostrando o prêmio
- **Facebook:** Publique em grupos relacionados
- **Google:** Sua página no RifaFlow já é otimizada para aparecer nas buscas

## Passo 5: Acompanhe e sorteie

No painel do RifaFlow você acompanha:
- Números vendidos em tempo real
- Pagamentos confirmados
- Dados dos compradores

Na data marcada, o **sorteio é feito automaticamente** com hash criptográfico verificável — impossível de manipular.

## Conclusão

Criar uma rifa online nunca foi tão fácil. Com o RifaFlow, você tem todas as ferramentas necessárias para arrecadar de forma segura e transparente.

**Crie sua primeira rifa grátis agora!**
    `.trim(),
    category: 'Guia',
    readTime: '8 min',
    date: '2026-03-01',
    author: 'Equipe RifaFlow',
  },
  'rifa-e-legal': {
    title: 'Rifa Online é Legal no Brasil? Entenda a Legislação',
    metaDescription:
      'Descubra se rifa online é legal no Brasil. Entenda a legislação, limites legais e como organizar sua rifa de forma segura.',
    excerpt: 'O que diz a lei brasileira sobre rifas online.',
    content: `
## A legislação brasileira sobre rifas

A questão da legalidade de rifas no Brasil é frequente e importante. Vamos esclarecer de forma objetiva.

## O que diz a lei?

No Brasil, as **loterias são regulamentadas pela Lei nº 13.756/2018** e pelo Decreto-Lei nº 204/1967. Oficialmente, apenas a Caixa Econômica Federal e entidades autorizadas podem realizar loterias.

No entanto, **rifas entre particulares** para fins de arrecadação pessoal, beneficente ou comunitária são uma prática culturalmente aceita e amplamente praticada no Brasil.

## Rifas beneficentes

Rifas com **finalidade beneficente** podem ser autorizadas por entidades como:
- Igrejas e organizações religiosas
- ONGs e associações
- Escolas e universidades

Nestes casos, geralmente há respaldo legal quando os recursos são destinados a causas sociais.

## Rifas entre particulares

Rifas organizadas por pessoas físicas para arrecadação própria (como para comprar um bem, pagar um tratamento médico, etc.) existem em uma **zona cinzenta** da legislação.

Na prática:
- São extremamente comuns em todo o Brasil
- Não há casos significativos de perseguição legal
- Plataformas digitais facilitam a organização

## Como se proteger

1. **Seja transparente** — descreva claramente o prêmio e as regras
2. **Cumpra o prometido** — entregue o prêmio ao ganhador
3. **Use sorteio verificável** — plataformas como o RifaFlow geram hash criptográfico
4. **Mantenha registros** — guarde comprovantes de entrega e pagamento

## O papel do RifaFlow

O RifaFlow é uma **plataforma de tecnologia** que facilita a organização de rifas. Não somos uma loteria e não operamos jogos de azar. Fornecemos ferramentas para que organizadores conduzam suas rifas com transparência e segurança.

## Conclusão

Rifas online são uma realidade no Brasil e, quando organizadas com transparência, representam uma forma legítima de arrecadação. Use sempre plataformas confiáveis e mantenha a transparência com os participantes.
    `.trim(),
    category: 'Legislação',
    readTime: '6 min',
    date: '2026-02-28',
    author: 'Equipe RifaFlow',
  },
  'melhores-premios-rifa': {
    title: 'Os Melhores Prêmios Para Rifa Online em 2026',
    metaDescription:
      'Descubra quais prêmios mais vendem em rifas online em 2026. Análise de eletrônicos, motos, dinheiro PIX e experiências.',
    excerpt: 'Descubra quais prêmios mais vendem em rifas online.',
    content: `
## Os prêmios que mais vendem

A escolha do prêmio é o fator #1 de sucesso de uma rifa. Veja as categorias que mais vendem no Brasil em 2026.

## 1. Dinheiro via PIX

Prêmios em dinheiro são os mais populares. Valores como R$ 500, R$ 1.000 e R$ 5.000 agradam a todos e vendem muito rápido.

## 2. Smartphones

iPhone e Samsung Galaxy lideram. O iPhone 15 Pro Max é o campeão absoluto em rifas online.

## 3. Motos

Honda CG 160, Biz e Pop 110 são os modelos mais rifados. Motos são prêmios aspiracionais que geram engajamento.

## 4. Consoles e Games

PlayStation 5 e Xbox Series X são prêmios muito desejados pelo público jovem.

## 5. Experiências

Viagens, jantares premium e ingressos para shows estão em alta. Geram conteúdo para redes sociais.

## Dica final

Combine prêmios desejáveis com preços acessíveis (R$ 5 a R$ 15) para maximizar vendas.
    `.trim(),
    category: 'Dicas',
    readTime: '7 min',
    date: '2026-02-20',
    author: 'Equipe RifaFlow',
  },
  'como-divulgar-rifa-online': {
    title: 'Como Divulgar Sua Rifa Online: Guia de Marketing',
    metaDescription:
      'Aprenda a divulgar sua rifa online usando WhatsApp, Instagram, Facebook e Google. Estratégias testadas para vender mais.',
    excerpt: 'Estratégias de marketing para divulgar sua rifa e vender mais.',
    content: `
## A divulgação é tudo

Ter uma rifa com um bom prêmio não basta — você precisa que as pessoas saibam dela.

## WhatsApp: O canal #1

Responsável por mais de 60% das vendas. Envie mensagens personalizadas, compartilhe em grupos relevantes e atualize sobre o progresso.

## Instagram: Visual é tudo

Poste fotos e vídeos do prêmio, use stories com enquetes e contagens regressivas, faça reels e use hashtags como #rifa #sorteio #concorra.

## Facebook: Grupos são ouro

Publique em grupos de compra e venda da sua cidade. Existem grupos específicos de rifas em muitas regiões.

## Google: SEO automático

Com o RifaFlow, cada rifa tem página otimizada para Google. Pessoas encontram sua rifa pesquisando "rifa iPhone" ou "rifa moto".

## Dica bônus: Consistência

Poste atualizações diárias mostrando quantos números faltam. Isso cria urgência e mantém o engajamento.
    `.trim(),
    category: 'Marketing',
    readTime: '9 min',
    date: '2026-02-15',
    author: 'Equipe RifaFlow',
  },
  'sorteio-transparente-blockchain': {
    title: 'Como Funciona o Sorteio Verificável com Criptografia',
    metaDescription:
      'Entenda como o RifaFlow usa hash SHA-256 para garantir sorteios justos e verificáveis. Transparência total.',
    excerpt: 'Entenda a tecnologia por trás do sorteio verificável.',
    content: `
## O problema dos sorteios tradicionais

Em sorteios tradicionais, não há como provar que o resultado não foi manipulado. Isso gera desconfiança.

## A solução: Hash criptográfico

O RifaFlow usa a mesma tecnologia de bancos e criptomoedas para garantir a integridade dos sorteios.

## Como funciona

1. Antes do sorteio: Geramos um seed aleatório e calculamos seu hash SHA-256
2. Publicação: O hash é publicado ANTES do sorteio
3. Sorteio: O seed é usado para gerar o número vencedor
4. Verificação: Qualquer pessoa pode verificar que o hash corresponde ao seed

## Por que é impossível fraudar?

O SHA-256 é uma função de mão única. É matematicamente impossível descobrir o seed a partir do hash. Ninguém — nem o organizador, nem o RifaFlow — pode manipular o resultado.

## Verificação pública

Após o sorteio, publicamos o seed original e o cálculo completo. Qualquer pessoa pode verificar usando ferramentas online de SHA-256.
    `.trim(),
    category: 'Tecnologia',
    readTime: '5 min',
    date: '2026-02-10',
    author: 'Equipe RifaFlow',
  },
  'dicas-vender-rifa': {
    title: '15 Dicas Infalíveis Para Vender Sua Rifa Online Rápido',
    metaDescription:
      'Confira 15 dicas testadas para vender todos os números da sua rifa online rapidamente. Estratégias de preço, divulgação e conversão.',
    excerpt: 'Estratégias testadas para vender todos os números rapidamente.',
    content: `
## 1. Escolha um prêmio desejável

O prêmio é o principal atrativo. Escolha algo que as pessoas realmente queiram: dinheiro, smartphones, motos ou experiências.

## 2. Precifique corretamente

Números muito caros afastam compradores. O preço ideal fica entre R$ 5 e R$ 15 para a maioria das rifas.

## 3. Use fotos de alta qualidade

Fotos boas aumentam a confiança e o desejo. Tire fotos reais do prêmio com boa iluminação.

## 4. Escreva uma descrição convincente

Descreva o prêmio em detalhes, inclua especificações e destaque o valor de mercado.

## 5. Defina uma data de sorteio próxima

Rifas com prazo curto (7-15 dias) vendem mais rápido por criar urgência.

## 6. Compartilhe no WhatsApp

WhatsApp é o canal #1 de vendas de rifas. Envie para grupos e contatos com uma mensagem personalizada.

## 7. Poste nos stories do Instagram

Faça stories mostrando o prêmio, compartilhe o progresso das vendas e crie enquetes interativas.

## 8. Ofereça desconto para compras múltiplas

"Compre 3 números e ganhe 1 grátis" — promoções assim aumentam o ticket médio.

## 9. Mostre o progresso das vendas

Quando as pessoas veem que a rifa está vendendo, sentem urgência para comprar antes que acabe.

## 10. Peça para amigos compartilharem

Seus amigos e familiares são seus primeiros divulgadores. Peça que compartilhem com seus contatos.

## 11. Use depoimentos

Se já fez rifas antes, mostre depoimentos de ganhadores anteriores para gerar confiança.

## 12. Publique em grupos do Facebook

Existem grupos específicos de rifas em praticamente todas as cidades.

## 13. Faça lives

Lives mostrando o prêmio e explicando como participar geram muito engajamento.

## 14. Crie urgência

"Últimos 50 números!" ou "Sorteio em 3 dias!" — frases de urgência motivam a compra.

## 15. Use uma plataforma confiável

Usar o RifaFlow transmite segurança: sorteio verificável, pagamento seguro e página profissional.

## Bônus: Fórmula de sucesso

**Prêmio desejável + Preço acessível + Divulgação constante + Plataforma confiável = Rifa vendida!**
    `.trim(),
    category: 'Estratégia',
    readTime: '10 min',
    date: '2026-02-25',
    author: 'Equipe RifaFlow',
  },
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts[slug]
  if (!post) return { title: 'Artigo não encontrado' }

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }))
}

const categoryColors: Record<string, string> = {
  Guia: 'bg-neon/10 text-neon',
  Legislação: 'bg-electric/10 text-electric',
  Estratégia: 'bg-gold/10 text-gold',
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = blogPosts[slug]
  if (!post) notFound()

  return (
    <>
      <JsonLd
        data={getBlogPostJsonLd({
          title: post.title,
          excerpt: post.excerpt,
          slug,
          publishedAt: post.date,
          author: post.author,
        })}
      />

      <div className="mesh-bg min-h-screen">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb
            items={[
              { name: 'Blog', url: '/blog' },
              { name: post.title, url: `/blog/${slug}` },
            ]}
          />

          <header className="mt-8 mb-10">
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
              <span className={`font-medium px-2.5 py-0.5 rounded-full ${categoryColors[post.category] || 'bg-white/10 text-gray-300'}`}>
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.date).toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime} de leitura
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              {post.title}
            </h1>

            <p className="mt-4 text-lg text-gray-300">{post.excerpt}</p>
          </header>

          {/* Conteúdo */}
          <div className="prose prose-invert prose-lg max-w-none">
            {post.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) {
                return <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">{line.replace('## ', '')}</h2>
              }
              if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} className="font-bold text-neon my-2">{line.replace(/\*\*/g, '')}</p>
              }
              if (line.startsWith('- ')) {
                return (
                  <li key={i} className="text-gray-300 ml-4 my-1">
                    {line.replace('- ', '')}
                  </li>
                )
              }
              if (line.trim() === '') return <br key={i} />
              return <p key={i} className="text-gray-300 leading-relaxed my-3">{line}</p>
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 glass-neon rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white">Pronto para criar sua rifa?</h3>
            <p className="mt-2 text-gray-300">
              Comece agora mesmo. É grátis e leva menos de 5 minutos.
            </p>
            <Link
              href="/criar-rifa"
              className="mt-4 inline-flex items-center gap-2 btn-neon px-6 py-3 rounded-xl font-semibold"
            >
              <Zap className="w-4 h-4" />
              Criar Minha Rifa Grátis
            </Link>
          </div>

          {/* Navegação */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-neon hover:text-white font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para o Blog
            </Link>
          </div>
        </article>
      </div>
    </>
  )
}
