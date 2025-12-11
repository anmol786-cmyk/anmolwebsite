import { getProducts, getProductCategories } from '@/lib/woocommerce/products-direct';
import { OrderTypeSelector } from '@/components/restaurant/order-type-selector';
import { getBakeryChildCategories, getMenuSections } from '@/lib/menu-utils';
import { RestaurantStatus } from '@/components/restaurant/restaurant-status';
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
    Cake,
    Phone,
    Calendar,
    Heart,
    Star,
    Gift,
    Sparkles
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Bakery Stockholm | Cakes & Pastries | Anmol Sweets & Restaurant',
    description: 'Order custom cakes and pastries in Stockholm from Anmol Sweets & Restaurant. Wedding cakes, birthday cakes, celebration cakes, and fresh pastries. Beautifully designed.',
    keywords: 'bakery Stockholm, custom cakes Stockholm, birthday cake Stockholm, wedding cake Stockholm, pastries Stockholm, Pakistani bakery Stockholm',
    openGraph: {
        title: 'Bakery - Custom Cakes & Pastries Stockholm | Anmol Sweets',
        description: 'Beautifully designed custom cakes for weddings, birthdays, and all celebrations. Order your dream cake today!',
        images: [
            {
                url: 'https://anmolsweets.se/wp-content/uploads/2025/04/anmol-custom-cake.jpg',
                width: 1200,
                height: 630,
                alt: 'Bakery at Anmol Sweets Stockholm',
            },
        ],
    },
};

export const revalidate = 3600;

export default async function BakeryMenuPage() {
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

    // Get bakery child categories only
    const bakeryCategories = getBakeryChildCategories(categories);

    // If no child categories found, fall back to all bakery-related categories
    const { bakery: allBakeryCategories } = getMenuSections(categories);
    const activeCategories = bakeryCategories.length > 0 ? bakeryCategories : allBakeryCategories;

    // Filter categories that have products
    const categoriesWithProducts = activeCategories.filter((cat) =>
        allProducts.some((p) => p.categories && p.categories.some((c: any) => c.id === cat.id))
    );

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
                                <Cake className="h-4 w-4" />
                                Bakery
                            </span>

                            {/* Title */}
                            <h1 className="page-title">
                                Cakes & Pastries for Every Occasion
                            </h1>

                            {/* Description */}
                            <p className="section-subtitle">
                                Celebrate life's special moments with our beautifully handcrafted cakes and pastries.
                                From elegant wedding cakes to fun birthday creations, each item is made fresh with quality
                                ingredients and designed to match your vision perfectly.
                            </p>

                            {/* Badges */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                <Badge className="bg-secondary text-secondary-foreground">Custom Designs</Badge>
                                <Badge variant="outline">All Occasions</Badge>
                                <Badge variant="outline">Advance Order</Badge>
                                <Badge variant="outline">Fresh Ingredients</Badge>
                            </div>

                            {/* Quick Info Cards */}
                            <div className="flex flex-wrap gap-3 pt-4">
                                <Card className="card-base px-4 py-3 flex items-center gap-3">
                                    <div className="icon-box bg-secondary/10">
                                        <Calendar className="h-4 w-4 text-secondary" />
                                    </div>
                                    <div>
                                        <p className="label-text">Order Time</p>
                                        <p className="text-sm font-semibold">2-3 Days Advance</p>
                                    </div>
                                </Card>
                                <Card className="card-base px-4 py-3 flex items-center gap-3">
                                    <div className="icon-box bg-secondary/10">
                                        <Gift className="h-4 w-4 text-secondary" />
                                    </div>
                                    <div>
                                        <p className="label-text">Occasions</p>
                                        <p className="text-sm font-semibold">All Celebrations</p>
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
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div>
                            <RestaurantStatus variant="full" />

                            {/* Order Info Card */}
                            <Card className="card-highlight card-padding mt-4">
                                <h3 className="card-title mb-2 flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-secondary" />
                                    Custom Orders
                                </h3>
                                <p className="body-text-sm mb-3">
                                    For custom cake designs, wedding cakes, or large orders, please call us to discuss your requirements.
                                </p>
                                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
                                    <a href={`tel:${restaurantConfig.phone}`}>
                                        <Phone className="mr-2 h-4 w-4" />
                                        Call {restaurantConfig.phone}
                                    </a>
                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sticky Navigation */}
            {categoriesWithProducts.length > 0 && (
                <MenuNavigation
                    categories={categoriesWithProducts.map((c) => ({
                        id: c.id,
                        name: c.name,
                        slug: c.slug,
                    }))}
                />
            )}

            {/* Menu Categories */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-7xl">
                    {categoriesWithProducts.length > 0 ? (
                        categoriesWithProducts.map((category) => {
                            const categoryProducts = allProducts.filter((product) =>
                                product.categories?.some((cat: any) => cat.id === category.id)
                            );

                            if (categoryProducts.length === 0) return null;

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
                                </div>
                            );
                        })
                    ) : (
                        /* Empty State */
                        <div className="text-center py-16">
                            <Cake className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                            <h2 className="section-title mb-2">Bakery Coming Soon!</h2>
                            <p className="section-subtitle mb-6">
                                Our bakery menu is being updated. In the meantime, please call us to order custom cakes.
                            </p>
                            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" asChild>
                                <a href={`tel:${restaurantConfig.phone}`}>
                                    <Phone className="mr-2 h-4 w-4" />
                                    Call to Order: {restaurantConfig.phone}
                                </a>
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* Occasions Section */}
            <section className="py-12 bg-muted/30">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center section-header-gap">
                        <h2 className="section-title">Perfect for Every Occasion</h2>
                        <p className="section-subtitle">We create beautiful cakes for all of life's special moments</p>
                    </div>

                    <div className="grid-4 max-w-4xl mx-auto">
                        {[
                            { icon: Heart, title: 'Weddings', desc: 'Elegant multi-tier cakes' },
                            { icon: Gift, title: 'Birthdays', desc: 'Fun themed designs' },
                            { icon: Star, title: 'Anniversaries', desc: 'Romantic creations' },
                            { icon: Sparkles, title: 'Celebrations', desc: 'Any special event' },
                        ].map((item, i) => (
                            <Card key={i} className="card-base card-padding text-center hover:shadow-md transition-shadow">
                                <item.icon className="h-8 w-8 mx-auto mb-2 text-secondary" />
                                <h3 className="font-semibold text-sm">{item.title}</h3>
                                <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Order Options */}
            <section className="py-12 bg-muted/30 border-t border-border/30">
                <div className="container mx-auto px-4 max-w-7xl">
                    <OrderTypeSelector />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 bg-gradient-to-r from-primary via-primary/95 to-primary">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
                        Ready to Order Your Dream Cake?
                    </h2>
                    <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                        Call us to discuss your custom cake requirements, design ideas, and place your order
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Button size="lg" variant="secondary" asChild>
                            <a href={`tel:${restaurantConfig.phone}`}>
                                <Phone className="mr-2 h-4 w-4" />
                                Call {restaurantConfig.phone}
                            </a>
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                            <Link href="/menu/sweets">Explore Sweets Menu</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}
