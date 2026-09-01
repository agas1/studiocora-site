import Link from 'next/link'
import { JsonLd } from './JsonLd'
import { siteUrl } from '@/lib/seo'

export type BreadcrumbItem = { label: string; href: string }

export function Breadcrumbs({ items, current }: { items: BreadcrumbItem[]; current: string }) {
  const allItems = [...items, { label: current, href: '' }]
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${siteUrl}${item.href}` } : {}),
    })),
  }

  return (
    <>
      <JsonLd data={schema} />
      <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-[1440px] px-6 pt-8 md:px-10">
        <ol className="flex flex-wrap items-center gap-2 text-xs text-[#0A0A0A]/55">
          {allItems.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden>/</span>}
              {item.href ? <Link href={item.href} className="rounded-sm hover:text-[#0A0A0A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6966F0]">{item.label}</Link> : <span aria-current="page">{item.label}</span>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
