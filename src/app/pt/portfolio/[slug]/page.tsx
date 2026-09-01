import { notFound } from 'next/navigation'
import { ProjectPage } from '@/components/pages/ProjectPage'
import { getProject, getProjects } from '@/content/projects'
import { localizedMetadata, siteUrl } from '@/lib/seo'
export function generateStaticParams() { return getProjects('pt').map(({ slug }) => ({ slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const project = getProject('pt', (await params).slug); return project ? localizedMetadata({ title: project.title, description: project.description, canonical: `/pt/portfolio/${project.slug}`, pt: `/pt/portfolio/${project.slug}`, en: `/en/work/${project.alternateSlug}` }) : { metadataBase: new URL(siteUrl) } }
export default async function ProjectRoute({ params }: { params: Promise<{ slug: string }> }) { const project = getProject('pt', (await params).slug); if (!project) notFound(); return <ProjectPage locale="pt" project={project} /> }
