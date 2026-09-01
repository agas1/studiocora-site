const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://usestudiocora.com/#organization',

  name: 'Studio Cora',
  alternateName: 'Use Studio Cora',

  url: 'https://usestudiocora.com',

  description:
    'A Studio Cora é um estúdio de design especializado em gestão de redes sociais, branding, identidade visual, direção criativa, landing pages e desenvolvimento web para empresas que desejam construir uma presença digital forte e memorável.',

  slogan: 'Design that connects.',

  logo: {
    '@type': 'ImageObject',
    url: 'https://usestudiocora.com/icon.png',
  },

  image: 'https://usestudiocora.com/opengraph-image.png',

  email: 'hello@usestudiocora.com',

  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BR',
  },

  areaServed: {
    '@type': 'Country',
    name: 'Brasil',
  },

  availableLanguage: [
    {
      '@type': 'Language',
      name: 'Português',
      alternateName: 'pt-BR',
    },
    {
      '@type': 'Language',
      name: 'English',
      alternateName: 'en',
    },
  ],

  sameAs: [
    'https://www.instagram.com/usestudiocora/',
    'https://www.linkedin.com/company/studiocora/',
  ],

  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Serviços da Studio Cora',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Gestão de Redes Sociais',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Branding',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Identidade Visual',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Landing Pages',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Desenvolvimento Web',
        },
      },
    ],
  },

  knowsAbout: [
    'Gestão de Redes Sociais',
    'Branding',
    'Identidade Visual',
    'Direção Criativa',
    'Landing Pages',
    'Desenvolvimento Web',
    'UX/UI',
    'Design',
    'Estratégia de Marca',
    'Experiências Digitais',
  ],
}

export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c'),
      }}
    />
  )
}
