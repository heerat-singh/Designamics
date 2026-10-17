import type { Metadata } from 'next'
import { Container, SectionHeading, Button } from '@/components/ui'
import { ScrollReveal, FadeIn } from '@/components/motion'
import { sanityFetch } from '@sanity/lib/fetch'
import { aboutPageQuery, allTeamQuery } from '@sanity/lib/queries'
import { urlFor } from '@sanity/lib/image'
import { SanityImage, BrandIndicator } from '@/components/shared'
import { BRANDS } from '@/lib/constants'
import type { AboutPage, TeamMember } from '@/lib/types'

// Shown until the About Page document is published in Sanity
const DEFAULTS = {
  heroLabel: 'Our Story',
  heroHeadline: 'Two Brands, One Vision',
  heroIntro:
    'Born from a shared belief that great spaces transform lives, Designamics and City Builders bring together the art of interior design and the science of construction under one roof.',
  storyHeadline: 'From Ludhiana, for Ludhiana — and beyond.',
  storyBody:
    "What started as a passion for creating beautiful living spaces has grown into a comprehensive design and construction practice. We don't just design interiors or build structures — we craft experiences that families and businesses live in every day.\n\nOur dual-brand approach means clients get the best of both worlds: the creative vision of an interior design studio with the structural expertise of an engineering firm. Every project benefits from this integrated perspective.",
  philosophyLabel: 'What Drives Us',
  philosophyTitle: 'Our Philosophy',
  philosophySubtitle: 'Two distinct approaches, unified by excellence.',
  designamicsPhilosophy: {
    description:
      'We believe interiors should tell a story — your story. Every material, every texture, every color is chosen with intention to create spaces that feel both luxurious and genuinely yours. Our approach blends contemporary aesthetics with warmth and functionality.',
    points: [
      'Residential Interior Design',
      'Commercial Space Design',
      'Furniture & Fixture Curation',
      'Turnkey Interior Solutions',
    ],
  },
  cityBuildersPhilosophy: {
    description:
      "Construction isn't just about bricks and mortar — it's about building trust. Every structure we create is engineered for longevity, built with precision, and delivered with transparency. We bring your architectural vision to structural reality.",
    points: [
      'Residential Construction',
      'Commercial Building',
      'Renovation & Remodeling',
      'Project Management',
    ],
  },
  teamLabel: 'Leadership',
  teamTitle: 'The People Behind It All',
  teamSubtitle: 'Meet the founders driving our vision forward.',
  teamButtonLabel: 'Meet the Full Team',
  metaTitle: 'About Us',
  metaDescription:
    'Learn about Designamics and City Builders — two brands united by a passion for creating extraordinary spaces in Ludhiana, Punjab.',
}

function getAboutPage() {
  return sanityFetch<AboutPage | null>({
    query: aboutPageQuery,
    tags: ['aboutPage'],
  })
}

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage()
  const ogImage = about?.seo?.ogImage?.asset ? about.seo.ogImage : about?.storyImage

  return {
    title: about?.seo?.metaTitle || DEFAULTS.metaTitle,
    description: about?.seo?.metaDescription || DEFAULTS.metaDescription,
    openGraph: ogImage?.asset
      ? { images: [{ url: urlFor(ogImage).width(1200).height(630).url() }] }
      : undefined,
  }
}

export default async function AboutPage() {
  const [about, team] = await Promise.all([
    getAboutPage(),
    sanityFetch<TeamMember[]>({
      query: allTeamQuery,
      tags: ['teamMember'],
    }),
  ])

  const founders = team.filter((m) => m.isFounder).slice(0, 4)

  const storyParagraphs = (about?.storyBody || DEFAULTS.storyBody)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  const philosophies = [
    {
      key: 'designamics',
      brand: BRANDS.designamics,
      content: about?.designamicsPhilosophy,
      fallback: DEFAULTS.designamicsPhilosophy,
      cardClass: 'bg-designamics-bg border-designamics/20',
      accentClass: 'bg-designamics',
      textClass: 'text-designamics-dark',
      taglineClass: 'text-designamics-dark/70',
    },
    {
      key: 'cityBuilders',
      brand: BRANDS.cityBuilders,
      content: about?.cityBuildersPhilosophy,
      fallback: DEFAULTS.cityBuildersPhilosophy,
      cardClass: 'bg-citybuilders-bg border-citybuilders/20',
      accentClass: 'bg-citybuilders',
      textClass: 'text-citybuilders-dark',
      taglineClass: 'text-citybuilders-dark/70',
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="py-[var(--section-padding)] bg-foreground/[0.02]">
        <Container className="max-w-4xl text-center">
          <FadeIn>
            <p className="font-display text-sm font-medium tracking-[0.3em] uppercase text-accent mb-6">
              {about?.heroLabel || DEFAULTS.heroLabel}
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {about?.heroHeadline || DEFAULTS.heroHeadline}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted leading-relaxed max-w-2xl mx-auto">
              {about?.heroIntro || DEFAULTS.heroIntro}
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
                  {about?.storyHeadline || DEFAULTS.storyHeadline}
                </h2>
                {storyParagraphs.map((paragraph, i) => (
                  <p key={i} className="text-muted leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-foreground/5">
                {about?.storyImage?.asset ? (
                  <SanityImage
                    image={about.storyImage}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted/30 font-display text-xl">
                    About Image
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Brand Philosophy Split */}
      <section className="py-[var(--section-padding)]">
        <Container>
          <SectionHeading
            title={about?.philosophyTitle || DEFAULTS.philosophyTitle}
            subtitle={about?.philosophySubtitle || DEFAULTS.philosophySubtitle}
            label={about?.philosophyLabel || DEFAULTS.philosophyLabel}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {philosophies.map((p, i) => {
              const points = p.content?.points?.length ? p.content.points : p.fallback.points
              return (
                <ScrollReveal key={p.key} delay={i * 0.15}>
                  <div className={`p-8 md:p-10 rounded-2xl border ${p.cardClass}`}>
                    <div className={`w-12 h-0.5 mb-6 ${p.accentClass}`} />
                    <h3 className={`font-display text-2xl font-semibold mb-2 ${p.textClass}`}>
                      {p.brand.name}
                    </h3>
                    <p className={`font-serif text-lg italic mb-6 ${p.taglineClass}`}>
                      &ldquo;{p.brand.tagline}&rdquo;
                    </p>
                    <p className="text-muted leading-relaxed mb-4">
                      {p.content?.description || p.fallback.description}
                    </p>
                    <ul className="space-y-2 text-sm text-muted">
                      {points.map((point) => (
                        <li key={point} className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${p.accentClass}`} /> {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Team Preview */}
      {founders.length > 0 && (
        <section className="py-[var(--section-padding)] bg-foreground/[0.02]">
          <Container>
            <SectionHeading
              title={about?.teamTitle || DEFAULTS.teamTitle}
              subtitle={about?.teamSubtitle || DEFAULTS.teamSubtitle}
              label={about?.teamLabel || DEFAULTS.teamLabel}
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
                {about?.teamButtonLabel || DEFAULTS.teamButtonLabel}
              </Button>
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
