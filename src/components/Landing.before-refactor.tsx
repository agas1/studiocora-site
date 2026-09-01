'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Logo } from './Logo'
import { ContactSection } from './ContactSection'
import { TeamSection } from './TeamSection'

const HERO_IMAGES = ['/hero1.jpg', '/hero2.jpg'] as const

const SHOWCASE_IMAGES = [
  '/hero1.jpg',
  '/hero2.jpg',
  '/hero1.jpg',
  '/hero2.jpg',
] as const

const ease = [0.16, 1, 0.3, 1] as const
const ACCENT = '#6966F0'
const RED = '#7473F5'

const PARTNERS = [
  'BRANDING',
  'SOCIAL MEDIA',
  'WEB DESIGN',
  'CREATIVE DIRECTION',
  'DIGITAL EXPERIENCES',
  'BRANDING',
  'SOCIAL MEDIA',
  'WEB DESIGN',
] as const

const metrics = [
  {
    value: '7+',
    label: 'Creative experience',
    body: 'Years building identities, visual systems and creative experiences.',
  },
  {
    value: '8+',
    label: 'Years in technology',
    body: 'Technology, infrastructure and digital products supporting real businesses.',
  },
  {
    value: '4+',
    label: 'Years in development',
    body: 'Building websites, platforms and digital experiences from idea to production.',
  },
  {
    value: '2',
    label: 'Co-founders',
    body: 'Design and engineering working together from strategy through execution.',
  },
]

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

function Asterisk({
  className,
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
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

function SmallCoraSwirl({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M19.89 16.004c.01-.008.02-.016.029-.023C22.135 14.05 24.4 13.27 27.247 14.51c6.325 2.753 4.542 12.46-2.41 12.875-3.198.19-3.999-1.543-6.35-2.863-3.626-2.037-5.115.918-8.05 2.2C6.27 28.546.796 26.516.076 21.728-.752 16.22 5.352 12.29 10.183 14.674c2.076 1.025 3.927 3.24 6.48 2.505.068-.02.125.059.082.118-.094.13-.261.286-.306.328-.01.01-.015.018-.022.027l-.108.138c0 0-.004.005-.006.008-.427.499-.98 1.197-1.44 1.635-.179.17-.436.36-.697.314-.506-.09-1.535-1.738-1.897-2.196-1.566-1.978-3.568-3.555-6.268-2.892C-.17 16.173 1.954 27.9 8.687 26.718c4.115-.722 7.741-7.333 10.609-10.17.006-.007.026-.029.032-.035.26-.266.365-.336.562-.509Z"
        fill={ACCENT}
      />
    </svg>
  )
}

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
      <div className="absolute inset-0 bg-[#0A0A0A]/15" />
    </div>
  )
}

function ShowcaseMarquee() {
  const duplicated = [...SHOWCASE_IMAGES, ...SHOWCASE_IMAGES]

  return (
    <section className="w-full overflow-hidden py-6 md:py-10">
      <motion.div
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="flex w-max gap-3 md:gap-4"
      >
        {duplicated.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="
              relative
              h-[310px]
              w-[230px]
              shrink-0
              overflow-hidden
              rounded-[18px]
              sm:h-[380px]
              sm:w-[285px]
              md:h-[430px]
              md:w-[330px]
            "
          >
            <Image
              src={src}
              alt={`Studio Cora showcase ${index + 1}`}
              fill
              sizes="(max-width: 768px) 230px, 330px"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/5" />
          </div>
        ))}
      </motion.div>
    </section>
  )
}

function RollingMetric({
  value,
  index,
}: {
  value: string
  index: number
}) {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        initial={{
          y: 70,
          opacity: 0,
          filter: 'blur(8px)',
        }}
        whileInView={{
          y: [70, -32, 22, -10, 0],
          opacity: [0, 1, 1, 1, 1],
          filter: [
            'blur(8px)',
            'blur(3px)',
            'blur(2px)',
            'blur(1px)',
            'blur(0px)',
          ],
        }}
        viewport={{
          once: true,
          margin: '-80px',
        }}
        transition={{
          duration: 1.3,
          delay: index * 0.12,
          ease,
          times: [0, 0.35, 0.6, 0.82, 1],
        }}
        className="
          text-[58px]
          font-semibold
          leading-none
          tracking-[-0.07em]
          md:text-[72px]
          lg:text-[84px]
        "
      >
        {value}
      </motion.div>
    </div>
  )
}

