import Image from 'next/image'
import Link from 'next/link'
import type { Locale, SiteContent } from '@/content'
import { RollingText } from '@/components/ui/RollingText'
import { ProofMarquee } from '@/components/home/ProofMarquee'
import { Header } from '@/components/layout/Header'

const projectImages = [
  '/project-zentra-v2.png',
  '/project-alba.png',
  '/project-orbe.png',
  '/project-nexo.png',
  '/project-zentra.png',
] as const

export function WorkShowcase({ locale, copy, proof }: { locale: Locale; copy: SiteContent['projects']; proof: SiteContent['proof'] }) {
  const isPt = locale === 'pt'
  const contactHref = isPt ? '/pt/contato' : '/en/contact'
  const projects = [
    ...copy.items,
    {
      title: isPt ? 'Projeto 04' : 'Project 04',
      category: isPt ? 'Identidade visual' : 'Visual identity',
    },
    {
      title: isPt ? 'Projeto 05' : 'Project 05',
      category: isPt ? 'Campanha criativa' : 'Creative campaign',
    },
  ]

  return (
    <div className="px-3 pb-3 pt-3 md:px-4 md:pb-4 md:pt-4">
      <section aria-labelledby="work-page-title" className="flex min-h-[620px] flex-col rounded-[26px] bg-[#F1F1F1] px-6 pb-8 pt-6 md:min-h-[680px] md:px-9 md:pb-10 md:pt-8">
          <Header locale={locale} languageHrefs={{ pt: '/pt/portfolio', en: '/en/work' }} variant="light" />
          <div className="mt-24 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] md:mt-28">
            <span aria-hidden="true" className="flex size-4 items-center justify-center bg-[#6966F0] text-[11px] leading-none text-white">+</span>
            {copy.label}
          </div>
          <div className="mt-auto grid grid-cols-12 items-end gap-x-8 gap-y-10 pt-20">
            <h1 id="work-page-title" className="col-span-12 max-w-[820px] text-[clamp(2.9rem,6.1vw,7rem)] leading-[0.88] tracking-[-0.06em] md:col-span-8">
              {isPt ? (
                <>Transformando<br />estratégia em<br /><span className="text-[#6966F0]">presença.</span></>
              ) : (
                <>Turning<br />strategy into<br /><span className="text-[#6966F0]">presence.</span></>
              )}
            </h1>
            <div className="col-span-12 max-w-[430px] md:col-span-4 md:justify-self-end md:pb-2">
              <p className="text-[15px] leading-7 text-[#0A0A0A]/60 md:text-lg">{copy.description}</p>
              <Link href={contactHref} className="group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#0A0A0A] px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5">
                <RollingText>{isPt ? 'Falar sobre um projeto' : 'Talk about a project'}</RollingText>
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
      </section>

      <ProofMarquee copy={proof} />

      <section aria-label={copy.label} className="mx-auto max-w-[1440px] px-3 pb-6 pt-20 md:px-6 md:pb-8 md:pt-28">
        <div className="grid gap-x-6 gap-y-16 md:grid-cols-2 md:gap-y-24">
          {projects.map((project, index) => (
            <div key={project.title} className={index === 4 ? 'md:col-span-2 md:mx-auto md:w-1/2' : ''}>
              <article>
                <div className="group relative aspect-video overflow-hidden rounded-[22px] bg-[#E2E2E2]">
                  <Image src={projectImages[index]} alt={`${project.title} — ${project.category}`} fill sizes={index === 4 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 50vw'} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none" />
                </div>
                <div className="mt-5 flex items-start justify-between gap-5">
                  <h3 className="text-[clamp(1.7rem,2.6vw,2.8rem)] leading-none tracking-[-0.045em]">{project.title}</h3>
                  <p className="max-w-[55%] text-right text-xs font-semibold uppercase leading-5 tracking-[0.08em] text-[#0A0A0A]/50 md:text-sm">{project.category}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
