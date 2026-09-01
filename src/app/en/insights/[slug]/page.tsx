import { notFound } from 'next/navigation'
import { ArticlePage } from '@/components/blog/ArticlePage'
import { getArticle, getArticles } from '@/content/articles'
import { localizedMetadata, siteUrl } from '@/lib/seo'
export function generateStaticParams() { return getArticles('en').map(({ slug }) => ({ slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const article = getArticle('en', (await params).slug); return article ? localizedMetadata({ title: article.seoTitle, description: article.description, canonical: `/en/insights/${article.slug}`, pt: `/pt/blog/${article.alternateSlug}`, en: `/en/insights/${article.slug}` }) : { metadataBase: new URL(siteUrl) } }
export default async function ArticleRoute({ params }: { params: Promise<{ slug: string }> }) { const article = getArticle('en', (await params).slug); if (!article) notFound(); return <ArticlePage locale="en" article={article} /> }
