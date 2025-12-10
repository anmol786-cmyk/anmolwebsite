/**
 * Anmol Sweets & Restaurant - Lazzat & Laziza Products Creator
 * Creates Lazzat Mango Pulp and Laziza Shami Kebab products
 */

const https = require('https');

// WordPress REST API Credentials
const SITE_URL = 'anmolsweets.se';
const CONSUMER_KEY = 'ck_9ec8925ed5a7a6ffe2a8ddbd6f0f19124f6b91a9';
const CONSUMER_SECRET = 'cs_1cc14cc1ec7e9f40f0a2ec934a472833f3f2fcc0';

/**
 * Create a product in WooCommerce
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
            console.log(`✅ Created: ${response.name} (ID: ${response.id})`);
            resolve(response);
          } else {
            console.error(`❌ Failed: ${productData.name} - ${response.message || body}`);
            reject(new Error(response.message || body));
          }
        } catch (error) {
          console.error(`❌ Error: ${productData.name} - ${error.message}`);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error(`❌ Request error for ${productData.name}:`, error.message);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

// =============================================================================
// PRODUCTS
// =============================================================================

const products = [
  // 1. Lazzat Kesar Mango Pulp 850g
  {
    name: "Lazzat Kesar Mango Pulp 850g",
    slug: "lazzat-kesar-mango-pulp-850g",
    type: "simple",
    status: "draft",
    regular_price: "39",
    sku: "AN-Gs-20035",
    weight: "0.85",
    categories: [{ id: 211 }], // Snacks & Drinks (Beverages)
    short_description: `<h3>Lazzat Kesar Mango Pulp - Premium Saffron-Flavored Mango</h3>
<p>Premium Lazzat Kesar Mango Pulp - 850g tin. Authentic Indian saffron-flavored mango pulp perfect for lassi, smoothies, and desserts. Available at Anmol Sweets & Restaurant Stockholm.</p>`,
    description: `<h2>Lazzat Kesar Mango Pulp 850g - Premium Saffron-Flavored Indian Mango</h2>

<p>Experience the authentic taste of India with <strong>Lazzat Kesar Mango Pulp</strong>, now available at <strong>Anmol Sweets & Restaurant Stockholm</strong> - your trusted source for premium Pakistani and Indian ingredients in Sweden. This luxurious saffron-flavored mango pulp brings the royal taste of Alphonso mangoes to your Stockholm kitchen.</p>

<h3>What is Kesar Mango Pulp?</h3>
<p>Lazzat Kesar Mango Pulp is premium Indian mango pulp made from the finest Alphonso mangoes, enhanced with kesar (saffron) for a luxurious, aromatic flavor. "Kesar" means saffron in Hindi/Urdu, and this traditional combination creates the signature golden-yellow color and rich, sweet taste that defines premium Indian mango products. Unlike regular mango pulp, Kesar variety offers deeper flavor complexity with subtle saffron notes. This 850g tin contains thick, smooth pulp that's ready to use - no peeling, no chopping, no waste. It's the secret ingredient behind Stockholm's best mango lassi at Anmol Sweets & Restaurant!</p>

<h3>Why Choose Lazzat Kesar Mango Pulp?</h3>
<ul>
<li><strong>Premium Kesar Quality:</strong> Enhanced with real saffron (kesar) for authentic royal Indian taste and aroma.</li>
<li><strong>Alphonso Mangoes:</strong> Made from India's finest mango variety - known as the "King of Mangoes" worldwide.</li>
<li><strong>Ready to Use:</strong> Thick, smooth pulp requires no preparation - open tin and use immediately.</li>
<li><strong>850g Tin Pack:</strong> Generous size perfect for making multiple servings of lassi, smoothies, or desserts.</li>
<li><strong>Restaurant Quality:</strong> The same premium mango pulp we use for our famous mango lassi at Anmol Stockholm.</li>
<li><strong>Natural & Authentic:</strong> No artificial flavors or colors - just real mangoes and saffron.</li>
<li><strong>Versatile Use:</strong> Perfect for drinks, desserts, ice cream, smoothie bowls, and cooking.</li>
<li><strong>Long Shelf Life:</strong> Convenient tin packaging keeps pulp fresh - stock your pantry for year-round mango enjoyment.</li>
<li><strong>Excellent Value:</strong> Affordable luxury - brings authentic Indian mango taste to Stockholm at great price.</li>
</ul>

<h3>How to Use Lazzat Kesar Mango Pulp</h3>
<p><strong>Classic Mango Lassi:</strong> Blend mango pulp with yogurt, milk, sugar, and ice - the most popular Pakistani/Indian drink! Our restaurant's signature recipe.</p>
<p><strong>Mango Smoothie:</strong> Mix with ice, milk or yogurt, and a pinch of cardamom for refreshing Swedish summer treat.</p>
<p><strong>Mango Shake:</strong> Blend with cold milk, ice cream, and ice cubes - creamy and delicious!</p>
<p><strong>Mango Kulfi:</strong> Traditional Pakistani/Indian ice cream - mix pulp with condensed milk and freeze.</p>
<p><strong>Mango Desserts:</strong> Top vanilla ice cream, use in cheesecakes, or create mango mousse.</p>
<p><strong>Smoothie Bowls:</strong> Create Instagram-worthy mango bowls topped with granola and fruits.</p>
<p><strong>Mango Sauce:</strong> Use as topping for pancakes, waffles, or Swedish desserts - fusion at its best!</p>
<p><strong>Indian Sweets:</strong> Add to traditional sweets like shrikhand or aamras.</p>
<p><strong>Cocktails & Mocktails:</strong> Create mango-based drinks for parties and gatherings.</p>

<h3>Why Shop at Anmol Sweets & Restaurant?</h3>
<p>Anmol Sweets & Restaurant is Stockholm's premier destination for authentic Pakistani and Indian products. Our mango lassi is legendary - customers ask what makes it so special! The answer is Lazzat Kesar Mango Pulp. We use only premium quality ingredients, and this authentic Indian mango pulp is the secret to our consistently delicious mango drinks. Now you can create the same restaurant-quality mango lassi at home!</p>

<h3>Product Details</h3>
<ul>
<li><strong>Brand:</strong> Lazzat (Premium Indian food products)</li>
<li><strong>Product:</strong> Kesar (Saffron) Mango Pulp</li>
<li><strong>Weight:</strong> 850 grams (net weight)</li>
<li><strong>Mango Variety:</strong> Alphonso (King of Mangoes)</li>
<li><strong>Special Ingredient:</strong> Kesar (Saffron) for premium flavor</li>
<li><strong>Origin:</strong> India</li>
<li><strong>Category:</strong> Beverages - Grocery</li>
<li><strong>Packaging:</strong> Sealed tin can for freshness and longevity</li>
<li><strong>Ingredients:</strong> Mango pulp (Alphonso), sugar, saffron (kesar), citric acid</li>
<li><strong>Texture:</strong> Thick, smooth, ready-to-use pulp</li>
<li><strong>Color:</strong> Rich golden-yellow (natural from kesar)</li>
<li><strong>Sweetness:</strong> Naturally sweet with balanced flavor</li>
<li><strong>Uses Per Tin:</strong> Approximately 6-8 large glasses of mango lassi</li>
<li><strong>Shelf Life:</strong> See tin for best before date (typically 12-18 months sealed)</li>
<li><strong>Storage:</strong> Store in cool, dry place. Refrigerate after opening and consume within 3-4 days.</li>
</ul>

<h3>Perfect For</h3>
<p>✓ Anyone who loves our restaurant's famous mango lassi and wants it at home<br>
✓ Pakistani & Indian families in Stockholm craving authentic mango flavor<br>
✓ Summer refreshment - mango drinks perfect for Swedish summers<br>
✓ Health-conscious individuals seeking natural fruit-based beverages<br>
✓ Smoothie and juice enthusiasts<br>
✓ Parents looking for natural, kid-friendly treats<br>
✓ Dessert lovers and home bakers<br>
✓ Party hosts wanting impressive, exotic drinks<br>
✓ Swedish families exploring international flavors<br>
✓ Vegan cooking (check specific recipe adaptations)</p>

<h3>Delivery & Pickup</h3>
<p>Available for home delivery across Stockholm or pickup from our restaurant at Fagerstagatan 13, Spånga. Order your Lazzat Kesar Mango Pulp today and create restaurant-quality mango lassi and desserts at home!</p>

<p><em>At Anmol Sweets & Restaurant, we don't just serve food - we serve traditions, memories, and the authentic flavors of home.</em></p>`
  },

  // 2. Laziza Shami Kebab Seasoning Mix 100g
  {
    name: "Laziza Shami Kebab Seasoning Mix 100g",
    slug: "laziza-shami-kebab-seasoning-100g",
    type: "simple",
    status: "draft",
    regular_price: "18",
    sku: "AN-Gs-20036",
    weight: "0.1",
    categories: [{ id: 378 }], // Spices
    short_description: `<h3>Laziza Shami Kebab Seasoning - Authentic Pakistani Mix</h3>
<p>Premium Laziza Shami Kebab Seasoning Mix - 100g. Complete spice blend for traditional Pakistani shami kebabs. Available at Anmol Sweets & Restaurant Stockholm.</p>`,
    description: `<h2>Laziza Shami Kebab Seasoning Mix 100g - Authentic Pakistani Spice Blend</h2>

<p>Experience the authentic taste of Pakistan with <strong>Laziza Shami Kebab Seasoning Mix</strong>, now available at <strong>Anmol Sweets & Restaurant Stockholm</strong> - your trusted source for premium Pakistani spices in Sweden. Create the beloved Pakistani shami kebabs that are a staple at every celebration and gathering.</p>

<h3>What is Shami Kebab Seasoning?</h3>
<p>Laziza Shami Kebab Seasoning Mix is a specially formulated spice blend for making authentic Pakistani and Indian shami kebabs - tender, flavorful patties made from ground meat and lentils. Shami kebabs are one of the most beloved dishes in Pakistani cuisine, traditionally served at weddings, Eid celebrations, and special occasions. This complete seasoning mix contains all the essential spices in perfect proportions, making it easy to create restaurant-quality shami kebabs at home. The blend creates the signature rich, aromatic flavor with hints of warming spices that make shami kebabs irresistible. These kebabs are different from seekh kebabs - softer, more delicate, and often enjoyed with mint chutney and naan.</p>

<h3>Why Choose Laziza Shami Kebab Seasoning Mix?</h3>
<ul>
<li><strong>Authentic Pakistani Recipe:</strong> Traditional blend perfected over generations for genuine shami kebab taste.</li>
<li><strong>Complete Spice Mix:</strong> All essential spices in perfect balance - no need to buy multiple ingredients.</li>
<li><strong>Easy to Use:</strong> Clear instructions make creating perfect shami kebabs simple, even for beginners.</li>
<li><strong>Trusted Brand:</strong> Laziza is a well-established Pakistani brand known for quality seasoning mixes.</li>
<li><strong>Restaurant Quality:</strong> Create the same delicious shami kebabs served at Anmol Sweets & Restaurant Stockholm.</li>
<li><strong>Versatile Protein:</strong> Works beautifully with beef, lamb, chicken, or vegetarian alternatives.</li>
<li><strong>Party Perfect:</strong> Shami kebabs are ideal appetizers and party snacks - always a hit!</li>
<li><strong>Freezer-Friendly:</strong> Make large batches and freeze for convenient meals anytime.</li>
<li><strong>No Artificial Additives:</strong> Natural spices create authentic flavor without shortcuts.</li>
</ul>

<h3>How to Use Laziza Shami Kebab Seasoning Mix</h3>
<p><strong>Traditional Shami Kebabs:</strong> Mix ground meat (beef/lamb/chicken) with soaked and cooked chana dal (split chickpeas), add Laziza seasoning, ginger-garlic paste, and egg. Form into patties and shallow fry until golden.</p>
<p><strong>Quick Method:</strong> Use food processor to blend cooked lentils with meat, add seasoning, shape and fry - ready in 30 minutes!</p>
<p><strong>Baked Version:</strong> Form kebabs and bake at 180°C for healthier option - great for calorie-conscious Stockholm residents.</p>
<p><strong>Air Fryer:</strong> Cook at 180°C for 12-15 minutes - modern, oil-free preparation.</p>
<p><strong>Serving Suggestions:</strong> Serve hot with mint chutney, tamarind sauce, sliced onions, and naan or roti.</p>
<p><strong>Burger Style:</strong> Place shami kebab in burger bun with lettuce, tomato, and sauce - fusion favorite!</p>
<p><strong>Appetizer Platter:</strong> Make mini kebabs for parties and serve with various chutneys.</p>
<p><strong>Meal Prep:</strong> Make large batch, freeze uncooked patties, fry fresh when needed.</p>

<h3>Why Shop at Anmol Sweets & Restaurant?</h3>
<p>Anmol Sweets & Restaurant is Stockholm's premier destination for authentic Pakistani and Indian products. Our shami kebabs are a customer favorite - especially during Ramadan and Eid! We use authentic Pakistani seasonings to ensure every dish meets the high standards of Stockholm's Pakistani community. Now you can create these restaurant-quality kebabs at home with Laziza's trusted seasoning mix.</p>

<h3>Product Details</h3>
<ul>
<li><strong>Brand:</strong> Laziza (Trusted Pakistani food products)</li>
<li><strong>Product:</strong> Shami Kebab Seasoning Mix</li>
<li><strong>Weight:</strong> 100 grams</li>
<li><strong>Origin:</strong> Pakistan</li>
<li><strong>Category:</strong> Grocery - Spices</li>
<li><strong>Type:</strong> Complete seasoning mix (ready to use)</li>
<li><strong>Ingredients:</strong> Coriander, red chili, cumin, black pepper, garlic, ginger, cinnamon, cloves, cardamom, salt, and signature spice blend</li>
<li><strong>Spice Level:</strong> Medium (adjustable by quantity used)</li>
<li><strong>Serves:</strong> Makes approximately 20-25 medium-sized kebabs (depending on recipe)</li>
<li><strong>Cooking Methods:</strong> Pan-frying, deep-frying, baking, or air-frying</li>
<li><strong>Prep Time:</strong> 30-40 minutes (including cooking lentils)</li>
<li><strong>Shelf Life:</strong> See package for best before date</li>
<li><strong>Storage:</strong> Store in cool, dry place. Keep tightly closed after opening.</li>
</ul>

<h3>Perfect For</h3>
<p>✓ Pakistani & Indian families in Stockholm celebrating Ramadan, Eid, and special occasions<br>
✓ Anyone who loves our restaurant's shami kebabs<br>
✓ Party hosts needing impressive, crowd-pleasing appetizers<br>
✓ Food enthusiasts exploring authentic Pakistani cuisine<br>
✓ Meal preppers who appreciate freezer-friendly foods<br>
✓ Traditional cooking enthusiasts<br>
✓ Dinner parties and gatherings - shami kebabs are conversation starters!<br>
✓ Those seeking protein-rich, flavorful meals<br>
✓ Cultural celebrations and community events</p>

<h3>Delivery & Pickup</h3>
<p>Available for home delivery across Stockholm or pickup from our restaurant at Fagerstagatan 13, Spånga. Order your Laziza Shami Kebab Seasoning Mix today and create authentic Pakistani shami kebabs at home!</p>

<p><em>Experience the flavors that made us Stockholm's favorite destination for Pakistani and Indian cuisine.</em></p>`
  }
];

// =============================================================================
// MAIN EXECUTION
// =============================================================================

async function main() {
  console.log('\n🚀 Lazzat & Laziza Products - Creator');
  console.log('🥭 Creating 2 products for Anmol Sweets & Restaurant\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(`\n[${i + 1}/2] Creating: ${product.name}...`);

    try {
      await createProduct(product);
      successCount++;
      // Wait 2 seconds between requests
      if (i < products.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      failCount++;
      console.error(`   Error: ${error.message}`);
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n📊 SUMMARY:');
  console.log(`   ✅ Successfully created: ${successCount} products`);
  console.log(`   ❌ Failed: ${failCount} products`);
  console.log('\n🔗 View all products at: https://anmolsweets.se/wp-admin/edit.php?post_type=product');
  console.log('📝 All products created as DRAFT - review and add images before publishing!');
  console.log('\n💡 Next steps:');
  console.log('   1. Login to WordPress admin');
  console.log('   2. Review each draft product');
  console.log('   3. Add product images:');
  console.log('      - Lazzat Mango Pulp: Tin can photo');
  console.log('      - Laziza Shami Kebab: Package + prepared kebabs photo');
  console.log('   4. Publish when ready!\n');
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { products, createProduct };
