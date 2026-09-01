import { notFound } from 'next/navigation'
import { getService, getServices } from '@/content/pages'
import { ServicePage } from '@/components/pages/ServicePage'
import { localizedMetadata } from '@/lib/seo'

export function generateStaticParams() { return getServices('en').map(({ slug }) => ({ slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getService('en', slug)
  if (!service) return {}
  return localizedMetadata({ title: service.seoTitle, description: service.seoDescription, canonical: `/en/services/${service.slug}`, pt: `/pt/servicos/${service.alternateSlug}`, en: `/en/services/${service.slug}` })
}

export default async function EnglishService({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService('en', (await params).slug)
  if (!service) notFound()
  return <ServicePage locale="en" service={service} />
}
