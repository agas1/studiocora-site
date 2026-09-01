import { Hero } from './home/Hero'
import { ProofMarquee } from './home/ProofMarquee'
import { AboutSection } from './home/AboutSection'
import { ShowcaseMarquee } from './home/ShowcaseMarquee'
import { NumbersSection } from './home/NumbersSection'
import { ServicesSection } from './home/ServicesSection'
import { ProjectsSection } from './home/ProjectsSection'
import { FaqSection } from './home/FaqSection'
import { CollaborationSection } from './home/CollaborationSection'
import { JournalSection } from './home/JournalSection'
import { ClosingCtaSection } from './home/ClosingCtaSection'
import { Footer } from './layout/Footer'
import { getContent, type Locale } from '@/content'
import { ScrollSectionReveal } from './motion/ScrollSectionReveal'

export function Landing({ locale = 'pt' }: { locale?: Locale }) {
  const copy = getContent(locale)
  return (
    <main className="min-h-screen w-full bg-white text-[#0A0A0A]">
      <ScrollSectionReveal><Hero locale={locale} copy={copy.hero} /></ScrollSectionReveal>

      <ScrollSectionReveal><ProofMarquee copy={copy.proof} /></ScrollSectionReveal>

      <ScrollSectionReveal><AboutSection locale={locale} copy={copy.about} /></ScrollSectionReveal>

      <ScrollSectionReveal><ShowcaseMarquee /></ScrollSectionReveal>

      <ScrollSectionReveal><NumbersSection copy={copy.numbers} /></ScrollSectionReveal>

      <ScrollSectionReveal><ServicesSection copy={copy.services} /></ScrollSectionReveal>

      <ProjectsSection copy={copy.projects} locale={locale} />

      <ScrollSectionReveal><FaqSection copy={copy.faq} /></ScrollSectionReveal>

      <ScrollSectionReveal><CollaborationSection copy={copy.collaboration} /></ScrollSectionReveal>

      <ScrollSectionReveal><JournalSection locale={locale} copy={copy.journal} /></ScrollSectionReveal>

      <ScrollSectionReveal><ClosingCtaSection locale={locale} copy={copy.closingCta} /></ScrollSectionReveal>

      <ScrollSectionReveal><Footer locale={locale} copy={copy.footer} /></ScrollSectionReveal>
    </main>
  )
}
