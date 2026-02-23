import type { Metadata } from 'next'
import { sanityFetch } from '@sanity/lib/fetch'
import { allTestimonialsQuery } from '@sanity/lib/queries'
import { TestimonialCarousel } from '@/components/sections'
import { CTASection } from '@/components/sections'
import type { Testimonial } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Read what our clients say about working with Designamics and City Builders. Real stories from real homeowners and businesses.',
}

export default async function TestimonialsPage() {
  const testimonials = await sanityFetch<Testimonial[]>({
    query: allTestimonialsQuery,
    tags: ['testimonial'],
  })

  return (
    <>
      <TestimonialCarousel testimonials={testimonials} />
      <CTASection />
    </>
  )
}
