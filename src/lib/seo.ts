import { company } from '../data/company';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  article?: {
    publishedTime: string;
    modifiedTime: string;
    author: string;
  };
}

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    '@id': `${company.site}/#business`,
    name: company.name,
    alternateName: company.legalName,
    image: `${company.site}/og-default.jpg`,
    logo: `${company.site}/images/logo-calofre.svg`,
    url: company.site,
    telephone: '+33788133889',
    email: company.email,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.locality,
      postalCode: company.address.postalCode,
      addressRegion: company.address.region,
      addressCountry: company.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: company.geo.latitude,
      longitude: company.geo.longitude,
    },
    areaServed: [
      { '@type': 'City', name: 'Colomiers' },
      { '@type': 'City', name: 'Tournefeuille' },
      { '@type': 'City', name: 'Plaisance-du-Touch' },
      { '@type': 'City', name: 'Pibrac' },
      { '@type': 'City', name: 'Cornebarrieu' },
      { '@type': 'City', name: 'Léguevin' },
      { '@type': 'City', name: 'Blagnac' },
      { '@type': 'City', name: 'Cugnaux' },
      { '@type': 'City', name: 'Toulouse' },
      { '@type': 'City', name: 'La Salvetat-Saint-Gilles' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: company.openingHours.days,
        opens: company.openingHours.opens,
        closes: company.openingHours.closes,
      },
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: company.rge.name,
      recognizedBy: { '@type': 'Organization', name: company.rge.authority },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: company.rating.value,
      reviewCount: company.rating.count,
      bestRating: company.rating.best,
      worstRating: company.rating.worst,
    },
    founder: { '@type': 'Person', name: company.founder },
    foundingDate: company.foundingDate,
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'SIREN', value: '912399631' },
      { '@type': 'PropertyValue', propertyID: 'SIRET', value: '91239963100015' },
    ],
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  areaServed?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      '@type': 'Plumber',
      '@id': `${company.site}/#business`,
      name: company.name,
    },
    areaServed: service.areaServed
      ? { '@type': 'City', name: service.areaServed }
      : undefined,
    image: service.image,
  };
}

export function getArticleSchema(article: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    url: article.url,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: { '@type': 'Person', name: article.author },
    publisher: {
      '@type': 'Organization',
      name: company.name,
      logo: { '@type': 'ImageObject', url: `${company.site}/images/logo-calofre.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': article.url },
  };
}
