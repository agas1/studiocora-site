import Link from 'next/link'
import type { Article } from '@/content/articles'

export type ArticleSummary = Pick<Article, 'slug' | 'title' | 'description' | 'category' | 'date'>

export function ArticleCard({ article, basePath }: { article: ArticleSummary; basePath: string }) {
  return <article className="border-t border-[#0A0A0A]/25 py-6"><p className="text-xs uppercase tracking-[0.14em] text-[#0A0A0A]/50">{article.category} · <time dateTime={article.date}>{article.date}</time></p><h2 className="mt-4 text-3xl"><Link href={`${basePath}/${article.slug}`}>{article.title}</Link></h2><p className="mt-3 text-[#0A0A0A]/65">{article.description}</p></article>
}
