import type { Locale } from './index'

export type Project = { slug: string; alternateSlug: string; title: string; year: string; segment: string; services: string[]; description: string; challenge: string; solution: string; results?: string; images: string[] }
const gdLawImages = [
  '/cases1/mockup1.png',
  '/cases1/mockup2.png',
  '/cases1/1.png',
  '/cases1/2.png',
  '/cases1/3.png',
  '/cases1/4.png',
  '/cases1/5.png',
  '/cases1/6.png',
  '/cases1/7.png',
  '/cases1/8.png',
]

const projects: Record<Locale, Project[]> = {
  pt: [
    {
      slug: 'gd-law',
      alternateSlug: 'gd-law',
      title: 'GD Law',
      year: '2026',
      segment: 'Jurídico para empresas de tecnologia',
      services: ['Direção criativa', 'Design de apresentação comercial'],
      description: 'Apresentação comercial criada para comunicar o posicionamento, os serviços e o modelo de atuação da GD Law com clareza e consistência visual.',
      challenge: 'Organizar uma oferta jurídica ampla em uma narrativa comercial clara, contemporânea e alinhada à atuação da GD Law com startups e empresas de tecnologia.',
      solution: 'Desenvolvemos a direção visual e o design da apresentação comercial, estruturando mensagens, serviços e formatos de contratação em uma sequência objetiva e coerente com a identidade da marca.',
      images: gdLawImages,
    },
  ],
  en: [
    {
      slug: 'gd-law',
      alternateSlug: 'gd-law',
      title: 'GD Law',
      year: '2026',
      segment: 'Legal services for technology companies',
      services: ['Creative direction', 'Commercial presentation design'],
      description: 'A commercial presentation designed to communicate GD Law’s positioning, services and operating model with clarity and visual consistency.',
      challenge: 'Organize a broad legal offering into a clear, contemporary commercial narrative aligned with GD Law’s work with startups and technology companies.',
      solution: 'We developed the visual direction and presentation design, structuring messages, services and engagement models into an objective sequence consistent with the brand identity.',
      images: gdLawImages,
    },
  ],
}
export function getProjects(locale: Locale) { return projects[locale] }
export function getProject(locale: Locale, slug: string) { return projects[locale].find((project) => project.slug === slug) }
