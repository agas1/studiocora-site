import { InsightsPage } from '@/components/pages/InstitutionalPage'
import { localizedMetadata } from '@/lib/seo'
export const metadata = localizedMetadata({ title: 'Insights on Branding, Design and Content', description: 'Studio Cora insights on brands, social media, design and digital experiences.', canonical: '/en/insights', pt: '/pt/blog', en: '/en/insights' })
export default function Page() { return <InsightsPage locale="en" /> }
