'use client'

import Link from 'next/link'
import { RollingText } from '@/components/ui/RollingText'
import { motion } from 'framer-motion'
import type { Locale, SiteContent } from '@/content'
import { whatsappLinkProps } from '@/lib/whatsapp'

const ease = [0.16, 1, 0.3, 1] as const

export function ClosingCtaSection({ locale, copy, showTopBorder = true, compact = false }: { locale: Locale; copy: SiteContent['closingCta']; showTopBorder?: boolean; compact?: boolean }) {
  return (
    <section aria-labelledby="closing-cta-title" className={`flex items-center justify-center bg-white px-6 py-16 md:px-10 ${compact ? 'md:py-16' : 'min-h-[600px] md:min-h-[680px] md:py-20'} ${showTopBorder ? 'border-t border-[#0A0A0A]/10' : ''}`}>
      <div className="mx-auto flex max-w-[1050px] flex-col items-center text-center">
        <motion.p initial={{ opacity: 0, y: -18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.75, ease }} className="inline-flex items-center gap-2 rounded-full bg-[#F1F1F1] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em]">
          <span aria-hidden="true" className="flex size-4 items-center justify-center bg-[#6966F0] text-[11px] leading-none text-white">+</span>
          {copy.label}
        </motion.p>

        <h2 id="closing-cta-title" className="mt-8 text-[clamp(2.6rem,7vw,120px)] leading-[1.02] tracking-[-0.055em]">
          <span className="block">{copy.titleLine1}</span>
          <span className="block whitespace-nowrap">{copy.titleLine2}</span>
          <span className="block">{copy.titleLine3}</span>
        </h2>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.34, ease }}>
          <Link {...whatsappLinkProps(locale, locale === 'pt' ? '/pt/contato' : '/en/contact')} className="group mt-10 inline-flex min-h-14 items-center gap-2 rounded-full bg-[#6966F0] px-7 py-4 text-base font-bold text-white transition-[border-radius,transform] duration-200 hover:-translate-y-0.5 hover:rounded-[18px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6966F0]">
            <RollingText>{copy.cta}</RollingText><span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
