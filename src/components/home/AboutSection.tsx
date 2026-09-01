'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Locale, SiteContent } from '@/content'

const ease = [0.16, 1, 0.3, 1] as const
const ACCENT = '#6966F0'
const RED = '#7473F5'

export function AboutSection({ locale, copy }: { locale: Locale; copy: SiteContent['about'] }) {
  return (
    <div className="mx-auto w-full max-w-[1600px] px-9 md:px-[52px]">
    
            <section
              id="studio"
              className="
                grid grid-cols-12
                gap-x-6 gap-y-10
                py-16
                md:py-20
              "
            >
    
              <motion.div
                initial={{ opacity: 0, x: -24, y: 8 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease }}
                className="col-span-12"
              >
    
                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-[#0A0A0A]/5
                    px-3 py-2
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                  "
                >
                  <span
                    className="h-1.5 w-1.5"
                    style={{ backgroundColor: RED }}
                  />
    
                  {copy.label}
                </div>
    
              </motion.div>
    
              <motion.div
                initial={{ opacity: 0, x: -30, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.8,
                  ease,
                }}
                className="col-span-12 md:col-span-8"
              >
    
                <h2
                  className="
                    max-w-[900px]
                    text-[clamp(2.5rem,4.8vw,5rem)]
                    leading-[0.96]
                    tracking-[-0.055em]
                  "
                >
                  {copy.line1}
                  <br />
    
                  <span style={{ color: ACCENT }}>
                    {copy.highlight}
                  </span>
    
                  <br />
    
                  {copy.line2}
                </h2>
    
              </motion.div>
    
              <motion.div
                initial={{ opacity: 0, x: 28, y: 8 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease,
                }}
                className="
                  col-span-12
                  flex items-end
                  md:col-span-4
                  md:justify-end
                "
              >
    
                <Link
                  href={locale === 'pt' ? '/pt/sobre' : '/en/studio'}
                  className="group relative flex w-fit items-center text-xl font-bold leading-none tracking-[-0.03em] md:mr-10 md:text-2xl"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 text-3xl font-light leading-none text-[#7473F5] opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    →
                  </span>
                  <span
                    className="border-b border-dotted border-[#7473F5] pb-1 transition-transform duration-300 ease-out group-hover:translate-x-10"
                  >
                    {copy.cta}
                  </span>
                </Link>
    
              </motion.div>
    
            </section>
    
          </div>
  )
}
