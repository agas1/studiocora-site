import type { Metadata } from 'next'
import { LandingV2 } from '@/components/v2/LandingV2'

const languages = {
  'en-US': '/',
  'pt-BR': '/pt',
  es: '/es',
  'x-default': '/',
}

export const metadata: Metadata = {
  title: { absolute: 'Studio Cora — Branding, UX e Experiências Digitais' },
  description:
    'Studio Cora é um estúdio criativo de branding, UX, web e engenharia — criamos marcas que são tudo menos comuns.',
  alternates: { canonical: '/pt', languages },
  openGraph: {
    locale: 'pt_BR',
    url: 'https://usestudiocora.com/pt',
    title: 'Studio Cora — Branding, UX e Experiências Digitais',
    description:
      'Estúdio criativo de branding, UX, web e engenharia — criamos marcas que são tudo menos comuns.',
  },
}

export default function Home() {
  return <LandingV2 initialLang="pt" />
}
