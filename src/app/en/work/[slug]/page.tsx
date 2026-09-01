import { notFound } from 'next/navigation'
import { ProjectPage } from '@/components/pages/ProjectPage'
import { getProject, getProjects } from '@/content/projects'
import { localizedMetadata, siteUrl } from '@/lib/seo'
export function generateStaticParams() { return getProjects('en').map(({ slug }) => ({ slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const project = getProject('en', (await params).slug); return project ? localizedMetadata({ title: project.title, description: project.description, canonical: `/en/work/${project.slug}`, pt: `/pt/portfolio/${project.alternateSlug}`, en: `/en/work/${project.slug}` }) : { metadataBase: new URL(siteUrl) } }
export default async function ProjectRoute({ params }: { params: Promise<{ slug: string }> }) { const project = getProject('en', (await params).slug); if (!project) notFound(); return <ProjectPage locale="en" project={project} /> }
