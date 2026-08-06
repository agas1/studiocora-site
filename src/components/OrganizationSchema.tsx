const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://usestudiocora.com/#organization',

  name: 'Studio Cora',
  alternateName: 'Use Studio Cora',

  url: 'https://usestudiocora.com',

  description:
    'A Studio Cora é um estúdio de design especializado em gestão de redes sociais, branding, identidade visual, direção criativa, landing pages e desenvolvimento web para empresas que desejam construir uma presença digital forte e memorável.',

  slogan: 'Where brands become memorable.',

  logo: {
    '@type': 'ImageObject',
    url: 'https://usestudiocora.com/logo.svg',
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
          name: 'Criação de Logotipo',
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

  keywords: [
    'Studio Cora',
    'Gestão de Redes Sociais',
    'Social Media',
    'Branding',
    'Identidade Visual',
    'Criação de Logotipo',
    'Landing Pages',
    'Desenvolvimento Web',
    'Design',
    'Direção Criativa',
  ],

  knowsAbout: [
    'Gestão de Redes Sociais',
    'Branding',
    'Identidade Visual',
    'Criação de Logotipo',
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