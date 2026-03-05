import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
  { name: 'Eletrônicos', slug: 'eletronicos', description: 'Smartphones, TVs, consoles e mais', iconName: 'Smartphone', order: 1 },
  { name: 'Veículos', slug: 'veiculos', description: 'Motos, carros e outros veículos', iconName: 'Car', order: 2 },
  { name: 'Dinheiro / PIX', slug: 'dinheiro', description: 'Prêmios em dinheiro via PIX', iconName: 'DollarSign', order: 3 },
  { name: 'Casa e Decoração', slug: 'casa', description: 'Eletrodomésticos, móveis e decoração', iconName: 'Home', order: 4 },
  { name: 'Moda e Acessórios', slug: 'moda', description: 'Roupas, calçados e acessórios', iconName: 'Shirt', order: 5 },
  { name: 'Experiências', slug: 'experiencias', description: 'Viagens, jantares e ingressos', iconName: 'Plane', order: 6 },
  { name: 'Beneficente', slug: 'beneficente', description: 'Rifas com fins beneficentes', iconName: 'Heart', order: 7 },
  { name: 'Outros', slug: 'outros', description: 'Outros tipos de prêmios', iconName: 'Package', order: 8 },
]

async function main() {
  console.log('Seeding categorias...')

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    })
  }

  console.log(`${categories.length} categorias criadas.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
