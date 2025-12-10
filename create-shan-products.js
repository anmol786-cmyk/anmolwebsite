/**
 * Anmol Sweets & Restaurant - Shan Spice Products Batch Creator
 * Creates 10 Shan spice products following brand guidelines
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
// SHAN SPICE PRODUCTS
// =============================================================================

const shanProducts = [
  // 1. Shan Haleem 50g
  {
    name: "Shan Haleem 50g",
    slug: "shan-haleem-masala-50g",
    type: "simple",
    status: "draft",
    regular_price: "12",
    sku: "AN-Gs-20022",
    weight: "0.05",
    categories: [{ id: 378 }],
    short_description: `<h3>Shan Haleem Masala - Authentic Pakistani Spice Mix</h3>
<p>Premium Shan Haleem Masala - 50g. Complete spice blend for traditional Pakistani haleem with rich, aromatic flavors. Available at Anmol Sweets & Restaurant Stockholm.</p>`,
    description: `<h2>Shan Haleem Masala 50g - Authentic Pakistani Spice Blend for Traditional Haleem</h2>

<p>Experience the authentic taste of Pakistan with <strong>Shan Haleem Masala</strong>, now available at <strong>Anmol Sweets & Restaurant Stockholm</strong> - your trusted source for premium Pakistani spices in Sweden. Create restaurant-quality haleem at home with this expertly crafted spice blend.</p>

<h3>What is Haleem Masala?</h3>
<p>Shan Haleem Masala is a traditional Pakistani spice blend specifically designed for making haleem - a beloved slow-cooked stew combining meat, lentils, and wheat. This rich, hearty dish is especially popular during Ramadan and special occasions across Pakistan and India. The masala contains a perfect balance of aromatic spices that create the signature deep, complex flavors haleem is famous for.</p>

<h3>Why Choose Shan Haleem Masala?</h3>
<ul>
<li><strong>45+ Years of Excellence:</strong> Shan Foods has been Pakistan's #1 spice brand since 1981, trusted by millions worldwide for authentic taste.</li>
<li><strong>Authentic Recipe:</strong> Traditional blend perfected over decades, following time-honored Pakistani cooking methods.</li>
<li><strong>Complete Spice Mix:</strong> All essential spices in perfect proportions - no guesswork needed for perfect haleem.</li>
<li><strong>Restaurant Quality:</strong> The same premium spices used in our award-winning Stockholm restaurant kitchen.</li>
<li><strong>No Artificial Additives:</strong> Made with natural spices and ingredients, no artificial colors or preservatives.</li>
<li><strong>Easy to Use:</strong> Clear instructions on package - perfect results every time, even for beginners.</li>
<li><strong>Versatile:</strong> Works beautifully with chicken, beef, mutton, or vegetarian alternatives.</li>
</ul>

<h3>How to Use Shan Haleem Masala</h3>
<p><strong>Traditional Haleem:</strong> Follow the recipe on the package. Slow-cook meat with lentils, wheat, and Shan Haleem Masala for 4-6 hours until you achieve the signature creamy, porridge-like consistency.</p>
<p><strong>Quick Method:</strong> Use a pressure cooker to reduce cooking time to 45-60 minutes while maintaining authentic flavor.</p>
<p><strong>Garnishing:</strong> Top your haleem with fried onions, fresh ginger julienne, green chilies, lemon wedges, and fresh coriander for the complete experience.</p>
<p><strong>Ramadan Special:</strong> Prepare large batches for iftar gatherings - haleem is Stockholm's favorite Ramadan dish at Anmol!</p>
<p><strong>Fusion Ideas:</strong> Use the masala to season slow-cooked stews or add depth to thick lentil soups.</p>

<h3>Why Shop at Anmol Sweets & Restaurant?</h3>
<p>Anmol Sweets & Restaurant is Stockholm's premier destination for authentic Pakistani and Indian products. As the most famous restaurant in Stockholm for Indo-Pak cuisine, we carefully curate our grocery selection to bring you the same quality and authenticity you experience in our restaurant. Our haleem is one of our most requested dishes - now you can recreate it at home!</p>

<h3>Product Details</h3>
<ul>
<li><strong>Brand:</strong> Shan Foods (Pakistan's #1 spice brand for 45+ years)</li>
<li><strong>Weight:</strong> 50 grams</li>
<li><strong>Origin:</strong> Pakistan</li>
<li><strong>Category:</strong> Grocery - Spices</li>
<li><strong>Ingredients:</strong> Red chili, salt, paprika, coriander, cumin, garlic, ginger, turmeric, black pepper, cinnamon, cardamom, cloves, and signature spice blend</li>
<li><strong>Serves:</strong> Approximately 4-6 people</li>
<li><strong>Shelf Life:</strong> See package for best before date</li>
<li><strong>Storage:</strong> Store in a cool, dry place. Keep container tightly closed after opening.</li>
</ul>

<h3>Perfect For</h3>
<p>✓ Pakistani & Indian families in Stockholm celebrating Ramadan and special occasions<br>
✓ Food enthusiasts wanting to experience authentic Pakistani slow-cooked dishes<br>
✓ Anyone who loves our restaurant haleem and wants to make it at home<br>
✓ Iftar gatherings and community meals during Ramadan<br>
✓ Winter comfort food lovers seeking hearty, warming dishes<br>
✓ Home cooks exploring traditional Pakistani cooking techniques</p>

<h3>Delivery & Pickup</h3>
<p>Available for home delivery across Stockholm or pickup from our restaurant at Fagerstagatan 13, Spånga. Order your Shan Haleem Masala today and bring the authentic taste of Pakistan's most beloved comfort food to your kitchen!</p>

<p><em>At Anmol Sweets & Restaurant, we don't just serve food - we serve traditions, memories, and the authentic flavors of home.</em></p>`
  },

  // 2. Shan Butter Chicken 50g
  {
    name: "Shan Butter Chicken 50g",
    slug: "shan-butter-chicken-masala-50g",
    type: "simple",
    status: "draft",
    regular_price: "12",
    sku: "AN-Gs-20023",
    weight: "0.05",
    categories: [{ id: 378 }],
    short_description: `<h3>Shan Butter Chicken Masala - Restaurant-Style Spice Mix</h3>
<p>Premium Shan Butter Chicken Masala - 50g. Create creamy, aromatic butter chicken at home with this authentic spice blend. Available at Anmol Sweets & Restaurant Stockholm.</p>`,
    description: `<h2>Shan Butter Chicken Masala 50g - Restaurant-Quality Indian Spice Blend</h2>

<p>Experience the authentic taste of North India with <strong>Shan Butter Chicken Masala</strong>, now available at <strong>Anmol Sweets & Restaurant Stockholm</strong> - your trusted source for premium Pakistani and Indian spices in Sweden. Create the rich, creamy butter chicken that made Indian cuisine famous worldwide.</p>

<h3>What is Butter Chicken Masala?</h3>
<p>Shan Butter Chicken Masala is a specially formulated spice blend for creating authentic butter chicken (murgh makhani) - one of the most beloved dishes in Indian and Pakistani cuisine. This carefully balanced mix creates the signature creamy, tomato-based sauce with rich, aromatic flavors that have made butter chicken a global favorite. The blend combines traditional spices with a hint of sweetness and tang that defines this classic dish.</p>

<h3>Why Choose Shan Butter Chicken Masala?</h3>
<ul>
<li><strong>Restaurant Authentic:</strong> The same rich, creamy flavor you experience at Anmol Sweets & Restaurant Stockholm.</li>
<li><strong>45+ Years of Trust:</strong> Shan Foods - Pakistan's #1 spice brand since 1981, perfecting recipes for generations.</li>
<li><strong>Complete Flavor Profile:</strong> Expertly balanced spices create the signature sweet, tangy, and aromatic butter chicken taste.</li>
<li><strong>Easy Home Cooking:</strong> Clear instructions make restaurant-quality butter chicken achievable for everyone.</li>
<li><strong>Natural Ingredients:</strong> No artificial colors or preservatives - just authentic, premium spices.</li>
<li><strong>Versatile Use:</strong> Perfect for chicken, paneer (butter paneer), or vegetarian alternatives.</li>
<li><strong>Stockholm's Favorite:</strong> One of our most popular dishes - now recreate it at home!</li>
</ul>

<h3>How to Use Shan Butter Chicken Masala</h3>
<p><strong>Classic Butter Chicken:</strong> Marinate chicken pieces, cook until tender, then simmer in a creamy tomato sauce made with Shan Butter Chicken Masala, cream, and butter.</p>
<p><strong>Butter Paneer:</strong> Substitute chicken with paneer cubes for a delicious vegetarian version that's equally popular in Stockholm.</p>
<p><strong>Serving Suggestions:</strong> Serve with naan bread, basmati rice, or both - the perfect combination for fika or dinner!</p>
<p><strong>Quick Weeknight Meal:</strong> Ready in 30-40 minutes - perfect for busy Stockholm evenings.</p>
<p><strong>Party Favorite:</strong> Double or triple the recipe for gatherings - it's always the first dish to finish!</p>

<h3>Why Shop at Anmol Sweets & Restaurant?</h3>
<p>Anmol Sweets & Restaurant is Stockholm's premier destination for authentic Pakistani and Indian products. As Stockholm's most famous restaurant for Indo-Pak cuisine, we bring you the same premium spices we use daily in our kitchen. Our butter chicken is one of our signature dishes - consistently rated as the best in Stockholm!</p>

<h3>Product Details</h3>
<ul>
<li><strong>Brand:</strong> Shan Foods (Pakistan's #1 spice brand for 45+ years)</li>
<li><strong>Weight:</strong> 50 grams</li>
<li><strong>Origin:</strong> Pakistan</li>
<li><strong>Category:</strong> Grocery - Spices</li>
<li><strong>Ingredients:</strong> Paprika, salt, red chili, garlic, coriander, ginger, cumin, fenugreek leaves, cardamom, cinnamon, black pepper, and signature spice blend</li>
<li><strong>Serves:</strong> Approximately 4-6 people</li>
<li><strong>Spice Level:</strong> Mild to medium (family-friendly)</li>
<li><strong>Shelf Life:</strong> See package for best before date</li>
<li><strong>Storage:</strong> Store in a cool, dry place. Keep tightly closed.</li>
</ul>

<h3>Perfect For</h3>
<p>✓ Anyone craving Stockholm's best butter chicken at home<br>
✓ Families seeking kid-friendly, flavorful meals<br>
✓ Dinner parties and special occasions<br>
✓ Indian & Pakistani food enthusiasts<br>
✓ Those new to South Asian cooking - easy and foolproof<br>
✓ Students looking for affordable, delicious meals<br>
✓ Anyone who loves creamy, aromatic comfort food</p>

<h3>Delivery & Pickup</h3>
<p>Available for home delivery across Stockholm or pickup from our restaurant at Fagerstagatan 13, Spånga. Order your Shan Butter Chicken Masala today and create restaurant-quality butter chicken in your own Stockholm kitchen!</p>

<p><em>Experience the flavors that made us Stockholm's favorite destination for Pakistani and Indian cuisine.</em></p>`
  },

  // 3. Shan Kofta Masala 50g
  {
    name: "Shan Kofta Masala 50g",
    slug: "shan-kofta-masala-50g",
    type: "simple",
    status: "draft",
    regular_price: "12",
    sku: "AN-Gs-20024",
    weight: "0.05",
    categories: [{ id: 378 }],
    short_description: `<h3>Shan Kofta Masala - Authentic Meatball Curry Spice Mix</h3>
<p>Premium Shan Kofta Masala - 50g. Perfect spice blend for traditional Pakistani & Indian kofta curry. Available at Anmol Sweets & Restaurant Stockholm.</p>`,
    description: `<h2>Shan Kofta Masala 50g - Authentic Pakistani Spice Blend for Traditional Kofta</h2>

<p>Experience the authentic taste of Pakistan with <strong>Shan Kofta Masala</strong>, now available at <strong>Anmol Sweets & Restaurant Stockholm</strong> - your trusted source for premium Pakistani spices in Sweden. Create delicious, aromatic kofta curry that brings the flavors of South Asian home cooking to your Stockholm kitchen.</p>

<h3>What is Kofta Masala?</h3>
<p>Shan Kofta Masala is a traditional Pakistani and Indian spice blend specifically designed for making kofta curry - a beloved dish featuring spiced meatballs or vegetable balls in a rich, flavorful gravy. This expertly crafted blend contains all the essential spices needed to create the signature aromatic sauce that makes kofta a family favorite across Pakistan and India. Whether you're making traditional meat koftas, malai kofta (vegetarian), or lauki kofta (bottle gourd), this masala delivers authentic taste every time.</p>

<h3>Why Choose Shan Kofta Masala?</h3>
<ul>
<li><strong>45+ Years of Excellence:</strong> Shan Foods has been Pakistan's #1 spice brand since 1981, perfecting recipes trusted by millions.</li>
<li><strong>Authentic Recipe:</strong> Traditional Pakistani blend using time-honored methods and premium ingredients.</li>
<li><strong>Versatile Cooking:</strong> Perfect for meat koftas (beef, chicken, lamb) or vegetarian versions (malai kofta, lauki kofta).</li>
<li><strong>Complete Spice Mix:</strong> All essential ingredients in perfect balance - no guesswork needed.</li>
<li><strong>Restaurant Quality:</strong> The same premium spices we use in our Stockholm restaurant.</li>
<li><strong>Rich, Aromatic Gravy:</strong> Creates the signature thick, flavorful sauce that defines great kofta.</li>
<li><strong>No Artificial Additives:</strong> Natural spices only - no artificial colors or preservatives.</li>
</ul>

<h3>How to Use Shan Kofta Masala</h3>
<p><strong>Traditional Meat Kofta:</strong> Prepare spiced meatballs with ground beef or chicken, fry until golden, then simmer in gravy made with Shan Kofta Masala, tomatoes, and yogurt.</p>
<p><strong>Malai Kofta (Vegetarian):</strong> Make koftas from paneer and potatoes, then cook in a creamy gravy - a restaurant favorite!</p>
<p><strong>Lauki Kofta:</strong> Use bottle gourd and chickpea flour for light, healthy koftas perfect for family meals.</p>
<p><strong>Serving Suggestions:</strong> Serve hot with naan bread, roti, or steamed basmati rice and fresh salad.</p>
<p><strong>Make Ahead:</strong> Koftas freeze beautifully - prepare large batches for convenient weeknight dinners.</p>

<h3>Why Shop at Anmol Sweets & Restaurant?</h3>
<p>Anmol Sweets & Restaurant is Stockholm's premier destination for authentic Pakistani and Indian products. As the most famous restaurant in Stockholm for Indo-Pak cuisine, we carefully curate our grocery selection to bring you the same quality spices we use in our award-winning kitchen. Our kofta curry is a customer favorite - now you can make it at home!</p>

<h3>Product Details</h3>
<ul>
<li><strong>Brand:</strong> Shan Foods (Pakistan's #1 spice brand for 45+ years)</li>
<li><strong>Weight:</strong> 50 grams</li>
<li><strong>Origin:</strong> Pakistan</li>
<li><strong>Category:</strong> Grocery - Spices</li>
<li><strong>Ingredients:</strong> Red chili, salt, paprika, coriander, onion, garlic, ginger, cumin, turmeric, black pepper, cinnamon, cardamom, and signature spice blend</li>
<li><strong>Serves:</strong> Approximately 4-6 people</li>
<li><strong>Cooking Time:</strong> 30-40 minutes</li>
<li><strong>Shelf Life:</strong> See package for best before date</li>
<li><strong>Storage:</strong> Store in a cool, dry place. Keep container tightly closed.</li>
</ul>

<h3>Perfect For</h3>
<p>✓ Pakistani & Indian families in Stockholm seeking authentic home cooking<br>
✓ Anyone who loves our restaurant's kofta curry<br>
✓ Vegetarians looking for flavorful, protein-rich meals (malai kofta)<br>
✓ Family dinners and weekend cooking<br>
✓ Food enthusiasts exploring traditional Pakistani recipes<br>
✓ Meal preppers who appreciate freezer-friendly dishes<br>
✓ Special occasions and gatherings</p>

<h3>Delivery & Pickup</h3>
<p>Available for home delivery across Stockholm or pickup from our restaurant at Fagerstagatan 13, Spånga. Order your Shan Kofta Masala today and bring the authentic taste of Pakistani kofta curry to your kitchen!</p>

<p><em>At Anmol Sweets & Restaurant, we don't just serve food - we serve traditions, memories, and the authentic flavors of home.</em></p>`
  },

  // 4. Shan Curry Powder 100g
  {
    name: "Shan Curry Powder 100g",
    slug: "shan-curry-powder-100g",
    type: "simple",
    status: "draft",
    regular_price: "12",
    sku: "AN-Gs-20025",
    weight: "0.1",
    categories: [{ id: 378 }],
    short_description: `<h3>Shan Curry Powder - Versatile Pakistani Spice Blend</h3>
<p>Premium Shan Curry Powder - 100g. Authentic Pakistani curry spice blend for all your cooking needs. Available at Anmol Sweets & Restaurant Stockholm.</p>`,
    description: `<h2>Shan Curry Powder 100g - Authentic Pakistani All-Purpose Spice Blend</h2>

<p>Experience the authentic taste of Pakistan with <strong>Shan Curry Powder</strong>, now available at <strong>Anmol Sweets & Restaurant Stockholm</strong> - your trusted source for premium Pakistani spices in Sweden. This versatile, aromatic curry powder is your essential ingredient for countless Pakistani and Indian dishes.</p>

<h3>What is Shan Curry Powder?</h3>
<p>Shan Curry Powder is a premium, all-purpose spice blend that forms the foundation of countless Pakistani and Indian dishes. Unlike generic curry powders, Shan's authentic Pakistani recipe delivers the complex, layered flavors that define South Asian cuisine. This larger 100g pack is perfect for regular cooking and offers excellent value for families and food enthusiasts in Stockholm who cook Pakistani and Indian food frequently.</p>

<h3>Why Choose Shan Curry Powder?</h3>
<ul>
<li><strong>45+ Years of Excellence:</strong> Shan Foods - Pakistan's #1 spice brand since 1981, trusted by millions worldwide.</li>
<li><strong>Authentic Pakistani Recipe:</strong> Not just "curry powder" - this is the real deal used in Pakistani homes and restaurants.</li>
<li><strong>Incredibly Versatile:</strong> Perfect for curries, rice dishes, marinades, soups, vegetables, and more.</li>
<li><strong>Larger 100g Pack:</strong> Better value - enough for multiple meals and family cooking.</li>
<li><strong>Restaurant Quality:</strong> The same premium curry powder we use at Anmol Sweets & Restaurant Stockholm.</li>
<li><strong>No Artificial Additives:</strong> Pure, natural spices - no artificial colors, flavors, or preservatives.</li>
<li><strong>Balanced Flavor:</strong> Not too hot, not too mild - perfect for Swedish-Pakistani families and all taste preferences.</li>
</ul>

<h3>How to Use Shan Curry Powder</h3>
<p><strong>Quick Curries:</strong> Add 1-2 tablespoons to any meat or vegetable curry for instant authentic flavor.</p>
<p><strong>Rice Dishes:</strong> Mix into pilau, pulao, or fried rice for aromatic, golden rice with Pakistani flair.</p>
<p><strong>Marinades:</strong> Combine with yogurt and Shan Curry Powder for perfect tandoori-style marinades.</p>
<p><strong>Soups & Stews:</strong> Add depth and warmth to lentil soups, vegetable stews, or Pakistani-style broths.</p>
<p><strong>Roasted Vegetables:</strong> Toss vegetables with oil and curry powder before roasting - a Stockholm favorite!</p>
<p><strong>Fusion Cooking:</strong> Experiment with Swedish-Pakistani fusion - curry powder works beautifully with local ingredients.</p>
<p><strong>Everyday Seasoning:</strong> Keep this as your go-to spice for adding authentic Pakistani flavor to any dish.</p>

<h3>Why Shop at Anmol Sweets & Restaurant?</h3>
<p>Anmol Sweets & Restaurant is Stockholm's premier destination for authentic Pakistani and Indian products. As Stockholm's most famous restaurant for Indo-Pak cuisine, we carefully select every spice to ensure it meets our high standards. This Shan Curry Powder is the same blend our chefs use daily - bringing restaurant quality to your home kitchen.</p>

<h3>Product Details</h3>
<ul>
<li><strong>Brand:</strong> Shan Foods (Pakistan's #1 spice brand for 45+ years)</li>
<li><strong>Weight:</strong> 100 grams (larger value pack)</li>
<li><strong>Origin:</strong> Pakistan</li>
<li><strong>Category:</strong> Grocery - Spices</li>
<li><strong>Ingredients:</strong> Coriander, turmeric, red chili, cumin, fenugreek, black pepper, garlic, ginger, cinnamon, cardamom, cloves, and signature spice blend</li>
<li><strong>Spice Level:</strong> Medium (adjustable to taste)</li>
<li><strong>Uses:</strong> Multiple meals - excellent value for regular cooking</li>
<li><strong>Shelf Life:</strong> See package for best before date</li>
<li><strong>Storage:</strong> Store in a cool, dry place. Keep tightly closed to preserve freshness and aroma.</li>
</ul>

<h3>Perfect For</h3>
<p>✓ Pakistani & Indian families in Stockholm who cook regularly<br>
✓ Home cooks wanting authentic Pakistani flavors without buying multiple spices<br>
✓ Students seeking affordable, versatile seasoning<br>
✓ Anyone exploring Pakistani and Indian cuisine<br>
✓ Meal preppers who batch-cook curries and rice dishes<br>
✓ Food enthusiasts experimenting with fusion cooking<br>
✓ Those who love our restaurant food and want to recreate it at home</p>

<h3>Delivery & Pickup</h3>
<p>Available for home delivery across Stockholm or pickup from our restaurant at Fagerstagatan 13, Spånga. Order your Shan Curry Powder 100g today and stock your Stockholm kitchen with this essential Pakistani spice blend!</p>

<p><em>Experience the flavors that made us Stockholm's favorite destination for Pakistani and Indian cuisine.</em></p>`
  },

  // 5. Shan Nihari 120g
  {
    name: "Shan Nihari 120g",
    slug: "shan-nihari-masala-120g",
    type: "simple",
    status: "draft",
    regular_price: "18",
    sku: "AN-Gs-20026",
    weight: "0.12",
    categories: [{ id: 378 }],
    short_description: `<h3>Shan Nihari Masala - Premium Pakistani Spice Mix</h3>
<p>Premium Shan Nihari Masala - 120g. Create authentic Pakistani nihari - slow-cooked meat stew with rich, aromatic gravy. Available at Anmol Sweets & Restaurant Stockholm.</p>`,
    description: `<h2>Shan Nihari Masala 120g - Authentic Pakistani Spice Blend for Traditional Nihari</h2>

<p>Experience the authentic taste of Pakistan with <strong>Shan Nihari Masala</strong>, now available at <strong>Anmol Sweets & Restaurant Stockholm</strong> - your trusted source for premium Pakistani spices in Sweden. Create the legendary slow-cooked nihari that's considered the crown jewel of Pakistani cuisine.</p>

<h3>What is Nihari Masala?</h3>
<p>Shan Nihari Masala is a premium spice blend for creating authentic nihari - Pakistan's most famous slow-cooked meat stew with rich, thick gravy. Traditionally enjoyed for breakfast, nihari originated in the royal kitchens of Mughal Delhi and is now Pakistan's national dish. This larger 120g pack contains enough masala to create multiple servings of this luxurious, aromatic dish that takes hours to cook but delivers unforgettable flavor. The complex blend of spices creates the signature deep brown gravy and intense flavor that made nihari legendary.</p>

<h3>Why Choose Shan Nihari Masala?</h3>
<ul>
<li><strong>Pakistan's National Dish:</strong> Create the authentic taste of Pakistan's most celebrated culinary treasure.</li>
<li><strong>45+ Years of Excellence:</strong> Shan Foods - Pakistan's #1 spice brand since 1981, perfecting the nihari recipe for generations.</li>
<li><strong>Complete Spice Blend:</strong> All traditional spices in perfect proportions - no need to source rare ingredients.</li>
<li><strong>Larger 120g Pack:</strong> Premium size for making multiple batches or larger gatherings.</li>
<li><strong>Restaurant Authentic:</strong> The same rich, aromatic nihari we serve at Anmol Sweets & Restaurant Stockholm - consistently rated as Stockholm's best!</li>
<li><strong>Royal Heritage:</strong> Recipe perfected in Mughal royal kitchens, now in your Stockholm home.</li>
<li><strong>No Artificial Additives:</strong> Pure, premium spices - no shortcuts, no artificial ingredients.</li>
</ul>

<h3>How to Use Shan Nihari Masala</h3>
<p><strong>Traditional Slow-Cook Method:</strong> Cook beef or lamb shank overnight on low heat (6-8 hours) with Shan Nihari Masala for the most authentic, tender, fall-off-the-bone result.</p>
<p><strong>Pressure Cooker Method:</strong> Reduce cooking time to 45-60 minutes while maintaining authentic flavor - perfect for busy Stockholm weekdays.</p>
<p><strong>Classic Garnishing:</strong> Top with fresh ginger julienne, green chilies, lemon wedges, and fried onions - the traditional way!</p>
<p><strong>Serving Tradition:</strong> Serve hot with naan or khameeri roti for dipping in the rich gravy - a breakfast tradition in Pakistan.</p>
<p><strong>Weekend Special:</strong> Nihari is perfect for lazy Stockholm weekend mornings or special family gatherings.</p>
<p><strong>Freezer-Friendly:</strong> Make large batches - nihari freezes beautifully and tastes even better reheated!</p>

<h3>Why Shop at Anmol Sweets & Restaurant?</h3>
<p>Anmol Sweets & Restaurant is Stockholm's premier destination for authentic Pakistani and Indian products. Our nihari is legendary in Stockholm's Pakistani community - people travel from across the city for our weekend nihari breakfast! Now you can recreate this restaurant favorite at home with the same Shan Nihari Masala we use in our kitchen.</p>

<h3>Product Details</h3>
<ul>
<li><strong>Brand:</strong> Shan Foods (Pakistan's #1 spice brand for 45+ years)</li>
<li><strong>Weight:</strong> 120 grams (premium larger pack)</li>
<li><strong>Origin:</strong> Pakistan</li>
<li><strong>Category:</strong> Grocery - Spices</li>
<li><strong>Ingredients:</strong> Coriander, red chili, salt, paprika, cumin, fennel, black pepper, garlic, ginger, turmeric, cinnamon, cardamom, cloves, bay leaves, and signature Mughlai spice blend</li>
<li><strong>Serves:</strong> Approximately 6-8 people per pack</li>
<li><strong>Cooking Time:</strong> 6-8 hours slow-cook or 45-60 minutes in pressure cooker</li>
<li><strong>Shelf Life:</strong> See package for best before date</li>
<li><strong>Storage:</strong> Store in a cool, dry place. Keep tightly closed.</li>
</ul>

<h3>Perfect For</h3>
<p>✓ Pakistani families in Stockholm seeking authentic weekend breakfast traditions<br>
✓ Food enthusiasts wanting to experience Pakistan's national dish<br>
✓ Special occasions and family gatherings<br>
✓ Anyone who loves our restaurant's famous weekend nihari<br>
✓ Slow-cooking enthusiasts who appreciate depth of flavor<br>
✓ Winter comfort food lovers - rich, warming, and deeply satisfying<br>
✓ Cultural celebrations and Pakistani community events in Stockholm</p>

<h3>Delivery & Pickup</h3>
<p>Available for home delivery across Stockholm or pickup from our restaurant at Fagerstagatan 13, Spånga. Order your Shan Nihari Masala 120g today and bring Pakistan's most celebrated dish to your Stockholm kitchen!</p>

<p><em>At Anmol Sweets & Restaurant, we don't just serve food - we serve traditions, memories, and the authentic flavors of home.</em></p>`
  },

  // 6. Shan Memoni Mutton Biryani 60g
  {
    name: "Shan Memoni Mutton Biryani 60g",
    slug: "shan-memoni-mutton-biryani-60g",
    type: "simple",
    status: "draft",
    regular_price: "12",
    sku: "AN-Gs-20027",
    weight: "0.06",
    categories: [{ id: 378 }],
    short_description: `<h3>Shan Memoni Mutton Biryani - Authentic Sindhi-Style Spice Mix</h3>
<p>Premium Shan Memoni Mutton Biryani Masala - 60g. Create authentic Sindhi-style mutton biryani with rich, aromatic flavors. Available at Anmol Sweets & Restaurant Stockholm.</p>`,
    description: `<h2>Shan Memoni Mutton Biryani 60g - Authentic Sindhi-Style Biryani Spice Blend</h2>

<p>Experience the authentic taste of Sindh with <strong>Shan Memoni Mutton Biryani Masala</strong>, now available at <strong>Anmol Sweets & Restaurant Stockholm</strong> - your trusted source for premium Pakistani spices in Sweden. Create the distinctive, aromatic Memoni-style biryani that's beloved across Pakistan's Sindh province.</p>

<h3>What is Memoni Mutton Biryani Masala?</h3>
<p>Shan Memoni Mutton Biryani Masala is a special spice blend for creating authentic Memoni-style mutton biryani - a distinctive variation from Pakistan's Sindh region, particularly popular among the Memon community. This style is known for its rich, spicy flavors and aromatic rice that differs from Karachi or Bombay biryani. The masala contains a unique blend of spices that create the signature robust taste and beautiful golden color that defines Memoni biryani. This is one of Pakistan's most celebrated regional biryani styles.</p>

<h3>Why Choose Shan Memoni Mutton Biryani Masala?</h3>
<ul>
<li><strong>Regional Authentic Recipe:</strong> True Sindhi Memoni-style biryani - a distinct culinary tradition from Pakistan.</li>
<li><strong>45+ Years of Excellence:</strong> Shan Foods has been Pakistan's #1 spice brand since 1981, preserving regional recipes.</li>
<li><strong>Rich, Robust Flavor:</strong> More intense and spicy than other biryani styles - perfect for those who love bold flavors.</li>
<li><strong>Complete Spice Mix:</strong> All traditional Memoni spices in perfect proportions for authentic taste.</li>
<li><strong>Restaurant Quality:</strong> The same premium masala we use for our popular biryani at Anmol Sweets & Restaurant Stockholm.</li>
<li><strong>Aromatic Rice:</strong> Creates beautifully fragrant, golden rice with deep flavor throughout.</li>
<li><strong>No Artificial Additives:</strong> Natural spices only - authentic taste without shortcuts.</li>
</ul>

<h3>How to Use Shan Memoni Mutton Biryani Masala</h3>
<p><strong>Traditional Method:</strong> Marinate mutton pieces with Shan Memoni Biryani Masala and yogurt, then layer with partially cooked basmati rice and cook on dum (sealed pot) for tender meat and aromatic rice.</p>
<p><strong>Pressure Cooker Method:</strong> Cook marinated mutton until tender, then layer with rice for quicker preparation.</p>
<p><strong>Perfect Rice:</strong> Use premium long-grain basmati rice for the best results - the grains should be separate and fluffy.</p>
<p><strong>Garnishing:</strong> Top with fried onions, fresh mint, coriander, and boiled eggs for the complete Memoni biryani experience.</p>
<p><strong>Raita Pairing:</strong> Serve with cooling cucumber raita and fresh salad - the traditional combination.</p>
<p><strong>Special Occasions:</strong> Memoni biryani is the star of Pakistani celebrations and gatherings in Stockholm!</p>

<h3>Why Shop at Anmol Sweets & Restaurant?</h3>
<p>Anmol Sweets & Restaurant is Stockholm's premier destination for authentic Pakistani and Indian products. Our biryani is consistently rated as the best in Stockholm - we use the same Shan Memoni Biryani Masala you're buying! Experience the authentic flavors of Pakistan's diverse regional cuisines, carefully curated for our Stockholm community.</p>

<h3>Product Details</h3>
<ul>
<li><strong>Brand:</strong> Shan Foods (Pakistan's #1 spice brand for 45+ years)</li>
<li><strong>Weight:</strong> 60 grams</li>
<li><strong>Origin:</strong> Pakistan</li>
<li><strong>Category:</strong> Grocery - Spices</li>
<li><strong>Style:</strong> Memoni (Sindhi regional specialty)</li>
<li><strong>Ingredients:</strong> Red chili, salt, paprika, coriander, cumin, garlic, ginger, black pepper, cinnamon, cardamom, cloves, bay leaves, nutmeg, mace, and signature Memoni spice blend</li>
<li><strong>Serves:</strong> Approximately 4-6 people</li>
<li><strong>Spice Level:</strong> Medium to hot (authentic Sindhi style)</li>
<li><strong>Cooking Time:</strong> 60-90 minutes</li>
<li><strong>Shelf Life:</strong> See package for best before date</li>
<li><strong>Storage:</strong> Store in a cool, dry place. Keep container tightly closed.</li>
</ul>

<h3>Perfect For</h3>
<p>✓ Pakistani families in Stockholm, especially those from Sindh region<br>
✓ Biryani enthusiasts seeking authentic regional variations<br>
✓ Special celebrations, weddings, and Eid gatherings<br>
✓ Anyone who loves bold, spicy, aromatic rice dishes<br>
✓ Those wanting to explore Pakistan's diverse culinary traditions<br>
✓ Weekend cooking and family meals<br>
✓ Food lovers who appreciate Stockholm's best biryani and want to make it at home</p>

<h3>Delivery & Pickup</h3>
<p>Available for home delivery across Stockholm or pickup from our restaurant at Fagerstagatan 13, Spånga. Order your Shan Memoni Mutton Biryani Masala today and bring the authentic taste of Sindh's most celebrated biryani to your kitchen!</p>

<p><em>Experience the flavors that made us Stockholm's favorite destination for Pakistani and Indian cuisine.</em></p>`
  },

  // 7. Shan Lahori Fish 100g
  {
    name: "Shan Lahori Fish 100g",
    slug: "shan-lahori-fish-masala-100g",
    type: "simple",
    status: "draft",
    regular_price: "12",
    sku: "AN-Gs-20028",
    weight: "0.1",
    categories: [{ id: 378 }],
    short_description: `<h3>Shan Lahori Fish Masala - Authentic Punjabi Fish Spice Mix</h3>
<p>Premium Shan Lahori Fish Masala - 100g. Create authentic Lahori-style fish with traditional Punjabi spices. Available at Anmol Sweets & Restaurant Stockholm.</p>`,
    description: `<h2>Shan Lahori Fish Masala 100g - Authentic Punjabi Fish Spice Blend</h2>

<p>Experience the authentic taste of Lahore with <strong>Shan Lahori Fish Masala</strong>, now available at <strong>Anmol Sweets & Restaurant Stockholm</strong> - your trusted source for premium Pakistani spices in Sweden. Create the distinctive, flavorful Lahori-style fish that made Pakistan's Punjab region famous for its fish cuisine.</p>

<h3>What is Lahori Fish Masala?</h3>
<p>Shan Lahori Fish Masala is a specially crafted spice blend for creating authentic Lahori-style fish - a beloved specialty from Pakistan's cultural capital, Lahore. Known for its bold, tangy flavor with a perfect balance of spices, Lahori fish is one of Pakistan's most famous street foods and restaurant dishes. This larger 100g pack contains enough masala for multiple fish preparations, making it perfect for families and seafood lovers in Stockholm. The blend creates a beautiful golden crust on fried fish or a rich, aromatic gravy for fish curry.</p>

<h3>Why Choose Shan Lahori Fish Masala?</h3>
<ul>
<li><strong>Authentic Lahori Recipe:</strong> True taste of Lahore's famous fish bazaars - now in Stockholm!</li>
<li><strong>45+ Years of Excellence:</strong> Shan Foods - Pakistan's #1 spice brand since 1981, perfecting regional recipes.</li>
<li><strong>Versatile Preparation:</strong> Perfect for fried fish, fish curry, fish tikka, or grilled fish - multiple cooking methods.</li>
<li><strong>Larger 100g Pack:</strong> Better value for seafood lovers - enough for several delicious meals.</li>
<li><strong>Bold, Tangy Flavor:</strong> The signature Lahori taste - aromatic, slightly tangy, with perfect heat.</li>
<li><strong>Works with All Fish:</strong> Excellent with salmon (popular in Sweden), cod, tilapia, or any white fish.</li>
<li><strong>No Artificial Additives:</strong> Pure, natural spices - authentic flavor without shortcuts.</li>
<li><strong>Restaurant Quality:</strong> The same premium masala we use at Anmol Sweets & Restaurant Stockholm.</li>
</ul>

<h3>How to Use Shan Lahori Fish Masala</h3>
<p><strong>Lahori Fried Fish:</strong> Marinate fish pieces with Shan Lahori Fish Masala, lemon juice, and yogurt for 30 minutes, then shallow or deep fry until golden and crispy.</p>
<p><strong>Fish Curry:</strong> Create a rich, tangy fish curry by cooking the masala with tomatoes, onions, and water, then adding fish pieces to simmer.</p>
<p><strong>Fish Tikka:</strong> Marinate fish chunks and grill or bake for a healthier, smoky Lahori-style tikka.</p>
<p><strong>Swedish Fish Fusion:</strong> Try with Swedish salmon for a delicious Pakistani-Swedish fusion - hugely popular in Stockholm!</p>
<p><strong>Fish Biryani:</strong> Use as part of the spice blend for authentic Lahori-style fish biryani.</p>
<p><strong>Serving Suggestions:</strong> Serve with naan, lemon wedges, mint chutney, and onion rings - the classic Lahori way!</p>

<h3>Why Shop at Anmol Sweets & Restaurant?</h3>
<p>Anmol Sweets & Restaurant is Stockholm's premier destination for authentic Pakistani and Indian products. Our Lahori fish is one of our most popular dishes, especially among Swedish customers who love the unique spice combination with local fish. Now you can create this restaurant favorite at home with the authentic spices we use in our kitchen!</p>

<h3>Product Details</h3>
<ul>
<li><strong>Brand:</strong> Shan Foods (Pakistan's #1 spice brand for 45+ years)</li>
<li><strong>Weight:</strong> 100 grams (larger value pack)</li>
<li><strong>Origin:</strong> Pakistan</li>
<li><strong>Category:</strong> Grocery - Spices</li>
<li><strong>Regional Style:</strong> Lahori (Punjab, Pakistan)</li>
<li><strong>Ingredients:</strong> Red chili, salt, paprika, coriander, garlic, cumin, turmeric, ginger, fenugreek, black pepper, dried mango, and signature Lahori spice blend</li>
<li><strong>Spice Level:</strong> Medium (adjustable to taste)</li>
<li><strong>Uses:</strong> Multiple fish preparations - excellent value</li>
<li><strong>Shelf Life:</strong> See package for best before date</li>
<li><strong>Storage:</strong> Store in a cool, dry place. Keep tightly closed to preserve aroma.</li>
</ul>

<h3>Perfect For</h3>
<p>✓ Seafood lovers in Stockholm seeking authentic Pakistani flavors<br>
✓ Pakistani families wanting traditional Lahori fish at home<br>
✓ Swedish-Pakistani fusion cooking with local fish varieties<br>
✓ Friday fish dinners with an exciting international twist<br>
✓ Health-conscious individuals who love flavorful, protein-rich meals<br>
✓ Food enthusiasts exploring regional Pakistani cuisine<br>
✓ Anyone who loves our restaurant's Lahori fish dishes<br>
✓ BBQ and grilling enthusiasts (perfect for fish tikka)</p>

<h3>Delivery & Pickup</h3>
<p>Available for home delivery across Stockholm or pickup from our restaurant at Fagerstagatan 13, Spånga. Order your Shan Lahori Fish Masala 100g today and bring the authentic taste of Lahore's famous fish to your Stockholm kitchen!</p>

<p><em>At Anmol Sweets & Restaurant, we don't just serve food - we serve traditions, memories, and the authentic flavors of home.</em></p>`
  },

  // 8. Shan Paya 50g
  {
    name: "Shan Paya 50g",
    slug: "shan-paya-masala-50g",
    type: "simple",
    status: "draft",
    regular_price: "12",
    sku: "AN-Gs-20029",
    weight: "0.05",
    categories: [{ id: 378 }],
    short_description: `<h3>Shan Paya Masala - Traditional Pakistani Trotters Spice Mix</h3>
<p>Premium Shan Paya Masala - 50g. Create authentic Pakistani paya - traditional slow-cooked trotters soup. Available at Anmol Sweets & Restaurant Stockholm.</p>`,
    description: `<h2>Shan Paya Masala 50g - Authentic Pakistani Spice Blend for Traditional Paya</h2>

<p>Experience the authentic taste of Pakistan with <strong>Shan Paya Masala</strong>, now available at <strong>Anmol Sweets & Restaurant Stockholm</strong> - your trusted source for premium Pakistani spices in Sweden. Create the traditional, nourishing paya that's a beloved breakfast specialty across Pakistan and India.</p>

<h3>What is Paya Masala?</h3>
<p>Shan Paya Masala is a traditional Pakistani spice blend specifically designed for making paya - a rich, gelatinous soup made from slow-cooked lamb or goat trotters (feet). This hearty dish is considered a delicacy across South Asia, especially popular as a weekend breakfast or winter comfort food. The masala contains aromatic spices that complement the rich, collagen-rich broth, creating a warming, nutritious dish with deep, complex flavors. Paya is known for its health benefits and is traditionally believed to be strengthening and nourishing.</p>

<h3>Why Choose Shan Paya Masala?</h3>
<ul>
<li><strong>45+ Years of Excellence:</strong> Shan Foods has been Pakistan's #1 spice brand since 1981, perfecting traditional recipes.</li>
<li><strong>Authentic Traditional Recipe:</strong> Time-honored blend used in Pakistani homes and restaurants for generations.</li>
<li><strong>Complete Spice Mix:</strong> All essential spices in perfect balance - no guesswork needed for perfect paya.</li>
<li><strong>Restaurant Authentic:</strong> The same premium masala we use at Anmol Sweets & Restaurant Stockholm for our weekend paya special.</li>
<li><strong>Rich, Aromatic Flavor:</strong> Creates the signature deep, warming taste that makes paya a winter favorite.</li>
<li><strong>Nutritious Traditional Food:</strong> Paya is rich in collagen, protein, and minerals - traditional wellness food.</li>
<li><strong>No Artificial Additives:</strong> Pure, natural spices - authentic taste without shortcuts.</li>
</ul>

<h3>How to Use Shan Paya Masala</h3>
<p><strong>Traditional Slow-Cook Method:</strong> Slow-cook lamb or goat trotters overnight (6-8 hours) with Shan Paya Masala for the most authentic, tender result with rich, gelatinous broth.</p>
<p><strong>Pressure Cooker Method:</strong> Reduce cooking time to 45-60 minutes while maintaining authentic flavor - perfect for busy Stockholm mornings.</p>
<p><strong>Classic Preparation:</strong> Clean trotters thoroughly, then cook with Paya Masala, ginger, garlic, and onions until meat is fall-off-the-bone tender.</p>
<p><strong>Traditional Garnishing:</strong> Serve hot with fresh ginger julienne, green chilies, lemon wedges, and fresh coriander.</p>
<p><strong>Serving Style:</strong> Enjoy with naan or tandoori roti for dipping in the rich, flavorful broth - the authentic way!</p>
<p><strong>Weekend Special:</strong> Paya is traditionally served for weekend breakfast in Pakistan - a special treat in Stockholm's Pakistani community.</p>

<h3>Why Shop at Anmol Sweets & Restaurant?</h3>
<p>Anmol Sweets & Restaurant is Stockholm's premier destination for authentic Pakistani and Indian products. Our weekend paya breakfast is legendary among Stockholm's Pakistani community - people reserve in advance! Now you can recreate this traditional breakfast favorite at home with the same Shan Paya Masala we use in our restaurant kitchen.</p>

<h3>Product Details</h3>
<ul>
<li><strong>Brand:</strong> Shan Foods (Pakistan's #1 spice brand for 45+ years)</li>
<li><strong>Weight:</strong> 50 grams</li>
<li><strong>Origin:</strong> Pakistan</li>
<li><strong>Category:</strong> Grocery - Spices</li>
<li><strong>Ingredients:</strong> Red chili, salt, coriander, cumin, black pepper, garlic, ginger, turmeric, fennel, cinnamon, cardamom, cloves, and signature spice blend</li>
<li><strong>Serves:</strong> Approximately 4-6 people</li>
<li><strong>Cooking Time:</strong> 6-8 hours slow-cook or 45-60 minutes in pressure cooker</li>
<li><strong>Shelf Life:</strong> See package for best before date</li>
<li><strong>Storage:</strong> Store in a cool, dry place. Keep container tightly closed.</li>
</ul>

<h3>Perfect For</h3>
<p>✓ Pakistani families in Stockholm seeking traditional weekend breakfast<br>
✓ Food enthusiasts interested in authentic South Asian cuisine<br>
✓ Winter comfort food lovers - rich, warming, and deeply nourishing<br>
✓ Health-conscious individuals seeking collagen-rich, nutritious foods<br>
✓ Anyone who loves our restaurant's weekend paya special<br>
✓ Special occasions and traditional Pakistani gatherings<br>
✓ Slow-cooking enthusiasts who appreciate depth of flavor<br>
✓ Those exploring traditional wellness foods from around the world</p>

<h3>Delivery & Pickup</h3>
<p>Available for home delivery across Stockholm or pickup from our restaurant at Fagerstagatan 13, Spånga. Order your Shan Paya Masala today and bring the authentic taste of Pakistan's beloved trotters soup to your kitchen!</p>

<p><em>At Anmol Sweets & Restaurant, we don't just serve food - we serve traditions, memories, and the authentic flavors of home.</em></p>`
  },

  // 9. Shan Karahi Masala 100g
  {
    name: "Shan Karahi Masala 100g",
    slug: "shan-karahi-masala-100g",
    type: "simple",
    status: "draft",
    regular_price: "18",
    sku: "AN-Gs-20030",
    weight: "0.1",
    categories: [{ id: 378 }],
    short_description: `<h3>Shan Karahi Masala - Authentic Pakistani Wok-Style Spice Mix</h3>
<p>Premium Shan Karahi Masala - 100g. Create authentic karahi-style chicken or mutton with bold, aromatic flavors. Available at Anmol Sweets & Restaurant Stockholm.</p>`,
    description: `<h2>Shan Karahi Masala 100g - Authentic Pakistani Wok-Style Curry Spice Blend</h2>

<p>Experience the authentic taste of Pakistan with <strong>Shan Karahi Masala</strong>, now available at <strong>Anmol Sweets & Restaurant Stockholm</strong> - your trusted source for premium Pakistani spices in Sweden. Create the bold, aromatic karahi-style dishes that are Pakistan's most popular restaurant offering.</p>

<h3>What is Karahi Masala?</h3>
<p>Shan Karahi Masala is a premium spice blend for creating authentic Pakistani karahi - a popular wok-style curry cooked in a traditional round-bottomed karahi (wok). Karahi dishes are characterized by their bold, tomato-based gravy with visible spices, fresh ingredients, and intense aromatic flavors. This is Pakistan's most ordered restaurant dish and a street food favorite! The larger 100g pack provides excellent value for regular cooking, and the versatile blend works beautifully with chicken, mutton, beef, or vegetables. Karahi is known for its quick cooking time and incredibly vibrant flavors.</p>

<h3>Why Choose Shan Karahi Masala?</h3>
<ul>
<li><strong>Pakistan's Most Popular Dish:</strong> Create the #1 restaurant favorite across Pakistan - now in Stockholm!</li>
<li><strong>45+ Years of Excellence:</strong> Shan Foods - Pakistan's #1 spice brand since 1981, trusted by millions worldwide.</li>
<li><strong>Bold, Aromatic Flavor:</strong> Signature karahi taste - rich tomato gravy with visible whole spices and fresh herbs.</li>
<li><strong>Larger 100g Pack:</strong> Premium size for multiple delicious meals - excellent value for families.</li>
<li><strong>Restaurant Authentic:</strong> The same karahi masala we use at Anmol Sweets & Restaurant Stockholm - consistently our best-seller!</li>
<li><strong>Versatile Cooking:</strong> Perfect for chicken karahi, mutton karahi, white karahi, or vegetable karahi.</li>
<li><strong>Quick Cooking:</strong> Ready in 20-30 minutes - perfect for busy Stockholm evenings.</li>
<li><strong>No Artificial Additives:</strong> Pure, natural spices - authentic restaurant flavor at home.</li>
</ul>

<h3>How to Use Shan Karahi Masala</h3>
<p><strong>Chicken Karahi:</strong> Cook chicken pieces with tomatoes, green chilies, Shan Karahi Masala, and fresh ginger until tender - ready in 25 minutes!</p>
<p><strong>Mutton Karahi:</strong> Use tender mutton pieces for the authentic Peshawari-style karahi that's famous across Pakistan.</p>
<p><strong>White Karahi:</strong> Skip tomatoes and create the unique white karahi with yogurt, cream, and aromatics - a Lahori specialty.</p>
<p><strong>Vegetable Karahi:</strong> Perfect with paneer, mushrooms, or mixed vegetables for a delicious vegetarian option.</p>
<p><strong>Garnishing:</strong> Top with fresh coriander, ginger julienne, and green chilies - the traditional finishing touches.</p>
<p><strong>Serving:</strong> Serve sizzling hot in a karahi (wok) with naan bread or tandoori roti - restaurant-style presentation at home!</p>
<p><strong>Quick Weeknight Dinner:</strong> The fastest authentic Pakistani meal you can make - perfect for busy families in Stockholm.</p>

<h3>Why Shop at Anmol Sweets & Restaurant?</h3>
<p>Anmol Sweets & Restaurant is Stockholm's premier destination for authentic Pakistani and Indian products. Our karahi dishes (especially chicken karahi) are our absolute best-sellers - customers rave about them! Now you can create the exact same taste at home with the premium Shan Karahi Masala we use in our kitchen. This is Stockholm's favorite Pakistani dish!</p>

<h3>Product Details</h3>
<ul>
<li><strong>Brand:</strong> Shan Foods (Pakistan's #1 spice brand for 45+ years)</li>
<li><strong>Weight:</strong> 100 grams (larger value pack)</li>
<li><strong>Origin:</strong> Pakistan</li>
<li><strong>Category:</strong> Grocery - Spices</li>
<li><strong>Ingredients:</strong> Red chili, salt, coriander, paprika, garlic, ginger, cumin, black pepper, turmeric, fenugreek, cardamom, cinnamon, and signature karahi spice blend</li>
<li><strong>Spice Level:</strong> Medium to hot (adjustable with green chilies)</li>
<li><strong>Cooking Time:</strong> 20-30 minutes</li>
<li><strong>Uses:</strong> Multiple meals - excellent value for regular cooking</li>
<li><strong>Shelf Life:</strong> See package for best before date</li>
<li><strong>Storage:</strong> Store in a cool, dry place. Keep tightly closed.</li>
</ul>

<h3>Perfect For</h3>
<p>✓ Anyone who loves our restaurant's famous chicken karahi<br>
✓ Busy families needing quick, flavorful weeknight dinners<br>
✓ Pakistani & Indian families in Stockholm seeking authentic home cooking<br>
✓ Food enthusiasts exploring Pakistan's most popular dishes<br>
✓ Dinner parties and gatherings - always a crowd-pleaser<br>
✓ Those who appreciate bold, aromatic, tomato-based curries<br>
✓ Students and young professionals wanting affordable, delicious meals<br>
✓ Anyone seeking restaurant-quality Pakistani food at home</p>

<h3>Delivery & Pickup</h3>
<p>Available for home delivery across Stockholm or pickup from our restaurant at Fagerstagatan 13, Spånga. Order your Shan Karahi Masala 100g today and create Stockholm's favorite Pakistani dish in your own kitchen!</p>

<p><em>Experience the flavors that made us Stockholm's favorite destination for Pakistani and Indian cuisine.</em></p>`
  },

  // 10. Shan Chicken Masala 100g
  {
    name: "Shan Chicken Masala 100g",
    slug: "shan-chicken-masala-100g",
    type: "simple",
    status: "draft",
    regular_price: "18",
    sku: "AN-Gs-20031",
    weight: "0.1",
    categories: [{ id: 378 }],
    short_description: `<h3>Shan Chicken Masala - Versatile Pakistani Chicken Spice Mix</h3>
<p>Premium Shan Chicken Masala - 100g. All-purpose spice blend for authentic Pakistani chicken dishes. Available at Anmol Sweets & Restaurant Stockholm.</p>`,
    description: `<h2>Shan Chicken Masala 100g - Authentic Pakistani All-Purpose Chicken Spice Blend</h2>

<p>Experience the authentic taste of Pakistan with <strong>Shan Chicken Masala</strong>, now available at <strong>Anmol Sweets & Restaurant Stockholm</strong> - your trusted source for premium Pakistani spices in Sweden. Create countless delicious chicken dishes with this versatile, aromatic spice blend that's essential in every Pakistani kitchen.</p>

<h3>What is Chicken Masala?</h3>
<p>Shan Chicken Masala is a versatile, all-purpose spice blend specifically formulated for Pakistani-style chicken dishes. Unlike single-dish masalas, this blend works beautifully across multiple cooking styles - curries, stir-fries, grills, bakes, and more. It's the go-to masala for Pakistani home cooking and creates the signature aromatic, flavorful taste that defines Pakistani chicken cuisine. This larger 100g pack is perfect for families who cook chicken regularly, offering excellent value and endless culinary possibilities. It's Stockholm's most versatile Pakistani spice blend!</p>

<h3>Why Choose Shan Chicken Masala?</h3>
<ul>
<li><strong>Ultimate Versatility:</strong> One masala for countless chicken dishes - curry, tikka, biryani, grilled, roasted, and more!</li>
<li><strong>45+ Years of Excellence:</strong> Shan Foods - Pakistan's #1 spice brand since 1981, trusted by millions worldwide.</li>
<li><strong>Larger 100g Pack:</strong> Best value for regular cooking - enough for multiple delicious meals.</li>
<li><strong>Restaurant Quality:</strong> The same foundational spice blend we use at Anmol Sweets & Restaurant Stockholm.</li>
<li><strong>Perfectly Balanced:</strong> Not too spicy, not too mild - appeals to all taste preferences, including Swedish palates.</li>
<li><strong>Quick Cooking:</strong> Most chicken masala dishes ready in 20-40 minutes - perfect for busy Stockholm lifestyles.</li>
<li><strong>No Artificial Additives:</strong> Pure, natural spices - authentic Pakistani flavor without shortcuts.</li>
<li><strong>Family-Friendly:</strong> Mild enough for children, flavorful enough for adults - perfect for Stockholm's diverse families.</li>
</ul>

<h3>How to Use Shan Chicken Masala</h3>
<p><strong>Quick Chicken Curry:</strong> Cook chicken pieces with onions, tomatoes, and Shan Chicken Masala for a delicious weeknight curry.</p>
<p><strong>Chicken Tikka:</strong> Marinate chicken with yogurt and masala, then grill or bake for smoky, tender tikka - perfect for BBQ season in Stockholm!</p>
<p><strong>Roasted Chicken:</strong> Rub whole chicken or pieces with masala mixed with oil for aromatic Pakistani-style roast chicken.</p>
<p><strong>Chicken Biryani:</strong> Use as part of the marinade for flavorful chicken biryani rice.</p>
<p><strong>Stir-Fry:</strong> Quick chicken stir-fry with vegetables and Shan Chicken Masala - fusion cooking at its best!</p>
<p><strong>Chicken Soup:</strong> Add a teaspoon to chicken soup for warming Pakistani-spiced broth - perfect for Swedish winters.</p>
<p><strong>Grilled Chicken:</strong> Mix with olive oil and marinade chicken for healthy, flavorful grilled chicken.</p>
<p><strong>Meal Prep:</strong> Prepare large batches - chicken masala dishes reheat beautifully for lunches!</p>

<h3>Why Shop at Anmol Sweets & Restaurant?</h3>
<p>Anmol Sweets & Restaurant is Stockholm's premier destination for authentic Pakistani and Indian products. We use Shan Chicken Masala as a foundational spice in countless dishes across our menu. From our popular chicken curry to tikka specialties, this versatile masala is a kitchen workhorse. Now you can create the same variety and authentic flavors at home!</p>

<h3>Product Details</h3>
<ul>
<li><strong>Brand:</strong> Shan Foods (Pakistan's #1 spice brand for 45+ years)</li>
<li><strong>Weight:</strong> 100 grams (larger value pack)</li>
<li><strong>Origin:</strong> Pakistan</li>
<li><strong>Category:</strong> Grocery - Spices</li>
<li><strong>Ingredients:</strong> Coriander, red chili, salt, paprika, cumin, garlic, ginger, turmeric, black pepper, cinnamon, cardamom, cloves, and signature spice blend</li>
<li><strong>Spice Level:</strong> Medium (family-friendly, adjustable)</li>
<li><strong>Versatility:</strong> Works with all chicken cooking methods</li>
<li><strong>Uses:</strong> Multiple meals - exceptional value for families</li>
<li><strong>Shelf Life:</strong> See package for best before date</li>
<li><strong>Storage:</strong> Store in a cool, dry place. Keep tightly closed to preserve freshness.</li>
</ul>

<h3>Perfect For</h3>
<p>✓ Pakistani & Indian families in Stockholm cooking chicken regularly<br>
✓ Busy families needing versatile, quick dinner solutions<br>
✓ Students seeking affordable, easy-to-cook meals<br>
✓ Anyone exploring Pakistani and Indian cuisine<br>
✓ Health-conscious individuals wanting flavorful lean protein dishes<br>
✓ BBQ and grilling enthusiasts (perfect for chicken tikka)<br>
✓ Meal preppers and batch cookers<br>
✓ Food enthusiasts wanting one essential Pakistani spice blend<br>
✓ Swedish families introducing international flavors to their cooking</p>

<h3>Delivery & Pickup</h3>
<p>Available for home delivery across Stockholm or pickup from our restaurant at Fagerstagatan 13, Spånga. Order your Shan Chicken Masala 100g today and stock your Stockholm kitchen with this essential, versatile Pakistani spice blend!</p>

<p><em>At Anmol Sweets & Restaurant, we don't just serve food - we serve traditions, memories, and the authentic flavors of home.</em></p>`
  }
];

// =============================================================================
// MAIN EXECUTION
// =============================================================================

async function main() {
  console.log('\n🚀 Shan Spice Products - Batch Creator');
  console.log('📦 Creating 10 Shan spice products for Anmol Sweets & Restaurant\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < shanProducts.length; i++) {
    const product = shanProducts[i];
    console.log(`\n[${i + 1}/10] Creating: ${product.name}...`);

    try {
      await createProduct(product);
      successCount++;
      // Wait 2 seconds between requests to avoid overwhelming the server
      if (i < shanProducts.length - 1) {
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
  console.log('   2. Go to Products → All Products');
  console.log('   3. Review each draft product');
  console.log('   4. Add product images');
  console.log('   5. Publish when ready!\n');
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { shanProducts, createProduct };
