import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { JsonLd } from './JsonLd'
import { getBreadcrumbJsonLd } from '@/lib/seo'

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const allItems = [{ name: 'Início', url: '/' }, ...items]

  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd(allItems)} />
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
        <ol className="flex items-center gap-1 flex-wrap">
          {allItems.map((item, index) => (
            <li key={item.url} className="flex items-center gap-1">
              {index > 0 && <ChevronRight className="w-3 h-3 text-gray-600" />}
              {index === allItems.length - 1 ? (
                <span className="text-gray-300 font-medium">{item.name}</span>
              ) : (
                <Link href={item.url} className="hover:text-neon transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
