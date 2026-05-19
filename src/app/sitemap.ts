import type { MetadataRoute } from 'next'

const SITE = 'https://usestudiocora.com'

const languages = {
  en: `${SITE}/`,
  'pt-BR': `${SITE}/pt`,
  es: `${SITE}/es`,
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    {
      url: `${SITE}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${SITE}/pt`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: { languages },
    },
    {
      url: `${SITE}/es`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: { languages },
    },
  ]
}
