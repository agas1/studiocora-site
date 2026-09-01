'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Header } from '../layout/Header'
import { RollingText } from '@/components/ui/RollingText'
import { whatsappLinkProps } from '@/lib/whatsapp'
import type { Locale } from '@/content'

const ease = [0.16, 1, 0.3, 1] as const
const ACCENT = '#6966F0'
const RED = '#7473F5'

type HeroCopy = {
  badge: string
  titleLine1: string
  titleLine2: string
  connector?: string
  descriptionLine1: string
  descriptionLine2: string
  projects: string
  projectsHref?: string
  contact: string
  locations: readonly string[]
  statement: string
}


function HeroBackground({ blurred = false }: { blurred?: boolean }) {
  return (
    <div className="absolute inset-0">
      <Image
        src="/hero-candy-v1.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className={`object-cover object-center ${blurred ? 'scale-110 blur-[18px] saturate-75' : ''}`}
      />

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/25 to-black/90" />
      <div className="absolute inset-0 bg-[#0A0A0A]/15" />
    </div>
  )
}

export function Hero({
  locale,
  copy,
  variant = 'default',
}: {
  locale: Locale
  copy: HeroCopy
  variant?: 'default' | 'maintenance'
}) {
  const isMaintenance = variant === 'maintenance'

  const statementMotion = {
    initial: { opacity: 0, x: 30, y: 8 },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: {
      duration: 0.9,
      delay: 0.4,
      ease,
    },
  }

  const statementBlock = (
    <>

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
        {copy.statement}
      </p>

      <div className="mt-5 flex flex-wrap gap-3 md:mt-6">

        <Link
          href={copy.projectsHref ?? (locale === 'pt' ? '/pt/portfolio' : '/en/work')}
          style={{ backgroundColor: RED }}
          className={`
            rounded-full
            px-5 py-3
            ${isMaintenance ? 'text-[13px]' : 'text-[11px]'}
            font-bold
            text-white
            transition-[border-radius,transform]
            duration-300
            hover:-translate-y-0.5
            hover:rounded-[14px]
          `}
        >
          <span className="inline-flex items-center gap-2">
            <RollingText>{copy.projects}</RollingText>
            <span aria-hidden="true">↗</span>
          </span>
        </Link>

        <Link
          {...whatsappLinkProps(locale, locale === 'pt' ? '/pt/contato' : '/en/contact')}
          className={`
            rounded-full
            bg-white
            px-5 py-3
            ${isMaintenance ? 'text-[13px]' : 'text-[11px]'}
            font-bold
            text-black
            transition-[border-radius,transform]
            duration-300
            hover:-translate-y-0.5
            hover:rounded-[14px]
          `}
        >
          <span className="inline-flex items-center gap-2">
            <RollingText>{copy.contact}</RollingText>
            <span aria-hidden="true">↗</span>
          </span>
        </Link>

      </div>

    </>
  )

  const description = (
    <>
      {copy.descriptionLine1}
      <br />
      {copy.descriptionLine2}
    </>
  )

  return (
    <div className="mx-auto w-full max-w-[1600px] p-3 md:p-4">

            <section
              className={`
                relative
                flex
                flex-col
                overflow-hidden
                rounded-[26px]
                bg-black
                text-white
                ${isMaintenance
                  ? 'min-h-[calc(100svh-24px)] md:min-h-[calc(100svh-32px)]'
                  : 'h-[calc(100svh-24px)] md:h-[calc(100svh-32px)]'}
              `}
            >

              <HeroBackground blurred={isMaintenance} />

              <div className="relative z-20 flex flex-1 flex-col px-6 py-6 md:px-9 md:py-8">

                {/* =================================================
                    HEADER
                ================================================= */}

                <Header locale={locale} compactLogo={isMaintenance} />

                {/* =================================================
                    HERO CONTENT
                ================================================= */}

                <div className={`flex min-h-0 flex-1 flex-col justify-between ${isMaintenance ? 'pt-10 md:pt-14' : 'pt-8 md:pt-12'}`}>

                  <motion.div
                    initial={{ opacity: 0, x: -34, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{
                      duration: 1,
                      delay: 0.15,
                      ease,
                    }}
                    className={isMaintenance ? 'w-full' : 'max-w-[1150px]'}
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

                      {copy.badge}
                    </div>

                    <h1
                      style={isMaintenance ? undefined : { fontFamily: 'var(--font-display)' }}
                      className={isMaintenance
                        ? 'max-w-[1100px] text-[clamp(3.25rem,7.5vw,8rem)] font-medium leading-[0.88] tracking-[-0.055em]'
                        : 'uppercase text-[15vw] font-black leading-[0.74] tracking-[-0.045em] sm:text-[13vw] md:text-[8.3vw] lg:text-[7rem] xl:text-[8rem]'}
                    >
                      {isMaintenance ? (
                        <>
                          <span className="block">{copy.titleLine1}</span>
                          <span className="block">{copy.connector}</span>
                          <span className="block" style={{ color: ACCENT }}>{copy.titleLine2}</span>
                        </>
                      ) : (
                        <>
                          {copy.titleLine1}
                          <br />
                          {copy.connector ?? 'MEAN'}{' '}
                          <span style={{ color: ACCENT }}>{copy.titleLine2}</span>
                        </>
                      )}
                    </h1>

                    {isMaintenance ? (
                      <div className="mt-6 grid grid-cols-12 items-start gap-x-6 gap-y-7 md:mt-8">

                        <p className="col-span-12 max-w-lg text-sm font-medium leading-[1.5] text-white/80 md:col-span-7 md:text-base">
                          {description}
                        </p>

                        <motion.div
                          {...statementMotion}
                          className="col-span-12 md:col-span-5 md:-mt-5 md:pl-6 lg:pl-10"
                        >
                          {statementBlock}
                        </motion.div>

                      </div>
                    ) : (
                      <p className="mt-6 max-w-md text-[12px] font-medium leading-[1.5] text-white/80 md:mt-8 md:text-sm">
                        {description}
                      </p>
                    )}

                  </motion.div>

                  {/* BOTTOM */}

                  <div
                    className={`mt-8 grid grid-cols-12 items-end gap-x-6 gap-y-5 md:mt-10 ${isMaintenance ? 'mb-2 md:mb-4' : ''}`}
                  >

                    <motion.div
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.7,
                      }}
                      className={`col-span-12 grid grid-cols-2 gap-4 font-semibold uppercase tracking-[0.14em] text-white/75 md:col-span-7 md:grid-cols-3 ${isMaintenance ? 'text-[11px] md:text-xs' : 'text-[9px]'}`}
                    >
                      {copy.locations.map((location) => <span key={location}>+ {location}</span>)}
                    </motion.div>

                    {!isMaintenance && (
                      <motion.div
                        {...statementMotion}
                        className="col-span-12 md:col-span-5"
                      >
                        {statementBlock}
                      </motion.div>
                    )}

                  </div>

                </div>

              </div>

            </section>

          </div>
  )
}
