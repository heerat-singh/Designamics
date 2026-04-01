import type { PortableTextBlock } from 'next-sanity'

export type Brand = 'designamics' | 'cityBuilders' | 'both'

export interface SeoData {
  metaTitle?: string
  metaDescription?: string
  ogImage?: SanityImage
  noIndex?: boolean
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
  alt?: string
  caption?: string
}

export interface ProjectVideo {
  _key?: string
  caption?: string
  poster?: SanityImage
  url: string
  filename?: string
}

export interface Project {
  _id: string
  _type: 'project'
  _createdAt: string
  _updatedAt: string
  title: string
  slug: { current: string }
  brand: Brand
  tagline?: string
  description?: PortableTextBlock[]
  projectType?: string
  location?: string
  area?: string
  year?: number
  duration?: string
  coverImage: SanityImage
  gallery?: SanityImage[]
  videos?: ProjectVideo[]
  beforeAfter?: {
    before: SanityImage
    after: SanityImage
    caption?: string
  }[]
  isFeatured?: boolean
  sortOrder?: number
  seo?: SeoData
}

export interface Service {
  _id: string
  _type: 'service'
  title: string
  slug: { current: string }
  brand: Brand
  shortDescription: string
  fullDescription?: PortableTextBlock[]
  icon?: string
  image?: SanityImage
  features?: string[]
  sortOrder?: number
  seo?: SeoData
}

export interface TeamMember {
  _id: string
  _type: 'teamMember'
  name: string
  slug: { current: string }
  role: string
  brand: Brand
  photo: SanityImage
  bio?: PortableTextBlock[]
  qualifications?: string[]
  socialLinks?: {
    platform: string
    url: string
  }[]
  isFounder?: boolean
  sortOrder?: number
}

export interface Testimonial {
  _id: string
  _type: 'testimonial'
  clientName: string
  clientDesignation?: string
  brand: Brand
  quote: string
  rating?: number
  project?: {
    _ref: string
    title?: string
    slug?: { current: string }
  }
  photo?: SanityImage
  isFeatured?: boolean
}

export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  logo?: SanityImage
  designamicsLogo?: SanityImage
  cityBuildersLogo?: SanityImage
  tagline?: string
  socialLinks?: {
    platform: string
    url: string
  }[]
  defaultSeo?: SeoData
}

export interface Homepage {
  _id: string
  _type: 'homepage'
  heroHeadline?: string
  heroSubheadline?: string
  heroImage?: SanityImage
  designamicsIntro?: string
  cityBuildersIntro?: string
  featuredProjects?: Project[]
  stats?: {
    label: string
    value: number
    suffix?: string
  }[]
  ctaHeadline?: string
  ctaDescription?: string
}

export interface ContactInfo {
  _id: string
  _type: 'contactInfo'
  phone?: string
  email?: string
  address?: string
  mapEmbedUrl?: string
  officeHours?: string
  designamicsInstagram?: string
  cityBuildersInstagram?: string
}
