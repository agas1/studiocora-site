import type { Metadata } from 'next'
import { Landing } from '@/components/Landing'

export const metadata: Metadata = {
  title: 'Studio Cora | Branding, Design e Gestão de Redes Sociais',
  description:
    'Estúdio criativo especializado em branding, gestão de redes sociais, identidade visual, direção criativa e desenvolvimento web.',
  alternates: {
    canonical: '/pt',
    languages: {
      'pt-BR': '/pt',
      'en': '/en',
    },
  },
}

export default function HomePT() {
  return <Landing />
}
