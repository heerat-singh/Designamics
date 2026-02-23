import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  wide?: boolean
  as?: 'div' | 'section' | 'article' | 'main'
}

export function Container({
  children,
  className,
  wide = false,
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        wide ? 'max-w-[1440px]' : 'max-w-[1280px]',
        className
      )}
    >
      {children}
    </Component>
  )
}