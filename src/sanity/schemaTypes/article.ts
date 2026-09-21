import { defineArrayMember, defineField, defineType } from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Artigo',
  type: 'document',
  groups: [
    { name: 'content', title: 'Conteúdo', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'relations', title: 'Relacionamentos' },
  ],
  fields: [
    defineField({ name: 'locale', title: 'Idioma', type: 'string', group: 'content', options: { list: [{ title: 'Português', value: 'pt' }, { title: 'English', value: 'en' }], layout: 'radio' }, validation: (rule) => rule.required() }),
    defineField({ name: 'title', title: 'Título', type: 'string', group: 'content', validation: (rule) => rule.required().max(100) }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', group: 'content', options: { source: 'title', maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'Resumo', type: 'text', rows: 3, group: 'content', validation: (rule) => rule.required().max(220) }),
    defineField({ name: 'category', title: 'Categoria', type: 'string', group: 'content', options: { list: ['Branding', 'Identidade visual', 'Redes sociais', 'Web', 'Social media', 'Visual identity'] }, validation: (rule) => rule.required() }),
    defineField({ name: 'author', title: 'Autor', type: 'string', group: 'content', initialValue: 'Studio Cora', validation: (rule) => rule.required() }),
    defineField({ name: 'publishedAt', title: 'Data de publicação', type: 'datetime', group: 'content', initialValue: () => new Date().toISOString(), validation: (rule) => rule.required() }),
    defineField({
      name: 'coverImage', title: 'Imagem de capa', type: 'image', group: 'content', options: { hotspot: true }, validation: (rule) => rule.required(),
      fields: [defineField({ name: 'alt', title: 'Texto alternativo', type: 'string', description: 'Descreva a imagem para acessibilidade. Não repita o título.', validation: (rule) => rule.required().max(160) })],
    }),
    defineField({
      name: 'body', title: 'Conteúdo', type: 'array', group: 'content', validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({ type: 'block', styles: [{ title: 'Texto', value: 'normal' }, { title: 'Título de seção', value: 'h2' }, { title: 'Subtítulo', value: 'h3' }, { title: 'Citação', value: 'blockquote' }], marks: { annotations: [defineArrayMember({ name: 'link', type: 'object', title: 'Link', fields: [defineField({ name: 'href', type: 'url', title: 'URL', validation: (rule) => rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }).required() })] })] } }),
        defineArrayMember({ name: 'contentImage', title: 'Imagem', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Texto alternativo', type: 'string', validation: (rule) => rule.required() }), defineField({ name: 'caption', title: 'Legenda', type: 'string' })] }),
      ],
    }),
    defineField({ name: 'seoTitle', title: 'Título SEO', type: 'string', group: 'seo', description: 'Até 60 caracteres.', validation: (rule) => rule.required().max(60) }),
    defineField({ name: 'seoDescription', title: 'Descrição SEO', type: 'text', rows: 3, group: 'seo', description: 'Até 160 caracteres.', validation: (rule) => rule.required().max(160) }),
    defineField({ name: 'translation', title: 'Versão no outro idioma', type: 'reference', to: [{ type: 'article' }], group: 'relations', options: { filter: ({ document }) => ({ filter: 'locale != $locale', params: { locale: document.locale } }) } }),
    defineField({ name: 'relatedArticles', title: 'Artigos relacionados', type: 'array', group: 'relations', of: [defineArrayMember({ type: 'reference', to: [{ type: 'article' }] })] }),
    defineField({ name: 'relatedServices', title: 'Slugs de serviços relacionados', type: 'array', group: 'relations', of: [defineArrayMember({ type: 'string' })] }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'locale', media: 'coverImage' },
    prepare: ({ title, subtitle, media }) => ({ title, subtitle: subtitle === 'pt' ? 'Português' : 'English', media }),
  },
  orderings: [{ title: 'Publicação, mais recentes', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
})

