import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { sanityClient } from '@/sanity/lib/client'

const client = sanityClient?.withConfig({ token: process.env.SANITY_API_READ_TOKEN })

export const GET = client
  ? defineEnableDraftMode({ client }).GET
  : async () => Response.json({ error: 'Sanity is not configured.' }, { status: 503 })

