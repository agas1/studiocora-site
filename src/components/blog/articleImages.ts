const imagesBySlug: Record<string, string> = {
  'o-que-e-gestao-de-redes-sociais': '/blog/social-media-management.png',
  'what-is-social-media-management': '/blog/social-media-management.png',
  'quanto-custa-gestao-de-redes-sociais': '/blog/social-media-cost.png',
  'social-media-management-cost': '/blog/social-media-cost.png',
  'branding-e-identidade-visual-diferenca': '/blog/branding-visual-identity.png',
  'branding-vs-visual-identity': '/blog/branding-visual-identity.png',
  'quando-empresa-precisa-rebranding': '/blog/rebranding.png',
  'when-does-a-company-need-rebranding': '/blog/rebranding.png',
  'landing-page-ou-site-institucional': '/blog/landing-page-or-site.png',
  'landing-page-vs-corporate-website': '/blog/landing-page-or-site.png',
  'quanto-custa-criar-site-profissional': '/blog/professional-website.png',
  'professional-website-cost': '/blog/professional-website.png',
  'como-saber-se-empresa-precisa-social-media': '/blog/company-social-media.png',
  'does-your-company-need-social-media-management': '/blog/company-social-media.png',
  'branding-antes-de-trafego-pago': '/blog/branding-paid-media.png',
  'branding-before-paid-media': '/blog/branding-paid-media.png',
}

export function getArticleImage(slug: string) {
  return imagesBySlug[slug]
}
