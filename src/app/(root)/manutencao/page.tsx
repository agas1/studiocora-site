import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { StartNowSection } from '@/components/StartNowSection'
import { Footer } from '@/components/layout/Footer'
import { getContent } from '@/content'

export const metadata: Metadata = {
  title: 'Site em manutenção',
  description: 'A Studio Cora está fazendo alguns ajustes. Voltaremos em breve.',
  robots: { index: false, follow: false },
}

const maintenanceHero = {
  badge: 'Site em manutenção',
  titleLine1: 'Hello!',
  titleLine2: 'quase lá',
  connector: 'Estamos',
  descriptionLine1: 'Estamos ajustando os últimos detalhes.',
  descriptionLine2: 'Uma nova experiência chega em breve.',
  projects: 'Fale por e-mail',
  projectsHref: 'mailto:hello@usestudiocora.com',
  contact: 'Falar no WhatsApp',
  locations: ['Porto Alegre', 'São Paulo', 'Brasil'],
  statement: 'Nosso site está passando por uma atualização para entregar uma experiência ainda melhor.',
} as const

export default function MaintenancePage() {
  const copy = getContent('pt')

  return (
    <main className="maintenance-page min-h-dvh bg-white text-[#0A0A0A]">
      <Hero locale="pt" copy={maintenanceHero} variant="maintenance" />
      <StartNowSection href="mailto:hello@usestudiocora.com" compact />
      <Footer locale="pt" copy={copy.footer} />
    </main>
  )
}
