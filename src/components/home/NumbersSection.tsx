'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'
import type { SiteContent } from '@/content'

const ease = [0.16, 1, 0.3, 1] as const
const RED = '#7473F5'

function RollingMetric({ value, index }: { value: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const reduceMotion = useReducedMotion()

  return (
    <div ref={ref} aria-label={value} className="flex h-[1.1em] overflow-hidden text-[64px] font-semibold leading-[1.1] tracking-[-0.07em] md:text-[80px] lg:text-[96px]">
      {Array.from(value).map((character, digitIndex) => {
        if (!/\d/.test(character)) return <span key={digitIndex} aria-hidden="true">{character}</span>
        const digits = [character, '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', character]
        return (
          <span key={digitIndex} aria-hidden="true" className="relative block h-[1.1em] w-[0.65em] overflow-hidden tabular-nums">
            <motion.span
              className="block"
              initial={false}
              animate={{ y: isInView && !reduceMotion ? '-91.666667%' : '0%' }}
              transition={{ duration: reduceMotion ? 0 : 1.8, delay: index * 0.1 + digitIndex * 0.08, ease }}
            >
              {digits.map((digit, step) => <span key={step} className="block h-[1.1em]">{digit}</span>)}
            </motion.span>
          </span>
        )
      })}
    </div>
  )
}
export function NumbersSection({ copy }: { copy: SiteContent['numbers'] }) {
  return (
    <section
            className="
              mx-auto
              w-full
              max-w-[1440px]
              px-6
              py-16
              md:px-10
              md:py-20
            "
          >
    
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease }}
              className="mb-12 md:mb-16"
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
    
            <div className="grid grid-cols-2 gap-x-7 gap-y-14 md:grid-cols-4">
    
              {copy.metrics.map((metric, index) => (
    
                <motion.div
                  key={metric.label}
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -22 : 22,
                    y: 10,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: '-80px',
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.08,
                    ease,
                  }}
                >
    
                  <RollingMetric
                    value={metric.value}
                    index={index}
                  />
    
                  <div className="mt-3 border-t border-dashed border-[#0A0A0A]/60 pt-4">
    
                    <h3
                      className="
                        text-[15px]
                        font-semibold
                        tracking-[-0.02em]
                        md:text-base
                      "
                    >
                      {metric.label}
                    </h3>
    
                    <p
                      className="
                        mt-2
                        max-w-[250px]
                        text-[11px]
                        leading-[1.55]
                        text-[#0A0A0A]/60
                        md:text-xs
                      "
                    >
                      {metric.body}
                    </p>
    
                  </div>
    
                </motion.div>
    
              ))}
    
            </div>
    
          </section>
  )
}
