'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Phone, MapPin, Clock, ArrowRight, ChevronRight } from 'lucide-react';

/**
 * MenuPageLayout - A global reusable layout component for all menu pages
 * Provides consistent structure, SEO-optimized markup, and modern professional design
 */

interface MenuPageLayoutProps {
    /** Main page title */
    title: string;
    /** Subtitle or description */
    subtitle?: string;
    /** Hero background image URL */
    heroImage?: string;
    /** Badge text (e.g., "Daily Special", "Lunch Buffet") */
    badgeText?: string;
    /** Pricing information */
    pricing?: {
        main: string;
        description?: string;
        secondary?: { label: string; price: string }[];
    };
    /** Operating hours */
    hours?: { days: string; time: string }[];
    /** Breadcrumb items */
    breadcrumbs?: { label: string; href: string }[];
    /** Quick info cards */
    quickInfo?: { icon: ReactNode; label: string; value: string }[];
    /** Children content */
    children: ReactNode;
    /** CTA section at bottom */
    ctaSection?: {
        title: string;
        description: string;
        primaryAction?: { label: string; href: string };
        secondaryAction?: { label: string; href: string };
    };
}

export function MenuPageLayout({
    title,
    subtitle,
    heroImage,
    badgeText,
    pricing,
    hours,
    breadcrumbs,
    quickInfo,
    children,
    ctaSection,
}: MenuPageLayoutProps) {
    return (
        <main className="min-h-screen bg-background">
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <nav className="bg-muted/30" aria-label="Breadcrumb">
                    <div className="container mx-auto px-4 py-3 max-w-7xl">
                        <ol className="flex items-center gap-2 text-sm">
                            {breadcrumbs.map((item, index) => (
                                <li key={item.href} className="flex items-center gap-2">
                                    {index > 0 && (
                                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                    )}
                                    {index === breadcrumbs.length - 1 ? (
                                        <span className="font-medium text-foreground">{item.label}</span>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </div>
                </nav>
            )}

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
                <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23930606' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />

                <div className="container mx-auto px-4 py-12 md:py-20 max-w-7xl relative z-10">
                    <div className="grid gap-8 lg:gap-12 lg:grid-cols-5 items-center">
                        {/* Text Content */}
                        <motion.div
                            className="lg:col-span-3 space-y-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Badge */}
                            {badgeText && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1, duration: 0.3 }}
                                    className="inline-flex"
                                >
                                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full border border-primary/20">
                                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        {badgeText}
                                    </span>
                                </motion.div>
                            )}

                            {/* Title */}
                            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                                {title}
                            </h1>

                            {/* Subtitle */}
                            {subtitle && (
                                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                                    {subtitle}
                                </p>
                            )}

                            {/* Quick Info Cards */}
                            {quickInfo && quickInfo.length > 0 && (
                                <div className="flex flex-wrap gap-4 pt-4">
                                    {quickInfo.map((info, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
                                            className="flex items-center gap-3 px-4 py-3 bg-card rounded-xl shadow-sm transition-all duration-200 hover:shadow-md"
                                        >
                                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                                                {info.icon}
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{info.label}</p>
                                                <p className="text-sm font-semibold text-foreground">{info.value}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* Pricing */}
                            {pricing && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.3 }}
                                    className="flex flex-wrap items-baseline gap-4 pt-2"
                                >
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl md:text-5xl font-bold text-primary">{pricing.main}</span>
                                        {pricing.description && (
                                            <span className="text-muted-foreground">{pricing.description}</span>
                                        )}
                                    </div>
                                    {pricing.secondary && pricing.secondary.map((item, index) => (
                                        <div key={index} className="flex items-baseline gap-1 text-muted-foreground">
                                            <span className="text-sm">{item.label}:</span>
                                            <span className="font-semibold text-foreground">{item.price}</span>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Hero Image */}
                        {heroImage && (
                            <motion.div
                                className="lg:col-span-2"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <div className="relative aspect-[4/3] md:aspect-square overflow-hidden rounded-2xl shadow-2xl border-2 border-white/40 dark:border-white/20">
                                    <Image
                                        src={heroImage}
                                        alt={title}
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="(max-width: 768px) 100vw, 40vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                                    {/* Hours overlay */}
                                    {hours && hours.length > 0 && (
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/60 to-transparent">
                                            <div className="flex items-center gap-2 text-white">
                                                <Clock className="h-4 w-4" />
                                                <span className="font-medium text-sm">{hours[0].days}</span>
                                                <span className="text-white/80">|</span>
                                                <span className="font-bold">{hours[0].time}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="relative">
                <div className="container mx-auto px-4 py-12 md:py-16 max-w-7xl">
                    {children}
                </div>
            </section>

            {/* CTA Section */}
            {ctaSection && (
                <section className="relative py-16 overflow-hidden bg-gradient-to-r from-primary via-primary/95 to-primary/90">
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }} />

                    <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                            {ctaSection.title}
                        </h2>
                        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                            {ctaSection.description}
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {ctaSection.primaryAction && (
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    className="shadow-lg hover:shadow-xl transition-all"
                                    asChild
                                >
                                    <Link href={ctaSection.primaryAction.href}>
                                        {ctaSection.primaryAction.label}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            )}
                            {ctaSection.secondaryAction && (
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-white text-white hover:bg-white/10"
                                    asChild
                                >
                                    <Link href={ctaSection.secondaryAction.href}>
                                        {ctaSection.secondaryAction.label}
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}

/**
 * MenuSection - A reusable section component for organizing menu content
 */
interface MenuSectionProps {
    title: string;
    subtitle?: string;
    badge?: string;
    children: ReactNode;
    className?: string;
    id?: string;
}

export function MenuSection({ title, subtitle, badge, children, className, id }: MenuSectionProps) {
    return (
        <section id={id} className={cn("scroll-mt-24 mb-8 md:mb-12", className)}>
            <div className="mb-4 md:mb-6">
                {badge && (
                    <span className="inline-flex items-center px-3 py-1 mb-2 bg-muted/60 text-muted-foreground text-xs font-medium rounded-full">
                        {badge}
                    </span>
                )}
                <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">
                    {title}
                </h2>
                {subtitle && (
                    <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">
                        {subtitle}
                    </p>
                )}
                <div className="mt-3 h-0.5 w-12 rounded-full bg-primary/60" />
            </div>
            {children}
        </section>
    );
}

/**
 * MenuGrid - A responsive grid for menu items with modern scroll for overflow
 */
interface MenuGridProps {
    children: ReactNode;
    columns?: 2 | 3 | 4 | 5;
    scroll?: boolean;
    className?: string;
}

export function MenuGrid({ children, columns = 3, scroll = false, className }: MenuGridProps) {
    const gridCols = {
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    };

    if (scroll) {
        return (
            <div className={cn("relative -mx-4 px-4", className)}>
                <div className="overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20 pb-4">
                    <div className="flex gap-4 min-w-max">
                        {children}
                    </div>
                </div>
                {/* Fade edges indicator */}
                <div className="hidden md:block absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
                <div className="hidden md:block absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
            </div>
        );
    }

    return (
        <div className={cn("grid gap-4 md:gap-6", gridCols[columns], className)}>
            {children}
        </div>
    );
}

/**
 * MenuCard - A modern glass-morphism card for menu items matching the product cards
 */
interface MenuCardProps {
    title: string;
    subtitle?: string;
    description?: string;
    icon?: ReactNode;
    image?: string;
    badge?: string;
    price?: string;
    className?: string;
    onClick?: () => void;
    href?: string;
    featured?: boolean;
}

export function MenuCard({
    title,
    subtitle,
    description,
    icon,
    image,
    badge,
    price,
    className,
    onClick,
    href,
    featured = false,
}: MenuCardProps) {
    const content = (
        <article
            className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border-2 transition-all duration-500",
                "bg-gradient-to-br from-white/30 via-white/20 to-white/10",
                "dark:from-gray-900/40 dark:via-gray-900/30 dark:to-gray-900/20",
                "backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]",
                "hover:shadow-[0_8px_48px_0_rgba(var(--primary),0.15)] hover:-translate-y-1",
                featured ? "border-primary/40" : "border-white/40 dark:border-white/20",
                className
            )}
            onClick={onClick}
        >
            {/* Image */}
            {image && (
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badge */}
                    {badge && (
                        <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center px-3 py-1 bg-primary/80 text-primary-foreground text-xs font-semibold rounded-full backdrop-blur-sm border border-white/30 shadow-lg">
                                {badge}
                            </span>
                        </div>
                    )}
                </div>
            )}

            {/* Content */}
            <div className="flex-1 p-4 md:p-5 bg-gradient-to-t from-white/40 via-white/20 to-transparent dark:from-gray-900/60 dark:via-gray-900/40 dark:to-transparent">
                <div className="flex items-start gap-3">
                    {icon && (
                        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                            {icon}
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-heading text-base md:text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                            {title}
                        </h3>
                        {subtitle && (
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1 uppercase tracking-wider">
                                {subtitle}
                            </p>
                        )}
                    </div>
                    {price && (
                        <span className="flex-shrink-0 text-lg font-bold text-primary">
                            {price}
                        </span>
                    )}
                </div>

                {description && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {description}
                    </p>
                )}
            </div>
        </article>
    );

    if (href) {
        return <Link href={href}>{content}</Link>;
    }

    return content;
}

/**
 * DayMenuCard - Elegant restaurant-style daily menu card
 */
interface DayMenuCardProps {
    day: string;
    theme?: string;
    dishes: { name: string; description?: string }[];
    accentColor?: string;
    className?: string;
}

export function DayMenuCard({ day, theme, dishes, accentColor = 'from-primary/8 to-primary/3', className }: DayMenuCardProps) {
    return (
        <motion.article
            className={cn(
                "group flex flex-col overflow-hidden rounded-xl transition-all duration-300",
                "bg-card shadow-md hover:shadow-lg",
                "hover:-translate-y-1 w-[280px] md:w-[300px] flex-shrink-0",
                className
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
        >
            {/* Elegant Header with Enhanced Design */}
            <div className={cn("relative px-5 py-6 bg-gradient-to-br text-center", accentColor)}>
                {/* Decorative top accent */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-primary/30 rounded-b-full" />

                <h3 className="font-heading text-xl font-bold text-foreground tracking-tight mb-1">
                    {day}
                </h3>
                {theme && (
                    <p className="text-xs font-medium text-primary/80 italic">
                        {theme}
                    </p>
                )}

                {/* Decorative divider */}
                <div className="mt-3 mx-auto w-12 h-0.5 bg-primary/20 rounded-full" />
            </div>

            {/* Menu List with Better Spacing */}
            <div className="flex-1 px-5 py-4 space-y-3">
                {dishes.map((dish, index) => (
                    <div
                        key={index}
                        className="group/item pb-2.5 border-b border-dashed border-border/20 last:border-0 transition-colors hover:border-primary/30"
                    >
                        <p className="font-semibold text-sm text-foreground leading-snug mb-0.5 group-hover/item:text-primary transition-colors">
                            {dish.name}
                        </p>
                        {dish.description && (
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                {dish.description}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {/* Enhanced Footer */}
            <div className="px-5 py-3 bg-gradient-to-r from-muted/20 to-muted/10 border-t border-border/10">
                <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary/40" />
                    <p className="text-[10px] text-center text-muted-foreground font-semibold uppercase tracking-widest">
                        All Inclusive
                    </p>
                    <div className="w-2 h-2 rounded-full bg-primary/40" />
                </div>
            </div>
        </motion.article>
    );
}

/**
 * InfoCard - A compact info card for key information
 */
interface InfoCardProps {
    icon: ReactNode;
    title: string;
    value: string;
    description?: string;
    variant?: 'default' | 'highlight';
    className?: string;
}

export function InfoCard({ icon, title, value, description, variant = 'default', className }: InfoCardProps) {
    return (
        <div
            className={cn(
                "flex items-start gap-3 p-4 rounded-lg transition-all duration-200",
                "bg-card shadow-sm hover:shadow-md",
                className
            )}
        >
            <div className={cn(
                "flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg",
                variant === 'highlight' ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
            )}>
                {icon}
            </div>
            <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{title}</p>
                <p className="text-base font-bold text-foreground">{value}</p>
                {description && (
                    <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                )}
            </div>
        </div>
    );
}

/**
 * FeatureList - A clean list of features with icons
 */
interface FeatureListProps {
    features: { icon: ReactNode; text: string }[];
    columns?: 1 | 2 | 3;
    className?: string;
}

export function FeatureList({ features, columns = 2, className }: FeatureListProps) {
    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    };

    return (
        <ul className={cn("grid gap-2 md:gap-3", gridCols[columns], className)}>
            {features.map((feature, index) => (
                <li
                    key={index}
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-card shadow-sm hover:shadow-md transition-all duration-200"
                >
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
                        {feature.icon}
                    </div>
                    <p className="text-[13px] text-foreground leading-relaxed pt-1">{feature.text}</p>
                </li>
            ))}
        </ul>
    );
}

/**
 * PricingCard - Modern pricing card for menu pricing
 */
interface PricingCardProps {
    title: string;
    price: string;
    description?: string;
    features?: string[];
    highlighted?: boolean;
    icon?: ReactNode;
    className?: string;
}

export function PricingCard({ title, price, description, features, highlighted = false, icon, className }: PricingCardProps) {
    return (
        <div
            className={cn(
                "relative flex flex-col p-5 md:p-6 rounded-lg transition-all duration-200",
                "bg-card shadow-sm hover:shadow-md",
                highlighted ? "ring-2 ring-primary/20" : "",
                className
            )}
        >
            {highlighted && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-primary text-primary-foreground text-[10px] font-semibold rounded-full">
                    Popular
                </span>
            )}

            <div className="text-center mb-4">
                {icon && (
                    <div className="mx-auto mb-3 flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                        {icon}
                    </div>
                )}
                <h3 className="font-heading text-lg font-bold text-foreground mb-1">{title}</h3>
                <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl md:text-4xl font-bold text-primary">{price}</span>
                </div>
                {description && (
                    <p className="mt-1 text-xs text-muted-foreground">{description}</p>
                )}
            </div>

            {features && features.length > 0 && (
                <ul className="space-y-1.5">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-xs text-foreground">
                            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-primary/15 flex items-center justify-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            </span>
                            {feature}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
