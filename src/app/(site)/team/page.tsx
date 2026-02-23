import type { Metadata } from 'next'
import { sanityFetch } from '@sanity/lib/fetch'
import { allTeamQuery } from '@sanity/lib/queries'
import { TeamGrid } from '@/components/sections'
import type { TeamMember } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the talented architects, designers, engineers, and project managers behind Designamics and City Builders.',
}

export default async function TeamPage() {
  const members = await sanityFetch<TeamMember[]>({
    query: allTeamQuery,
    tags: ['teamMember'],
  })

  return (
    <TeamGrid
      members={members}
      title="Meet Our Team"
      subtitle="The talented professionals behind every project."
    />
  )
}
