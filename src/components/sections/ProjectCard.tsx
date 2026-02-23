'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { SanityImage } from '@/components/shared'
import { Badge } from '@/components/ui'
import { getBrandLabel } from '@/lib/utils'
import type { Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug.current}`}>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="group relative overflow-hidden rounded-lg bg-white shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <SanityImage
            image={project.coverImage}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Brand Badge */}
          <div className="absolute top-4 left-4">
            <Badge brand={project.brand} size="sm">
              {getBrandLabel(project.brand)}
            </Badge>
          </div>

          {/* Hover Overlay Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
            {project.tagline && (
              <p className="text-sm text-white/80 line-clamp-2">{project.tagline}</p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display text-lg font-semibold line-clamp-1">
            {project.title}
          </h3>
          <div className="mt-2 flex items-center gap-3 text-sm text-muted">
            {project.projectType && <span>{project.projectType}</span>}
            {project.location && (
              <>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span>{project.location}</span>
              </>
            )}
          </div>
        </div>
      </motion.article>
    </Link>
  )
}