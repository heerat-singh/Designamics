'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container, SectionHeading } from '@/components/ui'
import { StaggerChildren, staggerItem } from '@/components/motion'
import { ProjectCard } from './ProjectCard'
import type { Project, Brand } from '@/lib/types'

interface ProjectGridProps {
  projects: Project[]
  showFilters?: boolean
  title?: string
  subtitle?: string
  label?: string
}

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Designamics', value: 'designamics' },
  { label: 'City Builders', value: 'cityBuilders' },
] as const

export function ProjectGrid({
  projects,
  showFilters = true,
  title = 'Our Projects',
  subtitle = 'A curated showcase of our finest work across interior design and construction.',
  label = 'Portfolio',
}: ProjectGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.brand === activeFilter || p.brand === 'both')

  return (
    <section className="py-[var(--section-padding)]">
      <Container>
        <SectionHeading title={title} subtitle={subtitle} label={label} />

        {showFilters && (
          <div className="flex justify-center gap-2 mb-12">
            {FILTERS.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeFilter === filter.value
                    ? 'bg-foreground text-background'
                    : 'bg-foreground/5 text-muted hover:bg-foreground/10'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div key={project._id} layout variants={staggerItem}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </StaggerChildren>

        {filtered.length === 0 && (
          <p className="text-center text-muted py-12">No projects found for this filter.</p>
        )}
      </Container>
    </section>
  )
}