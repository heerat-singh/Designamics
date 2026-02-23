import { cn } from '@/lib/utils'
import type { Brand } from '@/lib/types'

interface BadgeProps {
  children: React.ReactNode
  brand?: Brand
  className?: string
  size?: 'sm' | 'md'
}

export function Badge({ children, brand, className, size = 'sm' }: BadgeProps) {
  const brandStyles = {
    designamics: 'bg-designamics-light text-designamics-dark',
    cityBuilders: 'bg-citybuilders-light text-citybuilders-dark',
    both: 'bg-accent-light text-accent-dark',
  }

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        sizes[size],
        brand ? brandStyles[brand] : 'bg-foreground/10 text-foreground',
        className
      )}
    >
      {children}
    </span>
  )
}