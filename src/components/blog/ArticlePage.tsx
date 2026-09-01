import type { Locale } from '@/content'
import { EditorialHero, PageShell, PrimaryCta } from '@/components/pages/PageShell'
import Link from 'next/link'
import type { Article } from '@/content/articles'
import { getArticle } from '@/content/articles'
import { getService } from '@/content/pages'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { JsonLd } from '@/components/seo/JsonLd'
import { siteUrl } from '@/lib/seo'

export function ArticlePage({ locale, article }: { locale: Locale; article: Article }) {
  const serviceBase = locale === 'pt' ? '/pt/servicos' : '/en/services'
  const articleBase = locale === 'pt' ? '/pt/blog' : '/en/insights'
  const articleUrl = `${siteUrl}${articleBase}/${article.slug}`
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: locale === 'pt' ? 'pt-BR' : 'en',
    mainEntityOfPage: articleUrl,
    author: { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'Studio Cora' },
    publisher: { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'Studio Cora' },
  }
  return (
    <PageShell locale={locale} languageHrefs={{ pt: `/pt/blog/${locale === 'pt' ? article.slug : article.alternateSlug}`, en: `/en/insights/${locale === 'en' ? article.slug : article.alternateSlug}` }}>
      <JsonLd data={articleSchema} />
      <Breadcrumbs items={[{ label: locale === 'pt' ? 'Início' : 'Home', href: locale === 'pt' ? '/pt' : '/en' }, { label: locale === 'pt' ? 'Blog' : 'Insights', href: articleBase }]} current={article.title} />
      <article>
        <EditorialHero eyebrow={`${article.category} · ${article.date}`} title={article.title} description={article.description} />
        <div className="mx-auto max-w-3xl px-6 pb-24 text-lg leading-8">
          {article.intro.map((paragraph) => <p key={paragraph} className="mb-6 text-xl leading-9">{paragraph}</p>)}
          {article.sections.map((section) => <section key={section.heading} className="mt-14"><h2 className="text-4xl leading-tight tracking-[-0.035em]">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5 text-[#0A0A0A]/75">{paragraph}</p>)}{section.subsections?.map((subsection) => <div key={subsection.heading} className="mt-9"><h3 className="text-2xl font-semibold">{subsection.heading}</h3>{subsection.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 text-[#0A0A0A]/75">{paragraph}</p>)}</div>)}</section>)}
          <aside className="mt-16 border-t border-[#0A0A0A]/25 pt-10"><h2 className="text-2xl">{locale === 'pt' ? 'Continue sua pesquisa' : 'Continue your research'}</h2><div className="mt-5 flex flex-col items-start gap-3">{article.relatedServices.map((slug) => { const service = getService(locale, slug); return service ? <Link key={slug} href={`${serviceBase}/${slug}`} className="border-b border-dotted border-[#0A0A0A]/50">{locale === 'pt' ? 'Conheça o serviço de' : 'Explore'} {service.title} →</Link> : null })}{article.relatedArticles.map((slug) => { const related = getArticle(locale, slug); return related ? <Link key={slug} href={`${articleBase}/${slug}`} className="border-b border-dotted border-[#0A0A0A]/50">{related.title} →</Link> : null })}</div></aside>
          <div className="mt-16"><PrimaryCta locale={locale} /></div>
        </div>
      </article>
    </PageShell>
  )
}
