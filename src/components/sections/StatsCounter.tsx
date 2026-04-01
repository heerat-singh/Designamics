'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container } from '@/components/ui'

interface Stat {
  label: string
  value: number
  suffix?: string
}

interface StatsCounterProps {
  stats?: Stat[]
}

const DEFAULT_STATS: Stat[] = [
  { label: 'Years of Experience', value: 10, suffix: '+' },
  { label: 'Projects Completed', value: 150, suffix: '+' },
  { label: 'Happy Families', value: 100, suffix: '+' },
  { label: 'Commercial Spaces', value: 50, suffix: '+' },
]

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
      {count}
      {suffix}
    </span>
  )
}

export function StatsCounter({ stats = DEFAULT_STATS }: StatsCounterProps) {
  const safeStats = stats && stats.length > 0 ? stats : DEFAULT_STATS

  return (
    <section className="py-[var(--section-padding)] bg-foreground text-background">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {safeStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm text-background/60 font-medium tracking-wide uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
