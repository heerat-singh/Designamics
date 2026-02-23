import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@sanity/lib/fetch'
import { serviceBySlugQuery, serviceSlugsQuery } from '@sanity/lib/queries'
import { urlFor } from '@sanity/lib/image'
import { Container, Badge, Button } from '@/components/ui'
import { SanityImage, PortableTextRenderer } from '@/components/shared'
import { FadeIn, ScrollReveal } from '@/components/motion'
import { getBrandLabel } from '@/lib/utils'
import type { Service } from '@/lib/types'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: serviceSlugsQuery,
    tags: ['service'],
  })
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await sanityFetch<Service | null>({
    query: serviceBySlugQuery,
    params: { slug },
    tags: ['service'],
  })

  if (!service) return { title: 'Service Not Found' }

  return {
    title: service.seo?.metaTitle || service.title,
    description: service.seo?.metaDescription || service.shortDescription,
    openGraph: {
      title: service.seo?.metaTitle || service.title,
      description: service.seo?.metaDescription || service.shortDescription,
      images: service.image?.asset
        ? [{ url: urlFor(service.image).width(1200).height(630).url() }]
        : [],
    },
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = await sanityFetch<Service | null>({
    query: serviceBySlugQuery,
    params: { slug },
    tags: ['service'],
  })

  if (!service) notFound()

  return (
    <>
      {/* Hero */}
      <section className="py-[var(--section-padding)] bg-foreground/[0.02]">
        <Container className="max-w-4xl">
          <FadeIn>
            <Badge brand={service.brand} size="md" className="mb-4">
              {getBrandLabel(service.brand)}
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              {service.icon && <span className="mr-3">{service.icon}</span>}
              {service.title}
            </h1>
            <p className="mt-4 text-lg text-muted max-w-2xl">{service.shortDescription}</p>
          </FadeIn>
        </Container>
      </section>

      {/* Image */}
      {service.image?.asset && (
        <section>
          <Container wide>
            <ScrollReveal>
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
                <SanityImage image={service.image} fill sizes="100vw" priority />
              </div>
            </ScrollReveal>
          </Container>
        </section>
      )}

      {/* Content */}
      <section className="py-[var(--section-padding)]">
        <Container className="max-w-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {service.fullDescription && (
                <ScrollReveal>
                  <PortableTextRenderer value={service.fullDescription} />
                </ScrollReveal>
              )}
            </div>

            {/* Features Sidebar */}
            {service.features && service.features.length > 0 && (
              <div className="lg:col-span-1">
                <ScrollReveal delay={0.2}>
                  <div className="sticky top-28 p-6 bg-foreground/[0.02] rounded-xl border border-border">
                    <h3 className="font-display font-semibold mb-4">What&apos;s Included</h3>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <span className="text-accent mt-0.5 shrink-0">&#10003;</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Back */}
      <section className="py-10 text-center">
        <Container>
          <Button href="/services" variant="outline">
            ← Back to Services
          </Button>
        </Container>
      </section>
    </>
  )
}
