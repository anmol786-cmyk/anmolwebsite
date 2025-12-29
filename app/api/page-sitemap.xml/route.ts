import { NextResponse } from 'next/server';
import { getAllPages } from '@/lib/wordpress';

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    const baseUrl = 'https://anmolsweets.se';

    // Fetch all WordPress pages
    const pages = await getAllPages();

    const urls = pages.map((page) => {
      // Pages use direct URLs (no /page/ prefix)
      const pageUrl = `${baseUrl}/${page.slug}/`;
      const lastmod = page.modified || page.date || new Date().toISOString();

      return `  <url>
    <loc>${pageUrl}</loc>
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
    console.error('Error generating page sitemap:', error);

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
