'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { SiteContent } from '@/content'

export function FaqSection({ copy }: { copy: SiteContent['faq'] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const reduceMotion = useReducedMotion()

  return (
    <section aria-labelledby="faq-title" className="bg-white px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-8 gap-y-16">
        <motion.header initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }} className="col-span-12 md:col-span-5">
          <p className="inline-flex items-center gap-2 rounded-full bg-[#F1F1F1] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em]">
            <span aria-hidden="true" className="flex size-4 items-center justify-center bg-[#6966F0] text-[11px] leading-none text-white">+</span>
            {copy.label}
          </p>

          <h2 id="faq-title" className="mt-7 max-w-[520px] text-[clamp(2.6rem,4.4vw,4.5rem)] leading-[0.94] tracking-[-0.05em]">
            {copy.titleLine1}<br />
            {copy.titleLine2}<br />
            {copy.titleLine3}
          </h2>

          <p className="mt-7 max-w-[520px] text-[15px] leading-7 text-[#0A0A0A]/60 md:text-lg">
            {copy.description}
          </p>
        </motion.header>

        <div className="col-span-12 space-y-3 md:col-span-6 md:col-start-7 md:pt-1">
          {copy.items.map((item, index) => {
            const isOpen = openIndex === index

            return (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.75, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`group px-6 transition-[border-radius,background-color] duration-200 ease-out hover:rounded-[28px] md:px-8 ${
                isOpen ? 'rounded-[28px] bg-[#7473F5]' : 'rounded-[999px] bg-[#F1F1F1]'
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex min-h-[72px] w-full cursor-pointer items-center justify-between gap-6 py-4 text-left text-lg font-bold leading-tight md:min-h-20 md:text-[clamp(1.1rem,1.35vw,1.4rem)]"
              >
                <span>{item.question}</span>
                <span aria-hidden="true" className="relative size-6 shrink-0">
                  <span className="absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 bg-current" />
                  <span className={`absolute left-1/2 top-1/2 h-5 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-700 ease-out ${isOpen ? 'rotate-90 scale-0' : ''}`} />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                  <p className="max-w-[680px] border-t border-[#0A0A0A]/10 pb-7 pt-5 text-[15px] leading-7 text-[#0A0A0A]/65 md:pr-10 md:text-base">
                    {item.answer}
                  </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
