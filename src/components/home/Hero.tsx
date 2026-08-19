'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Header } from '../layout/Header'

const ease = [0.16, 1, 0.3, 1] as const
const ACCENT = '#3D3DFF'
const RED = '#FF3B30'

const HERO_IMAGES = ['/hero1.jpg', '/hero2.jpg'] as const


function HeroBackground() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((current) => (current + 1) % HERO_IMAGES.length)
    }, 5500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0">
      <AnimatePresence mode="sync">
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              x: [0, 8, 0],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative h-full w-full"
          >
            <Image
              src={HERO_IMAGES[idx]}
              alt="Studio Cora"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/25 to-black/90" />
      <div className="absolute inset-0 bg-[#0D0D2A]/15" />
    </div>
  )
}

export function Hero() {
  return (
    <div className="mx-auto w-full max-w-[1600px] p-3 md:p-4">
    
            <section
              className="
                relative
                h-[calc(100svh-24px)]
                overflow-hidden
                rounded-[26px]
                bg-black
                text-white
                md:h-[calc(100svh-32px)]
              "
            >
    
              <HeroBackground />
    
              <div className="relative z-20 flex h-full flex-col px-6 py-6 md:px-9 md:py-8">
    
                {/* =================================================
                    HEADER
                ================================================= */}
    
                <Header />
    
                {/* =================================================
                    HERO CONTENT
                ================================================= */}
    
                <div className="flex min-h-0 flex-1 flex-col justify-between pt-8 md:pt-12">
    
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 1,
                      delay: 0.15,
                      ease,
                    }}
                    className="max-w-[1150px]"
                  >
    
                    <div
                      className="
                        mb-5
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-white
                        px-3.5
                        py-2
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-black
                        md:mb-7
                      "
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-sm"
                        style={{ backgroundColor: RED }}
                      />
    
                      Creative design studio
                    </div>
    
                    <h1
                      style={{
                        fontFamily: 'var(--font-display)',
                      }}
                      className="
                        uppercase
                        text-[15vw]
                        font-black
                        leading-[0.74]
                        tracking-[-0.045em]
                        sm:text-[13vw]
                        md:text-[8.3vw]
                        lg:text-[8rem]
                        xl:text-[9.5rem]
                      "
                    >
                      SAY LESS.
                      <br />
    
                      MEAN{' '}
                      <span style={{ color: ACCENT }}>
                        MORE.
                      </span>
                    </h1>
    
                    <p
                      className="
                        mt-6
                        max-w-md
                        text-[12px]
                        font-medium
                        leading-[1.5]
                        text-white/80
                        md:mt-8
                        md:text-sm
                      "
                    >
                      Your brand doesn&apos;t need to be louder.
                      <br />
                      It needs to be remembered.
                    </p>
    
                  </motion.div>
    
                  {/* BOTTOM */}
    
                  <div
                    className="
                      mt-8
                      grid grid-cols-12
                      items-end gap-x-6 gap-y-5
                      md:mt-10
                    "
                  >
    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.7,
                      }}
                      className="
                        col-span-12
                        grid grid-cols-2
                        gap-4
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-white/75
                        md:col-span-7
                        md:grid-cols-3
                      "
                    >
                      <span>+ Porto Alegre</span>
                      <span>+ São Paulo</span>
                      <span>+ Brazil</span>
                    </motion.div>
    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.9,
                        delay: 0.4,
                        ease,
                      }}
                      className="col-span-12 md:col-span-5"
                    >
    
                      <p
                        className="
                          max-w-[470px]
                          text-[18px]
                          font-medium
                          leading-[1.05]
                          tracking-[-0.03em]
                          md:text-[26px]
                        "
                      >
                        Branding, social media and digital experiences for brands
                        that refuse the ordinary.
                      </p>
    
                      <div className="mt-5 flex flex-wrap gap-3 md:mt-6">
    
                        <Link
                          href="/portfolio"
                          style={{ backgroundColor: RED }}
                          className="
                            rounded-full
                            px-5 py-3
                            text-[11px]
                            font-bold
                            text-white
                            transition-transform
                            duration-300
                            hover:-translate-y-0.5
                          "
                        >
                          View projects ↗
                        </Link>
    
                        <Link
                          href="/contato"
                          className="
                            rounded-full
                            bg-white
                            px-5 py-3
                            text-[11px]
                            font-bold
                            text-black
                            transition-transform
                            duration-300
                            hover:-translate-y-0.5
                          "
                        >
                          Contact ↗
                        </Link>
    
                      </div>
    
                    </motion.div>
    
                  </div>
    
                </div>
    
              </div>
    
            </section>
    
          </div>
  )
}
