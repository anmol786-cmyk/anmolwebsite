'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface MenuNavigationProps {
    categories: Category[];
}

export function MenuNavigation({ categories }: MenuNavigationProps) {
    const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.slug || '');

    useEffect(() => {
        const handleScroll = () => {
            // Find which category section is currently in view
            const sections = categories.map((cat) => document.getElementById(cat.slug));

            let current = '';
            for (const section of sections) {
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        current = section.id;
                        break;
                    }
                }
            }

            if (current) {
                setActiveCategory(current);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [categories]);

    const scrollToCategory = (slug: string) => {
        const element = document.getElementById(slug);
        if (element) {
            const offset = 100; // Height of sticky header + nav
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
            setActiveCategory(slug);
        }
    };

    return (
        <div className="sticky top-[110px] md:top-[130px] xl:top-[145px] z-40 w-full border-b border-border/20 bg-background backdrop-blur-md shadow-sm">
            <div className="container mx-auto overflow-x-auto max-w-[1400px]">
                <div className="flex min-w-max items-center gap-3 py-4 px-4">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => scrollToCategory(category.slug)}
                            className={cn(
                                'rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 whitespace-nowrap border',
                                activeCategory === category.slug
                                    ? 'bg-primary text-background shadow-lg hover:bg-primary/90 border-primary'
                                    : 'bg-background text-foreground hover:bg-primary hover:text-background border-border/30 hover:border-primary'
                            )}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
