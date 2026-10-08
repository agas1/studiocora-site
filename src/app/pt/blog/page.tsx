import { InsightsPage } from '@/components/pages/InstitutionalPage'
import { localizedMetadata } from '@/lib/seo'
export const metadata = localizedMetadata({ title: 'Branding, Redes Sociais e Sites para Empresas | Blog', description: 'Guias da Studio Cora para comparar propostas, planejar projetos e tomar decisões sobre branding, gestão de redes sociais e sites para empresas.', canonical: '/pt/blog', pt: '/pt/blog', en: '/en/insights' })
export default function Page() { return <InsightsPage locale="pt" /> }
