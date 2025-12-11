import { getProducts, getProductCategories } from '@/lib/woocommerce/products-direct';
import { getMenuSections, getParentCategoriesFromList, getChildCategoriesFromList } from '@/lib/menu-utils';
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
    Cookie,
    Phone,
    Gift,
    Heart,
    Sparkles,
    Award,
    Star
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Sweets & Mithai Stockholm | Traditional Pakistani & Indian Desserts | Anmol Sweets',
    description: 'Discover Stockholm\'s finest selection of traditional Pakistani and Indian sweets & mithai. From Gulab Jamun to Ras Malai, Jalebi to Barfi, handcrafted fresh daily with pure desi ghee. Gift boxes available for weddings & celebrations in Spånga.',
    keywords: 'Pakistani sweets Stockholm, Indian mithai Stockholm, gulab jamun Stockholm, ras malai Stockholm, jalebi Stockholm, barfi Stockholm, ladoo Stockholm, halwa Stockholm, desi sweets Spånga, mithai shop Stockholm, Indian desserts Stockholm, Pakistani desserts',
    openGraph: {
        title: 'Sweets & Mithai Stockholm - Traditional Pakistani & Indian Desserts | Anmol Sweets',
        description: 'Handcrafted traditional sweets made with pure desi ghee. From classic Gulab Jamun to premium Kaju Katli. Fresh daily in Stockholm.',
        images: [
            {
                url: 'https://anmolsweets.se/wp-content/uploads/2025/04/anmol-sweets-display.jpg',
                width: 1200,
                height: 630,
                alt: 'Anmol Sweets & Mithai Stockholm',
            },
        ],
    },
};

export const revalidate = 3600;

