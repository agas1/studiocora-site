import Image from 'next/image'
import Link from 'next/link'
import { getArticles } from '@/content/articles'
import type { Locale, SiteContent } from '@/content'
import { Reveal } from '@/components/motion/Reveal'

const articleImages = ['/project-nexo.png', '/project-alba.png', '/project-orbe.png'] as const

function readingTime(article: ReturnType<typeof getArticles>[number]) {
  const text = [article.description, ...article.intro, ...article.sections.flatMap((section) => section.paragraphs)].join(' ')
  return Math.max(3, Math.ceil(text.split(/\s+/).length / 200))
}

export function JournalSection({ locale, copy }: { locale: Locale; copy: SiteContent['journal'] }) {
  const articles = getArticles(locale).slice(0, 3)
  const basePath = locale === 'pt' ? '/pt/blog' : '/en/insights'
  const dateLocale = locale === 'pt' ? 'pt-BR' : 'en-US'

  return (
    <section aria-labelledby="journal-title" className="bg-white px-6 pb-24 pt-14 md:px-10 md:pb-24 md:pt-20">
      <div className="mx-auto max-w-[1440px]">
        <Reveal direction="left"><p className="inline-flex items-center gap-2 rounded-full bg-[#F1F1F1] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em]">
          <span aria-hidden="true" className="flex size-4 items-center justify-center bg-[#6966F0] text-[11px] leading-none text-white">+</span>
          {copy.label}
        </p></Reveal>

        <div className="mt-8 grid grid-cols-12 gap-x-8 gap-y-8 md:items-end">
          <Reveal direction="left" delay={0.08} className="col-span-12 md:col-span-8"><h2 id="journal-title" className="max-w-[760px] text-[clamp(2.7rem,4.6vw,4.8rem)] leading-[1.02] tracking-[-0.05em]">
            {copy.titleLine1}<br />
            {copy.titleLine2} <span className="text-[#0A0A0A]/35">{copy.titleConnector}</span><br />
            <span className="text-[#0A0A0A]/35">{copy.titleMuted}</span>
          </h2></Reveal>
          <Reveal direction="right" delay={0.14} className="col-span-12 md:col-span-4 md:ml-auto md:mr-10"><Link href={basePath} className="group relative flex w-fit items-center text-xl font-bold tracking-[-0.03em] md:text-2xl">
            <span aria-hidden="true" className="absolute left-0 text-3xl font-light leading-none text-[#7473F5] opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">→</span>
            <span className="border-b border-dotted border-[#7473F5] pb-1 transition-transform duration-300 ease-out group-hover:translate-x-10">
              {copy.cta}
            </span>
          </Link></Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {articles.map((article, index) => {
            const minutes = readingTime(article)

            return (
              <Reveal key={article.slug} direction="up" delay={index * 0.08} className="min-w-0"><article className="group min-w-0">
                <Link href={`${basePath}/${article.slug}`} className="flex min-h-[520px] flex-col rounded-[22px] bg-[#F1F1F1] p-6 transition-colors duration-200 hover:bg-[#ECECEC] md:min-h-[590px]">
                  <div className="flex items-start justify-between gap-5">
                    <span className="text-sm font-bold">{article.category}</span>
                    <div className="relative aspect-[5/4] w-[42%] overflow-hidden rounded-[16px] bg-[#D8D8D8]">
                      <Image src={articleImages[index]} alt="" fill sizes="(max-width: 768px) 40vw, 15vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]" />
                    </div>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 text-sm text-[#0A0A0A]/60">
                    <span className="inline-flex items-center gap-2">
                      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-[1.8]">
                        <path d="M5 3v3M19 3v3M3.5 9h17M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2Z" />
                        <path d="M7 13h2M11 13h2M15 13h2M7 17h2M11 17h2M15 17h2" />
                      </svg>
                      <time dateTime={article.date}>{new Intl.DateTimeFormat(dateLocale, { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(`${article.date}T12:00:00`))}</time>
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span aria-hidden="true" className="size-2 rounded-full bg-[#7473F5]" />
                      {minutes} {minutes === 1 ? copy.minute : copy.minutes}
                    </span>
                  </div>

                  <h3 className="mt-7 text-[clamp(1.45rem,1.8vw,1.85rem)] font-bold leading-[1.12] tracking-[-0.035em] transition-colors duration-200 group-hover:text-[#6F6BF1]">
                    {article.title}
                  </h3>

                  <p className="mt-4 text-[15px] leading-6 text-[#0A0A0A]/60 md:text-base md:leading-7">
                    {article.description}
                  </p>
                </Link>
              </article></Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
