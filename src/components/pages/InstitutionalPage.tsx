import type { Locale } from '@/content'
import { getContent } from '@/content'
import { institutional } from '@/content/pages'
import { ContactSection } from '@/components/ContactSection'
import { EditorialHero, PageShell } from './PageShell'
import { ServiceDirectory } from './ServicePage'
import { ArticleList } from '@/components/blog/ArticleList'
import { getArticles } from '@/content/articles'
import { WorkShowcase } from './WorkShowcase'
import { ClosingCtaSection } from '@/components/home/ClosingCtaSection'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { HorizontalScrollDrift } from '@/components/motion/HorizontalScrollDrift'

function StudioHero({ locale }: { locale: Locale }) {
  const isPt = locale === 'pt'

  return (
    <div className="px-3 pb-3 pt-3 md:px-4 md:pb-4 md:pt-4">
      <section aria-labelledby="studio-page-title" className="flex min-h-[700px] flex-col rounded-[26px] bg-[#090909] px-6 pb-8 pt-6 text-white md:min-h-[720px] md:px-9 md:pb-10 md:pt-8">
        <Header locale={locale} languageHrefs={{ pt: '/pt/sobre', en: '/en/studio' }} variant="dark" />

        <div className="mx-auto mt-24 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0A0A0A] md:mt-28">
          <span aria-hidden="true" className="flex size-4 items-center justify-center bg-[#6966F0] text-[11px] leading-none text-white">+</span>
          {isPt ? 'Quem somos' : 'Who we are'}
        </div>

        <h1 id="studio-page-title" className="mx-auto mt-10 max-w-[1650px] text-center text-[clamp(2.7rem,5vw,6rem)] leading-[1.02] tracking-[-0.06em]">
          {isPt ? (
            <><span className="block">Somos um studio para marcas que</span><span className="block">querem significar mais.</span></>
          ) : (
            <><span className="block">We exist to build something lasting.</span><span className="block">digital legacies.</span></>
          )}
        </h1>

        <div className="mt-auto flex items-end justify-between gap-6 pt-16 font-mono text-[11px] uppercase tracking-[0.06em] text-white/70 md:text-sm">
          <p>{isPt ? 'Estúdio criativo' : 'Creative studio'}</p>
          <p>{isPt ? 'Desde 2025' : 'Since 2025'}</p>
        </div>
      </section>
    </div>
  )
}

function StudioHistory({ locale }: { locale: Locale }) {
  const isPt = locale === 'pt'

  return (
    <section aria-labelledby="studio-history-title" className="mx-auto grid min-h-[580px] max-w-[1600px] grid-cols-12 gap-x-8 gap-y-14 px-6 py-20 md:px-10 md:py-24">
      <div className="col-span-12 flex flex-col items-start md:col-span-6">
        <h2 id="studio-history-title" className="inline-flex items-center gap-2 rounded-full bg-[#F1F1F1] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em]">
          <span aria-hidden="true" className="flex size-4 items-center justify-center bg-[#6966F0] text-[11px] leading-none text-white">+</span>
          {isPt ? 'Nossa história' : 'Our story'}
        </h2>

        <div className="mt-auto flex items-center pt-16">
          <div className="flex -space-x-2" aria-hidden="true">
            <span className="relative size-9 overflow-hidden rounded-full border-2 border-white bg-[#E8E8E8]">
              <Image src="/amanda.png" alt="" fill sizes="36px" className="object-cover object-top" />
            </span>
            <span className="relative size-9 overflow-hidden rounded-full border-2 border-white bg-[#E8E8E8]">
              <Image src="/agatha.png" alt="" fill sizes="36px" className="object-cover object-top" />
            </span>
          </div>
          <p className="ml-3 text-sm text-[#0A0A0A]/45 md:text-base">
            {isPt ? 'Por ' : 'By '}<span className="text-[#0A0A0A]">Amanda e Agatha</span>
          </p>
        </div>
      </div>

      <div className="col-span-12 max-w-[660px] md:col-span-5 md:col-start-8">
        <p className="text-[clamp(1.55rem,2.15vw,2.25rem)] leading-[1.18] tracking-[-0.045em]">
          {isPt
            ? 'Construímos a Studio Cora acreditando que grandes marcas não nascem de peças soltas.'
            : 'We built Studio Cora on the belief that great brands are not born from disconnected pieces.'}
        </p>
        <p className="mt-7 text-[clamp(1.45rem,2vw,2.05rem)] leading-[1.22] tracking-[-0.04em] text-[#0A0A0A]/55">
          {isPt
            ? 'Estratégia, criatividade e tecnologia trabalham juntas para transformar desafios de negócio em marcas com identidade, presença e experiências digitais feitas para evoluir.'
            : 'Strategy, creativity and technology work together to turn business challenges into brands with identity, presence and digital experiences built to evolve.'}
        </p>
      </div>
    </section>
  )
}

