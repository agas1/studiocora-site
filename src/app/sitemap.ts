import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/pt/sobre`, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/pt/contato`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/en/studio`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/en/contact`, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
