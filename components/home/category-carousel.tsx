'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface Category {
    id: number;
    name: string;
    slug: string;
    image?: {
        src: string;
        alt: string;
    };
    count?: number;
}

interface CategoryCarouselProps {
    categories: Category[];
}

export function CategoryCarousel({ categories }: CategoryCarouselProps) {
    // Define the ordered slugs/names to match the requested order
    const orderedKeys = ['sweets', 'breakfast', 'starters', 'main-course', 'bakery', 'grocery'];

    // Map and sort categories based on the requested order
    const sortedCategories = orderedKeys.map(key => {
        return categories.find(cat =>
            cat.slug.toLowerCase().includes(key) ||
            cat.name.toLowerCase().includes(key)
        );
    }).filter((cat): cat is Category => !!cat);

    if (sortedCategories.length === 0) return null;

    return (
        <section className="relative w-full pb-12 z-30 -mt-24 md:-mt-32 pointer-events-none">
            <div className="container px-4 md:px-6 relative z-10 pointer-events-auto">
                <div
                    className="flex overflow-x-auto md:flex-wrap md:justify-center gap-4 md:gap-6 pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {sortedCategories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 + (index * 0.1), ease: "backOut" }}
                            className="flex-shrink-0 snap-center"
                        >
                            <Link href={`/shop?category=${category.slug}`} className="group block">
                                {/* Split Card Design: Top White/Image, Bottom Red */}
                                <div className="relative w-[140px] md:w-[170px] h-[180px] md:h-[220px] flex flex-col overflow-hidden rounded-xl bg-white shadow-xl hover:shadow-2xl hover:shadow-red-900/20 transition-all duration-500 group-hover:-translate-y-2 border border-neutral-100">

                                    {/* Image Area (Top ~75%) */}
                                    <div className="relative h-[78%] w-full flex items-center justify-center overflow-hidden bg-white">
                                        {category.image ? (
                                            <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-110">
                                                <Image
                                                    src={category.image.src}
                                                    alt={category.image.alt || category.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 140px, 180px"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-neutral-200">
                                                <span className="text-xs">No Image</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Title Area (Bottom ~22%) - Red */}
                                    <div className="relative h-[22%] w-full bg-[#cf1726] flex items-center justify-center overflow-hidden">
                                        {/* Subtle gradient for depth */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                                        <h3 className="text-white font-bold text-center uppercase tracking-wider text-xs md:text-sm truncate px-2 relative z-10 group-hover:scale-105 transition-transform">
                                            {category.name}
                                        </h3>
                                    </div>

                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
