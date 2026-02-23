import { cn } from '@/lib/utils'
import { getBrandLabel } from '@/lib/utils'
import type { Brand } from '@/lib/types'

interface BrandIndicatorProps {
  brand: Brand
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function BrandIndicator({
  brand,
  showLabel = true,
  size = 'sm',
  className,
}: BrandIndicatorProps) {
  const dotSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  }

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }

  const brandColors = {
    designamics: 'bg-designamics',
    cityBuilders: 'bg-citybuilders',
    both: 'bg-accent',
  }

  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span className={cn('rounded-full', dotSizes[size], brandColors[brand])} />
      {showLabel && (
        <span className={cn('font-medium text-muted', textSizes[size])}>
          {getBrandLabel(brand)}
        </span>
      )}
    </span>
  )
}