import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getContent, type Locale } from '@/content'
import { RollingText } from '@/components/ui/RollingText'
import { ScrollSectionReveal } from '@/components/motion/ScrollSectionReveal'

export function PageShell({ locale, children, languageHrefs, headerVariant = 'light', revealFooter = false, hideHeader = false }: { locale: Locale; children: React.ReactNode; languageHrefs?: { pt: string; en: string }; headerVariant?: 'dark' | 'light'; revealFooter?: boolean; hideHeader?: boolean }) {
  const copy = getContent(locale)
  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]">
      {!hideHeader && (
        <div className="mx-auto max-w-[1600px] p-3 md:p-4">
          <div className={headerVariant === 'light' ? 'px-3 py-5 text-[#0A0A0A] md:px-7 md:py-6' : 'rounded-[24px] bg-[#0A0A0A] px-6 py-6 text-white md:px-9 md:py-8'}>
            <Header locale={locale} languageHrefs={languageHrefs} variant={headerVariant} />
          </div>
        </div>
      )}
      <main>{children}</main>
      {revealFooter ? (
        <ScrollSectionReveal><Footer locale={locale} copy={copy.footer} /></ScrollSectionReveal>
      ) : (
        <Footer locale={locale} copy={copy.footer} />
      )}
    </div>
  )
}

export function EditorialHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="mx-auto grid w-full max-w-[1440px] grid-cols-12 gap-x-6 gap-y-8 px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
      <p className="col-span-12 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0A0A0A]/55">/ {eyebrow}</p>
      <h1 className="col-span-12 max-w-[1100px] text-[clamp(3.5rem,8vw,8rem)] leading-[0.9] tracking-[-0.055em]">{title}</h1>
      <p className="col-span-12 max-w-2xl text-base leading-[1.6] text-[#0A0A0A]/70 md:col-start-7 md:col-span-6 md:text-lg">{description}</p>
    </section>
  )
}

export function PrimaryCta({ locale, label }: { locale: Locale; label?: string }) {
  return (
    <Link href={locale === 'pt' ? '/pt/contato' : '/en/contact'} className="group inline-flex items-center gap-2 rounded-full bg-[#6966F0] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
      <RollingText>{label ?? (locale === 'pt' ? 'Falar sobre meu projeto' : 'Tell us about your project')}</RollingText> <span aria-hidden="true">↗</span>
    </Link>
  )
}