export function Landing() {
  const [activeService, setActiveService] = useState<number | null>(null)
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false)

  return (
    <main className="min-h-screen w-full bg-[#EDEDED] text-[#0A0A0A]">

      {/* =====================================================
          HERO
      ===================================================== */}

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

            <motion.header
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              onMouseLeave={() => setServicesMenuOpen(false)}
              className="relative z-50 flex items-center justify-between"
            >

              {/* LOGO */}

              <Link
                href="/"
                aria-label="Studio Cora"
                className="shrink-0"
              >
                <Logo
                  studioColor="#FFFFFF"
                  className="h-9 w-auto md:h-11"
                />
              </Link>

              {/* DESKTOP NAV */}

              <nav
                className="
                  hidden
                  items-center
                  gap-9
                  text-[14px]
                  font-semibold
                  tracking-[-0.025em]
                  lg:flex
                  xl:gap-11
                  xl:text-[15px]
                "
              >

                <Link
                  href="/"
                  className="
                    transition-colors
                    duration-200
                    hover:text-[#7473F5]
                  "
                >
                  Home
                </Link>

                <a
                  href="#studio"
                  className="
                    transition-colors
                    duration-200
                    hover:text-[#7473F5]
                  "
                >
                  Studio
                </a>

                <a
                  href="#work"
                  className="
                    transition-colors
                    duration-200
                    hover:text-[#7473F5]
                  "
                >
                  Work
                </a>

                {/* SERVICES MENU */}

                <div
                  className="relative"
                  onMouseEnter={() => setServicesMenuOpen(true)}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setServicesMenuOpen((current) => !current)
                    }
                    className="
                      group
                      relative
                      flex
                      items-center
                      gap-2
                      transition-colors
                      duration-200
                      hover:text-[#7473F5]
                    "
                  >
                    Services

                    <motion.span
                      animate={{
                        rotate: servicesMenuOpen ? 180 : 0,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="text-[17px] font-normal"
                    >
                     ⌄
                    </motion.span>

                    <span
                      className="
                        absolute
                        -right-5
                        -top-4
                        flex h-6 min-w-6
                        items-center justify-center
                        rounded-full
                        bg-[#7473F5]
                        px-1.5
                        text-[9px]
                        font-bold
                        text-white
                      "
                    >
                      05
                    </span>
                  </button>
                </div>

                <Link
                  href="/blog"
                  className="
                    transition-colors
                    duration-200
                    hover:text-[#7473F5]
                  "
                >
                  Insights
                </Link>

              </nav>

              {/* CTA */}

              <Link
                href="/contato"
                className="
                  group
                  flex
                  items-center
                  gap-3
                  rounded-full
                  bg-white
                  px-4 py-2.5
                  text-[12px]
                  font-semibold
                  text-black
                  transition-transform
                  duration-300
                  hover:-translate-y-0.5
                  md:px-5
                  md:py-3
                  md:text-[14px]
                "
              >
                <span className="hidden sm:inline">
                  Let&apos;s talk
                </span>

                <span
                  className="
                    text-base
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                >
                  ↗
                </span>
              </Link>

              {/* ===============================================
                  SERVICES MEGA MENU
              =============================================== */}

              <AnimatePresence>

                {servicesMenuOpen && (

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -12,
                      scale: 0.985,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                      scale: 0.99,
                    }}
                    transition={{
                      duration: 0.3,
                      ease,
                    }}
                    onMouseEnter={() => setServicesMenuOpen(true)}
                    className="
                      absolute
                      left-0
                      right-0
                      top-[calc(100%+20px)]
                      hidden
                      overflow-hidden
                      rounded-[22px]
                      border border-white/10
                      bg-[#070707]
                      p-7
                      text-white
                      shadow-2xl
                      lg:block
                      xl:p-9
                    "
                  >

                    <div
                      className="
                        grid grid-cols-12
                        gap-x-8 gap-y-8
                      "
                    >

                      {/* IMAGE / FEATURE */}

                      <div className="col-span-3">

                        <div
                          className="
                            relative
                            aspect-[4/3]
                            overflow-hidden
                            rounded-[14px]
                          "
                        >
                          <Image
                            src="/hero2.jpg"
                            alt="Studio Cora creative work"
                            fill
                            sizes="280px"
                            className="
                              object-cover
                              transition-transform
                              duration-700
                              hover:scale-105
                            "
                          />

                          <div className="absolute inset-0 bg-black/10" />
                        </div>

                        <p
                          className="
                            mt-4
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.14em]
                            text-white/50
                          "
                        >
                          Studio Cora
                        </p>

                        <p
                          className="
                            mt-2
                            max-w-[240px]
                            text-[13px]
                            leading-[1.45]
                            text-white/80
                          "
                        >
                          Strategy, design and digital experiences for brands
                          that refuse the ordinary.
                        </p>

                      </div>

                      {/* SERVICES */}

                      <div className="col-span-6">

                        <p
                          className="
                            mb-6
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.16em]
                            text-white/40
                          "
                        >
                          Services
                        </p>

                        <div
                          className="
                            grid grid-cols-2
                            gap-x-8 gap-y-5
                          "
                        >

                          <Link
                            href="/branding"
                            className="
                              group
                              text-[20px]
                              font-semibold
                              tracking-[-0.035em]
                              transition-colors
                              hover:text-[#7473F5]
                            "
                          >
                            Branding
                            <span
                              className="
                                ml-2
                                inline-block
                                text-sm
                                opacity-0
                                transition-all
                                group-hover:translate-x-1
                                group-hover:opacity-100
                              "
                            >
                              ↗
                            </span>
                          </Link>

                          <Link
                            href="/gestao-de-redes-sociais"
                            className="
                              group
                              text-[20px]
                              font-semibold
                              tracking-[-0.035em]
                              transition-colors
                              hover:text-[#7473F5]
                            "
                          >
                            Social Media
                            <span
                              className="
                                ml-2
                                inline-block
                                text-sm
                                opacity-0
                                transition-all
                                group-hover:translate-x-1
                                group-hover:opacity-100
                              "
                            >
                              ↗
                            </span>
                          </Link>

                          <Link
                            href="/direcao-criativa"
                            className="
                              group
                              text-[20px]
                              font-semibold
                              tracking-[-0.035em]
                              transition-colors
                              hover:text-[#7473F5]
                            "
                          >
                            Creative Direction
                            <span
                              className="
                                ml-2
                                inline-block
                                text-sm
                                opacity-0
                                transition-all
                                group-hover:translate-x-1
                                group-hover:opacity-100
                              "
                            >
                              ↗
                            </span>
                          </Link>

                          <Link
                            href="/landing-pages"
                            className="
                              group
                              text-[20px]
                              font-semibold
                              tracking-[-0.035em]
                              transition-colors
                              hover:text-[#7473F5]
                            "
                          >
                            Web Design
                            <span
                              className="
                                ml-2
                                inline-block
                                text-sm
                                opacity-0
                                transition-all
                                group-hover:translate-x-1
                                group-hover:opacity-100
                              "
                            >
                              ↗
                            </span>
                          </Link>

                          <Link
                            href="/desenvolvimento-web"
                            className="
                              group
                              text-[20px]
                              font-semibold
                              tracking-[-0.035em]
                              transition-colors
                              hover:text-[#7473F5]
                            "
                          >
                            Development
                            <span
                              className="
                                ml-2
                                inline-block
                                text-sm
                                opacity-0
                                transition-all
                                group-hover:translate-x-1
                                group-hover:opacity-100
                              "
                            >
                              ↗
                            </span>
                          </Link>

                        </div>

                      </div>

                      {/* EXPLORE */}

                      <div className="col-span-3">

                        <p
                          className="
                            mb-6
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.16em]
                            text-white/40
                          "
                        >
                          Explore
                        </p>

                        <div className="flex flex-col gap-4">

                          <Link
                            href="/portfolio"
                            className="
                              text-[14px]
                              font-semibold
                              transition-colors
                              hover:text-[#7473F5]
                            "
                          >
                            Selected Work ↗
                          </Link>

                          <Link
                            href="/sobre"
                            className="
                              text-[14px]
                              font-semibold
                              transition-colors
                              hover:text-[#7473F5]
                            "
                          >
                            About Studio ↗
                          </Link>

                          <Link
                            href="/blog"
                            className="
                              text-[14px]
                              font-semibold
                              transition-colors
                              hover:text-[#7473F5]
                            "
                          >
                            Insights ↗
                          </Link>

                          <Link
                            href="/contato"
                            className="
                              text-[14px]
                              font-semibold
                              transition-colors
                              hover:text-[#7473F5]
                            "
                          >
                            Contact ↗
                          </Link>

                        </div>

                      </div>

                    </div>

                  </motion.div>

                )}

              </AnimatePresence>

            </motion.header>

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

      {/* =====================================================
          PROOF / MARQUEE STRIP
      ===================================================== */}

      <section
        className="
          mx-auto
          w-full
          max-w-[1600px]
          overflow-hidden
          border-y
          border-dashed
          border-[#0A0A0A]/20
          bg-[#EDEDED]
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
              bg-[#EDEDED]
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
              7+ YEARS OF CREATIVE EXPERIENCE
              <br />
              BUILDING BRANDS &amp; DIGITAL EXPERIENCES.
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

                {PARTNERS.map((partner, index) => (
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

                {PARTNERS.map((partner, index) => (
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

      {/* =====================================================
          WHO WE ARE
      ===================================================== */}

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

      {/* SHOWCASE */}

      <ShowcaseMarquee />

      {/* =====================================================
          BY THE NUMBERS
      ===================================================== */}

      <section
        className="
          mx-auto
          w-full
          max-w-[1440px]
          px-6
          py-20
          md:px-10
          md:py-28
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

            By the numbers
          </div>

        </motion.div>

        <div className="grid grid-cols-2 gap-x-7 gap-y-14 md:grid-cols-4">

          {metrics.map((metric, index) => (

            <motion.div
              key={metric.label}
              initial={{
                opacity: 0,
                y: 18,
              }}
              whileInView={{
                opacity: 1,
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

      {/* =====================================================
          SERVICES
      ===================================================== */}

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

      {/* =====================================================
          REST
      ===================================================== */}

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">

        <div id="work">
          <TeamSection />
        </div>

        <div id="contact">
          <ContactSection />
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{
            once: true,
            margin: '-40px',
          }}
          transition={{
            duration: 0.7,
            ease,
          }}
          className="
            mt-16
            grid grid-cols-12
            items-end
            gap-x-6 gap-y-8
            border-t border-[#0A0A0A]/30
            pt-8
            pb-10
            md:mt-24
            md:pt-10
          "
        >

          <div className="col-span-12 flex items-end gap-4 md:col-span-4">

            <h2
              style={{
                fontFamily: 'var(--font-display)',
              }}
              className="text-2xl leading-[0.95] md:text-3xl"
            >
              LET&apos;S CREATE
              <br />
              SOMETHING GREAT.
            </h2>

            <a
              href="mailto:hello@usestudiocora.com"
              aria-label="Get in touch"
              style={{ color: ACCENT }}
              className="
                shrink-0
                transition-transform
                duration-300
                hover:translate-y-0.5
              "
            >
              ↗
            </a>

          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-4">

            <p
              style={{
                fontFamily: 'var(--font-display)',
              }}
              className="text-base lowercase md:text-lg"
            >
              studiocora
            </p>

            <p className="text-sm text-[#0A0A0A]/80">
              design that connects.
            </p>

          </div>

          <div
            className="
              col-span-12
              flex items-center justify-between
              sm:col-span-6
              md:col-span-4
            "
          >

            <div>

              <a
                href="mailto:hello@usestudiocora.com"
                className="block text-sm hover:underline"
              >
                hello@usestudiocora.com
              </a>

              <Link
                href="/"
                style={{ color: ACCENT }}
                className="block text-sm hover:underline"
              >
                usestudiocora.com
              </Link>

            </div>

            <SmallCoraSwirl className="h-8 w-auto md:h-10" />

          </div>

        </motion.footer>

      </div>

    </main>
  )
}