import type { Metadata } from 'next'
import { sharedMetadata, SiteDocument } from '@/components/layout/SiteDocument'

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'Studio Cora | Estúdio Criativo de Design e Tecnologia',
  metadataBase: sharedMetadata.metadataBase,
  alternates: { canonical: '/', languages: { 'pt-BR': '/pt', en: '/en', 'x-default': '/' } },
  openGraph: { ...sharedMetadata.openGraph, url: '/', locale: 'pt_BR' },
}

export default function RootSiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument lang="pt-BR">{children}</SiteDocument>
}
