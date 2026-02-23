import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { sanityFetch } from '@sanity/lib/fetch'
import { projectBySlugQuery, projectSlugsQuery, relatedProjectsQuery } from '@sanity/lib/queries'
import { urlFor } from '@sanity/lib/image'
import { Container, Badge, Button } from '@/components/ui'
import { SanityImage, PortableTextRenderer, BrandIndicator, JsonLd } from '@/components/shared'
import { ScrollReveal, FadeIn } from '@/components/motion'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { getBrandLabel } from '@/lib/utils'
import { SITE_URL } from '@/lib/constants'
import type { Project } from '@/lib/types'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: projectSlugsQuery,
    tags: ['project'],
  })
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await sanityFetch<Project | null>({
    query: projectBySlugQuery,
    params: { slug },
    tags: ['project'],
  })

  if (!project) return { title: 'Project Not Found' }

  return {
    title: project.seo?.metaTitle || project.title,
    description: project.seo?.metaDescription || project.tagline || `${project.title} — a ${getBrandLabel(project.brand)} project`,
    openGraph: {
      title: project.seo?.metaTitle || project.title,
      description: project.seo?.metaDescription || project.tagline,
      images: project.seo?.ogImage?.asset
        ? [{ url: urlFor(project.seo.ogImage).width(1200).height(630).url() }]
        : project.coverImage?.asset
          ? [{ url: urlFor(project.coverImage).width(1200).height(630).url() }]
          : [],
    },
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await sanityFetch<Project | null>({
    query: projectBySlugQuery,
    params: { slug },
    tags: ['project'],
  })

  if (!project) notFound()

  const relatedProjects = await sanityFetch<Project[]>({
    query: relatedProjectsQuery,
    params: { slug, brand: project.brand },
    tags: ['project'],
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.tagline,
    url: `${SITE_URL}/projects/${slug}`,
    image: project.coverImage?.asset
      ? urlFor(project.coverImage).width(1200).url()
      : undefined,
    creator: {
      '@type': 'Organization',
      name: getBrandLabel(project.brand),
    },
    locationCreated: project.location
      ? {
          '@type': 'Place',
          name: project.location,
        }
      : undefined,
    dateCreated: project.year ? String(project.year) : undefined,
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <div className="absolute inset-0">
          <SanityImage
            image={project.coverImage}
            fill
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        </div>
        <Container className="relative z-10 pb-10 md:pb-16">
          <FadeIn>
            <Badge brand={project.brand} size="md" className="mb-4">
              {getBrandLabel(project.brand)}
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              {project.title}
            </h1>
            {project.tagline && (
              <p className="mt-3 text-lg text-white/70 max-w-2xl">{project.tagline}</p>
            )}
          </FadeIn>
        </Container>
      </section>

      {/* Meta Bar */}
      <section className="border-b border-border">
        <Container>
          <div className="flex flex-wrap gap-6 md:gap-10 py-5 text-sm">
            {project.location && (
              <div>
                <span className="text-muted block text-xs uppercase tracking-wider mb-0.5">Location</span>
                <span className="font-medium">{project.location}</span>
              </div>
            )}
            {project.area && (
              <div>
                <span className="text-muted block text-xs uppercase tracking-wider mb-0.5">Area</span>
                <span className="font-medium">{project.area}</span>
              </div>
            )}
            {project.duration && (
              <div>
                <span className="text-muted block text-xs uppercase tracking-wider mb-0.5">Duration</span>
                <span className="font-medium">{project.duration}</span>
              </div>
            )}
            {project.year && (
              <div>
                <span className="text-muted block text-xs uppercase tracking-wider mb-0.5">Year</span>
                <span className="font-medium">{project.year}</span>
              </div>
            )}
            {project.projectType && (
              <div>
                <span className="text-muted block text-xs uppercase tracking-wider mb-0.5">Type</span>
                <span className="font-medium">{project.projectType}</span>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Body */}
      {project.description && (
        <section className="py-[var(--section-padding)]">
          <Container className="max-w-3xl">
            <ScrollReveal>
              <PortableTextRenderer value={project.description} />
            </ScrollReveal>
          </Container>
        </section>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-[var(--section-padding)] bg-foreground/[0.02]">
          <Container wide>
            <h2 className="font-display text-2xl font-semibold mb-8 text-center">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.gallery.map((img, index) => (
                <ScrollReveal key={index} delay={index * 0.05}>
                  <div className={`relative overflow-hidden rounded-lg ${index === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}>
                    <SanityImage
                      image={img}
                      fill
                      sizes={index === 0 ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Before & After */}
      {project.beforeAfter && project.beforeAfter.length > 0 && (
        <section className="py-[var(--section-padding)]">
          <Container>
            <h2 className="font-display text-2xl font-semibold mb-8 text-center">Before & After</h2>
            <div className="space-y-12">
              {project.beforeAfter.map((pair, index) => (
                <ScrollReveal key={index}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <SanityImage image={pair.before} fill sizes="(max-width: 768px) 100vw, 50vw" />
                      <span className="absolute top-4 left-4 bg-foreground/70 text-white text-xs font-medium px-3 py-1 rounded-full">
                        Before
                      </span>
                    </div>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <SanityImage image={pair.after} fill sizes="(max-width: 768px) 100vw, 50vw" />
                      <span className="absolute top-4 left-4 bg-accent text-white text-xs font-medium px-3 py-1 rounded-full">
                        After
                      </span>
                    </div>
                  </div>
                  {pair.caption && (
                    <p className="text-center text-sm text-muted mt-3">{pair.caption}</p>
                  )}
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-[var(--section-padding)] border-t border-border">
          <Container>
            <h2 className="font-display text-2xl font-semibold mb-8 text-center">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
                <ScrollReveal key={p._id}>
                  <ProjectCard project={p} />
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 text-center">
        <Container>
          <Button href="/projects" variant="outline">
            ← Back to All Projects
          </Button>
        </Container>
      </section>
    </>
  )
}