function StudioTeam({ locale, copy }: { locale: Locale; copy: ReturnType<typeof getContent>['team'] }) {
  const isPt = locale === 'pt'
  const portraits = [
    { name: 'Amanda Maximo', image: '/amanda.png', role: copy.members[0].role },
    { name: 'Agatha Selbach', image: '/agatha.png', role: copy.members[1].role },
    { name: isPt ? 'Equipe Cora' : 'Cora team', image: '/amanda.png', role: isPt ? 'Direção criativa' : 'Creative direction' },
    { name: isPt ? 'Equipe Cora' : 'Cora team', image: '/agatha.png', role: isPt ? 'Design e experiência' : 'Design and experience' },
    { name: isPt ? 'Equipe Cora' : 'Cora team', image: '/amanda.png', role: isPt ? 'Estratégia de marca' : 'Brand strategy' },
    { name: isPt ? 'Equipe Cora' : 'Cora team', image: '/agatha.png', role: isPt ? 'Tecnologia e produto' : 'Technology and product' },
  ]

  return (
    <section aria-labelledby="studio-team-title" className="mx-3 rounded-[26px] bg-[#090909] px-5 py-14 text-white md:mx-4 md:px-10 md:py-28">
      <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0A0A0A]">
        <span aria-hidden="true" className="flex size-4 items-center justify-center bg-[#6966F0] text-[11px] leading-none text-white">+</span>
        {isPt ? 'Equipe' : 'Team'}
      </div>

      <div className="mt-8 grid grid-cols-12 items-end gap-x-8 gap-y-8">
        <h2 id="studio-team-title" className="col-span-12 max-w-[620px] text-[clamp(2.5rem,4.2vw,4.75rem)] leading-[0.96] tracking-[-0.05em] md:col-span-7">
          {isPt ? <>As pessoas<br />por trás da<br />Studio Cora</> : <>The people<br />behind<br />Studio Cora</>}
        </h2>
        <p className="col-span-12 max-w-sm text-[15px] leading-7 text-white/55 md:col-span-4 md:col-start-9 md:text-base">
          {copy.description}
        </p>
      </div>

      <div className="mt-12 space-y-3">
        <HorizontalScrollDrift direction="left">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <article className="flex min-h-[300px] flex-col rounded-[18px] bg-[#1B1B1B] p-6 sm:col-span-2 lg:min-h-0">
              <p className="text-[clamp(3.5rem,5vw,5.5rem)] leading-none tracking-[-0.06em]">02</p>
              <p className="mt-auto pt-16 text-lg text-white/40">{isPt ? 'Pessoas na equipe.' : 'People on the team.'}</p>
            </article>
            {portraits.slice(0, 3).map((member, index) => (
              <article key={`top-${member.name}-${index}`} className={`group relative aspect-square overflow-hidden rounded-[18px] bg-[#E8E8E8] ${index > 1 ? 'hidden sm:block' : ''}`}>
                <Image src={member.image} alt={index < 2 ? member.name : ''} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw" className="object-cover object-top" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start bg-gradient-to-t from-black/85 via-black/45 to-transparent px-4 pb-4 pt-12 text-left text-white transition-opacity duration-300 sm:inset-0 sm:items-center sm:justify-center sm:bg-black/70 sm:bg-none sm:px-5 sm:pb-0 sm:pt-0 sm:text-center sm:opacity-0 sm:backdrop-blur-sm sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="mt-1 text-sm text-white/75">{member.role}</p>
                </div>
              </article>
            ))}
          </div>
        </HorizontalScrollDrift>

        <HorizontalScrollDrift direction="right">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {portraits.slice(3).map((member, index) => (
              <article key={`bottom-${member.name}-${index}`} className="group relative aspect-square hidden overflow-hidden rounded-[18px] bg-[#E8E8E8] sm:block">
                <Image src={member.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw" className="object-cover object-top" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start bg-gradient-to-t from-black/85 via-black/45 to-transparent px-4 pb-4 pt-12 text-left text-white transition-opacity duration-300 sm:inset-0 sm:items-center sm:justify-center sm:bg-black/70 sm:bg-none sm:px-5 sm:pb-0 sm:pt-0 sm:text-center sm:opacity-0 sm:backdrop-blur-sm sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="mt-1 text-sm text-white/75">{member.role}</p>
                </div>
              </article>
            ))}
            <article className="flex min-h-[160px] flex-col sm:min-h-[300px] rounded-[18px] bg-[#1B1B1B] p-6 sm:col-span-2 lg:min-h-0">
              <p className="hidden max-w-xl text-base leading-7 text-white/60 sm:block">{copy.description}</p>
              <a href={isPt ? '/pt/contato' : '/en/contact'} className="mt-auto inline-flex w-fit rounded-full bg-white px-5 py-3 text-sm font-bold text-[#0A0A0A]">
                {isPt ? 'Fale com a equipe ↗' : 'Talk to the team ↗'}
              </a>
            </article>
          </div>
        </HorizontalScrollDrift>
      </div>
    </section>
  )
}

