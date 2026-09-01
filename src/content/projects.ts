import type { Locale } from './index'

export type Project = { slug: string; alternateSlug: string; title: string; segment: string; services: string[]; description: string; challenge: string; solution: string; results?: string; images: string[] }
const projects: Record<Locale, Project[]> = { pt: [], en: [] }
export function getProjects(locale: Locale) { return projects[locale] }
export function getProject(locale: Locale, slug: string) { return projects[locale].find((project) => project.slug === slug) }
