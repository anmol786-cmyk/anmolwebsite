
const { getProductCategories } = require('./lib/woocommerce/products-direct');

async function listCategories() {
    try {
        console.log('Fetching categories...');
        const categories = await getProductCategories();

        // Build a map for easy lookup
        const catMap = new Map();
        categories.forEach(c => catMap.set(c.id, c));

        // Group by parent
        const hierarchy = {};
        categories.forEach(c => {
            if (c.parent === 0) {
                if (!hierarchy[c.id]) hierarchy[c.id] = { ...c, children: [] };
                else hierarchy[c.id] = { ...c, children: hierarchy[c.id].children };
            } else {
                const parentId = c.parent;
                if (!hierarchy[parentId]) hierarchy[parentId] = { children: [] };
                hierarchy[parentId].children.push(c);
            }
        });

        console.log('\nCategory Hierarchy:');
        Object.values(hierarchy).forEach(cat => {
            if (cat.name) {
                console.log(`[${cat.id}] ${cat.name}`);
                if (cat.children && cat.children.length > 0) {
                    cat.children.forEach(child => {
                        console.log(`  - [${child.id}] ${child.name}`);
                    });
                }
            }
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

// Mock the config since we're running this standalone
// We need to make sure the imports in products-direct work or mock them
// Actually, it's better to just use the existing Next.js environment if possible
// But for now let's try to read the categories from the running app logs or just inspect the file
