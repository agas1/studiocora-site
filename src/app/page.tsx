import type { Metadata } from 'next'
import { LandingV2 } from '@/components/v2/LandingV2'

const languages = {
  'en-US': '/',
  'pt-BR': '/pt',
  es: '/es',
  'x-default': '/',
}

export const metadata: Metadata = {
  title: { absolute: 'Studio Cora — Branding, UX & Digital Experiences' },
  description:
    'Studio Cora is a creative studio for branding, UX, web and engineering — we build brands that are anything but ordinary.',
  alternates: { canonical: '/', languages },
  openGraph: {
    locale: 'en_US',
    url: 'https://usestudiocora.com',
  },
}

export default function Home() {
  return <LandingV2 initialLang="en" />
}
