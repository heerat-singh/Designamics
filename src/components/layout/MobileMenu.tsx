'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS, BRANDS } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  onClose: () => void
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const pathname = usePathname()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-40 lg:hidden"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />

      {/* Menu Panel */}
      <motion.nav
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 right-0 bottom-0 w-[80vw] max-w-sm bg-background shadow-2xl"
      >
        <div className="flex flex-col pt-24 px-8">
          {NAV_LINKS.map((link, index) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    'block py-3 text-2xl font-display font-medium border-b border-border/50 transition-colors',
                    isActive ? 'text-accent' : 'text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              </motion.div>
            )
          })}

          {/* Brand Info */}
          <div className="mt-10 space-y-4">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-designamics">
                {BRANDS.designamics.name}
              </p>
              <p className="text-sm text-muted mt-1">{BRANDS.designamics.tagline}</p>
            </div>
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-citybuilders">
                {BRANDS.cityBuilders.name}
              </p>
              <p className="text-sm text-muted mt-1">{BRANDS.cityBuilders.tagline}</p>
            </div>
          </div>
        </div>
      </motion.nav>
    </motion.div>
  )
}