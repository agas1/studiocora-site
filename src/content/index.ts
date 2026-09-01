import { pt } from './pt'
import { en } from './en'

export const content = {
  pt,
  en,
}

export type Locale = keyof typeof content
export type SiteContent = (typeof content)[Locale]

export function getContent(locale: Locale) {
  return content[locale]
}
