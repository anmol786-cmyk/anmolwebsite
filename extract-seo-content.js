/**
 * Extract SEO Content from WordPress Pages
 * Extracts text, headings, keywords, and structure while removing page builder markup
 */

const fs = require('fs');

function extractSEOContent(html) {
  // Remove scripts and styles
  let content = html
    .replace(/<script[^>]*>.*?<\/script>/gis, '')
    .replace(/<style[^>]*>.*?<\/style>/gis, '');

  // Extract headings with hierarchy
  const headings = {
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: []
  };

  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
    const regex = new RegExp(`<${tag}[^>]*>(.*?)<\/${tag}>`, 'gis');
    let match;
    while ((match = regex.exec(html)) !== null) {
      const text = match[1]
        .replace(/<[^>]*>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&#8217;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, ' ')
        .trim();
      if (text) headings[tag].push(text);
    }
  });

  // Extract all paragraphs
  const paragraphs = [];
  const pRegex = /<p[^>]*>(.*?)<\/p>/gis;
  let pMatch;
  while ((pMatch = pRegex.exec(html)) !== null) {
    const text = pMatch[1]
      .replace(/<[^>]*>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&#8217;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&nbsp;/g, ' ')
      .trim();
    if (text && text.length > 10) paragraphs.push(text);
  }

  // Extract list items
  const listItems = [];
  const liRegex = /<li[^>]*>(.*?)<\/li>/gis;
  let liMatch;
  while ((liMatch = liRegex.exec(html)) !== null) {
    const text = liMatch[1]
      .replace(/<[^>]*>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&#8217;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&nbsp;/g, ' ')
      .trim();
    if (text && text.length > 5) listItems.push(text);
  }

  // Extract links (for internal linking structure)
  const links = [];
  const linkRegex = /<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gis;
  let linkMatch;
  while ((linkMatch = linkRegex.exec(html)) !== null) {
    const href = linkMatch[1];
    const text = linkMatch[2].replace(/<[^>]*>/g, '').trim();
    if (text) links.push({ href, text });
  }

  // Extract images (for image optimization)
  const images = [];
  const imgRegex = /<img[^>]*src=["']([^"']*)["'][^>]*alt=["']([^"']*)["'][^>]*>/gis;
  let imgMatch;
  while ((imgMatch = imgRegex.exec(html)) !== null) {
    images.push({
      src: imgMatch[1],
      alt: imgMatch[2].replace(/&amp;/g, '&')
    });
  }

  // Get all text content (cleaned)
  const allText = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#8217;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Extract potential keywords (words appearing frequently)
  const words = allText.toLowerCase()
    .split(/\s+/)
    .filter(w => w.length > 4 && !['which', 'their', 'there', 'these', 'those', 'about', 'would', 'should'].includes(w));

  const wordFreq = {};
  words.forEach(w => {
    wordFreq[w] = (wordFreq[w] || 0) + 1;
  });

  const keywords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([word, count]) => ({ word, count }));

  return {
    headings,
    paragraphs,
    listItems,
    links,
    images,
    allText: allText.substring(0, 2000), // First 2000 chars
    keywords,
    wordCount: words.length,
    structure: {
      hasH1: headings.h1.length > 0,
      hasH2: headings.h2.length > 0,
      hasLists: listItems.length > 0,
      hasParagraphs: paragraphs.length > 0,
      hasImages: images.length > 0,
      hasLinks: links.length > 0
    }
  };
}

function main() {
  console.log('🔍 Extracting SEO Content from WordPress Pages\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const wpData = JSON.parse(fs.readFileSync('wordpress-pages-content.json', 'utf8'));
  const seoContent = {};

  for (const [slug, page] of Object.entries(wpData)) {
    console.log(`📄 Extracting: ${slug}...`);

    const extracted = extractSEOContent(page.content);

    seoContent[slug] = {
      ...extracted,
      meta: {
        title: page.title,
        yoast: page.yoast
      },
      frontendPath: page.frontendPath
    };

    console.log(`   ✅ Extracted:`);
    console.log(`      - H1: ${extracted.headings.h1.length}`);
    console.log(`      - H2: ${extracted.headings.h2.length}`);
    console.log(`      - H3: ${extracted.headings.h3.length}`);
    console.log(`      - Paragraphs: ${extracted.paragraphs.length}`);
    console.log(`      - List items: ${extracted.listItems.length}`);
    console.log(`      - Images: ${extracted.images.length}`);
    console.log(`      - Word count: ${extracted.wordCount}`);
    console.log('');
  }

  // Save extracted content
  fs.writeFileSync('wordpress-seo-content.json', JSON.stringify(seoContent, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n✅ Saved SEO content to: wordpress-seo-content.json');

  console.log('\n📊 Content Summary:\n');
  console.log('┌──────────────────┬─────┬─────┬─────┬──────────┬────────┬───────┐');
  console.log('│ Page             │ H1  │ H2  │ H3  │ Paras    │ Lists  │ Words │');
  console.log('├──────────────────┼─────┼─────┼─────┼──────────┼────────┼───────┤');

  Object.entries(seoContent).forEach(([slug, data]) => {
    const paddedSlug = slug.substring(0, 16).padEnd(16);
    const h1 = String(data.headings.h1.length).padStart(3);
    const h2 = String(data.headings.h2.length).padStart(3);
    const h3 = String(data.headings.h3.length).padStart(3);
    const paras = String(data.paragraphs.length).padStart(8);
    const lists = String(data.listItems.length).padStart(6);
    const words = String(data.wordCount).padStart(5);
    console.log(`│ ${paddedSlug} │ ${h1} │ ${h2} │ ${h3} │ ${paras} │ ${lists} │ ${words} │`);
  });

  console.log('└──────────────────┴─────┴─────┴─────┴──────────┴────────┴───────┘');
  console.log('\n💡 Next: Review wordpress-seo-content.json for detailed content structure\n');
}

main();
