'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Logo } from './Logo'
import { ContactSection } from './ContactSection'
import { TeamSection } from './TeamSection'
import { Hero } from './home/Hero'
import { ProofMarquee } from './home/ProofMarquee'
import { AboutSection } from './home/AboutSection'
import { ShowcaseMarquee } from './home/ShowcaseMarquee'
import { NumbersSection } from './home/NumbersSection'
import { ServicesSection } from './home/ServicesSection'

const HERO_IMAGES = ['/hero1.jpg', '/hero2.jpg'] as const


const ease = [0.16, 1, 0.3, 1] as const
const ACCENT = '#3D3DFF'
const RED = '#FF3B30'

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

export function Landing() {
  const [activeService, setActiveService] = useState<number | null>(null)
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false)

  return (
    <main className="min-h-screen w-full bg-[#EDEDED] text-[#0A0A0A]">

      {/* =====================================================
          HERO
      ===================================================== */}

            <Hero />

            <ProofMarquee />

            <AboutSection />

      {/* SHOWCASE */}

      <ShowcaseMarquee />

            <NumbersSection />

            <ServicesSection />

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