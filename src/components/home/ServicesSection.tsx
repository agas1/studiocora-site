'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const
const RED = '#FF3B30'

const services = [
  {
    title: 'BRANDING',
    label: 'BRANDING',
    body: 'Strategic thinking, positioning and visual identity systems built to make brands recognizable and memorable.',
    image: '/hero1.jpg',
  },
  {
    title: 'WEBSITES',
    label: 'WEB DESIGN',
    body: 'Responsive, high-performing websites that combine clear structure, strong design and thoughtful digital experiences.',
    image: '/hero2.jpg',
  },
  {
    title: 'SOCIAL MEDIA',
    label: 'SOCIAL MEDIA',
    body: 'Creative direction, strategy and content designed to build presence, consistency and connection across social platforms.',
    image: '/hero1.jpg',
  },
  {
    title: 'CREATIVE DIRECTION',
    label: 'CREATIVE DIRECTION',
    body: 'Concept, art direction and visual systems that give every touchpoint a coherent and distinctive creative language.',
    image: '/hero2.jpg',
  },
  {
    title: 'DIGITAL EXPERIENCES',
    label: 'DIGITAL EXPERIENCES',
    body: 'Interfaces, interactions and digital products designed to feel intuitive, functional and visually distinctive.',
    image: '/hero1.jpg',
  },
]

export function ServicesSection() {
  const [activeService, setActiveService] = useState<number | null>(null)

  return (
    <section
            id="services"
            className="
              mx-auto
              mt-8
              w-[calc(100%-24px)]
              max-w-[1440px]
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
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
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
    
                  Services
                </div>
    
                <h2
                  className="
                    max-w-[720px]
                    text-[clamp(3rem,6vw,6rem)]
                    leading-[0.92]
                    tracking-[-0.055em]
                  "
                >
                  Everything your
                  <br />
                  brand needs
                </h2>
    
              </motion.div>
    
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
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
                  We shape brands through strategy, design, content and digital
                  experiences — from first idea to final execution.
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
    
                    <motion.button
                      key={service.title}
                      type="button"
                      onMouseEnter={() => setActiveService(index)}
                      onFocus={() => setActiveService(index)}
                      onBlur={() => setActiveService(null)}
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
                        py-7
                        text-left
                        md:py-8
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
                            md:text-[44px]
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
                            text-[clamp(2.3rem,5vw,5.4rem)]
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
    
                  )
    
                })}
    
              </div>
    
              {/* RIGHT ACTIVE SERVICE */}
    
              <div
                className="
                  col-span-12
                  mt-10
                  md:col-span-5
                  md:mt-0
                "
              >
    
                <div
                  className="
                    sticky
                    top-10
                    min-h-[470px]
                  "
                >
    
                  <AnimatePresence mode="wait">
    
                    {activeService !== null && (
    
                      <motion.div
                        key={services[activeService].title}
                        initial={{
                          opacity: 0,
                          x: 24,
                          y: 10,
                          filter: 'blur(8px)',
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          y: 0,
                          filter: 'blur(0px)',
                        }}
                        exit={{
                          opacity: 0,
                          x: 18,
                          y: 8,
                          filter: 'blur(6px)',
                        }}
                        transition={{
                          duration: 0.35,
                          ease,
                        }}
                      >
    
                        <div
                          className="
                            relative
                            aspect-[4/3]
                            w-full
                            max-w-[390px]
                            overflow-hidden
                            rounded-[18px]
                          "
                        >
    
                          <Image
                            src={services[activeService].image}
                            alt={services[activeService].title}
                            fill
                            sizes="(max-width: 768px) 100vw, 390px"
                            className="object-cover"
                          />
    
                        </div>
    
                        <div className="mt-6 flex items-center gap-2">
    
                          <span
                            style={{ color: RED }}
                            className="
                              text-lg
                              font-light
                              leading-none
                            "
                          >
                            +
                          </span>
    
                          <span
                            className="
                              text-[9px]
                              uppercase
                              tracking-[0.12em]
                              text-white/55
                            "
                          >
                            {services[activeService].label}
                          </span>
    
                        </div>
    
                        <p
                          className="
                            mt-5
                            max-w-[360px]
                            text-[14px]
                            font-medium
                            leading-[1.5]
                            text-white
                            md:text-base
                          "
                        >
                          {services[activeService].body}
                        </p>
    
                      </motion.div>
    
                    )}
    
                  </AnimatePresence>
    
                </div>
    
              </div>
    
            </div>
    
          </section>
  )
}
