import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '@/content/articles'
import { getArticleImage } from './articleImages'

export type ArticleSummary = Pick<Article, 'slug' | 'title' | 'description' | 'category' | 'date' | 'coverImage' | 'coverImageAlt'>

export function ArticleCard({ article, basePath }: { article: ArticleSummary; basePath: string }) {
  const isPt = basePath.startsWith('/pt')
  const image = article.coverImage ?? getArticleImage(article.slug)
  const formattedDate = new Intl.DateTimeFormat(isPt ? 'pt-BR' : 'en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${article.date}T00:00:00Z`))

  return (
    <article className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-[20px] bg-[#F1F1F1] p-4 transition-colors duration-300 hover:bg-[#EDEDFB] md:min-h-[390px]">
      <div className="flex items-start justify-between gap-4">
        <p className="rounded-md bg-white px-3 py-1.5 text-[11px] font-semibold leading-none text-[#0A0A0A]">
          {article.category}
        </p>
        {image && (
          <div className="relative aspect-[5/4] w-[116px] shrink-0 overflow-hidden rounded-[10px] bg-[#DADADA] md:w-[124px]">
            <Image
              src={image}
              alt={article.coverImageAlt ?? ''}
              fill
              sizes="124px"
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
            {isPt ? '4 minutos de leitura' : '4 minute read'}
          </span>
        </div>

        <h3 className="mt-5 text-[clamp(1.3rem,1.6vw,1.75rem)] font-semibold leading-[1.08] tracking-[-0.045em]">
          <Link href={`${basePath}/${article.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-2 text-[12px] leading-5 text-[#0A0A0A]/55">{article.description}</p>
      </div>
    </article>
  )
}
