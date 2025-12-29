import { NextResponse } from 'next/server';

export const revalidate = 3600; // Revalidate every hour

interface AttributeTerm {
  id: number;
  name: string;
  slug: string;
  count: number;
}

async function getMixOptionsTerms(): Promise<AttributeTerm[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://anmolsweets.se';
    const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY || process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET || process.env.WC_CONSUMER_SECRET;

    if (!consumerKey || !consumerSecret) {
      console.error('WooCommerce credentials not configured');
      return [];
    }

    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    // Fetch mix-options attribute terms from WooCommerce
    // pa_mix-options is a product attribute (pa_ prefix indicates product attribute)
    const response = await fetch(
      `${apiUrl}/wp-json/wc/v3/products/attributes/pa_mix-options/terms?per_page=100`,
      {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch mix-options terms: ${response.status} ${response.statusText}`);
      return [];
    }

    const terms = await response.json();
    return terms;
  } catch (error) {
    console.error('Error fetching mix-options terms:', error);
    return [];
  }
}

export async function GET() {
  try {
    const baseUrl = 'https://anmolsweets.se';

    // Fetch all mix-options attribute terms
    const terms = await getMixOptionsTerms();

    const urls = terms.map((term) => {
      // Product attributes typically use the attribute name as prefix
      // Format: /pa_mix-options/{term-slug}/ or similar
      const termUrl = `${baseUrl}/pa_mix-options/${term.slug}/`;
      const lastmod = new Date().toISOString();

      return `  <url>
    <loc>${termUrl}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`;
    }).join('\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="${baseUrl}/wp-content/plugins/seo-by-rank-math/includes/modules/sitemap/assets/sitemap.xsl"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating pa_mix-options sitemap:', error);

    // Return empty sitemap on error
    const baseUrl = 'https://anmolsweets.se';
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;

    return new NextResponse(emptySitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300, s-maxage=300',
      },
    });
  }
}
