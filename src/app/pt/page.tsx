import { Landing } from '@/components/Landing'
import { localizedMetadata } from '@/lib/seo'

export const metadata = localizedMetadata({
  title: 'Studio Cora | Branding, Design e Gestão de Redes Sociais',
  description:
    'Estúdio criativo especializado em branding, gestão de redes sociais, identidade visual, direção criativa e desenvolvimento web.',
  canonical: '/pt', pt: '/pt', en: '/en', xDefault: '/',
})

export default function HomePT() {
  return <Landing locale="pt" />
}
