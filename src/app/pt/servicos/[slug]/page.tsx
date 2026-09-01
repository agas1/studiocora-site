import { notFound } from 'next/navigation'
import { getService, getServices } from '@/content/pages'
import { ServicePage } from '@/components/pages/ServicePage'
import { localizedMetadata } from '@/lib/seo'

export function generateStaticParams() { return getServices('pt').map(({ slug }) => ({ slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getService('pt', slug)
  if (!service) return {}
  return localizedMetadata({ title: service.seoTitle, description: service.seoDescription, canonical: `/pt/servicos/${service.slug}`, pt: `/pt/servicos/${service.slug}`, en: `/en/services/${service.alternateSlug}` })
}

export default async function PortugueseService({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService('pt', (await params).slug)
  if (!service) notFound()
  return <ServicePage locale="pt" service={service} />
}
