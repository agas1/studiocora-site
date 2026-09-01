import { InsightsPage } from '@/components/pages/InstitutionalPage'
import { localizedMetadata } from '@/lib/seo'
export const metadata = localizedMetadata({ title: 'Blog sobre Branding, Design e Conteúdo', description: 'Insights da Studio Cora sobre marcas, redes sociais, design e experiências digitais.', canonical: '/pt/blog', pt: '/pt/blog', en: '/en/insights' })
export default function Page() { return <InsightsPage locale="pt" /> }
