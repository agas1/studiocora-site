import type { Metadata } from 'next'
import { sharedMetadata, SiteDocument } from '@/components/layout/SiteDocument'

export const metadata: Metadata = {
  ...sharedMetadata,
  metadataBase: sharedMetadata.metadataBase,
  description: 'Studio Cora is a creative studio for branding, social media, visual identity and digital experiences.',
  openGraph: { ...sharedMetadata.openGraph, locale: 'en_US' },
}

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument lang="en">{children}</SiteDocument>
}
