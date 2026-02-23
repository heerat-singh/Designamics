import type { Metadata } from 'next'
import { sanityFetch } from '@sanity/lib/fetch'
import { contactInfoQuery } from '@sanity/lib/queries'
import { Container, SectionHeading } from '@/components/ui'
import { FadeIn, ScrollReveal } from '@/components/motion'
import { BRANDS } from '@/lib/constants'
import type { ContactInfo } from '@/lib/types'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Designamics and City Builders. Let us help you transform your space or build your dream project in Ludhiana.',
}

export default async function ContactPage() {
  const contact = await sanityFetch<ContactInfo | null>({
    query: contactInfoQuery,
    tags: ['contactInfo'],
  })

  return (
    <section className="py-[var(--section-padding)]">
      <Container>
        <SectionHeading
          title="Let's Talk"
          subtitle="Whether you have a project in mind or just want to explore possibilities, we'd love to hear from you."
          label="Contact"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <ScrollReveal direction="left">
            <ContactForm />
          </ScrollReveal>

          {/* Contact Details */}
          <ScrollReveal direction="right" delay={0.15}>
            <div className="space-y-8">
              {/* Office Details */}
              <div className="p-6 rounded-xl bg-foreground/[0.02] border border-border">
                <h3 className="font-display font-semibold mb-4">Office Details</h3>
                <div className="space-y-4 text-sm">
                  {contact?.phone && (
                    <div>
                      <span className="text-muted block mb-0.5">Phone</span>
                      <a href={`tel:${contact.phone}`} className="font-medium hover:text-accent transition-colors">
                        {contact.phone}
                      </a>
                    </div>
                  )}
                  {contact?.email && (
                    <div>
                      <span className="text-muted block mb-0.5">Email</span>
                      <a href={`mailto:${contact.email}`} className="font-medium hover:text-accent transition-colors">
                        {contact.email}
                      </a>
                    </div>
                  )}
                  {contact?.address && (
                    <div>
                      <span className="text-muted block mb-0.5">Address</span>
                      <p className="font-medium whitespace-pre-line">{contact.address}</p>
                    </div>
                  )}
                  {contact?.officeHours && (
                    <div>
                      <span className="text-muted block mb-0.5">Office Hours</span>
                      <p className="font-medium">{contact.officeHours}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Links */}
              <div className="p-6 rounded-xl bg-foreground/[0.02] border border-border">
                <h3 className="font-display font-semibold mb-4">Follow Us</h3>
                <div className="space-y-3">
                  <a
                    href={contact?.designamicsInstagram || BRANDS.designamics.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm group"
                  >
                    <span className="w-8 h-8 rounded-full bg-designamics/10 flex items-center justify-center text-designamics text-xs font-bold">D</span>
                    <div>
                      <span className="font-medium group-hover:text-designamics transition-colors">
                        {BRANDS.designamics.handle}
                      </span>
                      <span className="block text-xs text-muted">Interior Design</span>
                    </div>
                  </a>
                  <a
                    href={contact?.cityBuildersInstagram || BRANDS.cityBuilders.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm group"
                  >
                    <span className="w-8 h-8 rounded-full bg-citybuilders/10 flex items-center justify-center text-citybuilders text-xs font-bold">CB</span>
                    <div>
                      <span className="font-medium group-hover:text-citybuilders transition-colors">
                        {BRANDS.cityBuilders.handle}
                      </span>
                      <span className="block text-xs text-muted">Construction</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Map */}
              {contact?.mapEmbedUrl && (
                <div className="rounded-xl overflow-hidden border border-border aspect-video">
                  <iframe
                    src={contact.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                  />
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  )
}