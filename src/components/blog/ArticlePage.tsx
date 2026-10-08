import { getContent, type Locale } from '@/content'
import { PageShell, PrimaryCta } from '@/components/pages/PageShell'
import Link from 'next/link'
import type { Article } from '@/content/articles'
import { getArticle, getArticles } from '@/content/articles'
import { Header } from '@/components/layout/Header'
import { Reveal } from '@/components/motion/Reveal'
import { ArticleList } from './ArticleList'
import { ClosingCtaSection } from '@/components/home/ClosingCtaSection'
import { readingMinutes } from './readingTime'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { JsonLd } from '@/components/seo/JsonLd'
import { siteUrl } from '@/lib/seo'
import Image from 'next/image'
import { PortableText, type PortableTextComponents } from '@portabletext/react'

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-14 text-4xl leading-tight tracking-[-0.035em]">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-9 text-2xl font-semibold">{children}</h3>,
    normal: ({ children }) => <p className="mt-5 text-[#0A0A0A]/75">{children}</p>,
    blockquote: ({ children }) => <blockquote className="my-10 border-l-2 border-[#6966F0] pl-6 text-2xl leading-relaxed">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 text-[#0A0A0A]/75">{children}</ul>,
    number: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-[#0A0A0A]/75">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => <a href={value?.href} className="underline decoration-[#6966F0] underline-offset-4">{children}</a>,
  },
  types: {
    contentImage: ({ value }) => value?.url ? (
      <figure className="my-12">
        <Image src={value.url} alt={value.alt ?? ''} width={1600} height={1000} className="h-auto w-full rounded-[18px]" />
        {value.caption && <figcaption className="mt-3 text-sm text-[#0A0A0A]/55">{value.caption}</figcaption>}
      </figure>
    ) : null,
  },
}

