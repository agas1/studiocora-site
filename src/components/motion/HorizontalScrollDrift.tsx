'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

export function HorizontalScrollDrift({ children, direction = 'left' }: { children: ReactNode; direction?: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const x = useTransform(scrollYProgress, [0, 1], direction === 'left' ? [120, -120] : [-120, 120])
  const smoothX = useSpring(x, { stiffness: 45, damping: 22, mass: 0.9 })

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div style={reduceMotion ? undefined : { x: smoothX }}>
        {children}
      </motion.div>
    </div>
  )
}
