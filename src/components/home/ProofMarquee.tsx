'use client'

import { motion } from 'framer-motion'
import type { SiteContent } from '@/content'

const ACCENT = '#6966F0'

const ease = [0.16, 1, 0.3, 1] as const

function Asterisk({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function ProofMarquee({ copy }: { copy: SiteContent['proof'] }) {
  const partners = [...copy.items, ...copy.items]
  return (
    <section
            className="
              mx-auto
              w-full
              max-w-[1600px]
              overflow-hidden
              border-y
              border-dashed
              border-[#0A0A0A]/20
              bg-white
              py-6
              md:py-8
            "
          >
            <div className="flex items-center">
    
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease }}
                className="
                  relative z-20
                  flex shrink-0 items-center gap-4
                  bg-white
                  pl-6 pr-8
                  md:pl-10 md:pr-12
                "
              >
    
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="shrink-0"
                >
                  <Asterisk className="h-10 w-10 md:h-12 md:w-12" />
                </motion.div>
    
                <p
                  className="
                    whitespace-nowrap
                    text-[10px]
                    uppercase
                    leading-[1.45]
                    tracking-[0.08em]
                    md:text-[11px]
                  "
                >
                  {copy.line1}
                  <br />
                  {copy.line2}
                </p>
    
              </motion.div>
    
              <div className="relative min-w-0 flex-1 overflow-hidden">
    
                <div
                  className="
                    pointer-events-none
                    absolute inset-y-0 left-0
                    z-10 w-16
                    bg-gradient-to-r
                    from-[#EDEDED]
                    to-transparent
                  "
                />
    
                <div
                  className="
                    pointer-events-none
                    absolute inset-y-0 right-0
                    z-10 w-16
                    bg-gradient-to-l
                    from-[#EDEDED]
                    to-transparent
                  "
                />
    
                <motion.div
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="flex w-max items-center"
                >
    
                  <div className="flex shrink-0 items-center">
    
                    {partners.map((partner, index) => (
                      <div
                        key={`first-${partner}-${index}`}
                        className="
                          flex
                          shrink-0
                          items-center
                          gap-8
                          px-8
                          md:px-12
                        "
                      >
                        <span
                          className="
                            whitespace-nowrap
                            text-sm
                            font-semibold
                            tracking-[-0.02em]
                            md:text-base
                          "
                        >
                          {partner}
                        </span>
    
                        <span
                          style={{ color: ACCENT }}
                          className="text-xs"
                        >
                          ✦
                        </span>
                      </div>
                    ))}
    
                  </div>
    
                  <div
                    aria-hidden
                    className="flex shrink-0 items-center"
                  >
    
                    {partners.map((partner, index) => (
                      <div
                        key={`second-${partner}-${index}`}
                        className="
                          flex
                          shrink-0
                          items-center
                          gap-8
                          px-8
                          md:px-12
                        "
                      >
                        <span
                          className="
                            whitespace-nowrap
                            text-sm
                            font-semibold
                            tracking-[-0.02em]
                            md:text-base
                          "
                        >
                          {partner}
                        </span>
    
                        <span
                          style={{ color: ACCENT }}
                          className="text-xs"
                        >
                          ✦
                        </span>
    
                      </div>
                    ))}
    
                  </div>
    
                </motion.div>
    
              </div>
    
            </div>
          </section>
  )
}