export function ArticlePage({ locale, article }: { locale: Locale; article: Article }) {
  const servicesHref = locale === 'pt' ? '/pt#services' : '/en#services'
  const studioHref = locale === 'pt' ? '/pt/sobre' : '/en/studio'
  const author = article.author || 'Studio Cora'
  const articleBase = locale === 'pt' ? '/pt/blog' : '/en/insights'
  const articleUrl = `${siteUrl}${articleBase}/${article.slug}`
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updatedAt ?? article.date,
    inLanguage: locale === 'pt' ? 'pt-BR' : 'en',
    mainEntityOfPage: articleUrl,
    author: author === 'Studio Cora'
      ? { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: author, url: `${siteUrl}${studioHref}` }
      : { '@type': 'Person', name: author },
    publisher: { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'Studio Cora' },
  }
  const isPt = locale === 'pt'
  const copy = getContent(locale)
  const languageHrefs = { pt: `/pt/blog/${isPt ? article.slug : article.alternateSlug}`, en: `/en/insights/${isPt ? article.alternateSlug : article.slug}` }
  const formatDate = (date: string) => new Intl.DateTimeFormat(isPt ? 'pt-BR' : 'en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`))
  const minutes = readingMinutes(article)
  const related = article.relatedArticles.map(slug => getArticle(locale, slug)).filter((item): item is Article => Boolean(item))
  const recommendations = [...related, ...getArticles(locale).filter(item => item.slug !== article.slug && !related.some(candidate => candidate.slug === item.slug))].slice(0, 3)

  return (
    <PageShell locale={locale} languageHrefs={languageHrefs} hideHeader revealFooter>
      <JsonLd data={articleSchema} />
      <article>
        <div className="p-3 md:p-4">
          <section aria-labelledby="article-title" className="rounded-[26px] bg-[#F1F1F1] px-6 pb-12 pt-6 md:px-8 md:pb-16 md:pt-8">
            <Header locale={locale} languageHrefs={languageHrefs} variant="light" />
            <div className="mx-auto max-w-[1000px] pb-4 pt-16 text-center md:pt-28">
              <Reveal>
                <Link href={articleBase} className="inline-flex min-h-9 items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em]">
                  <span aria-hidden="true" className="flex size-4 items-center justify-center bg-[#6966F0] text-white">+</span>
                  {isPt ? 'Blog' : 'Insights'}
                </Link>
                <h1 id="article-title" className={`mx-auto mt-7 max-w-[960px] leading-[1.04] tracking-[-0.055em] ${article.title.length > 65 ? 'text-[clamp(2.3rem,5vw,5rem)]' : 'text-[clamp(2.5rem,6.2vw,6rem)]'}`}>{article.title}</h1>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm md:mt-10 md:text-base">
                  <span className="inline-flex items-center gap-3">
                    {author === 'Studio Cora' && <Image src="/icon.png" alt="" width={36} height={36} className="size-9 rounded-full" />}
                    <span>{isPt ? 'Por ' : 'By '}{author === 'Studio Cora' ? <Link href={studioHref} className="underline decoration-transparent underline-offset-4 hover:decoration-current">{author}</Link> : author}</span>
                  </span>
                  <time dateTime={article.date} className="inline-flex items-center gap-2">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-[1.6]"><path d="M5 3v4M19 3v4M3 10h18M5 5h14a2 2 0 0 1 2 2v14H3V7a2 2 0 0 1 2-2Z" /></svg>
                    {formatDate(article.date)}
                  </time>
                  <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="size-2 rounded-full bg-[#6966F0]" />{minutes} {isPt ? 'min de leitura' : 'min read'}</span>
                </div>
                {article.updatedAt && <p className="mt-4 text-sm text-[#0A0A0A]/60">{isPt ? 'Atualizado em ' : 'Updated on '}<time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time></p>}
              </Reveal>
            </div>
          </section>
        </div>
        <div className="mx-auto max-w-[1440px] px-6 pt-6 md:px-8">
          <Breadcrumbs items={[{ label: isPt ? 'Início' : 'Home', href: isPt ? '/pt' : '/en' }, { label: isPt ? 'Blog' : 'Insights', href: articleBase }]} current={article.title} />
        </div>
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 pb-16 pt-10 md:px-8 md:pb-24 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)] lg:gap-16">
          <div className="min-w-0 text-base leading-8">
            <Reveal><p className="mb-8 text-xl leading-9 text-[#0A0A0A]/75">{article.description}</p></Reveal>
            {article.coverImage && <Reveal><Image src={article.coverImage} alt={article.coverImageAlt ?? ''} width={1200} height={800} className="mb-10 h-auto w-full rounded-[20px]" /></Reveal>}
            {isPt && article.slug === 'branding-e-identidade-visual-diferenca' && <p className="mb-8"><Link href="/pt/portfolio/gd-law" className="underline underline-offset-4">Veja o projeto GD Law citado neste artigo →</Link></p>}
            {article.body?.length ? (
              <Reveal><PortableText value={article.body} components={portableTextComponents} /></Reveal>
            ) : (
              <>
                <Reveal>{article.intro.map(paragraph => <p key={paragraph} className="mb-6 text-[#0A0A0A]/75">{paragraph}</p>)}</Reveal>
                {article.sections.map((section, index) => (
                  <section key={section.heading} id={`article-section-${index}`} className="mt-12 scroll-mt-8">
                    <Reveal>
                      <h2 className="text-[clamp(1.6rem,2.25vw,2.2rem)] font-medium leading-tight tracking-[-0.035em]">{section.heading}</h2>
                      {section.paragraphs.map(paragraph => <p key={paragraph} className="mt-5 text-[#0A0A0A]/75">{paragraph}</p>)}
                      {section.subsections?.map(subsection => <div key={subsection.heading} className="mt-9"><h3 className="text-2xl font-semibold">{subsection.heading}</h3>{subsection.paragraphs.map(paragraph => <p key={paragraph} className="mt-4 text-[#0A0A0A]/75">{paragraph}</p>)}</div>)}
                    </Reveal>
                  </section>
                ))}
              </>
            )}
            <Reveal>
              <aside className="mt-14 border-t border-[#0A0A0A]/15 pt-8">
                <h2 className="text-2xl tracking-tight">{isPt ? 'Continue sua pesquisa' : 'Continue your research'}</h2>
                <Link href={servicesHref} className="mt-4 inline-block border-b border-dotted border-[#6966F0]">{isPt ? 'Conheça os serviços da Studio Cora →' : 'Explore Studio Cora services →'}</Link>
              </aside>
            </Reveal>
          </div>
          <aside aria-label={isPt ? 'Apoio à leitura' : 'Reading resources'} className="min-w-0 lg:sticky lg:top-8 lg:self-start">
            <Reveal delay={0.1}>
              {article.sections.length > 0 && <nav aria-label={isPt ? 'Neste artigo' : 'In this article'} className="rounded-[22px] bg-[#0A0A0A] p-7 text-white">
                <h2 className="text-lg font-semibold">{isPt ? 'Neste artigo' : 'In this article'}</h2>
                <ul className="mt-5 list-disc space-y-4 pl-5 text-sm leading-6">{article.sections.map((section, index) => <li key={section.heading}><a href={`#article-section-${index}`} className="underline decoration-transparent underline-offset-4 transition-colors hover:text-[#7473F5] hover:decoration-current">{section.heading}</a></li>)}</ul>
              </nav>}
              <div className="mt-5 rounded-[22px] bg-[#EDEDFB] p-7">
                <h2 className="text-2xl leading-tight tracking-tight">{isPt ? 'Sua marca pronta para o próximo passo.' : 'Your brand, ready for its next step.'}</h2>
                <p className="mb-6 mt-4 text-sm leading-6 text-[#0A0A0A]/65">{isPt ? 'Converse com a Cora sobre estratégia, identidade e presença digital para sua empresa.' : 'Talk to Cora about strategy, identity and digital presence for your business.'}</p>
                <PrimaryCta locale={locale} />
              </div>
            </Reveal>
          </aside>
        </div>
      </article>
      <section aria-labelledby="related-articles-title" className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 md:py-24">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full bg-[#F1F1F1] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em]"><span aria-hidden="true" className="size-2 bg-[#6966F0]" />{isPt ? 'Blog' : 'Insights'}</p>
          <div className="mb-12 mt-6 flex flex-wrap items-end justify-between gap-6">
            <h2 id="related-articles-title" className="text-[clamp(2.5rem,4.5vw,4rem)] leading-none tracking-[-0.05em]">{isPt ? 'Outros artigos' : 'Other articles'}</h2>
            <Link href={articleBase} className="group relative inline-flex min-h-11 items-center text-xl font-semibold tracking-tight">
              <span aria-hidden="true" className="absolute left-0 text-[#6966F0] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">→</span>
              <span className="border-b border-dotted border-[#6966F0] pb-1 transition-transform duration-300 group-hover:translate-x-8 group-focus-visible:translate-x-8">{isPt ? 'Todos os artigos' : 'All articles'}</span>
            </Link>
          </div>
        </Reveal>
        <ArticleList articles={recommendations} basePath={articleBase} />
      </section>
      <ClosingCtaSection locale={locale} copy={copy.closingCta} />
    </PageShell>
  )
}
