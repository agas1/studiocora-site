import type { Metadata } from 'next'

const siteUrl = 'https://usestudiocora.com'

export function localizedMetadata({
  title,
  description,
  canonical,
  pt,
  en,
  xDefault,
}: {
  title: string
  description: string
  canonical: string
  pt: string
  en: string
  xDefault?: string
}): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: { 'pt-BR': pt, en, ...(xDefault ? { 'x-default': xDefault } : {}) },
    },
    openGraph: {
      type: 'website',
      siteName: 'Studio Cora',
      locale: canonical.startsWith('/en') ? 'en_US' : 'pt_BR',
      title,
      description,
      url: canonical,
      images: [{ url: `${siteUrl}/opengraph-image.png`, width: 1080, height: 1350, alt: 'Studio Cora' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [`${siteUrl}/opengraph-image.png`] },
  }
}

export { siteUrl }
