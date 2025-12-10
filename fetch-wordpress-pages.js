/**
 * Fetch WordPress Pages Content for Comparison
 * Fetches key pages from WordPress and saves them for comparison with frontend
 */

const https = require('https');
const fs = require('fs');

const keyPages = {
  'lunch-buffet': { id: 181106, frontendPath: 'app/(shop)/lunch-buffet/page.tsx' },
  'bookings': { id: 88073, frontendPath: 'app/reservations/page.tsx' },
  'special-order': { id: 823, frontendPath: 'app/catering/page.tsx' },
  'restaurant-menu': { id: 1581, frontendPath: 'app/menu/restaurant/page.tsx' },
  'sweets-menu': { id: 1529, frontendPath: 'app/menu/sweets/page.tsx' },
  'about': { id: 89, frontendPath: 'app/about/page.tsx' },
  'contact': { id: 87, frontendPath: 'app/contact/page.tsx' },
};

function fetchPage(id) {
  return new Promise((resolve, reject) => {
    https.get(`https://anmolsweets.se/wp-json/wp/v2/pages/${id}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('🔍 Fetching WordPress Pages Content\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const results = {};

  for (const [slug, info] of Object.entries(keyPages)) {
    try {
      console.log(`📄 Fetching: ${slug}...`);
      const page = await fetchPage(info.id);

      results[slug] = {
        id: page.id,
        title: page.title.rendered,
        slug: page.slug,
        content: page.content.rendered,
        excerpt: page.excerpt.rendered,
        contentLength: page.content.rendered.length,
        frontendPath: info.frontendPath,
        yoast: page.yoast_head_json || null,
      };

      console.log(`   ✅ Title: ${page.title.rendered}`);
      console.log(`   📏 Content Length: ${page.content.rendered.length} chars`);
      console.log(`   🎯 Frontend Path: ${info.frontendPath}`);
      console.log('');

      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.error(`   ❌ Error fetching ${slug}:`, err.message);
    }
  }

  // Save results to JSON file
  const outputFile = 'wordpress-pages-content.json';
  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`\n✅ Saved all page content to: ${outputFile}`);
  console.log('\n📋 Summary:');
  console.log(`   Total pages fetched: ${Object.keys(results).length}`);
  console.log(`   Total content size: ${Object.values(results).reduce((sum, p) => sum + p.contentLength, 0).toLocaleString()} chars`);

  console.log('\n📊 Page Comparison:\n');
  console.log('┌─────────────────────┬──────────────┬─────────────────────────────────────┐');
  console.log('│ Page                │ Content Size │ Frontend Path                        │');
  console.log('├─────────────────────┼──────────────┼─────────────────────────────────────┤');

  Object.entries(results).forEach(([slug, data]) => {
    const paddedSlug = slug.padEnd(19);
    const paddedSize = `${(data.contentLength / 1000).toFixed(1)}kb`.padEnd(12);
    const path = data.frontendPath.substring(0, 35);
    console.log(`│ ${paddedSlug} │ ${paddedSize} │ ${path.padEnd(35)} │`);
  });

  console.log('└─────────────────────┴──────────────┴─────────────────────────────────────┘');

  console.log('\n💡 Next Steps:');
  console.log('   1. Review wordpress-pages-content.json');
  console.log('   2. Compare with existing frontend pages');
  console.log('   3. Update frontend pages to match WordPress content');
  console.log('   4. Ensure SEO metadata is optimized\n');
}

main().catch(console.error);
