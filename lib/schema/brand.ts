/**
 * Brand Schema Generator
 * Framework-agnostic function for generating Brand schema
 */

import type { Brand } from './types';
import { createImageObject, cleanSchema } from './base';

/**
 * Generate Brand Schema
 *
 * @param name - Brand name
 * @param options - Additional brand options
 * @returns Brand schema object
 */
export function brandSchema(
  name: string,
  options?: {
    url?: string;
    logo?: string;
    description?: string;
    logoWidth?: number;
    logoHeight?: number;
  }
): Brand {
  const schema: Brand = {
    '@type': 'Brand',
    name,
  };

  if (options?.url) {
    schema.url = options.url;
  }

  if (options?.logo) {
    if (options.logoWidth && options.logoHeight) {
      schema.logo = createImageObject(options.logo, {
        width: options.logoWidth,
        height: options.logoHeight,
      });
    } else {
      schema.logo = options.logo;
    }
  }

  if (options?.description) {
    schema.description = options.description;
  }

  return cleanSchema(schema);
}

/**
 * Pre-configured Anmol Sweets Brand Schema
 */
export function anmolBrandSchema(): Brand {
  return brandSchema('Anmol Sweets & Restaurant', {
    url: 'https://anmolsweets.se',
    logo: 'https://anmolsweets.se/wp-content/uploads/2022/08/cropped-anmol-logo-192-px.png',
    description: 'Stockholm\'s premier destination for authentic Pakistani & Indian cuisine, sweets, and grocery',
  });
}
