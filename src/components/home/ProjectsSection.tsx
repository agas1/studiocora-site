'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import type { Locale, SiteContent } from '@/content'

const projectImages = ['/project-zentra-v2.png', '/project-alba.png', '/project-orbe.png'] as const

export function ProjectsSection({ copy, locale }: { copy: SiteContent['projects']; locale: Locale }) {
  const reduceMotion = useReducedMotion()

  const projects = copy.items.map((project, index) => ({
    ...project,
    image: projectImages[index],
  }))

  return (
    <section id="work" aria-labelledby="projects-title" className="relative isolate bg-white pb-12 md:pb-16">
      <div className="flex justify-center px-6 pb-12 pt-16 md:px-10 md:pb-16 md:pt-24">
        <motion.div
          initial={reduceMotion ? false : { y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-[940px] text-center"
        >
          <motion.p
            className="mx-auto inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em]"
          >
            <span aria-hidden="true" className="flex size-4 items-center justify-center bg-[#6966F0] text-[11px] leading-none text-white">+</span>
            {copy.label}
          </motion.p>
          <motion.h2
            id="projects-title"
            className="mt-7 text-[clamp(2.5rem,4.6vw,4.8rem)] leading-[0.96] tracking-[-0.05em]"
          >
            {copy.titleLine1}<br />{copy.titleLine2}
          </motion.h2>
          <motion.p
            className="mx-auto mt-6 max-w-[620px] text-[15px] leading-7 text-[#0A0A0A]/60 md:text-lg motion-reduce:text-[#0A0A0A]/60"
          >
            {copy.description}
          </motion.p>
        </motion.div>
      </div>

      <div className="relative z-20 mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-16 px-3 md:gap-x-8 md:gap-y-24 md:px-10">
        {projects.map((project, index) => (
          <article
            key={project.title}
            className={
              index === 0
                ? 'col-span-12 md:col-span-6'
                : index === 1
                  ? 'col-span-12 md:col-span-4 md:col-start-9'
                  : 'col-span-12 md:col-span-6 md:col-start-4'
            }
          >
            <motion.div
              initial={reduceMotion ? false : { y: 16 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-[#D8D8D8] md:rounded-[28px]"
            >
              <Image
                src={project.image}
                alt=""
                fill
                sizes={index === 1 ? '(max-width: 768px) 100vw, 42vw' : '(max-width: 768px) 100vw, 58vw'}
                className="object-cover transition-transform duration-700 ease-out motion-safe:hover:scale-[1.025]"
              />
            </motion.div>
            <div className="mt-5 flex items-start justify-between gap-5 md:mt-7">
              <h3 className="text-[clamp(1.6rem,2.5vw,2.5rem)] leading-none tracking-[-0.04em]">{project.title}</h3>
              <p className="max-w-[55%] pt-1 text-right text-xs font-medium uppercase tracking-[0.08em] text-[#0A0A0A]/55 md:text-base">
                {project.category}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="relative z-20 mt-12 border-y border-dashed border-[#0A0A0A]/15 py-8 md:mt-16 md:py-10">
        <Link
          href={locale === 'pt' ? '/pt/portfolio' : '/en/work'}
          className="group mx-auto flex w-fit items-start text-[clamp(1.6rem,2.2vw,2.2rem)] leading-none tracking-[-0.04em] text-[#0A0A0A] transition-colors duration-300 hover:text-[#7473F5]"
        >
          <span aria-hidden="true" className="mr-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
          <span>{locale === 'pt' ? 'Todos os casos' : 'All case studies'}</span>
          <sup className="ml-1 text-[0.45em] leading-none tracking-normal">(05)</sup>
        </Link>
      </div>
    </section>
  )
}
