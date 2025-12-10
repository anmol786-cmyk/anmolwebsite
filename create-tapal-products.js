/**
 * Anmol Sweets & Restaurant - Tapal Tea Products Creator
 * Creates 3 Tapal tea products following brand guidelines
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
// TAPAL TEA PRODUCTS
// =============================================================================

const tapalProducts = [
  // 1. Tapal Tea 300 Teabags
  {
    name: "Tapal Tea 300 Teabags",
    slug: "tapal-tea-300-teabags",
    type: "simple",
    status: "draft",
    regular_price: "130",
    sku: "AN-Gs-20032",
    weight: "0.5", // Approximate weight for 300 teabags
    categories: [{ id: 211 }], // Snacks & Drinks (Beverages)
    short_description: `<h3>Tapal Tea 300 Teabags - Premium Pakistani Black Tea</h3>
<p>Premium Tapal Tea - 300 teabags. Pakistan's #1 tea brand with rich, aromatic flavor. Perfect for families and offices. Available at Anmol Sweets & Restaurant Stockholm.</p>`,
    description: `<h2>Tapal Tea 300 Teabags - Premium Pakistani Black Tea for Every Occasion</h2>

<p>Experience the authentic taste of Pakistan with <strong>Tapal Tea</strong>, now available at <strong>Anmol Sweets & Restaurant Stockholm</strong> - your trusted source for premium Pakistani beverages in Sweden. This convenient 300-teabag pack brings you Pakistan's most beloved tea brand for your daily enjoyment.</p>

<h3>What is Tapal Tea?</h3>
<p>Tapal Tea is Pakistan's #1 tea brand, trusted by millions of families for over 60 years. Known for its rich, full-bodied flavor and perfect golden color, Tapal uses premium tea leaves sourced from the finest gardens. This 300-teabag family pack is specially designed for convenience - perfect for busy Stockholm households, offices, or anyone who appreciates a good cup of tea throughout the day. Each teabag is individually wrapped to preserve freshness and aroma, delivering consistent quality in every cup.</p>

<h3>Why Choose Tapal Tea 300 Teabags?</h3>
<ul>
<li><strong>Pakistan's #1 Tea Brand:</strong> Over 60 years of tea excellence - the most trusted name in Pakistani households.</li>
<li><strong>Family Pack Value:</strong> 300 teabags provide excellent value - enough for months of daily tea enjoyment.</li>
<li><strong>Premium Quality:</strong> Carefully selected tea leaves from the world's finest tea gardens for rich, aromatic flavor.</li>
<li><strong>Convenient Teabags:</strong> Pre-portioned teabags make brewing perfect tea effortless every time - no mess, no fuss.</li>
<li><strong>Perfect Golden Color:</strong> Signature rich color and full-bodied taste that defines authentic Pakistani chai.</li>
<li><strong>Versatile Brewing:</strong> Enjoy as traditional doodh patti (milk tea) or black tea with lemon - your choice!</li>
<li><strong>Fresh & Aromatic:</strong> Individual wrapping preserves freshness and flavor in every single cup.</li>
<li><strong>Stockholm's Favorite:</strong> The same premium tea we serve at Anmol Sweets & Restaurant.</li>
</ul>

<h3>How to Use Tapal Tea</h3>
<p><strong>Traditional Pakistani Chai (Doodh Patti):</strong> Boil water with milk, add 1-2 Tapal teabags, simmer for 2-3 minutes, add sugar to taste. The authentic way to enjoy Pakistani tea!</p>
<p><strong>Quick Cup Method:</strong> Pour boiling water over one teabag in your cup, steep for 2-3 minutes, add milk and sugar as desired.</p>
<p><strong>Strong Brew:</strong> For robust flavor, use 2 teabags per cup or steep longer - perfect for those who love strong tea.</p>
<p><strong>Black Tea with Lemon:</strong> Steep one teabag in hot water, add a slice of lemon and honey - refreshing and healthy!</p>
<p><strong>Iced Tea:</strong> Brew strong tea, cool down, add ice and lemon - perfect for Swedish summer days!</p>
<p><strong>Chai Latte:</strong> Brew strong tea, froth milk separately, combine for a café-style chai latte at home.</p>
<p><strong>Office/Workplace:</strong> Perfect for offices - keep a box in the break room for everyone to enjoy!</p>

<h3>Why Shop at Anmol Sweets & Restaurant?</h3>
<p>Anmol Sweets & Restaurant is Stockholm's premier destination for authentic Pakistani and Indian products. We serve Tapal tea daily in our restaurant because it's simply the best - our customers recognize and love the authentic taste. This 300-teabag pack offers the same quality we use, now available for your home or office.</p>

<h3>Product Details</h3>
<ul>
<li><strong>Brand:</strong> Tapal (Pakistan's #1 tea brand for 60+ years)</li>
<li><strong>Quantity:</strong> 300 individually wrapped teabags</li>
<li><strong>Tea Type:</strong> Premium black tea blend</li>
<li><strong>Origin:</strong> Pakistan (using finest international tea leaves)</li>
<li><strong>Category:</strong> Beverages - Tea</li>
<li><strong>Pack Type:</strong> Family/office value pack</li>
<li><strong>Caffeine:</strong> Contains natural caffeine (moderate level)</li>
<li><strong>Shelf Life:</strong> See package for best before date (typically 18-24 months)</li>
<li><strong>Storage:</strong> Store in a cool, dry place. Keep package sealed to preserve freshness.</li>
<li><strong>Brewing Time:</strong> 2-3 minutes for optimal flavor</li>
<li><strong>Individually Wrapped:</strong> Yes - ensures freshness for every cup</li>
</ul>

<h3>Perfect For</h3>
<p>✓ Pakistani & Indian families in Stockholm who drink chai daily<br>
✓ Tea enthusiasts seeking authentic Pakistani tea experience<br>
✓ Offices and workplaces - excellent value for shared spaces<br>
✓ Anyone who appreciates strong, flavorful black tea<br>
✓ Hosting gatherings and chai get-togethers<br>
✓ Swedish families exploring international tea cultures<br>
✓ Those seeking premium quality tea at excellent value<br>
✓ Daily tea drinkers who want convenience without compromising quality<br>
✓ Restaurants and cafés serving authentic South Asian chai</p>

<h3>Delivery & Pickup</h3>
<p>Available for home delivery across Stockholm or pickup from our restaurant at Fagerstagatan 13, Spånga. Order your Tapal Tea 300 Teabags today and enjoy Pakistan's #1 tea brand every day in your Stockholm home or office!</p>

<p><em>At Anmol Sweets & Restaurant, we don't just serve food - we serve traditions, memories, and the authentic flavors of home.</em></p>`
  },

  // 2. Tapal Danedar Tea 1kg Jar
  {
    name: "Tapal Danedar Tea 1kg Jar",
    slug: "tapal-danedar-tea-1kg-jar",
    type: "simple",
    status: "draft",
    regular_price: "135",
    sku: "AN-Gs-20033",
    weight: "1.0",
    categories: [{ id: 211 }], // Snacks & Drinks (Beverages)
    short_description: `<h3>Tapal Danedar Tea 1kg Jar - Premium Loose Leaf Pakistani Tea</h3>
<p>Premium Tapal Danedar loose leaf tea - 1kg jar. Pakistan's finest full-bodied tea with distinctive "danedar" (grainy) texture. Available at Anmol Sweets & Restaurant Stockholm.</p>`,
    description: `<h2>Tapal Danedar Tea 1kg Jar - Premium Loose Leaf Pakistani Tea</h2>

<p>Experience the authentic taste of Pakistan with <strong>Tapal Danedar Tea</strong>, now available at <strong>Anmol Sweets & Restaurant Stockholm</strong> - your trusted source for premium Pakistani beverages in Sweden. This 1kg jar of Pakistan's finest loose leaf tea delivers the rich, robust flavor that tea connoisseurs demand.</p>

<h3>What is Tapal Danedar Tea?</h3>
<p>Tapal Danedar is Pakistan's premium loose leaf black tea, distinguished by its unique "danedar" texture - where "danedar" means "grainy" or "granular" in Urdu. This special processing creates slightly larger, coarser tea granules that produce an exceptionally strong, full-bodied brew with rich color and intense aroma. Danedar tea is the choice of serious tea drinkers across Pakistan who demand the strongest, most flavorful chai. This 1kg jar provides excellent value for families and offers months of authentic Pakistani tea experience. It's the same premium Danedar tea used in Pakistani restaurants and chai houses worldwide, including right here at Anmol Sweets & Restaurant Stockholm.</p>

<h3>Why Choose Tapal Danedar Tea 1kg?</h3>
<ul>
<li><strong>Premium Danedar Quality:</strong> Signature coarse-grain texture creates stronger, more robust tea than regular loose leaf varieties.</li>
<li><strong>Pakistan's Finest:</strong> Tapal's premium line - the gold standard for authentic Pakistani chai.</li>
<li><strong>1kg Family Size:</strong> Large jar offers exceptional value - enough for approximately 250-300 cups of tea.</li>
<li><strong>Intense Flavor & Aroma:</strong> Rich, full-bodied taste with deep golden-brown color that defines perfect chai.</li>
<li><strong>Restaurant Quality:</strong> The same Danedar tea we use at Anmol Sweets & Restaurant Stockholm - consistently rated as the best chai in Stockholm!</li>
<li><strong>Traditional Brewing:</strong> Preferred by those who make authentic doodh patti (milk tea) the traditional way.</li>
<li><strong>Strong Caffeine Kick:</strong> Perfect morning wake-up tea - robust and energizing.</li>
<li><strong>Excellent Value:</strong> 1kg provides months of daily tea enjoyment at the best price per cup.</li>
<li><strong>Resealable Jar:</strong> Convenient packaging keeps tea fresh and aromatic.</li>
</ul>

<h3>How to Use Tapal Danedar Tea</h3>
<p><strong>Traditional Doodh Patti (Milk Tea):</strong> Boil equal parts water and milk, add 1-2 teaspoons of Danedar tea, simmer for 3-5 minutes until rich color appears, strain, and add sugar. This is the authentic Pakistani way!</p>
<p><strong>Strong Breakfast Chai:</strong> Use 2 teaspoons per cup for a robust morning brew that wakes you up properly.</p>
<p><strong>Quick Kettle Method:</strong> Add tea to teapot, pour boiling water, steep 3-4 minutes, strain into cups with milk.</p>
<p><strong>Masala Chai:</strong> Add whole spices (cardamom, cinnamon, ginger) while brewing for authentic masala chai.</p>
<p><strong>Karak Chai:</strong> The famous Gulf-style extra-strong tea - use 2-3 teaspoons per cup with evaporated milk.</p>
<p><strong>Large Batches:</strong> Perfect for parties and gatherings - brew in large pots for 10-15 people easily.</p>
<p><strong>Professional Tip:</strong> Let tea boil gently for 2-3 minutes with milk for maximum flavor extraction - the secret to restaurant-quality chai!</p>

<h3>Why Shop at Anmol Sweets & Restaurant?</h3>
<p>Anmol Sweets & Restaurant is Stockholm's premier destination for authentic Pakistani and Indian products. Our chai is legendary in Stockholm's Pakistani community - people specifically ask what tea we use! The answer is Tapal Danedar. Now you can brew the exact same rich, aromatic chai we serve in our restaurant, right in your Stockholm home. This is the tea that made us famous!</p>

<h3>Product Details</h3>
<ul>
<li><strong>Brand:</strong> Tapal (Pakistan's #1 tea brand for 60+ years)</li>
<li><strong>Product Line:</strong> Danedar (Premium loose leaf)</li>
<li><strong>Weight:</strong> 1 kilogram (1000 grams)</li>
<li><strong>Tea Type:</strong> Premium black tea - Danedar (coarse-grain) variety</li>
<li><strong>Origin:</strong> Pakistan (finest international tea leaves)</li>
<li><strong>Category:</strong> Beverages - Tea</li>
<li><strong>Packaging:</strong> Resealable jar for freshness</li>
<li><strong>Approximate Servings:</strong> 250-300 cups (depending on strength preference)</li>
<li><strong>Caffeine Level:</strong> High (perfect for morning energy boost)</li>
<li><strong>Flavor Profile:</strong> Full-bodied, robust, rich, slightly malty</li>
<li><strong>Color:</strong> Deep golden-brown when brewed</li>
<li><strong>Shelf Life:</strong> See package for best before date (typically 18-24 months)</li>
<li><strong>Storage:</strong> Keep jar tightly closed in a cool, dry place away from strong odors.</li>
</ul>

<h3>Perfect For</h3>
<p>✓ Pakistani & Indian families in Stockholm who drink strong chai daily<br>
✓ Tea connoisseurs seeking authentic, full-bodied Pakistani tea<br>
✓ Anyone who loves our restaurant's famous chai and wants to recreate it<br>
✓ Traditional doodh patti (milk tea) enthusiasts<br>
✓ Morning people who need strong, energizing tea to start the day<br>
✓ Large families and regular tea drinkers - excellent bulk value<br>
✓ Hosting chai parties and traditional Pakistani gatherings<br>
✓ Restaurants and cafés serving authentic South Asian chai<br>
✓ Those who find regular tea too weak and want maximum flavor</p>

<h3>Delivery & Pickup</h3>
<p>Available for home delivery across Stockholm or pickup from our restaurant at Fagerstagatan 13, Spånga. Order your Tapal Danedar Tea 1kg Jar today and experience Pakistan's finest loose leaf tea - the same premium chai we serve at Stockholm's favorite Pakistani restaurant!</p>

<p><em>Experience the flavors that made us Stockholm's favorite destination for Pakistani and Indian cuisine.</em></p>`
  },

  // 3. Tapal Danedar Tea 450g
  {
    name: "Tapal Danedar Tea 450g",
    slug: "tapal-danedar-tea-450g",
    type: "simple",
    status: "draft",
    regular_price: "65",
    sku: "AN-Gs-20034",
    weight: "0.45",
    categories: [{ id: 211 }], // Snacks & Drinks (Beverages)
    short_description: `<h3>Tapal Danedar Tea 450g - Premium Loose Leaf Pakistani Tea</h3>
<p>Premium Tapal Danedar loose leaf tea - 450g pack. Pakistan's finest full-bodied tea perfect for daily chai. Available at Anmol Sweets & Restaurant Stockholm.</p>`,
    description: `<h2>Tapal Danedar Tea 450g - Premium Loose Leaf Pakistani Tea</h2>

<p>Experience the authentic taste of Pakistan with <strong>Tapal Danedar Tea</strong>, now available at <strong>Anmol Sweets & Restaurant Stockholm</strong> - your trusted source for premium Pakistani beverages in Sweden. This convenient 450g pack brings you Pakistan's finest loose leaf tea for everyday enjoyment.</p>

<h3>What is Tapal Danedar Tea?</h3>
<p>Tapal Danedar is Pakistan's premium loose leaf black tea, distinguished by its unique "danedar" texture - where "danedar" means "grainy" or "granular" in Urdu. This special processing creates slightly larger, coarser tea granules that produce an exceptionally strong, full-bodied brew with rich color and intense aroma. The 450g pack is perfect for smaller households or those trying Danedar tea for the first time. It provides approximately 100-120 cups of authentic Pakistani chai - enough for several weeks of daily tea enjoyment. This is the same premium quality as our 1kg jar, in a more convenient size for Stockholm apartments and smaller families.</p>

<h3>Why Choose Tapal Danedar Tea 450g?</h3>
<ul>
<li><strong>Perfect Size:</strong> 450g pack ideal for small families, couples, or first-time buyers - not too much, not too little.</li>
<li><strong>Premium Danedar Quality:</strong> Signature coarse-grain texture creates stronger, more robust tea than regular varieties.</li>
<li><strong>Pakistan's Finest:</strong> Tapal's premium line trusted by millions for over 60 years.</li>
<li><strong>Great Value:</strong> Affordable entry point to premium Danedar tea - approximately 100-120 cups per pack.</li>
<li><strong>Intense Flavor & Aroma:</strong> Rich, full-bodied taste with deep golden-brown color that defines perfect chai.</li>
<li><strong>Restaurant Quality:</strong> The same tea we serve at Anmol Sweets & Restaurant Stockholm.</li>
<li><strong>Apartment-Friendly:</strong> Compact size perfect for Stockholm apartments with limited storage space.</li>
<li><strong>Traditional Brewing:</strong> Preferred by those who make authentic doodh patti (milk tea) the traditional way.</li>
<li><strong>Strong & Energizing:</strong> Perfect morning wake-up tea with robust caffeine kick.</li>
</ul>

<h3>How to Use Tapal Danedar Tea</h3>
<p><strong>Traditional Doodh Patti (Milk Tea):</strong> Boil equal parts water and milk, add 1-2 teaspoons of Danedar tea, simmer for 3-5 minutes until rich color develops, strain, and add sugar to taste.</p>
<p><strong>Strong Breakfast Chai:</strong> Use 2 teaspoons per cup for a robust morning brew that truly wakes you up.</p>
<p><strong>Quick Kettle Method:</strong> Add tea to teapot, pour boiling water, steep 3-4 minutes, strain into cups with milk and sugar.</p>
<p><strong>Masala Chai:</strong> Add whole spices (cardamom, cinnamon, ginger) while brewing for authentic spiced chai.</p>
<p><strong>Karak Chai:</strong> Gulf-style extra-strong tea - use 2-3 teaspoons per cup with evaporated or condensed milk.</p>
<p><strong>Weekend Chai Party:</strong> Brew large pot for family and friends - perfect size for small gatherings.</p>
<p><strong>Professional Tip:</strong> Let tea boil gently for 2-3 minutes with milk for maximum flavor - the secret to perfect chai!</p>

<h3>Why Shop at Anmol Sweets & Restaurant?</h3>
<p>Anmol Sweets & Restaurant is Stockholm's premier destination for authentic Pakistani and Indian products. Our chai is consistently rated as the best in Stockholm - and we use Tapal Danedar! This 450g pack lets you enjoy the same premium tea at home. Perfect for those who want to try our restaurant-quality chai before committing to the larger 1kg jar, or for smaller households that prefer fresh tea more frequently.</p>

<h3>Product Details</h3>
<ul>
<li><strong>Brand:</strong> Tapal (Pakistan's #1 tea brand for 60+ years)</li>
<li><strong>Product Line:</strong> Danedar (Premium loose leaf)</li>
<li><strong>Weight:</strong> 450 grams</li>
<li><strong>Tea Type:</strong> Premium black tea - Danedar (coarse-grain) variety</li>
<li><strong>Origin:</strong> Pakistan (finest international tea leaves)</li>
<li><strong>Category:</strong> Beverages - Tea</li>
<li><strong>Packaging:</strong> Sealed pack to preserve freshness</li>
<li><strong>Approximate Servings:</strong> 100-120 cups (depending on strength preference)</li>
<li><strong>Caffeine Level:</strong> High (perfect for morning energy)</li>
<li><strong>Flavor Profile:</strong> Full-bodied, robust, rich, slightly malty</li>
<li><strong>Color:</strong> Deep golden-brown when brewed</li>
<li><strong>Shelf Life:</strong> See package for best before date (typically 18-24 months)</li>
<li><strong>Storage:</strong> Store in airtight container in cool, dry place after opening.</li>
</ul>

<h3>Perfect For</h3>
<p>✓ Small families and couples in Stockholm who drink chai regularly<br>
✓ First-time Danedar tea buyers wanting to try before buying larger size<br>
✓ Anyone who loves our restaurant's chai and wants to recreate it at home<br>
✓ Stockholm apartments with limited storage space<br>
✓ Students and young professionals seeking premium tea at good value<br>
✓ Traditional doodh patti enthusiasts<br>
✓ Those who prefer buying fresh tea more frequently<br>
✓ Gift giving - perfect size for introducing friends to authentic Pakistani tea<br>
✓ Morning tea drinkers who need strong, energizing chai</p>

<h3>Delivery & Pickup</h3>
<p>Available for home delivery across Stockholm or pickup from our restaurant at Fagerstagatan 13, Spånga. Order your Tapal Danedar Tea 450g today and enjoy Pakistan's finest loose leaf tea at home!</p>

<p><em>At Anmol Sweets & Restaurant, we don't just serve food - we serve traditions, memories, and the authentic flavors of home.</em></p>`
  }
];

// =============================================================================
// MAIN EXECUTION
// =============================================================================

async function main() {
  console.log('\n🚀 Tapal Tea Products - Batch Creator');
  console.log('☕ Creating 3 Tapal tea products for Anmol Sweets & Restaurant\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < tapalProducts.length; i++) {
    const product = tapalProducts[i];
    console.log(`\n[${i + 1}/3] Creating: ${product.name}...`);

    try {
      await createProduct(product);
      successCount++;
      // Wait 2 seconds between requests
      if (i < tapalProducts.length - 1) {
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
  console.log('\n💡 About Variable Products:');
  console.log('   The two Danedar teas (450g and 1kg) are created as simple products.');
  console.log('   To convert to variable product with size options:');
  console.log('   1. In WordPress admin, open the Danedar 1kg product');
  console.log('   2. Change product type from "Simple" to "Variable"');
  console.log('   3. Add attribute "Size" with values: 450g, 1kg');
  console.log('   4. Create variations for each size with respective prices');
  console.log('   5. This gives customers size options in one product listing!');
  console.log('\n💡 Next steps:');
  console.log('   1. Login to WordPress admin');
  console.log('   2. Review each draft product');
  console.log('   3. Add product images');
  console.log('   4. Optionally convert Danedar to variable product');
  console.log('   5. Publish when ready!\n');
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { tapalProducts, createProduct };
