'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { SiteContent } from '@/content'

const collaborationImages = ['/hero1.jpg', '/hero2.jpg', '/amanda.png', '/agatha.png', '/hero1.jpg'] as const

export function CollaborationSection({ copy }: { copy: SiteContent['collaboration'] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  function move(direction: -1 | 1) {
    trackRef.current?.scrollBy({
      left: direction * Math.min(trackRef.current.clientWidth * 0.78, 560),
      behavior: 'smooth',
    })
  }

  return (
    <section aria-labelledby="collaboration-title" className="bg-white px-3 pb-3 pt-14 md:px-4 md:pb-4 md:pt-20">
      <div className="flex min-h-[760px] flex-col overflow-hidden rounded-[24px] bg-[#090909] py-10 text-white md:min-h-[900px] md:rounded-[30px] md:py-16">
        <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }} className="mx-auto w-[calc(100%-24px)] max-w-[1440px] md:w-[calc(100%-48px)]">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0A0A0A]">
            <span aria-hidden="true" className="flex size-4 items-center justify-center bg-[#6966F0] text-[11px] leading-none text-white">+</span>
            {copy.label}
          </p>

          <div className="mt-7 grid grid-cols-12 gap-x-8 gap-y-5 md:items-end">
            <h2 id="collaboration-title" className="col-span-12 max-w-[650px] text-[clamp(2.7rem,4.7vw,4.9rem)] leading-[0.95] tracking-[-0.05em] md:col-span-7">
              {copy.titleLine1}<br />{copy.titleLine2}
            </h2>
            <p className="col-span-12 max-w-[430px] text-[15px] leading-7 text-white/65 md:col-span-4 md:col-start-9 md:text-base">
              {copy.description}
            </p>
          </div>
        </motion.div>

        <div className="mx-auto mt-10 w-[calc(100%-24px)] max-w-[1440px] md:mt-12 md:w-[calc(100%-48px)]">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {copy.items.map((item, index) => (
            <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.8, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }} key={item.title} className="flex min-h-[360px] w-[84vw] max-w-[390px] shrink-0 snap-start flex-col rounded-[18px] bg-[#232323] p-6 md:min-h-[410px] md:w-[30vw]">
              <div className="flex items-center justify-between gap-4">
                <div className="relative size-14 overflow-hidden rounded-[14px] bg-white">
                  <Image src={collaborationImages[index]} alt="" fill sizes="56px" className="object-cover" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/45">Studio Cora</span>
              </div>

              <p className="mt-14 text-lg font-semibold leading-7 tracking-[-0.02em] md:text-xl">
                <span aria-hidden="true" className="mr-2 text-3xl leading-none text-[#7473F5]">“</span>
                {item.body}
              </p>

              <div className="mt-auto border-t border-white/10 pt-5">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-white/45">{item.detail}</p>
              </div>
            </motion.article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-auto flex w-[calc(100%-24px)] max-w-[1440px] items-center justify-between pt-8 md:w-[calc(100%-48px)]">
          <div aria-hidden="true" className="flex gap-1.5">
            {copy.items.map((item, index) => <span key={item.title} className={`size-2 rounded-full ${index === 0 ? 'bg-white' : 'bg-white/30'}`} />)}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => move(-1)} aria-label={copy.previous} className="flex size-11 items-center justify-center rounded-full bg-[#232323] text-xl transition-colors hover:bg-[#343434]">←</button>
            <button type="button" onClick={() => move(1)} aria-label={copy.next} className="flex size-11 items-center justify-center rounded-full bg-[#232323] text-xl transition-colors hover:bg-[#343434]">→</button>
          </div>
        </div>
      </div>
    </section>
  )
}
