import { PortableText, type PortableTextComponents } from 'next-sanity'
import type { PortableTextBlock } from 'next-sanity'
import Image from 'next/image'
import { urlFor } from '@sanity/lib/image'

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-display text-2xl md:text-3xl font-semibold mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-xl md:text-2xl font-semibold mt-8 mb-3">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-base md:text-lg leading-relaxed text-foreground/80 mb-5">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="font-serif text-xl italic border-l-4 border-accent pl-6 my-8 text-muted">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="font-serif italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-accent hover:text-accent-dark underline underline-offset-4 transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(1200).auto('format').quality(85).url()}
            alt={value.alt || ''}
            width={1200}
            height={800}
            className="w-full rounded-lg"
          />
          {value.caption && (
            <figcaption className="text-sm text-muted mt-2 text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

interface PortableTextRendererProps {
  value: PortableTextBlock[]
  className?: string
}

export function PortableTextRenderer({ value, className }: PortableTextRendererProps) {
  if (!value) return null

  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  )
}