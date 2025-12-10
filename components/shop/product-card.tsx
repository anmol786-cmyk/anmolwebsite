'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types/woocommerce';
import { formatPrice, getDiscountPercentage, getVariableProductPrice, hasVariations } from '@/lib/woocommerce';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Plus } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { cn, decodeHtmlEntities } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const discount = getDiscountPercentage(product);
  const { addItem, openCart } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // For variable products, redirect to product page to select variation
    if (hasVariations(product)) {
      window.location.href = `/${product.slug}`;
      return;
    }

    setIsAdding(true);

    // Add item to cart without opening the cart sidebar
    // Cart will only open when user clicks the cart icon in header
    addItem(product);

    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={cn("group relative h-full", className)}
    >
      <Link href={`/${product.slug}`} className="block h-full">
        <article className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">

          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/50 to-muted/20 backdrop-blur-sm">
            {product.images && product.images.length > 0 && !imageError ? (
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt || product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                priority={false}
                loading="lazy"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-muted/30">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ShoppingBag className="h-8 w-8 opacity-50" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">Image not available</span>
                </div>
              </div>
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Quick Add Button (Desktop: Hover) */}
            <div className="absolute bottom-3 right-3 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-10">
              <Button
                size="icon"
                className="h-11 w-11 rounded-full bg-primary/80 backdrop-blur-xl text-primary-foreground shadow-[0_8px_24px_0_rgba(0,0,0,0.3)] border-2 border-white/50 hover:bg-primary/90 hover:scale-110 hover:shadow-[0_8px_32px_0_rgba(var(--primary),0.4)] transition-all"
                onClick={handleAddToCart}
                disabled={product.stock_status === 'outofstock' || isAdding}
              >
                {isAdding ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Plus className="h-5 w-5" />
                )}
                <span className="sr-only">Add to cart</span>
              </Button>
            </div>

            {/* Badges */}
            <div className="absolute left-3 top-3 flex flex-col gap-2 z-10">
              {product.featured && (
                <Badge className="border-2 border-white/50 bg-secondary/70 text-secondary-foreground shadow-[0_8px_16px_0_rgba(0,0,0,0.2)] backdrop-blur-xl">
                  <Star className="mr-1 h-3 w-3 fill-current" /> Featured
                </Badge>
              )}
              {product.on_sale && discount > 0 && (
                <Badge className="border-2 border-white/50 bg-primary/80 text-primary-foreground shadow-[0_8px_16px_0_rgba(0,0,0,0.2)] backdrop-blur-xl font-semibold">
                  -{discount}%
                </Badge>
              )}
              {product.stock_status === 'outofstock' && (
                <Badge variant="secondary" className="border-2 border-white/50 bg-muted-foreground/70 text-white backdrop-blur-xl shadow-[0_8px_16px_0_rgba(0,0,0,0.2)]">
                  Sold Out
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="relative flex flex-1 flex-col p-4 bg-gradient-to-t from-white/40 via-white/20 to-transparent dark:from-gray-900/60 dark:via-gray-900/40 dark:to-transparent backdrop-blur-xl border-t border-white/30 dark:border-white/10 before:absolute before:inset-0 before:bg-gradient-to-t before:from-blue-500/5 before:via-transparent before:to-transparent before:pointer-events-none">
            {/* Category */}
            {product.categories && product.categories.length > 0 && (
              <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-primary">
                {decodeHtmlEntities(product.categories[0].name)}
              </p>
            )}

            {/* Name */}
            <h3 className="mb-2 line-clamp-2 font-heading text-base font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
              {decodeHtmlEntities(product.name)}
            </h3>

            {/* Description (Optional) */}
            {product.short_description && (
              <p className="mb-3 line-clamp-2 text-xs text-muted-foreground">
                {decodeHtmlEntities(product.short_description.replace(/<[^>]*>/g, ''))}
              </p>
            )}

            <div className="mt-auto flex items-center justify-between gap-2 pt-3 border-t-2 border-white/40 dark:border-white/20">
              {/* Price */}
              <div className="flex flex-col">
                {product.on_sale && product.sale_price && product.sale_price !== '' ? (
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(product.sale_price, 'SEK')}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      {formatPrice(product.regular_price, 'SEK')}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    {hasVariations(product) && product.price && parseFloat(String(product.price)) > 0 && (
                      <span className="text-xs text-muted-foreground">From</span>
                    )}
                    <span className="text-lg font-bold text-foreground">
                      {(() => {
                        const priceValue = product.price ? String(product.price) : '0';
                        return formatPrice(priceValue, 'SEK');
                      })()}
                    </span>
                  </div>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button
                size="sm"
                className="shrink-0 h-8 px-3 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleAddToCart}
                disabled={product.stock_status === 'outofstock' || isAdding}
              >
                {isAdding ? (
                  <>
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span className="ml-1.5">Adding...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span className="ml-1.5">{hasVariations(product) ? 'Select' : 'Add'}</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
