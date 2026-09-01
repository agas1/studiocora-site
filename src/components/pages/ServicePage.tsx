import Link from 'next/link'
import type { Locale } from '@/content'
import { getService, getServices, type ServicePageData } from '@/content/pages'
import { getArticle } from '@/content/articles'
import { EditorialHero, PageShell, PrimaryCta } from './PageShell'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

export function ServicePage({ locale, service }: { locale: Locale; service: ServicePageData }) {
  const labels = locale === 'pt'
    ? { problems: 'Para quem este serviço faz sentido', included: 'O que pode estar incluído', process: 'Como funciona o processo', differences: 'Por que trabalhar com a Studio Cora', cases: 'Portfolio', casesBody: 'Conheça a área de projetos da Studio Cora. Novos cases serão publicados somente com contexto, resultados verificáveis e autorização.', faq: 'Perguntas frequentes', related: 'Continue explorando', articles: 'Conteúdos relacionados', portfolio: 'Ver portfolio' }
    : { problems: 'Who this service is for', included: 'What may be included', process: 'How the process works', differences: 'Why work with Studio Cora', cases: 'Work', casesBody: 'Explore Studio Cora’s work. New case studies will only be published with context, verified outcomes and permission.', faq: 'Frequently asked questions', related: 'Keep exploring', articles: 'Related insights', portfolio: 'View our work' }

  return (
    <PageShell locale={locale} languageHrefs={{ pt: `/pt/servicos/${locale === 'pt' ? service.slug : service.alternateSlug}`, en: `/en/services/${locale === 'en' ? service.slug : service.alternateSlug}` }}>
      <Breadcrumbs items={[{ label: locale === 'pt' ? 'Início' : 'Home', href: locale === 'pt' ? '/pt' : '/en' }, { label: locale === 'pt' ? 'Serviços' : 'Services', href: locale === 'pt' ? '/pt#services' : '/en#services' }]} current={service.title} />
      <EditorialHero eyebrow={service.eyebrow} title={service.title} description={service.description} />
      <section className="bg-[#0A0A0A] py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-6 px-6 md:px-10">
          <h2 className="col-span-12 text-[clamp(2.5rem,5vw,5rem)] leading-[0.95] tracking-[-0.045em] md:col-span-7">{service.intro}</h2>
          <div className="col-span-12 mt-10 grid gap-10 md:col-span-5 md:mt-0">
            <ListBlock title={labels.problems} items={service.problems} />
            <ListBlock title={labels.included} items={service.included} />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
        <h2 className="text-[clamp(2.5rem,6vw,6rem)] leading-none tracking-[-0.05em]">{labels.process}</h2>
        <div className="mt-12 grid gap-px bg-[#0A0A0A]/20 md:grid-cols-4">
          {service.process.map((step, index) => <article key={step.title} className="bg-[#EDEDED] p-6"><span className="text-xs text-[#6966F0]">[{String(index + 1).padStart(2, '0')}]</span><h3 className="mt-8 text-2xl font-semibold">{step.title}</h3><p className="mt-3 text-sm leading-6 text-[#0A0A0A]/65">{step.body}</p></article>)}
        </div>
      </section>
      <section className="mx-auto grid max-w-[1440px] grid-cols-12 gap-6 border-t border-[#0A0A0A]/25 px-6 py-20 md:px-10 md:py-28">
        <h2 className="col-span-12 text-4xl tracking-[-0.04em] md:col-span-5 md:text-6xl">{labels.differences}</h2>
        <ul className="col-span-12 md:col-span-7">{service.differentiators.map((item) => <li key={item} className="border-b border-dashed border-[#0A0A0A]/30 py-5 text-xl">+ {item}</li>)}</ul>
      </section>
      <section className="bg-[#6966F0] py-20 text-white">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10"><p className="text-xs uppercase tracking-[0.16em]">{labels.cases}</p><h2 className="mt-5 max-w-3xl text-4xl leading-tight md:text-6xl">{labels.casesBody}</h2><Link href={locale === 'pt' ? '/pt/portfolio' : '/en/work'} className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0A0A0A]">{labels.portfolio} →</Link></div>
      </section>
      <section className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8 px-6 py-20 md:px-10 md:py-28">
        <h2 className="col-span-12 text-4xl md:col-span-5 md:text-6xl">{labels.faq}</h2>
        <div className="col-span-12 md:col-span-7">{service.faq.map((item) => <details key={item.question} className="border-b border-[#0A0A0A]/25 py-5"><summary className="cursor-pointer text-lg font-semibold">{item.question}</summary><p className="max-w-xl pt-4 leading-7 text-[#0A0A0A]/65">{item.answer}</p></details>)}</div>
      </section>
      <section className="mx-auto max-w-[1440px] border-t border-[#0A0A0A]/25 px-6 py-20 md:px-10">
        <h2 className="text-3xl">{labels.related}</h2>
        <div className="mt-8 flex flex-wrap gap-3">{service.related.map((slug) => { const item = getService(locale, slug); return item ? <Link key={slug} href={`${locale === 'pt' ? '/pt/servicos' : '/en/services'}/${slug}`} className="rounded-full border border-[#0A0A0A]/30 px-5 py-3 hover:bg-white">{item.title} →</Link> : null })}</div>
        <h3 className="mt-12 text-xl font-semibold">{labels.articles}</h3>
        <div className="mt-5 flex flex-col items-start gap-3">{service.relatedArticles.map((slug) => { const article = getArticle(locale, slug); return article ? <Link key={slug} href={`${locale === 'pt' ? '/pt/blog' : '/en/insights'}/${slug}`} className="border-b border-dotted border-[#0A0A0A]/50 pb-1">{article.title} →</Link> : null })}</div>
        <div className="mt-12"><PrimaryCta locale={locale} /></div>
      </section>
    </PageShell>
  )
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return <div><h2 className="text-xs font-bold uppercase tracking-[0.15em] text-white/45">{title}</h2><ul className="mt-4">{items.map((item) => <li key={item} className="border-t border-white/20 py-3 text-sm">+ {item}</li>)}</ul></div>
}

export function ServiceDirectory({ locale }: { locale: Locale }) {
  return <div className="grid gap-3 md:grid-cols-2">{getServices(locale).map((service) => <Link key={service.slug} href={`${locale === 'pt' ? '/pt/servicos' : '/en/services'}/${service.slug}`} className="group rounded-[18px] border border-[#0A0A0A]/20 p-6 transition-colors hover:bg-white"><h3 className="text-2xl font-semibold">{service.title}</h3><p className="mt-3 text-sm leading-6 text-[#0A0A0A]/65">{service.description}</p><span className="mt-6 block text-[#6966F0] group-hover:translate-x-1">→</span></Link>)}</div>
}
