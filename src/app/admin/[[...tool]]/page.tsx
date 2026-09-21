import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'
import { isSanityConfigured } from '@/sanity/env'

export const dynamic = 'force-static'
export { metadata, viewport } from 'next-sanity/studio'

export default function AdminPage() {
  if (!isSanityConfigured) {
    return (
      <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 32, fontFamily: 'sans-serif' }}>
        <div style={{ maxWidth: 640 }}>
          <h1>Conecte o Sanity</h1>
          <p>Configure NEXT_PUBLIC_SANITY_PROJECT_ID e NEXT_PUBLIC_SANITY_DATASET para liberar o painel editorial.</p>
        </div>
      </main>
    )
  }

  return <NextStudio config={config} />
}
