'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useMinWidth } from '@/lib/useMinWidth'

export function HorizontalScrollDrift({ children, direction = 'left' }: { children: ReactNode; direction?: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  // Em uma coluna só, deslocar 120px joga o cartão para fora da tela.
  const isWide = useMinWidth(768)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const x = useTransform(scrollYProgress, [0, 1], direction === 'left' ? [120, -120] : [-120, 120])
  const smoothX = useSpring(x, { stiffness: 45, damping: 22, mass: 0.9 })

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div style={reduceMotion || !isWide ? undefined : { x: smoothX }}>
        {children}
      </motion.div>
    </div>
  )
}
