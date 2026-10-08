import type { ReactNode } from 'react'
import { PageEntrance } from '@/components/motion/PageEntrance'

export default function EnglishTemplate({ children }: { children: ReactNode }) {
  return <PageEntrance>{children}</PageEntrance>
}
