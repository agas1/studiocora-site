import type { PortableTextBlock } from '@portabletext/types'
import type { Article } from '@/content/articles'

type ReadingContent = Pick<Article, 'description'> & Partial<Pick<Article, 'intro' | 'sections' | 'body'>>

export function readingMinutes(article: ReadingContent) {
  const paragraphs = [
    article.description,
    ...(article.intro ?? []),
    ...(article.sections ?? []).flatMap(section => [
      ...section.paragraphs,
      ...(section.subsections ?? []).flatMap(subsection => subsection.paragraphs),
    ]),
    ...(article.body ?? []).flatMap(block => block._type === 'block'
      ? (block as PortableTextBlock).children.map(span => 'text' in span ? span.text : '')
      : []),
  ]
  return Math.max(1, Math.ceil(paragraphs.join(' ').trim().split(/\s+/).length / 200))
}
