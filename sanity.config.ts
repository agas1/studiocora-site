'use client'

import { defineConfig } from 'sanity'
import { defineLocations, presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemaTypes'
import { sanityDataset, sanityProjectId } from './src/sanity/env'

export default defineConfig({
  name: 'studio_cora',
  title: 'Studio Cora · Conteúdo',
  basePath: '/admin',
  projectId: sanityProjectId || 'configureproject',
  dataset: sanityDataset,
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        previewMode: { enable: '/api/draft-mode/enable' },
      },
      resolve: {
        locations: {
          article: defineLocations({
            select: { title: 'title', slug: 'slug.current', locale: 'locale' },
            resolve: (document) => ({
              locations: document?.slug
                ? [{
                    title: document.title ?? 'Artigo',
                    href: document.locale === 'en' ? `/en/insights/${document.slug}` : `/pt/blog/${document.slug}`,
                  }]
                : [],
            }),
          }),
        },
      },
    }),
  ],
  schema: { types: schemaTypes },
})
