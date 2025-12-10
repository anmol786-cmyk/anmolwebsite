
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { formatPrice, getVariableProductPrice, hasVariations } from '@/lib/woocommerce';
import { decodeHtmlEntities } from '@/lib/utils';
import { Leaf, Flame, Plus, Check, ChevronRight } from 'lucide-react';
import type { Product } from '@/types/woocommerce';
import { useCartStore } from '@/store/cart-store';

interface MenuItemProps {
    product: Product;
    variant?: 'default' | 'compact';
}

/**
 * Classic Restaurant Menu Item
 * Elegant layout: Dish name | dots | price | add button
 * With description below
 */
export function MenuItem({ product, variant = 'default' }: MenuItemProps) {
    const { addItem } = useCartStore();
    const [isAdding, setIsAdding] = useState(false);
    const [justAdded, setJustAdded] = useState(false);

    const isVegetarian = product.tags?.some(tag =>
        tag.name.toLowerCase().includes('vegetarian') ||
        tag.name.toLowerCase().includes('veg')
    );

    const isSpicy = product.tags?.some(tag =>
        tag.name.toLowerCase().includes('spicy') ||
        tag.name.toLowerCase().includes('hot')
    );

    const isVariable = hasVariations(product);
    const price = isVariable ? getVariableProductPrice(product) : product.price;
    const isInStock = product.stock_status === 'instock';

    // Strip HTML tags from description and decode entities
    const cleanDescription = product.short_description
        ? decodeHtmlEntities(product.short_description.replace(/<[^>]*>/g, '').trim())
        : '';

    // Decode product name
    const productName = decodeHtmlEntities(product.name);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // For variable products, redirect to product page
        if (isVariable) {
            window.location.href = `/${product.slug}`;
            return;
        }

        if (!isInStock) return;

        setIsAdding(true);
        addItem(product);

        setTimeout(() => {
            setIsAdding(false);
            setJustAdded(true);
            setTimeout(() => setJustAdded(false), 2000);
        }, 500);
    };

    return (
        <div className="group relative py-4 px-4 mb-3 rounded-lg bg-card shadow-sm hover:shadow-md transition-all duration-200">
            {/* Main Row: Name, dots, price, button */}
            <div className="flex items-start gap-2">
                {/* Dish Name & Badges */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {productName}
                        </h4>

                        {/* Dietary Badges - inline */}
                        {isVegetarian && (
                            <span className="inline-flex items-center text-[10px] text-green-600 dark:text-green-400">
                                <Leaf className="h-3 w-3" />
                            </span>
                        )}
                        {isSpicy && (
                            <span className="inline-flex items-center text-[10px] text-red-500">
                                <Flame className="h-3 w-3" />
                            </span>
                        )}
                        {product.featured && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-secondary/10 text-secondary rounded-sm font-medium">
                                Popular
                            </span>
                        )}
                    </div>
                </div>

                {/* Dotted Line */}
                <div className="flex-grow min-w-8 border-b border-dotted border-muted-foreground/30 self-center mb-1" />

                {/* Price */}
                <div className="flex items-baseline gap-1 shrink-0">
                    {product.on_sale && product.sale_price ? (
                        <>
                            <span className="text-xs text-muted-foreground line-through">
                                {formatPrice(product.regular_price, 'SEK')}
                            </span>
                            <span className="font-semibold text-primary">
                                {formatPrice(product.sale_price, 'SEK')}
                            </span>
                        </>
                    ) : (
                        <>
                            {isVariable && parseFloat(price || '0') > 0 && (
                                <span className="text-xs text-muted-foreground">from</span>
                            )}
                            <span className="font-semibold text-foreground">
                                {parseFloat(price || '0') > 0
                                    ? formatPrice(price, 'SEK')
                                    : isVariable ? 'Select' : '—'
                                }
                            </span>
                        </>
                    )}
                </div>

                {/* Add Button */}
                <div className="shrink-0 ml-2">
                    {isInStock ? (
                        <Button
                            size="icon"
                            variant={justAdded ? "default" : "outline"}
                            className={`
                                h-7 w-7 rounded-full transition-all
                                ${justAdded
                                    ? 'bg-green-500 hover:bg-green-600 border-green-500 text-white'
                                    : 'hover:bg-primary hover:text-primary-foreground hover:border-primary'
                                }
                            `}
                            onClick={handleAddToCart}
                            disabled={isAdding}
                        >
                            {isAdding ? (
                                <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            ) : justAdded ? (
                                <Check className="h-3.5 w-3.5" />
                            ) : isVariable ? (
                                <ChevronRight className="h-3.5 w-3.5" />
                            ) : (
                                <Plus className="h-3.5 w-3.5" />
                            )}
                        </Button>
                    ) : (
                        <span className="text-[10px] text-muted-foreground px-2 py-1 bg-muted rounded">
                            Sold out
                        </span>
                    )}
                </div>
            </div>

            {/* Description */}
            {cleanDescription && (
                <p className="mt-1 text-xs text-muted-foreground line-clamp-1 pr-16">
                    {cleanDescription}
                </p>
            )}
        </div>
    );
}

/**
 * Menu Item for compact list view (no description)
 */
export function MenuItemCompact({ product }: { product: Product }) {
    return <MenuItem product={product} variant="compact" />;
}
