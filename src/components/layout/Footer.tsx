import Link from 'next/link'
import { Container } from '@/components/ui'
import { NAV_LINKS, BRANDS, SITE_NAME } from '@/lib/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background/80">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <span className="font-display text-lg font-bold text-background">
              {SITE_NAME}
            </span>
            <p className="mt-4 text-sm leading-relaxed text-background/60">
              Transforming spaces and building dreams in Ludhiana, Punjab. Two brands, one vision of excellence.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-sm font-semibold tracking-wider uppercase text-background mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Designamics */}
          <div>
            <h3 className="font-display text-sm font-semibold tracking-wider uppercase text-designamics mb-4">
              {BRANDS.designamics.name}
            </h3>
            <p className="text-sm text-background/60 mb-3">{BRANDS.designamics.tagline}</p>
            <a
              href={BRANDS.designamics.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-designamics hover:text-designamics-light transition-colors"
            >
              {BRANDS.designamics.handle}
            </a>
          </div>

          {/* City Builders */}
          <div>
            <h3 className="font-display text-sm font-semibold tracking-wider uppercase text-citybuilders mb-4">
              {BRANDS.cityBuilders.name}
            </h3>
            <p className="text-sm text-background/60 mb-3">{BRANDS.cityBuilders.tagline}</p>
            <a
              href={BRANDS.cityBuilders.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-citybuilders hover:text-citybuilders-light transition-colors"
            >
              {BRANDS.cityBuilders.handle}
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/40">
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-background/40">
            Ludhiana, Punjab, India
          </p>
        </div>
      </Container>
    </footer>
  )
}