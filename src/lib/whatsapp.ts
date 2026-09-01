import type { Locale } from '@/content'

// Número no formato internacional, apenas dígitos (ex.: '5551999999999').
// Enquanto estiver vazio, os CTAs mantêm o destino anterior.
const WHATSAPP_NUMBER = '5551992415164'

const defaultMessage: Record<Locale, string> = {
  pt: 'Olá! Vim pelo site da Studio Cora e gostaria de conversar sobre um projeto.',
  en: 'Hi! I came from the Studio Cora website and I would like to talk about a project.',
}

/**
 * Props de link para os CTAs que devem abrir o WhatsApp.
 * `fallbackHref` é usado enquanto `WHATSAPP_NUMBER` não estiver configurado.
 */
export function whatsappLinkProps(locale: Locale, fallbackHref: string) {
  if (!WHATSAPP_NUMBER) return { href: fallbackHref }

  const text = encodeURIComponent(defaultMessage[locale])

  return {
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`,
    target: '_blank',
    rel: 'noopener noreferrer',
  }
}
