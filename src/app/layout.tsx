import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://usestudiocora.com'),
  title: 'Studio Cora — Coming Soon',
  description:
    'Something extraordinary is coming. A new home for Studio Cora is on the way.',
  openGraph: {
    title: 'Studio Cora — Coming Soon',
    description:
      'Something extraordinary is coming. A new home for Studio Cora is on the way.',
    url: 'https://usestudiocora.com',
    siteName: 'Studio Cora',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio Cora — Coming Soon',
    description: 'Something extraordinary is coming.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
