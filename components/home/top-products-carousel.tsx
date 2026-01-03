'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { formatPrice, hasVariations } from '@/lib/woocommerce';
import { cn } from '@/lib/utils';
import { ArrowRight, Check, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart-store';
import type { Product } from '@/types/woocommerce';

interface TopProductsCarouselProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export function TopProductsCarousel({ products, title = "Anmol Sweets & Restaurant", subtitle = "Explore our most loved authentic Pakistani & Indian specialties, prepared fresh daily." }: TopProductsCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Calculate total width of all items
  useEffect(() => {
    if (containerRef.current) {
      const itemWidth = 280; // Slightly smaller cards
      const gap = 32; // More breathing room
      const totalWidth = products.length * (itemWidth + gap);
      setContainerWidth(totalWidth);
    }
  }, [products]);

  // Continuous auto-scroll animation
  useAnimationFrame((t, delta) => {
    if (isPaused || containerWidth === 0) return;
    const speed = 0.4; // Slightly slower, more elegant scroll
    const newX = x.get() - speed;

    if (Math.abs(newX) >= containerWidth / 2) {
      x.set(0);
    } else {
      x.set(newX);
    }
  });

  if (products.length === 0) return null;

  const duplicatedProducts = [...products, ...products];

  return (
    <section className="w-full py-24 bg-background border-t border-border/40">
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            {subtitle}
          </p>
        </div>
      </div>

      <div
        className="relative overflow-hidden w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >


        <motion.div
          ref={containerRef}
          style={{ x }}
          className="flex gap-8 px-8"
        >
          {duplicatedProducts.map((product, index) => (
            <ProductCard key={`${product.id}-${index}`} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}



function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false); // Success state
  const { addItem } = useCartStore();
  const imageUrl = product.images?.[0]?.src || '/placeholder-food.jpg';
  const cleanName = product.name.replace(/<[^>]*>/g, '').trim();
  const isVariable = hasVariations(product);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // For variable products, redirect to product page to select variation
    if (isVariable) {
      window.location.href = `/${product.slug}`;
      return;
    }

    setIsAdding(true);
    addItem(product);

    // Show success checkmark briefly
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }, 600);
  };

  return (
    <motion.div
      className="w-[280px] flex-shrink-0 group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full h-[340px] rounded-2xl overflow-hidden bg-muted mb-4 shadow-sm group-hover:shadow-md transition-all duration-300">
        <Link href={`/${product.slug}`} className="block w-full h-full">
          <Image
            src={imageUrl}
            alt={cleanName}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="280px"
          />
        </Link>

        {/* Minimal Sale Badge */}
        {product.on_sale && (
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              Sale
            </span>
          </div>
        )}

        {/* Action Button: Add to Cart or View Options */}
        <div className="absolute bottom-3 right-3 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-20">
          <Button
            type="button"
            size="icon"
            className={cn(
              "h-11 w-11 rounded-full backdrop-blur-xl shadow-[0_8px_24px_0_rgba(0,0,0,0.3)] border-2 border-white/50 transition-all cursor-pointer",
              isAdded ? "bg-green-500 text-white hover:bg-green-600 border-green-400" : "bg-primary/80 text-primary-foreground hover:bg-primary/90 hover:scale-110 hover:shadow-[0_8px_32px_0_rgba(var(--primary),0.4)]"
            )}
            onClick={handleAddToCart}
            disabled={product.stock_status === 'outofstock' || isAdding}
          >
            {isAdding ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : isAdded ? (
              <Check className="h-5 w-5" />
            ) : isVariable ? (
              <ArrowRight className="h-5 w-5" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
            <span className="sr-only">{isVariable ? 'Select Options' : 'Add to cart'}</span>
          </Button>
        </div>
      </div>

      <div className="space-y-2 text-center">
        <Link href={`/${product.slug}`} className="block">
          <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {cleanName}
          </h3>
        </Link>

        <div className="flex items-center justify-center gap-2">
          {product.on_sale && product.sale_price ? (
            <>
              <span className="text-base font-bold text-primary">
                {formatPrice(product.sale_price, 'SEK')}
              </span>
              <span className="text-sm text-muted-foreground line-through decoration-red-500/30">
                {formatPrice(product.regular_price, 'SEK')}
              </span>
            </>
          ) : (
            <span className="text-base font-bold text-primary">
              {formatPrice(product.price, 'SEK')}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
