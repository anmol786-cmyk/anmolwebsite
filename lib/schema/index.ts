/**
 * Schema Generation System
 * Production-ready, framework-agnostic JSON-LD schema generators
 *
 * Usage:
 * import { productSchema, breadcrumbSchema } from '@/lib/schema';
 */

// Export all types
export * from './types';

// Export base utilities
export * from './base';

// Export schema generators
export * from './organization';
export * from './brand';
export * from './product';
export * from './category';
export * from './breadcrumb';
export * from './website';

/**
 * QUICK START EXAMPLES
 *
 * 1. Product Page:
 * ```tsx
 * import { wooCommerceProductSchema, breadcrumbSchema, productBreadcrumbs } from '@/lib/schema';
 *
 * const productJsonLd = wooCommerceProductSchema(product, { baseUrl: 'https://anmolsweets.se' });
 * const breadcrumbJsonLd = breadcrumbSchema(productBreadcrumbs(product, 'https://anmolsweets.se'));
 *
 * <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
 * ```
 *
 * 2. Category Page:
 * ```tsx
 * import { wooCategorySchema, breadcrumbSchema, categoryBreadcrumbs } from '@/lib/schema';
 *
 * const categoryJsonLd = wooCategorySchema(category, products, { baseUrl: 'https://anmolsweets.se' });
 * const breadcrumbJsonLd = breadcrumbSchema(categoryBreadcrumbs(category, 'https://anmolsweets.se'));
 * ```
 *
 * 3. Homepage with Organization:
 * ```tsx
 * import { anmolOrganizationSchemaFull, anmolWebsiteSchema, schemaGraph } from '@/lib/schema';
 *
 * const graph = schemaGraph(
 *   anmolOrganizationSchemaFull(),
 *   anmolWebsiteSchema()
 * );
 *
 * <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
 * ```
 */
