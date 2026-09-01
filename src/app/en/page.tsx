import { Landing } from '@/components/Landing'
import { localizedMetadata } from '@/lib/seo'

export const metadata = localizedMetadata({
  title: 'Studio Cora | Branding, Design & Social Media',
  description:
    'Creative studio specializing in branding, social media, visual identity, creative direction and web development.',
  canonical: '/en', pt: '/pt', en: '/en', xDefault: '/',
})

export default function HomeEN() {
  return <Landing locale="en" />
}
