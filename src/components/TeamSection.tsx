'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { SiteContent } from '@/content'

const ease = [0.16, 1, 0.3, 1] as const
const ACCENT = '#6966F0'

type Member = {
  firstName: string
  lastName: string
  initials: string
  photoUrl?: string
}

const team: Member[] = [
  {
    firstName: 'Amanda',
    lastName: 'Maximo',
    initials: 'AM',
    photoUrl: '/amanda.png',
  },
  {
    firstName: 'Agatha',
    lastName: 'Selbach',
    initials: 'AS',
    photoUrl: '/agatha.png',
  },
]

export function TeamSection({ copy }: { copy: SiteContent['team'] }) {
  return (
    <section
      id="team"
      className="mt-16 border-t border-[#0A0A0A]/30 pt-10 md:mt-24 md:pt-14"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease }}
        className="mb-10 grid grid-cols-12 gap-x-6 gap-y-4 md:mb-14"
      >
        <h2
          style={{ fontFamily: 'var(--font-display)' }}
          className="col-span-12 text-[10.5vw] leading-[0.95] tracking-[-0.01em] md:col-span-7 md:text-[4.5vw] lg:text-[4.7rem]"
        >
          {copy.titleLine1} <br />
          {copy.titleLine2} <span style={{ color: ACCENT }}>{copy.titleAccent}</span>
        </h2>
        <p className="col-span-12 max-w-sm self-end text-[15px] leading-[1.5] text-[#0A0A0A]/80 md:col-span-5 md:text-base">
          {copy.description}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2">
        {team.map((m, i) => (
          <motion.article
            key={`${m.firstName}-${m.lastName}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.08, ease }}
            className="group grid grid-cols-5 gap-x-5 gap-y-4 sm:gap-x-6"
          >
            {/* Avatar — photo if available, otherwise initials placeholder */}
            <div className="col-span-2 sm:col-span-2">
              <div className="relative aspect-square w-full overflow-hidden bg-[#D9D9D9] transition-transform duration-500 ease-out group-hover:-translate-y-1">
                {m.photoUrl ? (
                  <Image
                    src={m.photoUrl}
                    alt={`${m.firstName} ${m.lastName}`}
                    fill
                    sizes="(max-width: 768px) 40vw, 20vw"
                    className="object-cover grayscale"
                  />
                ) : (
                  <span
                    aria-hidden
                    style={{ fontFamily: 'var(--font-display)' }}
                    className="absolute inset-0 flex items-center justify-center text-[18vw] text-[#0A0A0A]/70 sm:text-[6vw] md:text-[4vw] lg:text-[5rem]"
                  >
                    {m.initials}
                  </span>
                )}
              </div>
            </div>

            {/* Text */}
            <div className="col-span-3 flex flex-col justify-end pb-1 sm:col-span-3">
              <span className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[#0A0A0A]/60">
                / {copy.members[i].label}
              </span>
              <h3
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-[8vw] leading-[0.95] tracking-[-0.01em] transition-transform duration-300 ease-out group-hover:translate-x-1 md:text-[2.7vw] lg:text-[3rem]"
              >
                {m.firstName.toUpperCase()}
                <br />
                {m.lastName.toUpperCase()}
              </h3>
              <p className="mt-3 text-[13px] leading-[1.45] text-[#0A0A0A]/80 md:text-sm">
                {copy.members[i].role}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
