import type { Metadata } from 'next'
import { sanityFetch } from '@sanity/lib/fetch'
import { homepageQuery, allServicesQuery, featuredTestimonialQuery } from '@sanity/lib/queries'
import { HeroSection, BrandSplit, ProjectGrid, StatsCounter, ServicesList, TestimonialCarousel, CTASection } from '@/components/sections'
import { JsonLd } from '@/components/shared'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/constants'
import type { Homepage, Service, Testimonial } from '@/lib/types'

export const metadata: Metadata = {
  title: `${SITE_NAME} | Interior Design & Construction in Ludhiana`,
  description: SITE_DESCRIPTION,
}

export default async function HomePage() {
  const [homepage, services, testimonial] = await Promise.all([
    sanityFetch<Homepage | null>({
      query: homepageQuery,
      tags: ['homepage'],
    }),
    sanityFetch<Service[]>({
      query: allServicesQuery,
      tags: ['service'],
    }),
    sanityFetch<Testimonial | null>({
      query: featuredTestimonialQuery,
      tags: ['testimonial'],
    }),
  ])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ludhiana',
      addressRegion: 'Punjab',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://instagram.com/designamics_',
      'https://instagram.com/city__builders',
    ],
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      <HeroSection
        headline={homepage?.heroHeadline}
        subheadline={homepage?.heroSubheadline}
        image={homepage?.heroImage}
      />

      <BrandSplit
        designamicsIntro={homepage?.designamicsIntro}
        cityBuildersIntro={homepage?.cityBuildersIntro}
      />

      {homepage?.featuredProjects && homepage.featuredProjects.length > 0 && (
        <ProjectGrid
          projects={homepage.featuredProjects}
          showFilters={false}
          title="Featured Projects"
          subtitle="A selection of our most impactful work."
          label="Featured"
        />
      )}

      <StatsCounter stats={homepage?.stats} />

      {services.length > 0 && (
        <ServicesList
          services={services}
          title="What We Do"
          subtitle="Comprehensive design and construction solutions."
        />
      )}

      {testimonial && (
        <TestimonialCarousel testimonials={[testimonial]} featured />
      )}

      <CTASection
        headline={homepage?.ctaHeadline}
        description={homepage?.ctaDescription}
      />
    </>
  )
}