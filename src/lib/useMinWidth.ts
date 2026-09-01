'use client'

import { useEffect, useState } from 'react'

// Framer Motion escreve transform e filter inline, fora do alcance dos
// breakpoints do Tailwind. Os efeitos que só fazem sentido no desktop
// precisam consultar a media query em JavaScript.
export function useMinWidth(minWidth: number) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${minWidth}px)`)
    const update = () => setMatches(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [minWidth])

  return matches
}
