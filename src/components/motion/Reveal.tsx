'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Direction = 'up' | 'left' | 'right'

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  left: { x: -28, y: 8 },
  right: { x: 28, y: 8 },
}

export function Reveal({ children, direction = 'up', delay = 0, className }: { children: ReactNode; direction?: Direction; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
