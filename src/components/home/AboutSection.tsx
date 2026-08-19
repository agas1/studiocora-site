'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const
const ACCENT = '#3D3DFF'
const RED = '#FF3B30'

export function AboutSection() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
    
            <section
              id="studio"
              className="
                grid grid-cols-12
                gap-x-6 gap-y-10
                py-20
                md:py-28
              "
            >
    
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
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
    
                  Who we are
                </div>
    
              </motion.div>
    
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
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
                    text-[clamp(2.8rem,5.5vw,6rem)]
                    leading-[0.96]
                    tracking-[-0.055em]
                  "
                >
                  We build brands that
                  <br />
    
                  <span style={{ color: ACCENT }}>
                    refuse to disappear
                  </span>
    
                  <br />
    
                  into the ordinary.
                </h2>
    
              </motion.div>
    
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
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
                  href="/sobre"
                  className="
                    group
                    flex items-center
                    gap-4
                    text-[22px]
                    font-bold
                    leading-none
                    tracking-[-0.035em]
                    md:text-[28px]
                  "
                >
    
                  <span
                    style={{ color: RED }}
                    className="
                      text-[30px]
                      font-light
                      leading-none
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                      md:text-[34px]
                    "
                  >
                    →
                  </span>
    
                  <span
                    className="
                      border-b-2
                      border-dotted
                      pb-1
                    "
                    style={{
                      borderColor: RED,
                    }}
                  >
                    About The Studio
                  </span>
    
                </Link>
    
              </motion.div>
    
            </section>
    
          </div>
  )
}
