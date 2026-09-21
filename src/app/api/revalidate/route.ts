import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

type WebhookPayload = { _type?: string; slug?: string }

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) return NextResponse.json({ error: 'Webhook secret is not configured.' }, { status: 503 })

  const { body, isValidSignature } = await parseBody<WebhookPayload>(request, secret)
  if (!isValidSignature) return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 })
  if (body?._type !== 'article') return NextResponse.json({ revalidated: false })

  revalidateTag('articles', 'max')
  if (body.slug) revalidateTag(`article-${body.slug}`, 'max')

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
