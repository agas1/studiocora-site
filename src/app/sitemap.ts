import type { MetadataRoute } from 'next'
import { getProjects } from '@/content/projects'
import { siteUrl } from '@/lib/seo'
import { getBlogArticles } from '@/sanity/lib/articles'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    { path: '/', priority: 1 },
    { path: '/pt', priority: 1 },
    { path: '/pt/sobre', priority: 0.8 },
    { path: '/pt/portfolio', priority: 0.7 },
    { path: '/pt/blog', priority: 0.7 },
    { path: '/pt/contato', priority: 0.9 },
    { path: '/en', priority: 0.8 },
    { path: '/en/studio', priority: 0.6 },
    { path: '/en/work', priority: 0.5 },
    { path: '/en/insights', priority: 0.5 },
    { path: '/en/contact', priority: 0.7 },
  ]

  const projectRoutes = [
    ...getProjects('pt').map((project) => `/pt/portfolio/${project.slug}`),
    ...getProjects('en').map((project) => `/en/work/${project.slug}`),
  ]
  const [ptArticles, enArticles] = await Promise.all([getBlogArticles('pt'), getBlogArticles('en')])
  const articleRoutes = [
    ...ptArticles.map((article) => `/pt/blog/${article.slug}`),
    ...enArticles.map((article) => `/en/insights/${article.slug}`),
  ]

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: 'monthly' as const,
      priority,
    })),
    ...projectRoutes.map((path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...articleRoutes.map((path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
