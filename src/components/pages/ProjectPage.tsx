import Image from 'next/image'
import type { Locale } from '@/content'
import type { Project } from '@/content/projects'
import { PageShell } from './PageShell'
import { StartNowSection } from '@/components/StartNowSection'

export function ProjectPage({ locale, project }: { locale: Locale; project: Project }) {
  const isPt = locale === 'pt'

  return (
    <PageShell locale={locale} languageHrefs={{ pt: `/pt/portfolio/${project.alternateSlug}`, en: `/en/work/${project.alternateSlug}` }}>
      <article>
        <section aria-labelledby="project-title" className="mx-auto grid w-full max-w-[1440px] grid-cols-12 items-center gap-x-10 gap-y-12 px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
          <div className="col-span-12 md:col-span-7 md:self-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#F1F1F1] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em]">
              <span aria-hidden="true" className="flex size-4 items-center justify-center bg-[#6966F0] text-[11px] leading-none text-white">+</span>
              {isPt ? 'Nosso portfólio' : 'Our portfolio'}
            </p>
            <h1 id="project-title" className="mt-12 text-[clamp(5rem,9.2vw,9.5rem)] leading-[0.82] tracking-[-0.07em]">{project.title}</h1>
            <dl className="mt-14 flex flex-wrap gap-x-14 gap-y-5 text-[13px] uppercase tracking-[-0.01em] md:text-base">
              <div className="flex gap-2"><dt className="text-[#0A0A0A]/38">{isPt ? 'Ano:' : 'Year:'}</dt><dd>{project.year}</dd></div>
              <div className="flex max-w-xl gap-2"><dt className="shrink-0 text-[#0A0A0A]/38">{isPt ? 'Serviços:' : 'Services:'}</dt><dd>{project.services.join(' · ')}</dd></div>
            </dl>
          </div>
          <div className="col-span-12 w-full max-w-[480px] md:col-span-5 md:justify-self-end md:self-center">
            <div className="relative aspect-video overflow-hidden rounded-[30px] bg-[#05050E]">
              <Image src={project.images[0]} alt={`${project.title} — ${project.services.join(', ')}`} fill priority sizes="(max-width: 768px) 100vw, 42vw" className="object-cover" />
              <a href="#project-gallery" className="absolute bottom-5 left-5 inline-flex min-h-12 items-center rounded-full bg-[#0A0A0A] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
                {isPt ? 'Ver projeto ↗' : 'View project ↗'}
              </a>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8 px-6 pb-24 md:px-10">
          <section className="col-span-12 md:col-span-6"><h2 className="text-3xl">{isPt ? 'Desafio' : 'Challenge'}</h2><p className="mt-4 leading-7 text-[#0A0A0A]/65">{project.challenge}</p></section>
          <section className="col-span-12 md:col-span-6"><h2 className="text-3xl">{isPt ? 'Solução' : 'Solution'}</h2><p className="mt-4 leading-7 text-[#0A0A0A]/65">{project.solution}</p></section>
          {project.results && <section className="col-span-12"><h2 className="text-3xl">{isPt ? 'Resultados' : 'Results'}</h2><p className="mt-4 leading-7">{project.results}</p></section>}
          <div id="project-gallery" className="col-span-12 grid scroll-mt-8 gap-4 md:grid-cols-2">{project.images.map((src, index) => <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-[18px]"><Image src={src} alt={`${project.title} ${index + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div>)}</div>
        </div>
      </article>
      <StartNowSection locale={locale} href={isPt ? '/pt/contato' : '/en/contact'} />
    </PageShell>
  )
}
