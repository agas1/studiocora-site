'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useMinWidth } from '@/lib/useMinWidth'

export function ScrollSectionReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  // Desfoque animado sobre uma seção inteira custa caro em celular: no mobile
  // a revelação fica só na opacidade e no deslocamento vertical.
  const isWide = useMinWidth(768)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 100%', 'start 24%'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.35, 0.68, 1])
  const filter = useTransform(scrollYProgress, [0, 0.24, 0.5], ['blur(5px)', 'blur(2px)', 'blur(0px)'])
  const y = useTransform(scrollYProgress, [0, 1], [18, 0])

  return (
    <motion.div ref={ref} style={reduceMotion ? undefined : isWide ? { opacity, filter, y } : { opacity, y }} className={className}>
      {children}
    </motion.div>
  )
}
