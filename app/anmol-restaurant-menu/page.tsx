import { getProducts, getProductCategories } from '@/lib/woocommerce/products-direct';
import { getRestaurantCategoriesOrdered } from '@/lib/menu-utils';
import { RestaurantStatus } from '@/components/restaurant/restaurant-status';
import { OrderTypeSelector } from '@/components/restaurant/order-type-selector';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { restaurantConfig } from '@/config/restaurant.config';
import type { Metadata } from 'next';
import { MenuItem } from '@/components/menu/menu-item';
import { MenuNavigation } from '@/components/menu/menu-navigation';
import Link from 'next/link';
import { decodeHtmlEntities } from '@/lib/utils';
import {
    UtensilsCrossed,
    Phone,
    Clock,
    Flame,
    Award
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Restaurant Menu Stockholm | Authentic Indo-Pakistani Cuisine | Anmol Sweets & Restaurant',
    description: 'Explore our authentic Indo-Pakistani cuisine menu in Stockholm featuring starters, biryanis, curries, tandoori, karahi, and traditional main courses. 100% Halal with vegetarian options.',
    keywords: 'restaurant menu Stockholm, Pakistani restaurant menu, Indian restaurant menu, biryani Stockholm, tandoori Stockholm, karahi Stockholm, halal restaurant Stockholm',
    openGraph: {
        title: 'Restaurant Menu Stockholm - Authentic Indo-Pakistani Cuisine | Anmol Sweets',
        description: 'From aromatic biryanis to succulent tandoori and flavorful curries. Explore our full restaurant menu with 100% Halal options.',
        images: [
            {
                url: 'https://anmolsweets.se/wp-content/uploads/2025/04/anmol-catering-dish.jpg',
                width: 1200,
                height: 630,
                alt: 'Anmol Sweets Restaurant Menu Stockholm',
            },
        ],
    },
};

export const revalidate = 3600;

export default async function RestaurantMenuPage() {
    const categories = await getProductCategories({});

    // Fetch ALL products by fetching multiple pages
    let allProducts: any[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        const { data, totalPages } = await getProducts({ per_page: 100, page });
        allProducts = [...allProducts, ...data];
        hasMore = page < totalPages;
        page++;
    }

    // Get restaurant categories in the specified order
    const restaurantOrdered = getRestaurantCategoriesOrdered(categories);
    const activeCategories = restaurantOrdered.all;

    // Filter to only show categories that have products
    const categoriesWithProducts = activeCategories.filter((cat) =>
        allProducts.some((p) => p.categories && p.categories.some((c: any) => c.id === cat.id))
    );

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />

                <div className="container mx-auto px-4 py-10 md:py-16 max-w-7xl relative z-10">
                    <div className="grid gap-8 lg:grid-cols-3 items-start">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-4">
                            {/* Badge */}
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card shadow-sm text-sm font-medium text-primary">
                                <UtensilsCrossed className="h-4 w-4" />
                                Restaurant Menu
                            </span>

                            {/* Title */}
                            <h1 className="page-title">
                                Authentic Indo-Pakistani Cuisine
                            </h1>

                            {/* Description */}
                            <p className="section-subtitle">
                                Discover Stockholm's finest selection of authentic Pakistani and Indian cuisine.
                                From aromatic biryanis and tender tandoori to rich curries and traditional karahi dishes,
                                every item is prepared with authentic spices and time-honored recipes.
                            </p>

                            {/* Badges */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                {restaurantConfig.features.halal && (
                                    <Badge className="bg-green-600">100% Halal</Badge>
                                )}
                                {restaurantConfig.features.vegetarian && (
                                    <Badge variant="outline">Vegetarian Options</Badge>
                                )}
                                {restaurantConfig.features.vegan && (
                                    <Badge variant="outline">Vegan Available</Badge>
                                )}
                                {restaurantConfig.features.glutenFree && (
                                    <Badge variant="outline">Gluten-Free Options</Badge>
                                )}
                            </div>

                            {/* Quick Info Cards */}
                            <div className="flex flex-wrap gap-3 pt-4">
                                <Card className="card-base px-4 py-3 flex items-center gap-3">
                                    <div className="icon-box">
                                        <Clock className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="label-text">Open</p>
                                        <p className="text-sm font-semibold">10:00 - 20:00</p>
                                    </div>
                                </Card>
                                <Card className="card-base px-4 py-3 flex items-center gap-3">
                                    <div className="icon-box">
                                        <Flame className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="label-text">Cuisine</p>
                                        <p className="text-sm font-semibold">Indo-Pakistani</p>
                                    </div>
                                </Card>
                                <Card className="card-base px-4 py-3 flex items-center gap-3">
                                    <div className="icon-box">
                                        <Award className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="label-text">Quality</p>
                                        <p className="text-sm font-semibold">100% Halal</p>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div>
                            <RestaurantStatus variant="full" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sticky Navigation - Only show relevant categories */}
            <MenuNavigation
                categories={categoriesWithProducts.map((c) => ({
                    id: c.id,
                    name: c.name,
                    slug: c.slug,
                }))}
            />

            {/* Menu Categories */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-7xl">
                    {categoriesWithProducts.map((category, index) => {
                        const categoryProducts = allProducts.filter((product) =>
                            product.categories?.some((cat: any) => cat.id === category.id)
                        );

                        if (categoryProducts.length === 0) return null;

                        // Check if this is a main course category for grouping label
                        const isFirstMainCourse = index === 1 && restaurantOrdered.mainCourse.length > 0 &&
                            restaurantOrdered.mainCourse[0]?.id === category.id;

                        return (
                            <div key={category.id}>
                                {/* Main Course Section Header */}
                                {isFirstMainCourse && (
                                    <div className="mb-6 mt-4">
                                        <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-medium border-b border-border/50 pb-2">
                                            Main Course
                                        </h3>
                                    </div>
                                )}

                                <div id={category.slug} className="mb-12 scroll-mt-32">
                                    {/* Category Header */}
                                    <div className="section-header-gap">
                                        <h2 className="section-title">{category.name}</h2>
                                        {category.description && (
                                            <p className="section-subtitle mt-1">
                                                {decodeHtmlEntities(category.description.replace(/<[^>]*>/g, '').trim())}
                                            </p>
                                        )}
                                        <div className="section-divider mt-3" />
                                    </div>

                                    {/* Products - Classic 2-column menu layout */}
                                    <div className="grid md:grid-cols-2 gap-x-6 lg:gap-x-8">
                                        {categoryProducts.map((product) => (
                                            <MenuItem key={product.id} product={product} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Order Type Selector */}
            <section className="py-12 bg-muted/30 border-t border-border/30">
                <div className="container mx-auto px-4 max-w-7xl">
                    <OrderTypeSelector />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 bg-gradient-to-r from-primary via-primary/95 to-primary/90">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
                        Can&apos;t Find What You&apos;re Looking For?
                    </h2>
                    <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                        Call us for special requests, catering, or custom orders
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Button size="lg" variant="secondary" asChild>
                            <a href={`tel:${restaurantConfig.phone}`}>
                                <Phone className="mr-2 h-4 w-4" />
                                Call {restaurantConfig.phone}
                            </a>
                        </Button>
                        <Button size="lg" variant="outline" className="bg-white text-primary border-white hover:bg-transparent hover:text-white shadow-sm" asChild>
                            <a href={`mailto:${restaurantConfig.email}`}>Email Us</a>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}
