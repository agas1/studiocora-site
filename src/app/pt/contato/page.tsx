import { ContactPage } from '@/components/pages/InstitutionalPage'
import { localizedMetadata } from '@/lib/seo'
export const metadata = localizedMetadata({ title: 'Contato', description: 'Converse com a Studio Cora sobre branding, redes sociais, identidade visual ou desenvolvimento web.', canonical: '/pt/contato', pt: '/pt/contato', en: '/en/contact' })
export default function Page() { return <ContactPage locale="pt" /> }