export default async function SweetsMenuPage() {
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

    const { sweets: sweetsCategories } = getMenuSections(categories);

    // Filter categories that have products
    const activeCategories = sweetsCategories.filter((cat) =>
        allProducts.some((p) => p.categories && p.categories.some((c: any) => c.id === cat.id))
    );

    // Get parent and child categories for hierarchical display
    const parentCategories = getParentCategoriesFromList(activeCategories);

    return (
        <>
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-background to-primary/5" />

                <div className="container mx-auto px-4 py-10 md:py-16 max-w-7xl relative z-10">
                    <div className="grid gap-8 lg:grid-cols-3 items-start">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-4">
                            {/* Badge */}
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card shadow-sm text-sm font-medium text-secondary">
                                <Cookie className="h-4 w-4" />
                                Sweets & Mithai
                            </span>

                            {/* Title */}
                            <h1 className="page-title">
                                Traditional Pakistani & Indian Sweets
                            </h1>

                            {/* Description */}
                            <p className="section-subtitle">
                                Experience the authentic taste of the subcontinent with our handcrafted traditional sweets and mithai.
                                From classic Gulab Jamun and Ras Malai to premium Kaju Katli and aromatic Gajar Halwa,
                                each sweet is made fresh daily with pure desi ghee and the finest ingredients.
                            </p>

                            {/* Badges */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                <Badge className="bg-secondary text-secondary-foreground">Pure Desi Ghee</Badge>
                                <Badge variant="outline">Fresh Daily</Badge>
                                <Badge variant="outline">Gift Boxes Available</Badge>
                                <Badge variant="outline">Wedding Specials</Badge>
                            </div>

                            {/* Quick Info Cards */}
                            <div className="flex flex-wrap gap-3 pt-4">
                                <Card className="card-base px-4 py-3 flex items-center gap-3">
                                    <div className="icon-box bg-secondary/10">
                                        <Sparkles className="h-4 w-4 text-secondary" />
                                    </div>
                                    <div>
                                        <p className="label-text">Quality</p>
                                        <p className="text-sm font-semibold">Pure Desi Ghee</p>
                                    </div>
                                </Card>
                                <Card className="card-base px-4 py-3 flex items-center gap-3">
                                    <div className="icon-box bg-secondary/10">
                                        <Heart className="h-4 w-4 text-secondary" />
                                    </div>
                                    <div>
                                        <p className="label-text">Made</p>
                                        <p className="text-sm font-semibold">Fresh Daily</p>
                                    </div>
                                </Card>
                                <Card className="card-base px-4 py-3 flex items-center gap-3">
                                    <div className="icon-box bg-secondary/10">
                                        <Gift className="h-4 w-4 text-secondary" />
                                    </div>
                                    <div>
                                        <p className="label-text">Gift</p>
                                        <p className="text-sm font-semibold">Boxes Available</p>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div>
                            <RestaurantStatus variant="full" />

                            {/* Gift Box Card */}
                            <Card className="card-highlight card-padding mt-4">
                                <h3 className="card-title mb-2 flex items-center gap-2">
                                    <Gift className="h-4 w-4 text-secondary" />
                                    Gift Boxes
                                </h3>
                                <p className="body-text-sm mb-3">
                                    Beautiful gift boxes available for weddings, Eid, Diwali, and all special occasions.
                                    Custom assortments on request.
                                </p>
                                <Button variant="secondary" className="w-full" asChild>
                                    <a href={`tel:${restaurantConfig.phone}`}>
                                        <Phone className="mr-2 h-4 w-4" />
                                        Order Gift Box
                                    </a>
                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sticky Navigation */}
            <MenuNavigation
                categories={activeCategories.map((c) => ({
                    id: c.id,
                    name: c.name,
                    slug: c.slug,
                }))}
            />

            {/* Menu Categories */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-7xl">
                    {activeCategories.map((category) => {
                        const categoryProducts = allProducts.filter((product) =>
                            product.categories?.some((cat: any) => cat.id === category.id)
                        );

                        if (categoryProducts.length === 0) return null;

                        // Check if this is a parent category with children
                        const childCategories = getChildCategoriesFromList(activeCategories, category.id);
                        const isParent = childCategories.length > 0;

                        // Skip rendering child categories separately if they'll be shown under parent
                        if (category.parent && category.parent !== 0) return null;

                        return (
                            <div key={category.id} id={category.slug} className="mb-12 scroll-mt-32">
                                {/* Category Header */}
                                <div className="section-header-gap">
                                    <h2 className="section-title">{category.name}</h2>
                                    {category.description && (
                                        <p className="section-subtitle mt-1">
                                            {decodeHtmlEntities(category.description.replace(/<[^>]*>/g, '').trim())}
                                        </p>
                                    )}
                                    <div className="section-divider mt-3" style={{ backgroundColor: 'hsl(var(--secondary))' }} />
                                </div>

                                {/* Products - Classic 2-column menu layout */}
                                <div className="grid md:grid-cols-2 gap-x-6 lg:gap-x-8">
                                    {categoryProducts.map((product) => (
                                        <MenuItem key={product.id} product={product} />
                                    ))}
                                </div>

                                {/* If parent, also show child category products */}
                                {isParent && childCategories.map(childCat => {
                                    const childProducts = allProducts.filter((product) =>
                                        product.categories?.some((cat: any) => cat.id === childCat.id)
                                    );

                                    if (childProducts.length === 0) return null;

                                    return (
                                        <div key={childCat.id} id={childCat.slug} className="mt-8 scroll-mt-32">
                                            <h3 className="subsection-title mb-3">{childCat.name}</h3>
                                            {childCat.description && (
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    {decodeHtmlEntities(childCat.description.replace(/<[^>]*>/g, '').trim())}
                                                </p>
                                            )}
                                            <div className="grid md:grid-cols-2 gap-x-6 lg:gap-x-8">
                                                {childProducts.map((product) => (
                                                    <MenuItem key={product.id} product={product} />
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Order Options */}
            <section className="py-12 bg-muted/30 border-t border-border/30">
                <div className="container mx-auto px-4 max-w-7xl">
                    <OrderTypeSelector />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 bg-gradient-to-r from-primary via-primary/95 to-primary/90">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
                        Looking for Catering?
                    </h2>
                    <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                        We offer special bulk orders for weddings, mehndi, and parties with beautiful presentation
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Button size="lg" variant="outline" className="bg-white text-secondary hover:bg-white/90" asChild>
                            <a href={`tel:${restaurantConfig.phone}`}>
                                <Phone className="mr-2 h-4 w-4" />
                                Call {restaurantConfig.phone}
                            </a>
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                            <Link href="/special-order">View Catering</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}
