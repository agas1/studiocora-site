import type { Metadata } from 'next'
import { sharedMetadata, SiteDocument } from '@/components/layout/SiteDocument'

export const metadata: Metadata = {
  ...sharedMetadata,
  metadataBase: sharedMetadata.metadataBase,
  openGraph: { ...sharedMetadata.openGraph, locale: 'pt_BR' },
}

export default function PortugueseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument lang="pt-BR">{children}</SiteDocument>
}
