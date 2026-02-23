import Image from 'next/image'
import { urlFor } from '@sanity/lib/image'
import { cn } from '@/lib/utils'
import type { SanityImage as SanityImageType } from '@/lib/types'

interface SanityImageProps {
  image: SanityImageType
  alt?: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  className?: string
  priority?: boolean
}

export function SanityImage({
  image,
  alt,
  width,
  height,
  fill,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className,
  priority = false,
}: SanityImageProps) {
  if (!image?.asset) return null

  const imageUrl = urlFor(image)
    .auto('format')
    .quality(85)

  if (fill) {
    return (
      <Image
        src={imageUrl.url()}
        alt={alt || image.alt || ''}
        fill
        sizes={sizes}
        className={cn('object-cover', className)}
        priority={priority}
      />
    )
  }

  return (
    <Image
      src={imageUrl.width(width || 1200).url()}
      alt={alt || image.alt || ''}
      width={width || 1200}
      height={height || 800}
      sizes={sizes}
      className={className}
      priority={priority}
    />
  )
}