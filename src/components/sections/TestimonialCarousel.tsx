'use client'

import { Container, SectionHeading } from '@/components/ui'
import { ScrollReveal } from '@/components/motion'
import { BrandIndicator } from '@/components/shared'
import type { Testimonial } from '@/lib/types'

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  title?: string
  featured?: boolean
}

export function TestimonialCarousel({
  testimonials,
  title = 'What Our Clients Say',
  featured = false,
}: TestimonialCarouselProps) {
  if (featured && testimonials.length > 0) {
    const t = testimonials[0]
    return (
      <section className="py-[var(--section-padding)] bg-foreground/[0.02]">
        <Container className="max-w-4xl text-center">
          <ScrollReveal>
            <p className="font-display text-sm font-medium tracking-[0.2em] uppercase text-accent mb-8">
              Testimonial
            </p>
            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl italic leading-relaxed text-foreground">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="mt-8 space-y-1">
              <p className="font-display font-semibold">{t.clientName}</p>
              {t.clientDesignation && (
                <p className="text-sm text-muted">{t.clientDesignation}</p>
              )}
              <div className="flex justify-center mt-2">
                <BrandIndicator brand={t.brand} size="sm" />
              </div>
            </div>
            {t.rating && (
              <div className="mt-4 flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < t.rating! ? 'text-designamics' : 'text-border'}>
                    ★
                  </span>
                ))}
              </div>
            )}
          </ScrollReveal>
        </Container>
      </section>
    )
  }

  return (
    <section className="py-[var(--section-padding)]">
      <Container>
        <SectionHeading title={title} label="Testimonials" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t._id} delay={i * 0.1}>
              <div className="p-6 bg-white rounded-lg shadow-[var(--shadow-card)] h-full flex flex-col">
                {t.rating && (
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} className={`text-sm ${j < t.rating! ? 'text-designamics' : 'text-border'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                )}
                <blockquote className="font-serif italic text-foreground/80 leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <p className="font-display text-sm font-semibold">{t.clientName}</p>
                  {t.clientDesignation && (
                    <p className="text-xs text-muted mt-0.5">{t.clientDesignation}</p>
                  )}
                  <div className="mt-2">
                    <BrandIndicator brand={t.brand} size="sm" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}