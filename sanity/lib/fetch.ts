import 'server-only'
import type { QueryParams } from '@sanity/client'
import { client } from './client'

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: QueryParams
  tags?: string[]
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: 60, // fallback revalidation
      tags,
    },
  })
}