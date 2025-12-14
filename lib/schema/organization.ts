/**
 * Organization Schema Generator
 * Framework-agnostic function for generating Organization/Restaurant schema
 */

import type { Organization, OrganizationInput } from './types';
import { generateSchemaId, formatOpeningHours, cleanSchema } from './base';

/**
 * Generate Organization Schema (Restaurant, FoodEstablishment, etc.)
 *
 * @param config - Organization configuration
 * @returns Complete Organization schema object
 */
export function organizationSchema(config: OrganizationInput): Organization {
  const schema: Organization = {
    '@context': 'https://schema.org',
    '@type': config.types || ['Organization', 'Restaurant', 'FoodEstablishment'],
    '@id': generateSchemaId(config.url, 'organization'),
    name: config.name,
    url: config.url,
  };

  // Optional fields
  if (config.alternateName) {
    schema.alternateName = config.alternateName;
  }

  if (config.description) {
    schema.description = config.description;
  }

  if (config.logo) {
    schema.logo = {
      '@type': 'ImageObject',
      url: config.logo,
    };
  }

  if (config.image) {
    schema.image = config.image;
  }

  if (config.telephone) {
    schema.telephone = config.telephone;
  }

  if (config.email) {
    schema.email = config.email;
  }

  if (config.address) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: config.address.street,
      addressLocality: config.address.city,
      postalCode: config.address.postalCode,
      addressCountry: config.address.country,
      ...(config.address.region && { addressRegion: config.address.region }),
    };
  }

  if (config.geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: config.geo.latitude,
      longitude: config.geo.longitude,
    };
  }

  if (config.openingHours && config.openingHours.length > 0) {
    schema.openingHoursSpecification = formatOpeningHours(config.openingHours);
  }

  if (config.cuisine && config.cuisine.length > 0) {
    schema.servesCuisine = config.cuisine;
  }

  if (config.priceRange) {
    schema.priceRange = config.priceRange;
  }

  if (config.socialMedia && config.socialMedia.length > 0) {
    schema.sameAs = config.socialMedia.filter(Boolean);
  }

  if (config.foundingDate) {
    schema.foundingDate = config.foundingDate;
  }

  return cleanSchema(schema);
}

/**
 * Pre-configured Anmol Sweets Organization Schema
 * Uses the actual brand data from the project
 */
export function anmolOrganizationSchema(baseUrl: string = 'https://anmolsweets.se'): Organization {
  return organizationSchema({
    name: 'Anmol Sweets & Restaurant',
    alternateName: 'Anmol Indian Pakistani Restaurant Stockholm',
    description: 'Authentic Indian and Pakistani restaurant, bakery, and sweet shop in Stockholm. Offering traditional cuisine, fresh sweets, catering services, and buffet meals.',
    url: baseUrl,
    logo: 'https://anmolsweets.se/wp-content/uploads/2022/08/cropped-anmol-logo-192-px.png',
    image: 'https://anmolsweets.se/wp-content/uploads/2022/08/cropped-anmol-logo-192-px.png',
    telephone: '+46 8 88 66 79',
    email: 'info@anmolsweets.se',
    address: {
      street: 'Fagerstagatan 13',
      city: 'Spånga',
      region: 'Stockholm',
      postalCode: '163 53',
      country: 'SE',
    },
    geo: {
      latitude: 59.3781,
      longitude: 17.9294,
    },
    openingHours: [
      { day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '20:00' },
      { day: ['Saturday', 'Sunday'], opens: '10:00', closes: '19:00' },
    ],
    cuisine: ['Indian', 'Pakistani', 'South Asian', 'Vegetarian', 'Halal'],
    priceRange: '$$',
    socialMedia: [
      'https://www.facebook.com/AnmolSweetsStockholm',
      'https://www.instagram.com/anmolsweetsstockholm/',
      'https://x.com/AnmolSweets',
      'https://www.youtube.com/@anmolsweetsstockholm',
      'https://www.tiktok.com/@anmolsweetsstockholm',
    ],
    foundingDate: '2015',
    types: ['Organization', 'Restaurant', 'FoodEstablishment', 'Bakery', 'Store'],
  });
}

/**
 * Full-featured Anmol Organization Schema with all details
 * Includes special offers, amenities, and additional business info
 */
export function anmolOrganizationSchemaFull(baseUrl: string = 'https://anmolsweets.se'): Organization {
  const baseSchema = anmolOrganizationSchema(baseUrl);

  return {
    ...baseSchema,

    // Payment methods
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Swish', 'Klarna'],
    currenciesAccepted: 'SEK',

    // Special opening hours for buffets
    specialOpeningHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        opens: '11:00',
        closes: '14:00',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        description: 'Lunch Buffet - 139 SEK',
      },
      {
        '@type': 'OpeningHoursSpecification',
        opens: '10:30',
        closes: '14:00',
        dayOfWeek: ['Saturday', 'Sunday'],
        description: 'Weekend Breakfast Buffet (Halwa Puri) - 129 SEK',
      },
    ],

    // Special offers
    hasOfferCatalog: [
      {
        '@type': 'OfferCatalog',
        name: 'Buffet Specials',
        description: 'All-you-can-eat Indian and Pakistani buffet meals',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Weekday Lunch Buffet',
            description: 'Monday to Friday lunch buffet with variety of Indian and Pakistani dishes',
            price: '139',
            priceCurrency: 'SEK',
            availability: 'https://schema.org/InStock',
            validFrom: '11:00',
            validThrough: '14:00',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          },
          {
            '@type': 'Offer',
            name: 'Weekend Breakfast Buffet (Halwa Puri)',
            description: 'Saturday and Sunday breakfast buffet with traditional Halwa Puri and more',
            price: '129',
            priceCurrency: 'SEK',
            availability: 'https://schema.org/InStock',
            validFrom: '10:30',
            validThrough: '14:00',
            dayOfWeek: ['Saturday', 'Sunday'],
          },
        ],
      },
    ],

    // Amenities and features
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Wheelchair Accessible', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free WiFi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Parking Available', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Family Friendly', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Halal Certified', value: true },
    ],

    // Services offered
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Restaurant Dining',
          description: 'Dine-in restaurant service with authentic Indian and Pakistani cuisine',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Bakery Services',
          description: 'Fresh baked goods and traditional sweets',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Sweet Shop',
          description: 'Traditional Indian and Pakistani sweets and desserts',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Catering Services',
          description: 'Professional catering for events, parties, and special occasions',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Takeaway & Delivery',
          description: 'Food delivery and takeaway services throughout Stockholm',
        },
      },
    ],

    // Area served
    areaServed: [
      {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: 59.3781,
          longitude: 17.9294,
        },
        geoRadius: '50000', // 50km radius
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Stockholm County',
      },
      {
        '@type': 'Country',
        name: 'Sweden',
      },
    ],
  };
}
