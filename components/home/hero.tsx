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
        <section className="relative w-full h-screen flex items-end justify-center overflow-hidden pb-20">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        filter: 'brightness(0.85)', // Slightly clearer video
                    }}
                >
                    <source src="https://anmolsweets.se/wp-content/uploads/2025/12/Anmol-Sweets-Restaurant-Stockholm.webm" type="video/webm" />
                </video>

                {/* Clean minimal overlay for text legibility */}
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center space-y-8">

                {/* Minimal Static Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full"
                >
                    <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                    <span className="text-primary font-bold text-xs tracking-wider uppercase">{badge}</span>
                </motion.div>

                {/* Main Heading - Clean White Text */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight tracking-tight max-w-5xl"
                >
                    Authentic Indo-Pakistani Cuisine in Stockholm
                    <span className="block mt-4 text-white/90 italic font-serif text-3xl md:text-5xl lg:text-6xl">
                        {title}
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-base md:text-xl text-white/90 max-w-2xl leading-relaxed font-light"
                >
                    {subtitle}
                </motion.p>

                {/* Clean Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 pt-6"
                >
                    <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-white border-none rounded-full px-10 h-14 text-lg font-semibold transition-transform hover:scale-105"
                        asChild
                    >
                        <Link href="/shop">
                            <ShoppingBag className="mr-2 w-5 h-5" />
                            Order Online
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="bg-white/10 backdrop-blur-md border-white/40 text-white hover:bg-white hover:text-primary hover:border-white rounded-full px-10 h-14 text-lg font-semibold transition-all hover:scale-105"
                        asChild
                    >
                        <Link href="/menu">
                            View Menu
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </Button>
                </motion.div>

                {/* Minimal Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="flex flex-wrap items-center justify-center gap-6 pt-6 text-white/80 text-sm font-medium tracking-wide"
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
