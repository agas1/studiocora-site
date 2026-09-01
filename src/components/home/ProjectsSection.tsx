'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { Locale, SiteContent } from '@/content'

const projectImages = ['/project-zentra-v2.png', '/project-alba.png', '/project-orbe.png'] as const

export function ProjectsSection({ copy, locale }: { copy: SiteContent['projects']; locale: Locale }) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const headerY = useTransform(scrollYProgress, [0, 0.12, 0.42], [0, 0, -48])
  const headerScale = useTransform(scrollYProgress, [0, 0.12, 0.42], [1, 1, 0.94])
  const bodyOpacity = useTransform(scrollYProgress, [0.06, 0.14, 0.24], [1, 0.72, 0])
  const titleOpacity = useTransform(scrollYProgress, [0.16, 0.27, 0.38], [1, 0.72, 0])
  const badgeOpacity = useTransform(scrollYProgress, [0.24, 0.34, 0.42], [1, 0.72, 0])
  const titleColor = useTransform(scrollYProgress, [0.16, 0.38], ['#0A0A0A', '#FFFFFF'])
  const bodyColor = useTransform(scrollYProgress, [0.06, 0.24], ['rgba(10,10,10,0.6)', '#FFFFFF'])

  const projects = copy.items.map((project, index) => ({
    ...project,
    image: projectImages[index],
  }))

  return (
    <section ref={sectionRef} id="work" aria-labelledby="projects-title" className="relative isolate bg-white pb-12 md:pb-16">
      <div className="sticky top-0 z-0 flex min-h-[82svh] items-start justify-center overflow-hidden px-6 pb-20 pt-10 md:min-h-screen md:px-10 md:pb-24 md:pt-16">
        <motion.div
          style={reduceMotion ? undefined : { y: headerY, scale: headerScale }}
          className="mx-auto max-w-[940px] text-center"
        >
          <motion.p
            style={reduceMotion ? undefined : { opacity: badgeOpacity }}
            className="mx-auto inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em]"
          >
            <span aria-hidden="true" className="flex size-4 items-center justify-center bg-[#6966F0] text-[11px] leading-none text-white">+</span>
            {copy.label}
          </motion.p>
          <motion.h2
            id="projects-title"
            style={reduceMotion ? undefined : { color: titleColor, opacity: titleOpacity }}
            className="mt-7 text-[clamp(2.5rem,4.6vw,4.8rem)] leading-[0.96] tracking-[-0.05em]"
          >
            {copy.titleLine1}<br />{copy.titleLine2}
          </motion.h2>
          <motion.p
            style={reduceMotion ? undefined : { color: bodyColor, opacity: bodyOpacity }}
            className="mx-auto mt-6 max-w-[620px] text-[15px] leading-7 text-[#0A0A0A]/60 md:text-lg motion-reduce:text-[#0A0A0A]/60"
          >
            {copy.description}
          </motion.p>
        </motion.div>
      </div>

      <div className="relative z-20 mx-auto -mt-[14svh] grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-32 px-3 md:-mt-[25vh] md:gap-x-8 md:gap-y-64 md:px-10">
        {projects.map((project, index) => (
          <article
            key={project.title}
            className={
              index === 0
                ? 'col-span-12 md:col-span-6'
                : index === 1
                  ? 'col-span-12 md:col-span-4 md:col-start-9 md:mt-32'
                  : 'col-span-12 md:col-span-6 md:col-start-4'
            }
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-[#D8D8D8] md:rounded-[28px]">
              <Image
                src={project.image}
                alt=""
                fill
                sizes={index === 1 ? '(max-width: 768px) 100vw, 42vw' : '(max-width: 768px) 100vw, 58vw'}
                className="object-cover transition-transform duration-700 ease-out motion-safe:hover:scale-[1.025]"
              />
            </div>
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
