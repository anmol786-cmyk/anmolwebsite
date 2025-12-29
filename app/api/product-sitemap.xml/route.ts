import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/woocommerce/products-direct';

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    const baseUrl = 'https://anmolsweets.se';

    // Fetch all products (increase limit to get all products)
    const { data: products } = await getProducts({
      per_page: 100,
      status: 'publish'
    });

    const urls = products.map((product) => {
      const productUrl = `${baseUrl}/${product.slug}/`;
      const lastmod = product.date_modified || product.date_created || new Date().toISOString();

      // Get product image if available
      const imageUrl = product.images?.[0]?.src;

      return `  <url>
    <loc>${productUrl}</loc>
    <lastmod>${lastmod}</lastmod>${imageUrl ? `
    <image:image>
      <image:loc>${imageUrl}</image:loc>
    </image:image>` : ''}
  </url>`;
    }).join('\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="${baseUrl}/wp-content/plugins/seo-by-rank-math/includes/modules/sitemap/assets/sitemap.xsl"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
        http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd"
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
    console.error('Error generating product sitemap:', error);

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
