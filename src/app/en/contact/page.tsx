import { ContactPage } from '@/components/pages/InstitutionalPage'
import { localizedMetadata } from '@/lib/seo'
export const metadata = localizedMetadata({ title: 'Contact', description: 'Talk to Studio Cora about branding, social media, visual identity or web development.', canonical: '/en/contact', pt: '/pt/contato', en: '/en/contact' })
export default function Page() { return <ContactPage locale="en" /> }
