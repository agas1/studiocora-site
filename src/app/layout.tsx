import type { Metadata } from 'next'
import '../styles/globals.css'
import { LiveChat } from '@/components/LiveChat'

const SITE = 'https://usestudiocora.com'
const DESCRIPTION =
  'Studio Cora is a creative studio for branding, UX, web and engineering — we build brands that are anything but ordinary.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Studio Cora — Branding, UX & Digital Experiences',
    template: '%s · Studio Cora',
  },
  description: DESCRIPTION,
  applicationName: 'Studio Cora',
  authors: [{ name: 'Studio Cora' }],
  creator: 'Studio Cora',
  publisher: 'Studio Cora',
  category: 'design',
  keywords: [
    'Studio Cora',
    'design studio',
    'branding',
    'brand identity',
    'UX design',
    'UI design',
    'web design',
    'web development',
    'creative direction',
    'digital product',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: SITE,
    siteName: 'Studio Cora',
    title: 'Studio Cora — Branding, UX & Digital Experiences',
    description: DESCRIPTION,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio Cora — Branding, UX & Digital Experiences',
    description: DESCRIPTION,
  },
  icons: {
    icon: '/icon.svg',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Studio Cora',
  url: SITE,
  email: 'hello@usestudiocora.com',
  description: DESCRIPTION,
  logo: `${SITE}/icon.svg`,
  image: `${SITE}/opengraph-image`,
  sameAs: [
    'https://www.linkedin.com/company/studiocora',
    'https://www.facebook.com/studiocora',
  ],
  foundingDate: '2025',
  founder: [
    {
      '@type': 'Person',
      name: 'Amanda Maximo',
      jobTitle: 'Founder · Creative Director',
    },
    {
      '@type': 'Person',
      name: 'Agatha Selbach',
      jobTitle: 'Co-founder · Engineering',
    },
  ],
  knowsAbout: [
    'Branding',
    'Brand Identity',
    'UX Design',
    'UI Design',
    'Web Development',
    'Creative Direction',
    'Digital Product',
  ],
  areaServed: 'Worldwide',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <LiveChat />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
