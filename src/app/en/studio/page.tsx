import { AboutPage } from '@/components/pages/InstitutionalPage'
import { localizedMetadata } from '@/lib/seo'
export const metadata = localizedMetadata({ title: 'About the Studio', description: 'Meet Studio Cora and our integrated approach to strategy, design and technology.', canonical: '/en/studio', pt: '/pt/sobre', en: '/en/studio' })
export default function Page() { return <AboutPage locale="en" /> }
