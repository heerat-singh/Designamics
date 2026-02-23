import type { Metadata } from 'next'
import { sanityFetch } from '@sanity/lib/fetch'
import { allProjectsQuery } from '@sanity/lib/queries'
import { ProjectGrid } from '@/components/sections'
import type { Project } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore our portfolio of interior design and construction projects across Ludhiana, Punjab. From luxury residences to commercial spaces.',
}

export default async function ProjectsPage() {
  const projects = await sanityFetch<Project[]>({
    query: allProjectsQuery,
    tags: ['project'],
  })

  return (
    <ProjectGrid
      projects={projects}
      showFilters
      title="Our Projects"
      subtitle="A curated showcase of our finest work across interior design and construction."
      label="Portfolio"
    />
  )
}