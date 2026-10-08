import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '@/content/articles'
import { getArticleImage } from './articleImages'
import { readingMinutes } from './readingTime'

export type ArticleSummary = Pick<Article, 'slug' | 'title' | 'description' | 'category' | 'date' | 'coverImage' | 'coverImageAlt'> & Partial<Pick<Article, 'intro' | 'sections' | 'body'>>

export function ArticleCard({ article, basePath }: { article: ArticleSummary; basePath: string }) {
  const isPt = basePath.startsWith('/pt')
  const image = article.coverImage ?? getArticleImage(article.slug)
  const minutes = readingMinutes(article)
  const formattedDate = new Intl.DateTimeFormat(isPt ? 'pt-BR' : 'en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${article.date}T00:00:00Z`))

  return (
    <article className="group relative flex min-h-[480px] flex-col overflow-hidden rounded-[22px] bg-[#F1F1F1] p-6 transition-[border-radius,background-color] duration-500 hover:rounded-[32px] hover:bg-[#EDEDFB] focus-within:rounded-[32px] focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-[#6966F0] md:min-h-[520px]">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-semibold text-[#0A0A0A]">
          {article.category}
        </p>
        {image && (
          <div className="relative aspect-[5/4] w-[42%] shrink-0 overflow-hidden rounded-[16px] bg-[#DADADA]">
            <Image
              src={image}
              alt={article.coverImageAlt ?? ''}
              fill
              sizes="(max-width: 768px) 35vw, 15vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          </div>
        )}
      </div>

      <div className="mt-auto pt-16">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[11px] text-[#0A0A0A]/55">
          <time dateTime={article.date} className="inline-flex items-center gap-2">
            <span aria-hidden="true">▦</span>
            {formattedDate}
          </time>
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-[#6966F0]" />
            {minutes} {isPt ? 'min de leitura' : 'min read'}
          </span>
        </div>

        <h3 className="mt-7 text-[clamp(1.45rem,1.8vw,1.85rem)] font-semibold leading-[1.12] tracking-[-0.035em] transition-colors duration-300 group-hover:text-[#6966F0]">
          <Link href={`${basePath}/${article.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {article.title}
          </Link>
        </h3>
        <p className="mt-4 text-[15px] leading-6 text-[#0A0A0A]/55">{article.description}</p>
      </div>
    </article>
  )
}
