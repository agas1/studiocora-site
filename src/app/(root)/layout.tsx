import type { Metadata } from 'next'
import { sharedMetadata, SiteDocument } from '@/components/layout/SiteDocument'

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'Studio Cora | Estúdio de Design em Porto Alegre',
  metadataBase: sharedMetadata.metadataBase,
  alternates: { canonical: '/', languages: { 'pt-BR': '/pt', en: '/en', 'x-default': '/' } },
  openGraph: { ...sharedMetadata.openGraph, url: '/', locale: 'pt_BR' },
}

export default function RootSiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument lang="pt-BR">{children}</SiteDocument>
}
