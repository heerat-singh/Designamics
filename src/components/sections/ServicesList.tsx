'use client'

import Link from 'next/link'
import { Container, SectionHeading } from '@/components/ui'
import { ScrollReveal } from '@/components/motion'
import type { Service } from '@/lib/types'

interface ServicesListProps {
  services: Service[]
  title?: string
  subtitle?: string
}

export function ServicesList({
  services,
  title = 'Our Services',
  subtitle = 'Comprehensive design and construction solutions tailored to your vision.',
}: ServicesListProps) {
  return (
    <section id="services" className="py-[var(--section-padding)] scroll-mt-20">
      <Container>
        <SectionHeading title={title} subtitle={subtitle} label="What We Do" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <ScrollReveal key={service._id} delay={(i % 2) * 0.1}>
              <Link
                href={`/services/${encodeURIComponent(service.slug.current)}`}
                className="group block h-full p-5 rounded-lg bg-foreground/[0.03] border border-border hover:border-accent/40 hover:bg-foreground/[0.05] transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display font-semibold group-hover:text-accent transition-colors">
                      {service.icon && <span className="mr-2">{service.icon}</span>}
                      {service.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted line-clamp-2">{service.shortDescription}</p>
                  </div>
                  <span className="text-muted group-hover:text-accent transition-colors shrink-0">→</span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
