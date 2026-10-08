import { InsightsPage } from '@/components/pages/InstitutionalPage'
import { localizedMetadata } from '@/lib/seo'
export const metadata = localizedMetadata({ title: 'Branding, Social Media and Website Guides for Businesses', description: 'Practical Studio Cora guides to compare proposals, plan projects and make decisions about branding, social media management and business websites.', canonical: '/en/insights', pt: '/pt/blog', en: '/en/insights' })
export default function Page() { return <InsightsPage locale="en" /> }
