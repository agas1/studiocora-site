'use client'

import { motion } from 'framer-motion'
import { Logo } from './Logo'
import { ContactSection } from './ContactSection'
import { TeamSection } from './TeamSection'

const ease = [0.16, 1, 0.3, 1] as const
const ACCENT = '#3D3DFF'

const services = [
  {
    title: 'BRANDING',
    body: 'Strategic thinking and visual identity that communicate what your brand really stands for.',
  },
  {
    title: 'WEBSITES',
    body: 'Modern, responsive and high-performing websites designed to deliver real experiences.',
  },
  {
    title: 'SOCIAL MEDIA',
    body: 'Consistent, creative and scroll-stopping content that builds presence and connection.',
  },
  {
    title: 'CREATIVE DIRECTION',
    body: 'From concept to execution, we shape ideas into visuals with purpose and impact.',
  },
  {
    title: 'DIGITAL EXPERIENCES',
    body: 'Interfaces, interactions and digital products designed to be intuitive, functional and beautiful.',
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

export function Landing() {
  return (
    <main className="min-h-screen w-full bg-[#EDEDED] text-[#0A0A0A]">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-6 md:px-10 md:py-8">
        {/* ====== HEADER ====== */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="grid grid-cols-12 items-start gap-x-6 gap-y-6"
        >
          <div className="col-span-12 flex items-center md:col-span-4">
            <Logo studioColor="#0A0A0A" className="h-8 w-auto md:h-10" />
          </div>

          <div className="col-span-8 hidden flex-col text-sm leading-tight md:col-span-7 md:flex">
            <p>we design</p>
            <p>brands that stand out</p>
          </div>
          <div className="hidden items-center justify-end md:col-span-1 md:flex">
            <span className="text-sm">/ 01</span>
          </div>
        </motion.header>

        {/* ====== HERO ====== */}
        <section className="mt-20 grid grid-cols-12 gap-x-6 gap-y-20 md:mt-32 md:gap-y-32">
          {/* BIG TYPE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="col-span-12"
          >
            <h1
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-center leading-[0.88] tracking-[-0.01em]"
            >
              <span className="block whitespace-nowrap text-[20vw] md:text-[15vw] lg:text-[13rem] xl:text-[16rem]">
                SOMETHING
              </span>
              <motion.span
                className="block whitespace-nowrap bg-[linear-gradient(90deg,#3D3DFF_0%,#9D9DFF_25%,#3D3DFF_50%,#1A1AE6_75%,#3D3DFF_100%)] bg-clip-text text-[15vw] text-transparent md:text-[12vw] lg:text-[11rem] xl:text-[13rem]"
                style={{ backgroundSize: '200% 100%' }}
                animate={{ backgroundPosition: ['0% 50%', '200% 50%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              >
                EXTRAORDINARY
              </motion.span>
              <span className="block whitespace-nowrap text-[20vw] md:text-[15vw] lg:text-[13rem] xl:text-[16rem]">
                IS COMING.
              </span>
            </h1>
          </motion.div>

          {/* ABOUT TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease }}
            className="col-span-12 md:col-span-5"
          >
            <p className="max-w-md text-[15px] leading-[1.45] md:text-base">
              We are Studio Cora, a creative design studio focused on branding,
              visual identity and digital experiences. We help brands connect
              with people through design, strategy and meaning.
            </p>
          </motion.div>

          {/* THUMBNAIL GRID (placeholders) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="col-span-12 grid grid-cols-3 gap-3 md:col-span-7"
          >
            <div
              style={{ backgroundColor: ACCENT }}
              className="relative aspect-[4/3] overflow-hidden text-[#EDEDED] transition-transform duration-500 ease-out hover:-translate-y-1"
            >
              <div className="flex h-full flex-col justify-between p-3 md:p-4">
                <span
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-2xl md:text-4xl"
                >
                  FORMA
                </span>
                <span className="text-[10px] uppercase tracking-widest opacity-80">
                  Project 01
                </span>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-[#0A0A0A] text-[#EDEDED] transition-transform duration-500 ease-out hover:-translate-y-1">
              <div className="flex h-full flex-col justify-between p-3 md:p-4">
                <span className="text-[10px] uppercase tracking-widest opacity-70">
                  01
                </span>
                <div
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-base leading-tight md:text-xl"
                >
                  ABOUT
                  <br />
                  VISION
                  <br />
                  WORK
                  <br />
                  CONTACT
                </div>
              </div>
            </div>
            <div
              style={{ backgroundColor: ACCENT }}
              className="relative aspect-[4/3] overflow-hidden text-[#EDEDED] transition-transform duration-500 ease-out hover:-translate-y-1"
            >
              <div className="flex h-full flex-col justify-end p-3 md:p-4">
                <p
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-sm leading-tight md:text-lg"
                >
                  building
                  <br />
                  digital
                  <br />
                  experiences
                  <br />
                  that matter.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ====== SERVICES ROW ====== */}
        <section className="mt-28 border-t border-[#0A0A0A]/30 pt-12 md:mt-44 md:pt-16">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.05, ease }}
                className="group"
              >
                <Asterisk
                  style={{ color: ACCENT }}
                  className="mb-4 h-5 w-5 transition-transform duration-500 ease-out group-hover:rotate-90 md:h-6 md:w-6"
                />
                <h3
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="mb-3 text-xl tracking-tight transition-transform duration-300 ease-out group-hover:translate-x-1 md:text-2xl"
                >
                  {s.title}
                </h3>
                <p className="text-[13px] leading-[1.45] text-[#0A0A0A]/80 md:text-sm">
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ====== TEAM ====== */}
        <TeamSection />

        {/* ====== CONTACT ====== */}
        <ContactSection />

        {/* ====== FOOTER ====== */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease }}
          className="mt-28 grid grid-cols-12 items-end gap-x-6 gap-y-8 border-t border-[#0A0A0A]/30 pt-12 md:mt-36 md:pt-16"
        >
          <div className="col-span-12 flex items-end gap-4 md:col-span-4">
            <h2
              style={{ fontFamily: 'var(--font-display)' }}
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
              className="shrink-0 transition-transform duration-300 hover:translate-y-0.5"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 7L21 21M21 21V9M21 21H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          </div>

          <div className="col-span-6 md:col-span-4">
            <p
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-base lowercase md:text-lg"
            >
              studio cora
            </p>
            <p className="text-sm text-[#0A0A0A]/80">design that connects.</p>
          </div>

          <div className="col-span-6 flex items-center justify-between md:col-span-4">
            <div>
              <a
                href="mailto:hello@usestudiocora.com"
                className="block text-sm hover:underline"
              >
                hello@usestudiocora.com
              </a>
              <a
                href="https://usestudiocora.com"
                style={{ color: ACCENT }}
                className="block text-sm hover:underline"
              >
                usestudiocora.com
              </a>
            </div>
            <SmallCoraSwirl className="h-8 w-auto md:h-10" />
          </div>
        </motion.footer>
      </div>
    </main>
  )
}
