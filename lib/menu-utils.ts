
import type { ProductCategoryFull } from '@/types/woocommerce';

export interface MenuSections {
    restaurant: ProductCategoryFull[];
    sweets: ProductCategoryFull[];
    bakery: ProductCategoryFull[];
    grocery: ProductCategoryFull[];
}

// Define the specific restaurant categories and their order
export const RESTAURANT_CATEGORY_SLUGS = [
    'starters',
    'lamb',
    'beef',
    'chicken',
    'vegetables',
    'biryani',
    'tandoor',
    'snacks-drinks',
    'breakfast'
];

// Main course sub-categories (for display grouping)
export const MAIN_COURSE_CATEGORIES = ['lamb', 'beef', 'chicken', 'vegetables', 'biryani', 'tandoor'];

// Bakery category slug (parent)
export const BAKERY_PARENT_SLUG = 'bakery';

// Sweets category slugs
export const SWEETS_KEYWORDS = ['sweet', 'mithai', 'dessert'];

// Grocery category slugs
export const GROCERY_KEYWORDS = ['grocery', 'groceries', 'spice', 'ingredients', 'dry goods'];

/**
 * Get menu sections with proper categorization
 */
export function getMenuSections(categories: ProductCategoryFull[]): MenuSections {
    // Build a map for easy lookup
    const categoryMap = new Map<number, ProductCategoryFull>();
    const categoryBySlug = new Map<string, ProductCategoryFull>();
    categories.forEach(cat => {
        categoryMap.set(cat.id, cat);
        categoryBySlug.set(cat.slug.toLowerCase(), cat);
    });

    // Helper to check if a category or its ancestors match specific criteria
    const matchesCategory = (cat: ProductCategoryFull, keywords: string[]): boolean => {
        const name = cat.name.toLowerCase();
        const slug = cat.slug.toLowerCase();

        // Direct match
        if (keywords.some(kw => name.includes(kw) || slug.includes(kw))) {
            return true;
        }

        // Check parent recursively
        if (cat.parent && cat.parent !== 0) {
            const parent = categoryMap.get(cat.parent);
            if (parent) {
                return matchesCategory(parent, keywords);
            }
        }

        return false;
    };

    // Find bakery parent category
    const bakeryParent = categories.find(cat =>
        cat.slug.toLowerCase() === BAKERY_PARENT_SLUG ||
        cat.name.toLowerCase() === 'bakery'
    );

    // Category detection helpers
    const isSweetsCategory = (cat: ProductCategoryFull): boolean =>
        matchesCategory(cat, SWEETS_KEYWORDS);

    const isBakeryCategory = (cat: ProductCategoryFull): boolean => {
        // Check if it's the bakery parent or a child of bakery
        if (bakeryParent) {
            return cat.id === bakeryParent.id || cat.parent === bakeryParent.id;
        }
        return matchesCategory(cat, ['bakery', 'cake', 'pastry']);
    };

    const isGroceryCategory = (cat: ProductCategoryFull): boolean =>
        matchesCategory(cat, GROCERY_KEYWORDS);

    const isRestaurantCategory = (cat: ProductCategoryFull): boolean => {
        const slug = cat.slug.toLowerCase();
        return RESTAURANT_CATEGORY_SLUGS.some(rs => slug.includes(rs) || rs.includes(slug));
    };

    // Separate categories
    const restaurantCategories: ProductCategoryFull[] = [];
    const sweetsCategories: ProductCategoryFull[] = [];
    const bakeryCategories: ProductCategoryFull[] = [];
    const groceryCategories: ProductCategoryFull[] = [];

    categories.forEach(cat => {
        // Check for bakery first
        if (isBakeryCategory(cat)) {
            bakeryCategories.push(cat);
        }
        // Then sweets
        else if (isSweetsCategory(cat)) {
            sweetsCategories.push(cat);
        }
        // Then grocery
        else if (isGroceryCategory(cat)) {
            groceryCategories.push(cat);
        }
        // Check for restaurant categories
        else if (isRestaurantCategory(cat)) {
            restaurantCategories.push(cat);
        }
    });

    // Sort restaurant categories by defined order
    restaurantCategories.sort((a, b) => {
        const aIndex = RESTAURANT_CATEGORY_SLUGS.findIndex(s =>
            a.slug.toLowerCase().includes(s) || s.includes(a.slug.toLowerCase())
        );
        const bIndex = RESTAURANT_CATEGORY_SLUGS.findIndex(s =>
            b.slug.toLowerCase().includes(s) || s.includes(b.slug.toLowerCase())
        );
        // If not found in list, put at end
        const aOrder = aIndex === -1 ? 999 : aIndex;
        const bOrder = bIndex === -1 ? 999 : bIndex;
        return aOrder - bOrder;
    });

    return {
        restaurant: restaurantCategories,
        sweets: sweetsCategories,
        bakery: bakeryCategories,
        grocery: groceryCategories
    };
}

