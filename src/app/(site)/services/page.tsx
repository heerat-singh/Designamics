import type { Metadata } from 'next'
import { sanityFetch } from '@sanity/lib/fetch'
import { allServicesQuery } from '@sanity/lib/queries'
import { ServicesList } from '@/components/sections'
import { CTASection } from '@/components/sections'
import type { Service } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore our comprehensive interior design and construction services in Ludhiana. From residential interiors to commercial construction.',
}

export default async function ServicesPage() {
  const services = await sanityFetch<Service[]>({
    query: allServicesQuery,
    tags: ['service'],
  })

  return (
    <>
      <ServicesList services={services} />
      <CTASection
        headline="Ready to Start Your Project?"
        description="Tell us about your vision and we'll show you how we can bring it to life."
      />
    </>
  )
}
