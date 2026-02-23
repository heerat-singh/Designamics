'use client'

import { Container, SectionHeading, Card, Badge } from '@/components/ui'
import { ScrollReveal } from '@/components/motion'
import { SanityImage, BrandIndicator } from '@/components/shared'
import type { TeamMember } from '@/lib/types'
import { getBrandLabel } from '@/lib/utils'

interface TeamGridProps {
  members: TeamMember[]
  title?: string
  subtitle?: string
}

export function TeamGrid({
  members,
  title = 'Meet Our Team',
  subtitle = 'The talented professionals behind every project.',
}: TeamGridProps) {
  const founders = members.filter((m) => m.isFounder)
  const team = members.filter((m) => !m.isFounder)

  return (
    <section className="py-[var(--section-padding)]">
      <Container>
        <SectionHeading title={title} subtitle={subtitle} label="Our People" />

        {/* Founders */}
        {founders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {founders.map((member, i) => (
              <ScrollReveal key={member._id} delay={i * 0.15}>
                <Card padding="none" className="overflow-hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="relative aspect-square sm:aspect-auto">
                      <SanityImage image={member.photo} fill sizes="(max-width: 640px) 100vw, 300px" />
                    </div>
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                      <Badge brand={member.brand} className="self-start mb-3">
                        {getBrandLabel(member.brand)}
                      </Badge>
                      <h3 className="font-display text-xl font-semibold">{member.name}</h3>
                      <p className="text-sm text-accent font-medium mt-1">{member.role}</p>
                      {member.qualifications && member.qualifications.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {member.qualifications.map((q) => (
                            <span key={q} className="text-xs bg-foreground/5 px-2 py-0.5 rounded">
                              {q}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <ScrollReveal key={member._id} delay={i * 0.08}>
              <Card padding="none">
                <div className="relative aspect-[3/4]">
                  <SanityImage image={member.photo} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                </div>
                <div className="p-4">
                  <h3 className="font-display font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted mt-0.5">{member.role}</p>
                  <div className="mt-2">
                    <BrandIndicator brand={member.brand} size="sm" />
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}