import { draftMode } from 'next/headers'
import type { Locale } from '@/content'
import type { Article, PortableTextImage } from '@/content/articles'
import type { PortableTextBlock } from '@portabletext/types'
import { getArticle, getArticles } from '@/content/articles'
import { sanityClient } from './client'

type CmsArticle = {
  _id: string
  slug: string
  alternateSlug?: string
  title: string
  seoTitle: string
  seoDescription: string
  description: string
  category: string
  publishedAt: string
  author?: string
  coverImage?: string
  coverImageAlt?: string
  body?: Array<PortableTextBlock | PortableTextImage>
  relatedServices?: string[]
  relatedArticles?: string[]
}

const articleFields = `
  _id,
  "slug": slug.current,
  "alternateSlug": translation->slug.current,
  title,
  seoTitle,
  seoDescription,
  description,
  category,
  publishedAt,
  author,
  "coverImage": coverImage.asset->url,
  "coverImageAlt": coverImage.alt,
  "body": body[]{
    ...,
    _type == "contentImage" => {
      "url": asset->url,
      alt,
      caption
    }
  },
  relatedServices,
  "relatedArticles": relatedArticles[]->slug.current
`

const articlesQuery = `*[_type == "article" && locale == $locale && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) {${articleFields}}`
const articleQuery = `*[_type == "article" && locale == $locale && slug.current == $slug && defined(publishedAt)][0] {${articleFields}}`

function normalize(article: CmsArticle): Article {
  return {
    slug: article.slug,
    alternateSlug: article.alternateSlug ?? article.slug,
    title: article.title,
    seoTitle: article.seoTitle,
    seoDescription: article.seoDescription,
    description: article.description,
    category: article.category,
    date: article.publishedAt.slice(0, 10),
    author: article.author ?? 'Studio Cora',
    coverImage: article.coverImage,
    coverImageAlt: article.coverImageAlt,
    body: article.body,
    intro: [],
    sections: [],
    relatedServices: article.relatedServices ?? [],
    relatedArticles: article.relatedArticles ?? [],
  }
}

export async function getCmsArticles(locale: Locale): Promise<Article[]> {
  if (!sanityClient) return []

  try {
    const preview = (await draftMode()).isEnabled
    const client = preview
      ? sanityClient.withConfig({ token: process.env.SANITY_API_READ_TOKEN, perspective: 'drafts', useCdn: false })
      : sanityClient
    const articles = await client.fetch<CmsArticle[]>(articlesQuery, { locale }, preview ? { cache: 'no-store' } : { next: { revalidate: 60, tags: ['articles', `articles-${locale}`] } })
    return articles.map(normalize)
  } catch (error) {
    console.error('Unable to load articles from Sanity.', error)
    return []
  }
}

export async function getBlogArticles(locale: Locale): Promise<Article[]> {
  const managedArticles = await getCmsArticles(locale)
  const articlesBySlug = new Map(getArticles(locale).map((article) => [article.slug, article]))
  managedArticles.forEach((article) => articlesBySlug.set(article.slug, article))
  return [...articlesBySlug.values()].sort((a, b) => b.date.localeCompare(a.date))
}

export async function getBlogArticle(locale: Locale, slug: string): Promise<Article | undefined> {
  if (sanityClient) {
    try {
      const preview = (await draftMode()).isEnabled
      const client = preview
        ? sanityClient.withConfig({ token: process.env.SANITY_API_READ_TOKEN, perspective: 'drafts', useCdn: false })
        : sanityClient
      const article = await client.fetch<CmsArticle | null>(articleQuery, { locale, slug }, preview ? { cache: 'no-store' } : { next: { revalidate: 60, tags: ['articles', `article-${slug}`] } })
      if (article) return normalize(article)
    } catch (error) {
      console.error(`Unable to load article "${slug}" from Sanity.`, error)
    }
  }

  return getArticle(locale, slug)
}
