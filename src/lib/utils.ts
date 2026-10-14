import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Route params arrive URL-encoded (e.g. "600%20sq%20yds"), but Sanity stores the raw slug.
export function decodeSlug(slug: string) {
  try {
    return decodeURIComponent(slug)
  } catch {
    return slug
  }
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
  })
}

export function getBrandColor(brand: string) {
  switch (brand) {
    case 'designamics':
      return 'var(--color-designamics)'
    case 'cityBuilders':
      return 'var(--color-citybuilders)'
    default:
      return 'var(--color-accent)'
  }
}

export function getBrandLabel(brand: string) {
  switch (brand) {
    case 'designamics':
      return 'Designamics'
    case 'cityBuilders':
      return 'City Builders'
    default:
      return 'Both Brands'
  }
}