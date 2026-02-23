import type { Metadata } from 'next'
import { Container, SectionHeading, Button } from '@/components/ui'
import { ScrollReveal, FadeIn } from '@/components/motion'
import { sanityFetch } from '@sanity/lib/fetch'
import { allTeamQuery } from '@sanity/lib/queries'
import { SanityImage, BrandIndicator } from '@/components/shared'
import { BRANDS } from '@/lib/constants'
import type { TeamMember } from '@/lib/types'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Designamics and City Builders — two brands united by a passion for creating extraordinary spaces in Ludhiana, Punjab.',
}

export default async function AboutPage() {
  const team = await sanityFetch<TeamMember[]>({
    query: allTeamQuery,
    tags: ['teamMember'],
  })

  const founders = team.filter((m) => m.isFounder).slice(0, 4)

  return (
    <>
      {/* Hero */}
      <section className="py-[var(--section-padding)] bg-foreground/[0.02]">
        <Container className="max-w-4xl text-center">
          <FadeIn>
            <p className="font-display text-sm font-medium tracking-[0.3em] uppercase text-accent mb-6">
              Our Story
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Two Brands, One Vision
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted leading-relaxed max-w-2xl mx-auto">
              Born from a shared belief that great spaces transform lives, Designamics and City Builders
              bring together the art of interior design and the science of construction under one roof.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Story */}
      <section className="py-[var(--section-padding)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <div className="space-y-6">
                <h2 className="font-display text-3xl md:text-4xl font-semibold">
                  From Ludhiana, for Ludhiana — and beyond.
                </h2>
                <p className="text-muted leading-relaxed">
                  What started as a passion for creating beautiful living spaces has grown into a
                  comprehensive design and construction practice. We don't just design interiors or
                  build structures — we craft experiences that families and businesses live in every day.
                </p>
                <p className="text-muted leading-relaxed">
                  Our dual-brand approach means clients get the best of both worlds: the creative
                  vision of an interior design studio with the structural expertise of an engineering firm.
                  Every project benefits from this integrated perspective.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-foreground/5">
                <div className="absolute inset-0 flex items-center justify-center text-muted/30 font-display text-xl">
                  About Image
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Brand Philosophy Split */}
      <section className="py-[var(--section-padding)]">
        <Container>
          <SectionHeading
            title="Our Philosophy"
            subtitle="Two distinct approaches, unified by excellence."
            label="What Drives Us"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="p-8 md:p-10 rounded-2xl bg-designamics-bg border border-designamics/20">
                <div className="w-12 h-0.5 bg-designamics mb-6" />
                <h3 className="font-display text-2xl font-semibold mb-2 text-designamics-dark">
                  {BRANDS.designamics.name}
                </h3>
                <p className="font-serif text-lg italic text-designamics-dark/70 mb-6">
                  &ldquo;{BRANDS.designamics.tagline}&rdquo;
                </p>
                <p className="text-muted leading-relaxed mb-4">
                  We believe interiors should tell a story — your story. Every material, every texture,
                  every color is chosen with intention to create spaces that feel both luxurious and
                  genuinely yours. Our approach blends contemporary aesthetics with warmth and functionality.
                </p>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-designamics rounded-full" /> Residential Interior Design</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-designamics rounded-full" /> Commercial Space Design</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-designamics rounded-full" /> Furniture & Fixture Curation</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-designamics rounded-full" /> Turnkey Interior Solutions</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="p-8 md:p-10 rounded-2xl bg-citybuilders-bg border border-citybuilders/20">
                <div className="w-12 h-0.5 bg-citybuilders mb-6" />
                <h3 className="font-display text-2xl font-semibold mb-2 text-citybuilders-dark">
                  {BRANDS.cityBuilders.name}
                </h3>
                <p className="font-serif text-lg italic text-citybuilders-dark/70 mb-6">
                  &ldquo;{BRANDS.cityBuilders.tagline}&rdquo;
                </p>
                <p className="text-muted leading-relaxed mb-4">
                  Construction isn't just about bricks and mortar — it's about building trust.
                  Every structure we create is engineered for longevity, built with precision, and
                  delivered with transparency. We bring your architectural vision to structural reality.
                </p>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-citybuilders rounded-full" /> Residential Construction</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-citybuilders rounded-full" /> Commercial Building</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-citybuilders rounded-full" /> Renovation & Remodeling</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-citybuilders rounded-full" /> Project Management</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Team Preview */}
      {founders.length > 0 && (
        <section className="py-[var(--section-padding)] bg-foreground/[0.02]">
          <Container>
            <SectionHeading
              title="The People Behind It All"
              subtitle="Meet the founders driving our vision forward."
              label="Leadership"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {founders.map((member, i) => (
                <ScrollReveal key={member._id} delay={i * 0.1}>
                  <div className="flex items-center gap-5 p-5 rounded-xl bg-white shadow-[var(--shadow-card)]">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0">
                      <SanityImage image={member.photo} fill sizes="80px" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold">{member.name}</h3>
                      <p className="text-sm text-accent">{member.role}</p>
                      <BrandIndicator brand={member.brand} size="sm" className="mt-1" />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button href="/team" variant="outline">
                Meet the Full Team
              </Button>
            </div>
          </Container>
        </section>
      )}
    </>
  )
}