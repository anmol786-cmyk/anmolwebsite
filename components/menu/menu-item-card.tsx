import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { AddToCartButton } from '@/components/shop/add-to-cart-button';
import { formatPrice, getDiscountPercentage } from '@/lib/woocommerce';
import type { Product } from '@/types/woocommerce';
import { Leaf, Flame } from 'lucide-react';

interface MenuItemCardProps {
  item: Product;
  showAddToCart?: boolean;
}

export function MenuItemCard({ item, showAddToCart = true }: MenuItemCardProps) {
  const discount = getDiscountPercentage(item);

  // Extract dietary badges from tags or attributes
  const getDietaryBadges = () => {
    const badges = [];
    if (item.tags) {
      const tagNames = item.tags.map((tag) => tag.name.toLowerCase());
      if (tagNames.includes('vegetarian') || tagNames.includes('veg')) {
        badges.push({ label: 'Vegetarian', icon: Leaf, color: 'bg-green-500' });
      }
      if (tagNames.includes('vegan')) {
        badges.push({ label: 'Vegan', icon: Leaf, color: 'bg-green-600' });
      }
      if (tagNames.includes('spicy') || tagNames.includes('hot')) {
        badges.push({ label: 'Spicy', icon: Flame, color: 'bg-red-500' });
      }
    }
    return badges;
  };

  const dietaryBadges = getDietaryBadges();

  return (
    <div className="group overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-lg">
      {/* Image */}
      <Link href={`/shop/${item.slug}`} className="block overflow-hidden">
        <div className="relative aspect-[4/3] bg-muted">
          {item.images && item.images.length > 0 ? (
            <Image
              src={item.images[0].src}
              alt={item.images[0].alt || item.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}

          {/* Sale Badge */}
          {item.on_sale && discount > 0 && (
            <div className="absolute left-3 top-3">
              <Badge variant="destructive" className="text-sm">
                -{discount}%
              </Badge>
            </div>
          )}

          {/* Dietary Badges */}
          {dietaryBadges.length > 0 && (
            <div className="absolute right-3 top-3 flex gap-1">
              {dietaryBadges.map((badge) => (
                <div
                  key={badge.label}
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${badge.color} text-white`}
                  title={badge.label}
                >
                  <badge.icon className="h-4 w-4" />
                </div>
              ))}
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        {item.categories && item.categories.length > 0 && (
          <Badge variant="secondary" className="mb-2 text-xs">
            {item.categories[0].name}
          </Badge>
        )}

        {/* Title */}
        <Link href={`/shop/${item.slug}`}>
          <h3 className="mb-2 line-clamp-2 font-semibold transition-colors hover:text-primary">
            {item.name}
          </h3>
        </Link>

        {/* Description */}
        {item.short_description && (
          <div
            className="prose prose-sm mb-3 line-clamp-2 max-w-none text-sm text-muted-foreground dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: item.short_description }}
          />
        )}

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            {item.on_sale ? (
              <>
                <span className="text-lg font-bold text-primary">
                  {formatPrice(item.sale_price, 'SEK')}
                </span>
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(item.regular_price, 'SEK')}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">
                {formatPrice(item.price, 'SEK')}
              </span>
            )}
          </div>

          {showAddToCart && (
            <AddToCartButton product={item} size="sm" className="shrink-0" />
          )}
        </div>
      </div>
    </div>
  );
}
