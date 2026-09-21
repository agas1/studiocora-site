import { notFound } from 'next/navigation'
import { ArticlePage } from '@/components/blog/ArticlePage'
import { getBlogArticle, getBlogArticles } from '@/sanity/lib/articles'
import { localizedMetadata, siteUrl } from '@/lib/seo'
export async function generateStaticParams() { return (await getBlogArticles('pt')).map(({ slug }) => ({ slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const article = await getBlogArticle('pt', (await params).slug); return article ? localizedMetadata({ title: article.seoTitle, description: article.seoDescription || article.description, canonical: `/pt/blog/${article.slug}`, pt: `/pt/blog/${article.slug}`, en: `/en/insights/${article.alternateSlug}` }) : { metadataBase: new URL(siteUrl) } }
export default async function ArticleRoute({ params }: { params: Promise<{ slug: string }> }) { const article = await getBlogArticle('pt', (await params).slug); if (!article) notFound(); return <ArticlePage locale="pt" article={article} /> }
