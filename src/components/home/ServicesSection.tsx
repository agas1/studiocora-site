'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import type { SiteContent } from '@/content'

const ease = [0.16, 1, 0.3, 1] as const
const RED = '#7473F5'

const serviceImages = ['/hero1.jpg', '/hero2.jpg', '/hero1.jpg', '/hero2.jpg', '/hero1.jpg'] as const

type ServiceItem = SiteContent['services']['items'][number] & { image: string }

function ActiveServiceCard({ service }: { service: ServiceItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24, y: 10, filter: 'blur(8px)' }}
      animate={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, x: 18, y: 8, filter: 'blur(6px)' }}
      transition={{ duration: 0.35, ease }}
      className="mt-6 md:mt-0"
    >
      <div className="relative aspect-[4/3] w-full max-w-[390px] overflow-hidden rounded-[18px]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 390px"
          className="object-cover"
        />
      </div>

      <div className="mt-6 flex items-center gap-2">
        <span style={{ color: RED }} className="text-lg font-light leading-none">+</span>
        <span className="text-[9px] uppercase tracking-[0.12em] text-white/55">
          {service.label}
        </span>
      </div>

      <p className="mt-5 max-w-[360px] text-[14px] font-medium leading-[1.5] text-white md:text-base">
        {service.body}
      </p>
    </motion.div>
  )
}

export function ServicesSection({ copy }: { copy: SiteContent['services'] }) {
  const [activeService, setActiveService] = useState<number | null>(null)
  const services = copy.items.map((service, index) => ({ ...service, image: serviceImages[index] }))

  return (
    <section
            id="services"
            className="
              mx-auto
              mt-8
              w-[calc(100%-24px)]
              overflow-hidden
              rounded-[24px]
              bg-[#0A0A0A]
              px-6
              py-8
              text-white
              md:w-[calc(100%-32px)]
              md:px-10
              md:py-10
            "
          >
    
            <div
              className="
                grid grid-cols-12
                gap-x-6 gap-y-8
                border-b border-white/25
                pb-10
              "
            >
    
              <motion.div
                initial={{ opacity: 0, x: -28, y: 8 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease }}
                className="col-span-12 md:col-span-7"
              >
    
                <div
                  className="
                    mb-5
                    inline-flex items-center gap-2
                    rounded-full
                    bg-white
                    px-3 py-2
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-black
                  "
                >
                  <span
                    className="h-1.5 w-1.5"
                    style={{ backgroundColor: RED }}
                  />
    
                  {copy.label}
                </div>
    
                <h2
                  className="
                    max-w-[720px]
                    text-[clamp(2.6rem,5vw,5.2rem)]
                    leading-[0.92]
                    tracking-[-0.055em]
                  "
                >
                  {copy.titleLine1}
                  <br />
                  {copy.titleLine2}
                </h2>
    
              </motion.div>
    
              <motion.div
                initial={{ opacity: 0, x: 28, y: 8 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease,
                }}
                className="
                  col-span-12
                  flex items-end
                  md:col-span-5
                "
              >
    
                <p
                  className="
                    max-w-[420px]
                    text-[12px]
                    leading-[1.5]
                    text-white/60
                    md:text-sm
                  "
                >
                  {copy.description}
                </p>
    
              </motion.div>
    
            </div>
    
            <div
              className="
                mt-12
                grid grid-cols-12
                gap-x-10
              "
            >
    
              {/* LEFT LIST */}
    
              <div
                className="col-span-12 md:col-span-7"
                onMouseLeave={() => setActiveService(null)}
              >
    
                {services.map((service, index) => {
    
                  const isActive = activeService === index
    
                  return (
                    <div key={service.title} className="relative">
                    <motion.button
                      type="button"
                      aria-pressed={isActive}
                      onMouseEnter={() => setActiveService(index)}
                      onFocus={() => setActiveService(index)}
                      onBlur={() => setActiveService(null)}
                      onClick={() => setActiveService(index)}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{
                        duration: 0.7,
                        delay: index * 0.05,
                        ease,
                      }}
                      className="
                        group
                        grid w-full grid-cols-12
                        items-center
                        border-b
                        border-dashed
                        border-white/15
                        py-11
                        text-left
                        md:py-14
                      "
                    >
    
                      <div className="col-span-2 md:col-span-1">
    
                        <motion.span
                          animate={{
                            opacity: isActive ? 1 : 0,
                            x: isActive ? 0 : -12,
                          }}
                          transition={{ duration: 0.25 }}
                          style={{ color: RED }}
                          className="
                            block
                            text-[34px]
                            font-light
                            leading-none
                            md:text-[38px]
                          "
                        >
                          →
                        </motion.span>
    
                      </div>
    
                      <div className="col-span-8 md:col-span-9">
    
                        <motion.h3
                          animate={{
                            color: isActive
                              ? '#FFFFFF'
                              : 'rgba(255,255,255,0.28)',
                            x: isActive ? 6 : 0,
                          }}
                          transition={{
                            duration: 0.25,
                          }}
                          className="
                            text-[clamp(2.7rem,5.2vw,6.2rem)]
                            font-semibold
                            leading-[0.95]
                            tracking-[-0.055em]
                          "
                        >
                          {service.title}
                        </motion.h3>
    
                      </div>
    
                      <div
                        className="
                          col-span-2
                          flex justify-end
                        "
                      >
    
                        <motion.span
                          animate={{
                            color: isActive
                              ? RED
                              : 'rgba(255,255,255,0.7)',
                          }}
                          transition={{ duration: 0.25 }}
                          className="
                            text-[10px]
                            font-bold
                          "
                        >
                          [{String(index + 1).padStart(2, '0')}]
                        </motion.span>
    
                      </div>
    
                    </motion.button>

                    <AnimatePresence>
                      {isActive && (
                        <div className="md:absolute md:left-[calc(100%+2.5rem)] md:top-0 md:w-[calc(71.4286%-2.5rem)]">
                          <ActiveServiceCard service={service} />
                        </div>
                      )}
                    </AnimatePresence>
                    </div>
                  )
    
                })}
    
              </div>
    
            </div>
    
          </section>
  )
}
