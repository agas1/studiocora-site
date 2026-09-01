import type { Metadata } from 'next'
import { GoogleTagManager } from '@next/third-parties/google'
import { OrganizationSchema } from '@/components/OrganizationSchema'
import { MotionAccessibility } from './MotionAccessibility'
import '@/styles/globals.css'

export const sharedMetadata: Metadata = {
  metadataBase: new URL('https://usestudiocora.com'),
  title: {
    default: 'Studio Cora | Branding, Design e Gestão de Redes Sociais',
    template: '%s | Studio Cora',
  },
  description:
    'A Studio Cora é um estúdio de design especializado em gestão de redes sociais, branding, identidade visual, direção criativa e experiências digitais.',
  authors: [{ name: 'Studio Cora' }],
  creator: 'Studio Cora',
  publisher: 'Studio Cora',
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png', sizes: '200x200' }],
    apple: [{ url: '/icon.png', type: 'image/png', sizes: '200x200' }],
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Studio Cora',
    title: 'Studio Cora | Branding, Design e Gestão de Redes Sociais',
    description: 'Estratégia, design e comunicação para construir marcas profissionais, consistentes e memoráveis.',
    images: [{ url: 'https://usestudiocora.com/opengraph-image.png', width: 1080, height: 1350, alt: 'Studio Cora — estúdio de design e presença digital' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio Cora | Branding, Design e Gestão de Redes Sociais',
    description: 'Estratégia, design e comunicação para construir marcas profissionais, consistentes e memoráveis.',
    images: ['https://usestudiocora.com/opengraph-image.png'],
  },
}

export function SiteDocument({ lang, children }: { lang: 'pt-BR' | 'en'; children: React.ReactNode }) {
  return (
    <html lang={lang}>
      <body suppressHydrationWarning>
        <OrganizationSchema />
        <MotionAccessibility>{children}</MotionAccessibility>
      </body>
      <GoogleTagManager gtmId="GTM-KFPGHV7J" />
    </html>
  )
}
