'use client'

import { Container, Button } from '@/components/ui'
import { ScrollReveal } from '@/components/motion'

interface CTASectionProps {
  headline?: string
  description?: string
}

export function CTASection({
  headline = "Let's Build Something Extraordinary",
  description = "Whether you're envisioning a stunning interior or planning a new construction project, we're here to bring your vision to life.",
}: CTASectionProps) {
  return (
    <section className="py-[var(--section-padding)] bg-accent/10">
      <Container className="text-center max-w-3xl">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            {headline}
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed">
            {description}
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Button href="/contact" variant="primary" size="lg">
              Start Your Project
            </Button>
            <Button href="/projects" variant="outline" size="lg">
              Browse Portfolio
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}