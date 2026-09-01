import { ArticleCard, type ArticleSummary } from './ArticleCard'

export function ArticleList({ articles, basePath }: { articles: ArticleSummary[]; basePath: string }) {
  return <div>{articles.map((article) => <ArticleCard key={article.slug} article={article} basePath={basePath} />)}</div>
}
