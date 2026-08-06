import type { Metadata } from 'next'
import '../styles/globals.css'
import { OrganizationSchema } from '@/components/OrganizationSchema'

export const metadata: Metadata = {
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

  alternates: {
    canonical: '/',
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: 'Studio Cora',
    title: 'Studio Cora | Branding, Design e Gestão de Redes Sociais',
    description:
      'Estratégia, design e comunicação para construir marcas profissionais, consistentes e memoráveis.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Studio Cora — estúdio de design e presença digital',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Studio Cora | Branding, Design e Gestão de Redes Sociais',
    description:
      'Estratégia, design e comunicação para construir marcas profissionais, consistentes e memoráveis.',
    images: ['/twitter-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <OrganizationSchema />
        {children}
      </body>
    </html>
  )
}