/**
 * Get restaurant categories in the specified order
 * Returns: Starters, Main Course (Lamb, Beef, Chicken, Vegetables, Biryani, Tandoor), Snacks & Drinks, Breakfast
 */
export function getRestaurantCategoriesOrdered(categories: ProductCategoryFull[]): {
    starters: ProductCategoryFull | null;
    mainCourse: ProductCategoryFull[];
    snacksDrinks: ProductCategoryFull | null;
    breakfast: ProductCategoryFull | null;
    all: ProductCategoryFull[];
} {
    const categoryBySlug = new Map<string, ProductCategoryFull>();
    categories.forEach(cat => categoryBySlug.set(cat.slug.toLowerCase(), cat));

    // Find specific categories
    const findCategory = (slugParts: string[]): ProductCategoryFull | null => {
        for (const part of slugParts) {
            const found = categories.find(cat =>
                cat.slug.toLowerCase().includes(part) ||
                cat.name.toLowerCase().includes(part)
            );
            if (found) return found;
        }
        return null;
    };

    const starters = findCategory(['starters', 'starter', 'appetizer']);
    const lamb = findCategory(['lamb']);
    const beef = findCategory(['beef']);
    const chicken = findCategory(['chicken']);
    const vegetables = findCategory(['vegetables', 'vegetable', 'veg']);
    const biryani = findCategory(['biryani']);
    const tandoor = findCategory(['tandoor', 'tandoori']);
    const snacksDrinks = findCategory(['snacks-drinks', 'snacks', 'drinks']);
    const breakfast = findCategory(['breakfast']);

    const mainCourse = [lamb, beef, chicken, vegetables, biryani, tandoor].filter(Boolean) as ProductCategoryFull[];
    const all = [starters, ...mainCourse, snacksDrinks, breakfast].filter(Boolean) as ProductCategoryFull[];

    return {
        starters,
        mainCourse,
        snacksDrinks,
        breakfast,
        all
    };
}

/**
 * Get bakery child categories (excluding parent)
 */
export function getBakeryChildCategories(categories: ProductCategoryFull[]): ProductCategoryFull[] {
    const bakeryParent = categories.find(cat =>
        cat.slug.toLowerCase() === BAKERY_PARENT_SLUG ||
        cat.name.toLowerCase() === 'bakery'
    );

    if (!bakeryParent) return [];

    return categories.filter(cat => cat.parent === bakeryParent.id);
}

/**
 * Get parent categories only from a list
 */
export function getParentCategoriesFromList(categories: ProductCategoryFull[]): ProductCategoryFull[] {
    return categories.filter(cat => !cat.parent || cat.parent === 0);
}

/**
 * Get child categories for a specific parent
 */
export function getChildCategoriesFromList(
    categories: ProductCategoryFull[],
    parentId: number
): ProductCategoryFull[] {
    return categories.filter(cat => cat.parent === parentId);
}
