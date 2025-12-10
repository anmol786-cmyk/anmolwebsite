/**
 * Anmol Sweets & Restaurant - Product Creator
 *
 * This script creates products in WordPress via WooCommerce REST API
 * Follow PRODUCT-TEMPLATE.md and ANMOL-BRAND-CONTEXT.md for content guidelines
 */

const https = require('https');

// WordPress REST API Credentials
const SITE_URL = 'anmolsweets.se';
const CONSUMER_KEY = 'ck_9ec8925ed5a7a6ffe2a8ddbd6f0f19124f6b91a9';
const CONSUMER_SECRET = 'cs_1cc14cc1ec7e9f40f0a2ec934a472833f3f2fcc0';

/**
 * Create a product in WooCommerce
 * @param {Object} productData - Product data following WooCommerce API format
 * @returns {Promise} - Resolves with created product data
 */
function createProduct(productData) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
    const data = JSON.stringify(productData);

    const options = {
      hostname: SITE_URL,
      path: '/wp-json/wc/v3/products',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'Authorization': `Basic ${auth}`
      }
    };

    const req = https.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(body);

          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log('\n✅ Product created successfully!');
            console.log(`   Product ID: ${response.id}`);
            console.log(`   Name: ${response.name}`);
            console.log(`   Slug: ${response.slug}`);
            console.log(`   Status: ${response.status}`);
            console.log(`   View in admin: https://${SITE_URL}/wp-admin/post.php?post=${response.id}&action=edit`);
            resolve(response);
          } else {
            console.error('\n❌ Error creating product:');
            console.error(`   Status: ${res.statusCode}`);
            console.error(`   Message: ${response.message || body}`);
            reject(new Error(response.message || body));
          }
        } catch (error) {
          console.error('\n❌ Error parsing response:', error.message);
          console.error('   Response body:', body);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error('\n❌ Request error:', error.message);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

// =============================================================================
// PRODUCT EXAMPLES - Modify these or add your own below
// =============================================================================

// Example 1: Shan Spice Product
const shanFruitChaat = {
  name: "Shan Fruit Chaat 50g",
  slug: "shan-fruit-chaat-masala",
  type: "simple",
  status: "draft",
  regular_price: "12",
  sku: "AN-Gs-20021",
  weight: "50",
  categories: [{ id: 378 }], // Spices
  short_description: `<h3>Shan Fruit Chaat Masala - Authentic Pakistani Spice Blend</h3>
<p>Premium Shan Fruit Chaat Masala - 50g. Perfect blend of tangy spices for authentic Pakistani & Indian fruit chaat. Available at Anmol Sweets & Restaurant Stockholm.</p>`,
  description: `<h2>Shan Fruit Chaat Masala 50g - Authentic Pakistani Spice Blend</h2>

<p>Experience the authentic taste of Pakistan with <strong>Shan Fruit Chaat Masala</strong>, now available at <strong>Anmol Sweets & Restaurant Stockholm</strong> - your trusted source for premium Pakistani spices in Sweden.</p>

<h3>What is Fruit Chaat Masala?</h3>
<p>Shan Fruit Chaat Masala is a traditional Pakistani spice blend specifically crafted for fruit chaat - a beloved street food across Pakistan and India. This expertly balanced mix of tangy, spicy, and aromatic ingredients transforms fresh fruits into an exciting flavor experience.</p>

<h3>Why Choose Shan Fruit Chaat Masala?</h3>
<ul>
<li><strong>45+ Years of Excellence:</strong> Shan Foods has been Pakistan's #1 spice brand since 1981, trusted by millions worldwide.</li>
<li><strong>Authentic Recipe:</strong> Traditional blend using time-honored Pakistani methods and premium ingredients.</li>
<li><strong>Versatile Use:</strong> Perfect for fruit chaats, salads, fresh juices, and even savory snacks.</li>
<li><strong>No Artificial Additives:</strong> Made with natural spices, no artificial colors or preservatives.</li>
<li><strong>Restaurant Quality:</strong> The same premium spices we use in our award-winning restaurant.</li>
<li><strong>Convenient Packaging:</strong> 50g pack perfect for home use, resealable for freshness.</li>
</ul>

<h3>How to Use Shan Fruit Chaat Masala</h3>
<p><strong>Classic Fruit Chaat:</strong> Mix chopped seasonal fruits (apples, bananas, guava, pomegranate) with a sprinkle of masala, lemon juice, and fresh mint.</p>
<p><strong>Refreshing Beverages:</strong> Add a pinch to fresh fruit juices, lassi, or mocktails for an authentic Pakistani twist.</p>
<p><strong>Salads & Snacks:</strong> Sprinkle on cucumber slices, corn chaat, or mixed vegetable salads for extra zing.</p>
<p><strong>Swedish-Pakistani Fusion:</strong> Try it on Swedish seasonal fruits during fika - a delightful cultural blend!</p>

<h3>Why Shop at Anmol Sweets & Restaurant?</h3>
<p>Anmol Sweets & Restaurant is Stockholm's premier destination for authentic Pakistani and Indian products. As the most famous restaurant in Stockholm for Indo-Pak sweets and food, we carefully curate our grocery selection to bring you the same quality and authenticity you experience in our restaurant.</p>

<h3>Product Details</h3>
<ul>
<li><strong>Brand:</strong> Shan Foods (Pakistan's #1 spice brand for 45+ years)</li>
<li><strong>Weight:</strong> 50 grams</li>
<li><strong>Origin:</strong> Pakistan</li>
<li><strong>Category:</strong> Grocery - Spices</li>
<li><strong>Ingredients:</strong> Salt, red chili, black pepper, dried mango, cumin, black salt, citric acid, and signature spice blend</li>
<li><strong>Shelf Life:</strong> See package for best before date</li>
<li><strong>Storage:</strong> Store in a cool, dry place. Keep container tightly closed.</li>
<li><strong>Allergens:</strong> See packaging for complete allergen information</li>
</ul>

<h3>Perfect For</h3>
<p>✓ Pakistani & Indian families in Stockholm seeking authentic flavors<br>
✓ Food enthusiasts exploring South Asian street food culture<br>
✓ Health-conscious individuals looking for natural spice blends<br>
✓ Summer gatherings and fruit salad preparations<br>
✓ Anyone craving the tangy, spicy kick of authentic chaat<br>
✓ Professional caterers and chefs creating fusion menus</p>

<h3>Delivery & Pickup</h3>
<p>Available for home delivery across Stockholm or pickup from our restaurant at Fagerstagatan 13, Spånga. Order your Shan Fruit Chaat Masala today and bring the authentic taste of Pakistan to your kitchen!</p>

<p><em>At Anmol Sweets & Restaurant, we don't just serve food - we serve traditions, memories, and the authentic flavors of home.</em></p>`
};

// =============================================================================
// ADD YOUR NEW PRODUCTS HERE
// =============================================================================

// Example template for a new product:
const newProduct = {
  name: "Product Name with Size",
  slug: "product-name-slug",
  type: "simple",
  status: "draft", // Always start with draft
  regular_price: "0", // Price in SEK
  sku: "AN-XX-XXXXX", // Follow SKU format: AN-[Category]-[Number]
  weight: "0", // Weight in grams
  categories: [{ id: 0 }], // See CATEGORY-REFERENCE.md
  short_description: `<h3>Product Name - Key Benefit</h3>
<p>Brief description. Available at Anmol Sweets & Restaurant Stockholm.</p>`,
  description: `<h2>Product Name - Positioning Statement</h2>
<p>Full description following PRODUCT-TEMPLATE.md structure...</p>`
};

// =============================================================================
// MAIN EXECUTION
// =============================================================================

async function main() {
  console.log('🚀 Anmol Product Creator\n');
  console.log('📋 Available products to create:');
  console.log('   1. Shan Fruit Chaat 50g (example)');
  console.log('   2. Add your products in the script\n');

  // Uncomment the product you want to create:

  // Create example product (Shan Fruit Chaat)
  // await createProduct(shanFruitChaat);

  // Create your new product
  // await createProduct(newProduct);

  console.log('\n💡 To create a product:');
  console.log('   1. Define your product object following the template');
  console.log('   2. Uncomment the createProduct() call');
  console.log('   3. Run: node create-product.js\n');
  console.log('📚 Reference documents:');
  console.log('   - PRODUCT-TEMPLATE.md (content structure)');
  console.log('   - ANMOL-BRAND-CONTEXT.md (brand voice)');
  console.log('   - CATEGORY-REFERENCE.md (category IDs)');
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

// Export for use in other scripts
module.exports = { createProduct };
