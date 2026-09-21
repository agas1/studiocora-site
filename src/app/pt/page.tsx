import { Landing } from '@/components/Landing'
import { localizedMetadata } from '@/lib/seo'

export const metadata = localizedMetadata({
  title: 'Studio Cora | Estúdio de Design em Porto Alegre',
  description:
    'Estúdio de design e tecnologia em Porto Alegre especializado em branding, gestão de redes sociais, identidade visual e desenvolvimento web para empresas de todo o Brasil.',
  canonical: '/pt', pt: '/pt', en: '/en', xDefault: '/',
})

export default function HomePT() {
  return <Landing locale="pt" />
}
