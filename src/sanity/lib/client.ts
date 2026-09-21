import { createClient } from 'next-sanity'
import { sanityApiVersion, sanityDataset, sanityProjectId } from '../env'

const readToken = process.env.SANITY_API_READ_TOKEN

export const sanityClient = sanityProjectId
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      token: readToken,
      useCdn: !readToken,
      perspective: 'published',
    })
  : null
