'use client';

import { useState, useMemo } from 'react';
import { Section } from '@/components/craft';
import { Breadcrumbs, BreadcrumbItem } from '@/components/layout/breadcrumbs';
import { MenuFilters, MenuFilterState } from '@/components/menu/menu-filters';
import { MenuItemCard } from '@/components/menu/menu-item-card';
import type { Product } from '@/types/woocommerce';
import { cn } from '@/lib/utils';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface MenuTemplateProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  items: Product[];
  categories?: FilterOption[];
  dietaryOptions?: FilterOption[];
  priceRanges?: FilterOption[];
  showFilters?: boolean;
  columns?: 2 | 3 | 4;
}

export function MenuTemplate({
  title,
  description,
  breadcrumbs,
  items,
  categories = [],
  dietaryOptions = [],
  priceRanges = [],
  showFilters = true,
  columns = 3,
}: MenuTemplateProps) {
  const [filters, setFilters] = useState<MenuFilterState>({
    categories: [],
    dietary: [],
    priceRange: [],
  });

  // Filter items based on active filters
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (filters.categories.length > 0) {
        const itemCategories = item.categories?.map((cat) => cat.name) || [];
        if (!filters.categories.some((cat) => itemCategories.includes(cat))) {
          return false;
        }
      }

      // Dietary filter
      if (filters.dietary.length > 0) {
        const itemTags = item.tags?.map((tag) => tag.name.toLowerCase()) || [];
        const hasMatchingDietary = filters.dietary.some((dietary) => {
          const dietaryLower = dietary.toLowerCase();
          return itemTags.some((tag) => tag.includes(dietaryLower));
        });
        if (!hasMatchingDietary) {
          return false;
        }
      }

      // Price range filter
      if (filters.priceRange.length > 0) {
        const price = parseFloat(item.price);
        const matchesPriceRange = filters.priceRange.some((range) => {
          if (range === 'Under 100 SEK') return price < 100;
          if (range === '100-200 SEK') return price >= 100 && price <= 200;
          if (range === '200-300 SEK') return price > 200 && price <= 300;
          if (range === 'Over 300 SEK') return price > 300;
          return false;
        });
        if (!matchesPriceRange) {
          return false;
        }
      }

      return true;
    });
  }, [items, filters]);

  return (
    <Section>
      <div className="container px-4 md:px-6">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} className="mb-6" />
        )}

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-3 text-4xl font-bold">{title}</h1>
          {description && (
            <p className="text-lg text-muted-foreground">{description}</p>
          )}
          <p className="mt-2 text-sm text-muted-foreground">
            Showing {filteredItems.length} of {items.length} items
          </p>
        </div>

        {/* Content Grid with Filters */}
        <div className={showFilters ? 'lg:grid lg:grid-cols-4 lg:gap-8' : ''}>
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="mb-8 lg:col-span-1 lg:mb-0">
              <div className="sticky top-20 rounded-lg border bg-card p-6">
                <MenuFilters
                  categories={categories}
                  dietaryOptions={dietaryOptions}
                  priceRanges={priceRanges}
                  onFilterChange={setFilters}
                />
              </div>
            </aside>
          )}

          {/* Menu Items Grid */}
          <div className={showFilters ? 'lg:col-span-3' : ''}>
            {filteredItems.length > 0 ? (
              <div
                className={cn('grid gap-6', {
                  'md:grid-cols-2': columns === 2,
                  'md:grid-cols-2 lg:grid-cols-3': columns === 3,
                  'md:grid-cols-2 lg:grid-cols-4': columns === 4,
                })}
              >
                {filteredItems.map((item) => (
                  <MenuItemCard key={item.id} item={item} showAddToCart={true} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed">
                <div className="text-center">
                  <p className="text-lg font-medium">No items found</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try adjusting your filters
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
