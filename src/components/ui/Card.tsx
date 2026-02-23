import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({
  children,
  className,
  hover = true,
  padding = 'md',
}: CardProps) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div
      className={cn(
        'bg-white rounded-lg overflow-hidden',
        'shadow-[var(--shadow-card)]',
        hover && 'hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300',
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  )
}