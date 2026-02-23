import { createClient } from '@sanity/client'
import { projectId, dataset, apiVersion } from '../env'

// Write client for server-side mutations (Instagram sync, etc.)
// Separate file to avoid build-time crash from module-level client initialization
export function getWriteClient() {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
  })
}
