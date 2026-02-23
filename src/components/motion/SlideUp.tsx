'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface SlideUpProps {
  children: React.ReactNode
  className?: string
  delay?: number
  once?: boolean
}

export function SlideUp({
  children,
  className,
  delay = 0,
  once = true,
}: SlideUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}