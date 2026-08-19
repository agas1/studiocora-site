import { ContactSection } from './ContactSection'
import { TeamSection } from './TeamSection'
import { Hero } from './home/Hero'
import { ProofMarquee } from './home/ProofMarquee'
import { AboutSection } from './home/AboutSection'
import { ShowcaseMarquee } from './home/ShowcaseMarquee'
import { NumbersSection } from './home/NumbersSection'
import { ServicesSection } from './home/ServicesSection'
import { Footer } from './layout/Footer'

export function Landing() {
  return (
    <main className="min-h-screen w-full bg-[#EDEDED] text-[#0A0A0A]">
      <Hero />

      <ProofMarquee />

      <AboutSection />

      <ShowcaseMarquee />

      <NumbersSection />

      <ServicesSection />

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
        <div id="work">
          <TeamSection />
        </div>

        <div id="contact">
          <ContactSection />
        </div>

        <Footer />
      </div>
    </main>
  )
}
