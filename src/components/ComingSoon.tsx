'use client'

import { motion } from 'framer-motion'
import { Logo } from './Logo'

const ease = [0.16, 1, 0.3, 1] as const

export function ComingSoon() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0D0D2A] text-[#F7F7FF]">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4140E4] opacity-30 blur-[120px]" />
        <div className="absolute right-[10%] bottom-[15%] h-[40vmin] w-[40vmin] rounded-full bg-[#7371F2] opacity-20 blur-[100px]" />
      </div>

      <div className="relative flex min-h-screen flex-col px-6 py-8 md:px-12 md:py-10">
        {/* Top bar */}
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="flex items-center justify-between"
        >
          <Logo studioColor="#F7F7FF" className="h-7 w-auto md:h-8" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#B6B5FF]/70 md:text-xs">
            Est. 2026
          </span>
        </motion.header>

        {/* Center */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#B6B5FF]/20 bg-[#F7F7FF]/[0.03] px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-[#B6B5FF] md:text-xs"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF1515]" />
            Under construction
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-[18vw] font-black leading-[0.85] tracking-[-0.04em] md:text-[14vw] lg:text-[12rem] xl:text-[14rem]"
          >
            <span className="block">SOMETHING</span>
            <motion.span
              className="block bg-[linear-gradient(90deg,#7371F2_0%,#B6B5FF_25%,#7371F2_50%,#4140E4_75%,#7371F2_100%)] bg-clip-text text-transparent"
              style={{ backgroundSize: '200% 100%' }}
              animate={{ backgroundPosition: ['0% 50%', '200% 50%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            >
              EXTRAORDINARY
            </motion.span>
            <span className="block">IS COMING.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease }}
            className="mt-8 max-w-xl text-balance text-base text-[#B6B5FF]/80 md:text-lg"
          >
            A new home for Studio Cora is on the way. One in a million, one in a
            crowd — anything but ordinary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <a
              href="mailto:hello@usestudiocora.com"
              className="group inline-flex items-center gap-3 rounded-full bg-[#F7F7FF] px-7 py-3.5 text-sm font-medium text-[#0D0D2A] transition-transform duration-300 hover:scale-[1.02]"
            >
              Get in touch
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path
                  d="M1 7h12M8 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <span
              aria-disabled="true"
              className="inline-flex cursor-not-allowed items-center gap-3 rounded-full border border-[#B6B5FF]/15 px-7 py-3.5 text-sm font-medium text-[#B6B5FF]/40"
            >
              LinkedIn — soon
            </span>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.9, ease }}
          className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-[#B6B5FF]/10 pt-6 text-[11px] uppercase tracking-[0.2em] text-[#B6B5FF]/50 md:flex-row md:items-center md:text-xs"
        >
          <span>© {new Date().getFullYear()} Studio Cora</span>
          <span>Launching soon</span>
          <a
            href="mailto:hello@usestudiocora.com"
            className="transition-colors duration-300 hover:text-[#F7F7FF]"
          >
            hello@usestudiocora.com
          </a>
        </motion.footer>
      </div>
    </main>
  )
}
