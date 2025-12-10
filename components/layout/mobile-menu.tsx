'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Menu,
    Phone,
    Home,
    UtensilsCrossed,
    Utensils,
    ChefHat,
    Croissant,
    Cake,
    ShoppingBag,
    BookOpen,
    CalendarCheck,
    Info,
    Mail,
    MapPin,
    Clock,
    User,
    Crown,
    X,
    Facebook,
    Instagram,
    Youtube,
    Twitter
} from 'lucide-react';
import { brandConfig } from '@/config/brand.config';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

const menuItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/special-order', label: 'Catering', icon: ChefHat },
    { href: '/lunch-buffet-in-stockholm', label: 'Lunch Buffet', icon: Utensils },
    { href: '/weekend-brunch-buffet', label: 'Weekend Brunch', icon: Croissant },
    { href: '/anmol-restaurant-menu', label: 'Restaurant Menu', icon: UtensilsCrossed },
    { href: '/anmol-sweets-menu', label: 'Sweets Menu', icon: Cake },
    { href: '/shop', label: 'Shop', icon: ShoppingBag },
    { href: '/blog', label: 'Blog', icon: BookOpen },
    { href: '/bookings', label: 'Reservations', icon: CalendarCheck },
    { href: '/about', label: 'About', icon: Info },
    { href: '/contact', label: 'Contact', icon: Mail },
    { href: '/my-account', label: 'My Account', icon: Crown },
];

export function MobileMenu() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="xl:hidden hover:bg-primary/10 transition-all duration-300">
                    <Menu className="h-5 w-5 transition-transform duration-300 hover:rotate-90" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent
                side="right"
                className="w-[320px] sm:w-[380px] p-0 bg-gradient-to-br from-background via-background to-primary/5 border-l-2 border-primary/20"
            >
                {/* Header with Logo and Close Button */}
                <div className="relative overflow-hidden">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />

                    <SheetHeader className="relative px-6 pt-8 pb-6 border-b border-primary/10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {/* Logo */}
                                <div className="relative h-14 w-14 flex-shrink-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-2 shadow-lg">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src="https://anmolsweets.se/wp-content/uploads/2021/01/logo.png"
                                            alt="Anmol Sweets"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Brand Name */}
                                <div className="flex flex-col justify-center">
                                    <span className="font-heading text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent leading-none">
                                        Anmol Sweets
                                    </span>
                                    <span className="font-heading text-[0.8rem] font-medium text-primary uppercase tracking-[0.37em] leading-[1.0] mt-1">
                                        & Restaurant
                                    </span>
                                </div>
                            </div>
                        </div>
                    </SheetHeader>
                </div>

                {/* Navigation Menu */}
                <nav className="flex flex-col gap-1 px-4 py-6 overflow-y-auto max-h-[calc(100vh-280px)]">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="group relative flex items-center gap-4 px-4 py-3.5 rounded-xl text-foreground hover:text-primary transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                                style={{
                                    animationDelay: `${index * 50}ms`,
                                }}
                            >
                                {/* Icon with gradient background */}
                                <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                                    <Icon className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                                </div>

                                {/* Label */}
                                <span className="text-base font-medium tracking-wide">
                                    {item.label}
                                </span>

                                {/* Hover indicator */}
                                <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer with Contact Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent border-t border-primary/10">
                    {/* Phone Button */}
                    <a
                        href="tel:+4688866679"
                        className="flex items-center justify-center gap-3 w-full px-5 py-4 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mb-3 group"
                    >
                        <div className="p-2 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors duration-300">
                            <Phone className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                        </div>
                        <span className="text-base tracking-wide">+46 8 88 66 79</span>
                    </a>

                    {/* Social Media Links */}
                    <div className="flex items-center justify-center gap-3 mb-3">
                        {brandConfig.social.facebook && (
                            <a
                                href={brandConfig.social.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 transition-all duration-300 hover:scale-110 group"
                            >
                                <Facebook className="h-4.5 w-4.5 text-primary group-hover:scale-110 transition-transform duration-300" />
                            </a>
                        )}
                        {brandConfig.social.instagram && (
                            <a
                                href={brandConfig.social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 transition-all duration-300 hover:scale-110 group"
                            >
                                <Instagram className="h-4.5 w-4.5 text-primary group-hover:scale-110 transition-transform duration-300" />
                            </a>
                        )}
                        {brandConfig.social.tiktok && (
                            <a
                                href={brandConfig.social.tiktok}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 transition-all duration-300 hover:scale-110 group"
                            >
                                <svg className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                                </svg>
                            </a>
                        )}
                        {brandConfig.social.youtube && (
                            <a
                                href={brandConfig.social.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 transition-all duration-300 hover:scale-110 group"
                            >
                                <Youtube className="h-4.5 w-4.5 text-primary group-hover:scale-110 transition-transform duration-300" />
                            </a>
                        )}
                        {brandConfig.social.twitter && (
                            <a
                                href={brandConfig.social.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 transition-all duration-300 hover:scale-110 group"
                            >
                                <Twitter className="h-4.5 w-4.5 text-primary group-hover:scale-110 transition-transform duration-300" />
                            </a>
                        )}
                    </div>

                    {/* Quick Info */}
                    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                        <a
                            href={brandConfig.contact.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 hover:text-primary transition-colors duration-300"
                        >
                            <MapPin className="h-3.5 w-3.5 text-primary" />
                            <span>Stockholm</span>
                        </a>
                        <div className="w-1 h-1 rounded-full bg-primary/30" />
                        <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-primary" />
                            <span>Open Daily</span>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
