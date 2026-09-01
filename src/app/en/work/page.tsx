import { WorkPage } from '@/components/pages/InstitutionalPage'
import { localizedMetadata } from '@/lib/seo'
export const metadata = localizedMetadata({ title: 'Work and Case Studies', description: 'Explore the structure for Studio Cora projects across branding, content and digital experiences.', canonical: '/en/work', pt: '/pt/portfolio', en: '/en/work' })
export default function Page() { return <WorkPage locale="en" /> }
