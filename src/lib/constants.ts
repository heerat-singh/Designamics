export const SITE_NAME = 'Designamics & City Builders'
export const SITE_DESCRIPTION =
  'Premium interior design and construction services in Ludhiana, Punjab. Designamics crafts stunning interiors while City Builders delivers exceptional construction.'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://designamics.com'

export const BRANDS = {
  designamics: {
    name: 'Designamics',
    handle: '@designamics_',
    tagline: 'Crafting Spaces, Defining Luxury',
    color: '#e8b96e',
    instagram: 'https://instagram.com/designamics_',
  },
  cityBuilders: {
    name: 'City Builders',
    handle: '@city__builders',
    tagline: 'Building Dreams, Engineering Excellence',
    color: '#768a99',
    instagram: 'https://instagram.com/city__builders',
  },
} as const

export type Brand = 'designamics' | 'cityBuilders' | 'both'

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'Team', href: '/team' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
] as const