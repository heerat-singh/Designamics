'use client'

import Link from 'next/link'
import { Container, SectionHeading } from '@/components/ui'
import { ScrollReveal } from '@/components/motion'
import { BrandIndicator } from '@/components/shared'
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
  const designamicsServices = services.filter((s) => s.brand === 'designamics' || s.brand === 'both')
  const cityBuildersServices = services.filter((s) => s.brand === 'cityBuilders' || s.brand === 'both')

  return (
    <section className="py-[var(--section-padding)]">
      <Container>
        <SectionHeading title={title} subtitle={subtitle} label="What We Do" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Designamics Services */}
          <div>
            <h3 className="font-display text-lg font-semibold text-designamics-dark mb-6 pb-3 border-b-2 border-designamics">
              Designamics — Interior Design
            </h3>
            <div className="space-y-4">
              {designamicsServices.map((service, i) => (
                <ScrollReveal key={service._id} delay={i * 0.1}>
                  <Link
                    href={`/services/${service.slug.current}`}
                    className="group block p-5 rounded-lg bg-designamics-bg/50 hover:bg-designamics-bg transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-display font-semibold group-hover:text-designamics-dark transition-colors">
                          {service.icon && <span className="mr-2">{service.icon}</span>}
                          {service.title}
                        </h4>
                        <p className="mt-1 text-sm text-muted line-clamp-2">{service.shortDescription}</p>
                      </div>
                      <span className="text-muted group-hover:text-designamics-dark transition-colors shrink-0">→</span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* City Builders Services */}
          <div>
            <h3 className="font-display text-lg font-semibold text-citybuilders-dark mb-6 pb-3 border-b-2 border-citybuilders">
              City Builders — Construction
            </h3>
            <div className="space-y-4">
              {cityBuildersServices.map((service, i) => (
                <ScrollReveal key={service._id} delay={i * 0.1}>
                  <Link
                    href={`/services/${service.slug.current}`}
                    className="group block p-5 rounded-lg bg-citybuilders-bg/50 hover:bg-citybuilders-bg transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-display font-semibold group-hover:text-citybuilders-dark transition-colors">
                          {service.icon && <span className="mr-2">{service.icon}</span>}
                          {service.title}
                        </h4>
                        <p className="mt-1 text-sm text-muted line-clamp-2">{service.shortDescription}</p>
                      </div>
                      <span className="text-muted group-hover:text-citybuilders-dark transition-colors shrink-0">→</span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}