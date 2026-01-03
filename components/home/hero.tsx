'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, UtensilsCrossed, ShoppingBag } from "lucide-react";
import Link from "next/link";

interface HeroProps {
    title?: string;
    subtitle?: string;
    badge?: string;
}

export function Hero({
    title = "Taste the Authentic Tradition",
    subtitle = "Experience the authentic flavors of Pakistan & India in the heart of Stockholm. Freshly prepared, halal-certified, and served with love.",
    badge = "Stockholm's #1 Sweets & Restaurant"
}: HeroProps) {
    return (
        <section className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                    style={{
                        filter: 'brightness(0.85)',
                    }}
                >
                    <source src="https://anmolsweets.se/wp-content/uploads/2025/12/Anmol-Sweets-Restaurant-Stockholm.webm" type="video/webm" />
                </video>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />
            </div>

            <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-5xl mx-auto space-y-6">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-2"
                >
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    {badge}
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-white text-3xl md:text-5xl font-bold leading-tight tracking-tight"
                >
                    Authentic Indo-Pakistani <br className="hidden md:block" /> Cuisine in Stockholm
                    <span className="block mt-2 italic font-light text-white/90 text-2xl md:text-4xl">
                        {title}
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-white/80 text-base font-light max-w-xl mx-auto leading-relaxed pt-4"
                >
                    {subtitle}
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 pt-6"
                >
                    <Button
                        size="default"
                        className="bg-primary hover:bg-primary/90 text-white border-none rounded-full px-8 h-11 text-base font-semibold transition-transform hover:scale-105"
                        asChild
                    >
                        <Link href="/shop">
                            <ShoppingBag className="mr-2 w-4 h-4" />
                            Order Online
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="default"
                        className="bg-white/10 backdrop-blur-md border-white/40 text-white hover:bg-white hover:text-primary hover:border-white rounded-full px-8 h-11 text-base font-semibold transition-all hover:scale-105"
                        asChild
                    >
                        <Link href="/menu">
                            View Menu
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="flex flex-wrap items-center justify-center gap-6 pt-2 text-white/80 text-sm font-medium tracking-wide"
                >
                    <span>100% Halal Certified</span>
                    <span className="hidden sm:inline opacity-50">•</span>
                    <span>Fresh Daily</span>
                    <span className="hidden sm:inline opacity-50">•</span>
                    <span>10+ Years Experience</span>
                </motion.div>
            </div>
        </section>
    );
}