export function AboutPage({ locale }: { locale: Locale }) {
  const copy = getContent(locale)
  return (
    <PageShell locale={locale} languageHrefs={{ pt: '/pt/sobre', en: '/en/studio' }} hideHeader>
      <StudioHero locale={locale} />
      <StudioHistory locale={locale} />
      <StudioTeam locale={locale} copy={copy.team} />
      <ClosingCtaSection locale={locale} copy={copy.closingCta} showTopBorder={false} />
    </PageShell>
  )
}

export function WorkPage({ locale }: { locale: Locale }) {
  const copy = getContent(locale)
  return (
    <PageShell locale={locale} languageHrefs={{ pt: '/pt/portfolio', en: '/en/work' }} hideHeader>
      <WorkShowcase locale={locale} copy={copy.projects} proof={copy.proof} />
      <ClosingCtaSection locale={locale} copy={copy.closingCta} showTopBorder={false} compact />
    </PageShell>
  )
}

export function InsightsPage({ locale }: { locale: Locale }) {
  const page = institutional[locale].insights
  const articles = getArticles(locale)
  return (
    <PageShell locale={locale} languageHrefs={{ pt: '/pt/blog', en: '/en/insights' }}>
      <EditorialHero {...page} />
      <section className="mx-auto max-w-[1440px] px-6 pb-24 md:px-10">
        <div className="grid gap-6 border-t border-[#0A0A0A]/25 py-10 md:grid-cols-2">
          <h2 className="text-3xl">{locale === 'pt' ? 'Conteúdo para decisões mais claras' : 'Insights for clearer decisions'}</h2>
          <p className="leading-7 text-[#0A0A0A]/65">{page.description}</p>
        </div>
        <ArticleList articles={articles} basePath={locale === 'pt' ? '/pt/blog' : '/en/insights'} />
        <ServiceDirectory locale={locale} />
      </section>
    </PageShell>
  )
}

export function ContactPage({ locale }: { locale: Locale }) {
  const copy = getContent(locale)
  return (
    <PageShell locale={locale} languageHrefs={{ pt: '/pt/contato', en: '/en/contact' }} headerVariant="light" revealFooter>
      <ContactSection copy={copy.contact} locale={locale} />
    </PageShell>
  )
}
