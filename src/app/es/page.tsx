import type { Metadata } from 'next'
import { LandingV2 } from '@/components/v2/LandingV2'

const languages = {
  'en-US': '/',
  'pt-BR': '/pt',
  es: '/es',
  'x-default': '/',
}

export const metadata: Metadata = {
  title: { absolute: 'Studio Cora — Branding, UX y Experiencias Digitales' },
  description:
    'Studio Cora es un estudio creativo de branding, UX, web e ingeniería — creamos marcas que son todo menos ordinarias.',
  alternates: { canonical: '/es', languages },
  openGraph: {
    locale: 'es_ES',
    url: 'https://usestudiocora.com/es',
    title: 'Studio Cora — Branding, UX y Experiencias Digitales',
    description:
      'Estudio creativo de branding, UX, web e ingeniería — creamos marcas que son todo menos ordinarias.',
  },
}

export default function Home() {
  return <LandingV2 initialLang="es" />
}
