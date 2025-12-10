import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    StaticPageLayout,
    PageSection,
} from '@/components/layout/static-page-layout';
import {
    UtensilsCrossed,
    Cookie,
    Cake,
    ArrowRight,
    Clock,
    Sparkles,
    Award,
    Star
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Our Menu - Authentic Pakistani & Indian Cuisine | Anmol Sweets & Restaurant',
    description: 'Explore our extensive menu featuring authentic Indian and Pakistani dishes, traditional sweets, biryanis, curries, tandoori grills, handcrafted mithai, and custom cakes. Halal certified restaurant in Stockholm.',
    keywords: 'Indian restaurant Stockholm, Pakistani food, halal restaurant, biryani, tandoori, mithai, sweets, cakes, Indo-Pakistani cuisine',
};

// Menu sections data
const menuSections = [
    {
        title: 'Restaurant Food',
        subtitle: 'Authentic Indo-Pakistani Cuisine',
        description: 'Experience our extensive selection of authentic dishes including aromatic biryanis, sizzling tandoori, flavorful curries, and freshly baked naan. Each dish is prepared with traditional spices and time-honored recipes.',
        href: '/anmol-restaurant-menu',
        icon: UtensilsCrossed,
        color: 'primary',
        image: 'https://anmolsweets.se/wp-content/uploads/2021/01/chicken-karahi-1.jpg',
        badges: ['100% Halal', 'Vegetarian Options', 'Dine-in & Takeaway'],
        featured: true
    },
    {
        title: 'Sweets & Mithai',
        subtitle: 'Traditional Handcrafted Desserts',
        description: 'Indulge in our exquisite collection of traditional Pakistani and Indian sweets. From creamy barfi to syrup-soaked gulab jamun, each sweet is handcrafted daily with pure desi ghee.',
        href: '/anmol-sweets-menu',
        icon: Cookie,
        color: 'secondary',
        image: 'https://anmolsweets.se/wp-content/uploads/2021/01/Anmol-Mix-Sweets-1.jpg',
        badges: ['Pure Desi Ghee', 'Fresh Daily', 'Gift Boxes'],
        featured: false
    },
    {
        title: 'Bakery',
        subtitle: 'Custom Cakes & Pastries',
        description: 'Celebrate special moments with our custom-designed cakes and fresh pastries. From elegant wedding cakes to fun birthday creations, we bring your vision to life with delicious flavors.',
        href: '/menu/bakery',
        icon: Cake,
        color: 'accent',
        image: 'https://anmolsweets.se/wp-content/uploads/2024/10/Rasmali-cake-500x500px.jpg',
        badges: ['Custom Designs', 'All Occasions', 'Order in Advance'],
        featured: false
    },
];

export default function MenuLandingPage() {
    return (
        <StaticPageLayout
            title="Explore Our Menu"
            description="Discover the authentic flavors of India and Pakistan. From aromatic biryanis to delicate sweets and custom cakes, every dish is crafted with traditional recipes and the finest ingredients."
            heroImage="https://anmolsweets.se/wp-content/uploads/2021/01/chicken-karahi-1.jpg"
            badgeText="Our Menu"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Menu", href: "/menu" },
            ]}
            quickInfo={[
                { icon: <Clock className="h-5 w-5" />, label: "Hours", value: "10:00 - 20:00" },
                { icon: <Award className="h-5 w-5" />, label: "Quality", value: "100% Halal" },
                { icon: <Star className="h-5 w-5" />, label: "Rating", value: "4.2/5 Stars" },
                { icon: <Sparkles className="h-5 w-5" />, label: "Fresh", value: "Made Daily" },
            ]}
            cta={{
                title: "Can't Find What You're Looking For?",
                description: "Call us for special requests, catering, or custom orders. We're happy to help!",
                primaryAction: { label: "Call +46 8 88 66 79", href: "tel:+4688866679" },
                secondaryAction: { label: "View Catering", href: "/special-order" },
            }}
        >
            {/* Menu Cards Grid */}
            <PageSection
                id="menu-sections"
                title="Choose Your Menu"
                subtitle="Browse our three specialized menu sections"
            >
                <div className="grid gap-6 md:grid-cols-3">
                    {menuSections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <Link
                                key={section.href}
                                href={section.href}
                                className="group block"
                            >
                                <Card className={`
                  relative overflow-hidden h-full transition-all duration-300
                  bg-card shadow-sm
                  hover:shadow-xl hover:-translate-y-1
                  ${section.featured ? 'ring-2 ring-primary/20' : ''}
                `}>
                                    {/* Featured Badge */}
                                    {section.featured && (
                                        <div className="absolute top-3 right-3 z-10">
                                            <span className="badge-highlight text-[10px]">Most Popular</span>
                                        </div>
                                    )}

                                    {/* Image */}
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <Image
                                            src={section.image}
                                            alt={section.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                                        {/* Icon Overlay */}
                                        <div className="absolute bottom-3 left-3">
                                            <div className="w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center transition-transform group-hover:scale-110">
                                                <Icon className="h-6 w-6 text-foreground" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <div className="mb-3">
                                            <h3 className="card-title group-hover:text-primary transition-colors">
                                                {section.title}
                                            </h3>
                                            <p className="label-text mt-0.5">{section.subtitle}</p>
                                        </div>

                                        <p className="body-text-sm mb-4 line-clamp-3">
                                            {section.description}
                                        </p>

                                        {/* Badges */}
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {section.badges.map((badge, i) => (
                                                <span
                                                    key={i}
                                                    className="text-[10px] px-2 py-1 rounded-full bg-muted text-muted-foreground font-medium"
                                                >
                                                    {badge}
                                                </span>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                                            <span>View Menu</span>
                                            <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </PageSection>

            {/* Quick Links */}
            <PageSection
                id="quick-links"
                title="Special Offerings"
                subtitle="Don't miss our special buffets and catering services"
            >
                <div className="grid-2 max-w-3xl mx-auto">
                    <Card className="card-base card-padding group hover:shadow-md transition-all">
                        <Link href="/lunch-buffet-in-stockholm" className="block">
                            <div className="flex items-start gap-3">
                                <div className="icon-box-lg bg-muted group-hover:bg-muted/80 transition-colors">
                                    <Clock className="h-5 w-5 text-foreground" />
                                </div>
                                <div>
                                    <h3 className="card-title group-hover:text-primary transition-colors">
                                        Weekday Lunch Buffet
                                    </h3>
                                    <p className="label-text">Mon-Fri, 11:00-14:00</p>
                                    <p className="price-small mt-1">139 kr</p>
                                    <p className="body-text-xs mt-1">
                                        15+ items with rotating daily specials
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </Card>

                    <Card className="card-base card-padding group hover:shadow-md transition-all">
                        <Link href="/weekend-brunch-buffet" className="block">
                            <div className="flex items-start gap-3">
                                <div className="icon-box-lg bg-muted group-hover:bg-muted/80 transition-colors">
                                    <Sparkles className="h-5 w-5 text-foreground" />
                                </div>
                                <div>
                                    <h3 className="card-title group-hover:text-primary transition-colors">
                                        Weekend Brunch Buffet
                                    </h3>
                                    <p className="label-text">Sat-Sun, 10:00-14:00</p>
                                    <p className="price-small mt-1">129 kr</p>
                                    <p className="body-text-xs mt-1">
                                        Famous Halwa Puri & Pakistani breakfast
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </Card>
                </div>
            </PageSection>
        </StaticPageLayout>
    );
}
