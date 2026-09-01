import { WorkPage } from '@/components/pages/InstitutionalPage'
import { localizedMetadata } from '@/lib/seo'
export const metadata = localizedMetadata({ title: 'Portfolio e Projetos', description: 'Conheça a estrutura de projetos e cases da Studio Cora em branding, conteúdo e experiências digitais.', canonical: '/pt/portfolio', pt: '/pt/portfolio', en: '/en/work' })
export default function Page() { return <WorkPage locale="pt" /> }
