import { AboutPage } from '@/components/pages/InstitutionalPage'
import { localizedMetadata } from '@/lib/seo'
export const metadata = localizedMetadata({ title: 'Sobre o Estúdio', description: 'Conheça a Studio Cora e a integração entre estratégia, design e tecnologia.', canonical: '/pt/sobre', pt: '/pt/sobre', en: '/en/studio' })
export default function Page() { return <AboutPage locale="pt" /> }
