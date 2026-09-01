'use client'

import { motion } from 'framer-motion'
import { ScrollSectionReveal } from '@/components/motion/ScrollSectionReveal'
import { RollingText } from '@/components/ui/RollingText'
import { whatsappLinkProps } from '@/lib/whatsapp'

const ease = [0.16, 1, 0.3, 1] as const

export function StartNowSection({ locale = 'pt', href = '#contact', compact = false }: { locale?: 'pt' | 'en'; href?: string; compact?: boolean }) {
  return (
    <ScrollSectionReveal>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease }}
        className={`flex flex-col items-center justify-center px-5 text-center ${compact ? 'min-h-[480px] py-14 md:min-h-[560px] md:py-16' : 'min-h-[620px] py-24 md:min-h-[720px]'}`}
      >
        <div className="inline-flex w-fit items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-[#0A0A0A]">
          <span aria-hidden="true" className="text-[#6966F0]">✦</span>
          {locale === 'pt' ? 'Comece agora' : 'Start now'}
          <span aria-hidden="true" className="text-[#6966F0]">✦</span>
        </div>
        <h2 aria-label={locale === 'pt' ? 'Transforme suas ideias hoje mesmo' : 'Transform your ideas today'} className="mt-5 max-w-[900px] text-[clamp(2.6rem,7vw,120px)] leading-[1.02] tracking-[-0.055em]">
          {locale === 'pt' ? (
            <><span className="block">Transforme</span><span className="block whitespace-nowrap">suas ideias hoje</span><span className="block">mesmo</span></>
          ) : (
            <><span className="block">Transform</span><span className="block">your ideas</span><span className="block">today</span></>
          )}
        </h2>
        <a {...whatsappLinkProps(locale, href)} className="group mt-10 inline-flex min-h-14 items-center gap-2 rounded-full bg-[#6966F0] px-7 py-4 text-sm font-bold text-white shadow-[0_0_0_rgba(105,102,240,0)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(105,102,240,0.65)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6966F0]">
          <RollingText>{locale === 'pt' ? 'Fale com nosso time de criativos' : 'Talk to our creative team'}</RollingText>
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
        </a>
      </motion.div>
    </ScrollSectionReveal>
  )
}
