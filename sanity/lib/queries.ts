import { groq } from 'next-sanity'

// ─── Site Settings ───
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    logo,
    designamicsLogo,
    cityBuildersLogo,
    tagline,
    socialLinks,
    defaultSeo
  }
`

// ─── Homepage ───
export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    _id,
    heroHeadline,
    heroSubheadline,
    heroImage,
    designamicsIntro,
    cityBuildersIntro,
    "featuredProjects": coalesce(featuredProjects[]-> {
      _id,
      title,
      slug,
      brand,
      tagline,
      projectType,
      coverImage,
      location,
      year
    }, []),
    "stats": coalesce(stats, []),
    ctaHeadline,
    ctaDescription
  }
`

// ─── Contact Info ───
export const contactInfoQuery = groq`
  *[_type == "contactInfo"][0] {
    _id,
    phone,
    email,
    address,
    mapEmbedUrl,
    officeHours,
    designamicsInstagram,
    cityBuildersInstagram
  }
`

// ─── Projects ───
export const allProjectsQuery = groq`
  *[_type == "project" && (syncStatus == "approved" || !defined(syncStatus))] | order(sortOrder asc, _createdAt desc) {
    _id,
    title,
    slug,
    brand,
    tagline,
    projectType,
    coverImage,
    location,
    year,
    isFeatured
  }
`

export const projectsByBrandQuery = groq`
  *[_type == "project" && brand == $brand && (syncStatus == "approved" || !defined(syncStatus))] | order(sortOrder asc, _createdAt desc) {
    _id,
    title,
    slug,
    brand,
    tagline,
    projectType,
    coverImage,
    location,
    year,
    isFeatured
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug && (syncStatus == "approved" || !defined(syncStatus))][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    brand,
    tagline,
    description,
    projectType,
    location,
    area,
    year,
    duration,
    coverImage,
    gallery,
    videos[]{
      _key,
      caption,
      poster,
      "url": video.asset->url,
      "filename": video.asset->originalFilename
    },
    beforeAfter,
    isFeatured,
    seo
  }
`

export const relatedProjectsQuery = groq`
  *[_type == "project" && slug.current != $slug && (brand == $brand || brand == "both") && (syncStatus == "approved" || !defined(syncStatus))] | order(sortOrder asc) [0...3] {
    _id,
    title,
    slug,
    brand,
    tagline,
    coverImage,
    projectType
  }
`

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)] {
    "slug": slug.current
  }
`

// ─── Services ───
export const allServicesQuery = groq`
  *[_type == "service"] | order(sortOrder asc) {
    _id,
    title,
    slug,
    brand,
    shortDescription,
    icon,
    image,
    features
  }
`

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    brand,
    shortDescription,
    fullDescription,
    icon,
    image,
    features,
    seo
  }
`

export const serviceSlugsQuery = groq`
  *[_type == "service" && defined(slug.current)] {
    "slug": slug.current
  }
`

// ─── Team ───
export const allTeamQuery = groq`
  *[_type == "teamMember"] | order(isFounder desc, sortOrder asc) {
    _id,
    name,
    slug,
    role,
    brand,
    photo,
    bio,
    qualifications,
    socialLinks,
    isFounder
  }
`

// ─── Testimonials ───
export const allTestimonialsQuery = groq`
  *[_type == "testimonial"] | order(isFeatured desc, _createdAt desc) {
    _id,
    clientName,
    clientDesignation,
    brand,
    quote,
    rating,
    project-> {
      _id,
      title,
      slug
    },
    photo,
    isFeatured
  }
`

export const featuredTestimonialQuery = groq`
  *[_type == "testimonial" && isFeatured == true][0] {
    _id,
    clientName,
    clientDesignation,
    brand,
    quote,
    rating,
    photo
  }
`

// ─── Sitemap ───
export const sitemapQuery = groq`{
  "projects": *[_type == "project" && defined(slug.current) && (syncStatus == "approved" || !defined(syncStatus))] {
    "slug": slug.current,
    _updatedAt
  },
  "services": *[_type == "service" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  }
}`
