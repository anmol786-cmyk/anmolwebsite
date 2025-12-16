'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronDown, Filter, X, ArrowUpDown } from 'lucide-react';
import { cn, decodeHtmlEntities } from '@/lib/utils';
import type { ProductCategoryFull } from '@/types/woocommerce';
import { useDebounce } from 'use-debounce';

// Helper to build category tree
type CategoryWithChildren = ProductCategoryFull & {
    children: CategoryWithChildren[];
};

function buildCategoryTree(categories: ProductCategoryFull[]): CategoryWithChildren[] {
    const categoryMap = new Map<number, CategoryWithChildren>();
    categories.forEach((cat) => {
        categoryMap.set(cat.id, { ...cat, children: [] });
    });
    const rootCategories: CategoryWithChildren[] = [];
    categories.forEach((cat) => {
        const current = categoryMap.get(cat.id)!;
        if (cat.parent === 0) {
            rootCategories.push(current);
        } else {
            const parent = categoryMap.get(cat.parent);
            if (parent) parent.children.push(current);
            else rootCategories.push(current); // Fallback
        }
    });
    return rootCategories;
}

interface ShopTopBarProps {
    categories: ProductCategoryFull[];
    totalProducts: number;
    className?: string;
}

export function ShopTopBar({ categories, totalProducts, className }: ShopTopBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams?.get('search') || '');
    const [isOpen, setIsOpen] = useState(false); // For mobile filters if needed

    // Debounce search update
    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams?.toString() || '');
            if (searchQuery) {
                params.set('search', searchQuery);
            } else {
                params.delete('search');
            }
            params.delete('page'); // Reset pagination when search changes
            router.push(`?${params.toString()}`);
        }, 500);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery, router]); // Intentionally exclude searchParams to avoid infinite loop

    // Handle Sort
    const handleSort = (value: string) => {
        const params = new URLSearchParams(searchParams?.toString() || '');
        params.set('orderby', value);
        router.push(`?${params.toString()}`);
    };

    // Handle Category Click
    const handleCategoryClick = (slug: string) => {
        const params = new URLSearchParams(searchParams?.toString() || '');
        params.set('category', slug);
        params.delete('page');
        router.push(`?${params.toString()}`);
    };

    // Organize Categories
    const categoryTree = useMemo(() => buildCategoryTree(categories), [categories]);

    // Identify specific groups
    const sweetsCategory = categoryTree.find(c => c.name.toLowerCase().includes('sweets') || c.slug.includes('sweets'));
    const groceryCategory = categoryTree.find(c => c.name.toLowerCase().includes('grocery') || c.slug.includes('grocery'));
    const bakeryCategory = categoryTree.find(c => c.name.toLowerCase().includes('bakery') || c.slug.includes('bakery'));

    // "Restaurant Food" is everything else (excluding Sweets, Grocery, and Bakery)
    const restaurantCategories = categoryTree.filter(c =>
        c.id !== sweetsCategory?.id &&
        c.id !== groceryCategory?.id &&
        c.id !== bakeryCategory?.id &&
        !c.name.toLowerCase().includes('uncategorized')
    );

    return (
        <div className={cn("w-full space-y-4 mb-8", className)}>
            {/* Glassmorphism Filter Container */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-card/30 dark:bg-neutral-900/30 backdrop-blur-lg p-4 rounded-xl border border-white/20 dark:border-white/10 shadow-lg">

                {/* Left: Category Filters (Collapsible/Dropdowns) */}
                <div className="flex flex-wrap gap-2 w-full lg:w-auto">

                    {/* Restaurant Food Dropdown (Multi-column) */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="h-10 px-4 gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary">
                                Restaurant Food <ChevronDown className="h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[600px] p-6" align="start">
                            <div className="grid grid-cols-3 gap-6">
                                {restaurantCategories.map((cat) => (
                                    <div key={cat.id} className="space-y-2">
                                        <h4
                                            className="font-medium text-primary cursor-pointer hover:underline"
                                            onClick={() => handleCategoryClick(cat.slug)}
                                        >
                                            {decodeHtmlEntities(cat.name)}
                                        </h4>
                                        {cat.children.length > 0 && (
                                            <ul className="space-y-1">
                                                {cat.children.map((child) => (
                                                    <li key={child.id}>
                                                        <button
                                                            onClick={() => handleCategoryClick(child.slug)}
                                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                                                        >
                                                            {decodeHtmlEntities(child.name)}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Sweets Dropdown */}
                    {sweetsCategory && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-10 px-4 gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary">
                                    {decodeHtmlEntities(sweetsCategory.name)} <ChevronDown className="h-4 w-4 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-56">
                                <DropdownMenuItem onClick={() => handleCategoryClick(sweetsCategory.slug)} className="font-medium">
                                    All {decodeHtmlEntities(sweetsCategory.name)}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {sweetsCategory.children.map((child) => (
                                    <DropdownMenuItem key={child.id} onClick={() => handleCategoryClick(child.slug)}>
                                        {decodeHtmlEntities(child.name)}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    {/* Grocery Dropdown */}
                    {groceryCategory && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-10 px-4 gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary">
                                    {decodeHtmlEntities(groceryCategory.name)} <ChevronDown className="h-4 w-4 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-56">
                                <DropdownMenuItem onClick={() => handleCategoryClick(groceryCategory.slug)} className="font-medium">
                                    All {decodeHtmlEntities(groceryCategory.name)}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {groceryCategory.children.map((child) => (
                                    <DropdownMenuItem key={child.id} onClick={() => handleCategoryClick(child.slug)}>
                                        {decodeHtmlEntities(child.name)}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    {/* Bakery Dropdown */}
                    {bakeryCategory && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-10 px-4 gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary">
                                    {decodeHtmlEntities(bakeryCategory.name)} <ChevronDown className="h-4 w-4 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-56">
                                <DropdownMenuItem onClick={() => handleCategoryClick(bakeryCategory.slug)} className="font-medium">
                                    All {decodeHtmlEntities(bakeryCategory.name)}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {bakeryCategory.children.map((child) => (
                                    <DropdownMenuItem key={child.id} onClick={() => handleCategoryClick(child.slug)}>
                                        {decodeHtmlEntities(child.name)}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>

                {/* Center/Right: Search Bar + Sort (Inline on Mobile) */}
                <div className="flex items-center gap-2 w-full lg:flex-1">
                    {/* Search Bar - Smaller on Mobile */}
                    <div className="flex-1 lg:max-w-md relative">
                        <Search className="absolute left-2 lg:left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 lg:h-4 lg:w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-7 lg:pl-9 h-8 lg:h-10 text-sm bg-background/50 border-primary/10 focus:border-primary/30 transition-all"
                        />
                    </div>

                    {/* Sort Filter - Inline on Mobile */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="gap-1.5 lg:gap-2 text-muted-foreground hover:text-foreground h-8 lg:h-10 px-2 lg:px-3">
                                <ArrowUpDown className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                                <span className="hidden sm:inline">Sort</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleSort('date')}>Newest</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSort('popularity')}>Popularity</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSort('price')}>Price: Low to High</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSort('price-desc')}>Price: High to Low</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Active Filters Display (Optional, can be added if needed) */}
            {searchParams?.get('category') && (
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Active Category:</span>
                    <Badge variant="secondary" className="gap-1">
                        {categories.find(c => c.slug === searchParams.get('category'))?.name || searchParams.get('category')}
                        <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => {
                                const params = new URLSearchParams(searchParams?.toString() || '');
                                params.delete('category');
                                router.push(`?${params.toString()}`);
                            }}
                        />
                    </Badge>
                </div>
            )}
        </div>
    );
}
