'use client'

import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import type { SiteContent } from '@/content'

const ease = [0.16, 1, 0.3, 1] as const
const RED = '#7473F5'

function RollingMetric({
  value,
  index,
}: {
  value: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduceMotion = useReducedMotion()
  const target = Number.parseInt(value, 10)
  const suffix = value.replace(/\d+/g, '')
  const startsAbove = index % 2 === 1
  const count = useMotionValue(startsAbove ? target + 38 : 0)
  const display = useTransform(count, (latest) => `${Math.round(latest)}${suffix}`)

  useEffect(() => {
    if (!isInView) return
    if (reduceMotion) {
      count.set(target)
      return
    }

    const sequence = startsAbove
      ? [target + 38, 0, target + 24, Math.max(0, target - 2), target]
      : [0, target + 34, Math.max(0, target - 2), target + 18, target]

    const controls = animate(count, sequence, {
      duration: 2.4,
      delay: index * 0.12,
      times: [0, 0.32, 0.58, 0.8, 1],
      ease: 'easeInOut',
    })
    return () => controls.stop()
  }, [count, index, isInView, reduceMotion, startsAbove, target])

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div
        initial={{ y: startsAbove ? -28 : 28, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, delay: index * 0.1, ease }}
        className="
          text-[58px]
          font-semibold
          leading-none
          tracking-[-0.07em]
          md:text-[64px]
          lg:text-[72px]
        "
      >
        <motion.span>{display}</motion.span>
      </motion.div>
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
