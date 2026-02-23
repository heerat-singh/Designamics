'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface TextRevealProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  className?: string
  delay?: number
  once?: boolean
}

export function TextReveal({
  children,
  as: Component = 'h2',
  className,
  delay = 0,
  once = true,
}: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-60px' })
  const MotionComponent = motion.create(Component)

  return (
    <span ref={ref} className="block overflow-hidden">
      <MotionComponent
        className={className}
        initial={{ y: '100%', opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </MotionComponent>
    </span>
  )
}