import { notFound } from 'next/navigation'
import { ArticlePage } from '@/components/blog/ArticlePage'
import { getArticle, getArticles } from '@/content/articles'
import { localizedMetadata, siteUrl } from '@/lib/seo'
export function generateStaticParams() { return getArticles('pt').map(({ slug }) => ({ slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const article = getArticle('pt', (await params).slug); return article ? localizedMetadata({ title: article.seoTitle, description: article.description, canonical: `/pt/blog/${article.slug}`, pt: `/pt/blog/${article.slug}`, en: `/en/insights/${article.alternateSlug}` }) : { metadataBase: new URL(siteUrl) } }
export default async function ArticleRoute({ params }: { params: Promise<{ slug: string }> }) { const article = getArticle('pt', (await params).slug); if (!article) notFound(); return <ArticlePage locale="pt" article={article} /> }
