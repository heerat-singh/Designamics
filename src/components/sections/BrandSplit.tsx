'use client'

import { motion } from 'framer-motion'
import { Container, Button } from '@/components/ui'
import { ScrollReveal } from '@/components/motion'
import { BRANDS } from '@/lib/constants'

interface BrandSplitProps {
  designamicsIntro?: string
  cityBuildersIntro?: string
}

export function BrandSplit({
  designamicsIntro = 'We create interiors that speak the language of luxury — spaces that blend warmth, texture, and artistry into something unforgettable.',
  cityBuildersIntro = 'From foundation to finish, we engineer structures built to last — combining precision, innovation, and uncompromising quality.',
}: BrandSplitProps) {
  return (
    <section className="py-[var(--section-padding)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Designamics */}
          <ScrollReveal direction="left" className="relative p-8 md:p-12 lg:p-16 bg-designamics-bg rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none">
            <div className="absolute top-8 left-8 md:top-12 md:left-12 w-12 h-0.5 bg-designamics" />
            <p className="font-display text-xs font-semibold tracking-[0.3em] uppercase text-designamics mb-6">
              {BRANDS.designamics.name}
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-semibold mb-4">
              {BRANDS.designamics.tagline}
            </h3>
            <p className="text-muted leading-relaxed mb-8">
              {designamicsIntro}
            </p>
            <Button href="/projects?brand=designamics" variant="ghost" className="text-designamics-dark hover:bg-designamics/10">
              View Interior Projects →
            </Button>
          </ScrollReveal>

          {/* City Builders */}
          <ScrollReveal direction="right" delay={0.2} className="relative p-8 md:p-12 lg:p-16 bg-citybuilders-bg rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none">
            <div className="absolute top-8 left-8 md:top-12 md:left-12 w-12 h-0.5 bg-citybuilders" />
            <p className="font-display text-xs font-semibold tracking-[0.3em] uppercase text-citybuilders mb-6">
              {BRANDS.cityBuilders.name}
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-semibold mb-4">
              {BRANDS.cityBuilders.tagline}
            </h3>
            <p className="text-muted leading-relaxed mb-8">
              {cityBuildersIntro}
            </p>
            <Button href="/projects?brand=cityBuilders" variant="ghost" className="text-citybuilders-dark hover:bg-citybuilders/10">
              View Construction Projects →
            </Button>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  )
}