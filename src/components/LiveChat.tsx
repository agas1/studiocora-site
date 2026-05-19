'use client'

import Script from 'next/script'

/**
 * Tawk.to live chat. Renders nothing until NEXT_PUBLIC_TAWK_ID is set.
 * The ID is the path segment from your embed URL:
 *   https://embed.tawk.to/<PROPERTY_ID>/<WIDGET_ID>
 *   -> NEXT_PUBLIC_TAWK_ID = "<PROPERTY_ID>/<WIDGET_ID>"
 *
 * Loaded with `lazyOnload` so it never competes with LCP / Core Web Vitals.
 */
export function LiveChat() {
  const id = process.env.NEXT_PUBLIC_TAWK_ID
  if (!id) return null

  return (
    <Script
      id="tawk-to"
      strategy="lazyOnload"
      src={`https://embed.tawk.to/${id}`}
      crossOrigin="anonymous"
    />
  )
}
