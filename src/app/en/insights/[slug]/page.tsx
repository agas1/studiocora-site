import { notFound } from 'next/navigation'
import { ArticlePage } from '@/components/blog/ArticlePage'
import { getBlogArticle, getBlogArticles } from '@/sanity/lib/articles'
import { localizedMetadata, siteUrl } from '@/lib/seo'
export async function generateStaticParams() { return (await getBlogArticles('en')).map(({ slug }) => ({ slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const article = await getBlogArticle('en', (await params).slug); return article ? localizedMetadata({ title: article.seoTitle, description: article.seoDescription || article.description, canonical: `/en/insights/${article.slug}`, pt: `/pt/blog/${article.alternateSlug}`, en: `/en/insights/${article.slug}` }) : { metadataBase: new URL(siteUrl) } }
export default async function ArticleRoute({ params }: { params: Promise<{ slug: string }> }) { const article = await getBlogArticle('en', (await params).slug); if (!article) notFound(); return <ArticlePage locale="en" article={article} /> }
