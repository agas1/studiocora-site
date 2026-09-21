import { ArticleCard, type ArticleSummary } from './ArticleCard'
import { Reveal } from '@/components/motion/Reveal'

export function ArticleList({ articles, basePath }: { articles: ArticleSummary[]; basePath: string }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {articles.map((article, index) => (
        <Reveal key={article.slug} delay={(index % 3) * 0.08} className="h-full">
          <ArticleCard article={article} basePath={basePath} />
        </Reveal>
      ))}
    </div>
  )
}
