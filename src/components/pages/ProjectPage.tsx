import Image from 'next/image'
import type { Locale } from '@/content'
import type { Project } from '@/content/projects'
import { EditorialHero, PageShell, PrimaryCta } from './PageShell'

export function ProjectPage({ locale, project }: { locale: Locale; project: Project }) {
  return <PageShell locale={locale}><article><EditorialHero eyebrow={`${project.segment} · ${project.services.join(', ')}`} title={project.title} description={project.description} /><div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8 px-6 pb-24 md:px-10"><section className="col-span-12 md:col-span-6"><h2 className="text-3xl">{locale === 'pt' ? 'Desafio' : 'Challenge'}</h2><p className="mt-4 leading-7 text-[#0A0A0A]/65">{project.challenge}</p></section><section className="col-span-12 md:col-span-6"><h2 className="text-3xl">{locale === 'pt' ? 'Solução' : 'Solution'}</h2><p className="mt-4 leading-7 text-[#0A0A0A]/65">{project.solution}</p></section>{project.results && <section className="col-span-12"><h2 className="text-3xl">{locale === 'pt' ? 'Resultados' : 'Results'}</h2><p className="mt-4 leading-7">{project.results}</p></section>}<div className="col-span-12 grid gap-4 md:grid-cols-2">{project.images.map((src, index) => <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-[18px]"><Image src={src} alt={`${project.title} ${index + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div>)}</div><div className="col-span-12"><PrimaryCta locale={locale} /></div></div></article></PageShell>
}
