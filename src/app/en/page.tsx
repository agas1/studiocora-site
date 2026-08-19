import type { Metadata } from 'next'
import { Landing } from '@/components/Landing'

export const metadata: Metadata = {
  title: 'Studio Cora | Branding, Design & Social Media',
  description:
    'Creative studio specializing in branding, social media, visual identity, creative direction and web development.',
  alternates: {
    canonical: '/en',
    languages: {
      'pt-BR': '/pt',
      'en': '/en',
    },
  },
}

export default function HomeEN() {
  return <Landing />
}
