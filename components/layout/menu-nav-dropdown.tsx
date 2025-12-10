
'use client';

import Link from 'next/link';
import { ChevronDown, UtensilsCrossed, Cookie, Cake, ArrowRight, Utensils } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ProductCategoryFull } from '@/types/woocommerce';
import { Button } from '@/components/ui/button';
import {
  getMenuSections,
  getRestaurantCategoriesOrdered,
  getBakeryChildCategories,
  MAIN_COURSE_CATEGORIES
} from '@/lib/menu-utils';
import { decodeHtmlEntities } from '@/lib/utils';

interface MenuNavDropdownProps {
  categories: ProductCategoryFull[];
  className?: string;
}

export function MenuNavDropdown({ categories, className }: MenuNavDropdownProps) {
  const { sweets: sweetsCategories, bakery: bakeryCategories } = getMenuSections(categories);
  const restaurantOrdered = getRestaurantCategoriesOrdered(categories);
  const bakeryChildren = getBakeryChildCategories(categories);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={`flex items-center gap-1 text-[0.65rem] xl:text-xs font-medium uppercase tracking-wider xl:tracking-widest text-foreground hover:text-primary transition-colors outline-none ${className}`}>
        Menu
        <ChevronDown className="h-3 w-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[900px] p-0 overflow-hidden bg-card shadow-lg border border-border/20" align="center" sideOffset={10}>
        <div className="grid grid-cols-3">
          {/* Restaurant Section */}
          <div className="p-5 bg-card border-r border-border/20">
            <div className="flex items-start gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-foreground flex-shrink-0">
                <UtensilsCrossed className="h-4 w-4" />
              </div>
              <div className="leading-none pt-0.5">
                <h3 className="font-heading text-sm font-semibold text-foreground leading-tight mb-0.5">Restaurant</h3>
                <p className="text-[10px] text-muted-foreground leading-tight">Indo-Pakistani Cuisine</p>
              </div>
            </div>

            {/* Starters */}
            {restaurantOrdered.starters && (
              <div className="mb-3">
                <Link
                  href={`/anmol-restaurant-menu#${restaurantOrdered.starters.slug}`}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {decodeHtmlEntities(restaurantOrdered.starters.name)}
                </Link>
              </div>
            )}

            {/* Main Course */}
            {restaurantOrdered.mainCourse.length > 0 && (
              <div className="mb-3">
                <p className="text-[10px] uppercase tracking-wider text-foreground/60 mb-1.5 flex items-center gap-1 font-semibold">
                  <Utensils className="h-3 w-3 text-foreground" />
                  Main Course
                </p>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 pl-1">
                  {restaurantOrdered.mainCourse.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/anmol-restaurant-menu#${cat.slug}`}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors py-0.5"
                    >
                      {decodeHtmlEntities(cat.name)}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Snacks & Drinks */}
            {restaurantOrdered.snacksDrinks && (
              <div className="mb-3">
                <Link
                  href={`/anmol-restaurant-menu#${restaurantOrdered.snacksDrinks.slug}`}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {decodeHtmlEntities(restaurantOrdered.snacksDrinks.name)}
                </Link>
              </div>
            )}

            {/* Breakfast */}
            {restaurantOrdered.breakfast && (
              <div className="mb-4">
                <Link
                  href={`/anmol-restaurant-menu#${restaurantOrdered.breakfast.slug}`}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {decodeHtmlEntities(restaurantOrdered.breakfast.name)}
                </Link>
              </div>
            )}

            <Button asChild variant="outline" size="sm" className="w-full justify-between group text-xs">
              <Link href="/anmol-restaurant-menu">
                Full Restaurant Menu
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Sweets Section */}
          <div className="p-5 bg-card border-r border-border/20">
            <div className="flex items-start gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-foreground flex-shrink-0">
                <Cookie className="h-4 w-4" />
              </div>
              <div className="leading-none pt-0.5">
                <h3 className="font-heading text-sm font-semibold text-foreground leading-tight mb-0.5">Sweets & Mithai</h3>
                <p className="text-[10px] text-muted-foreground leading-tight">Traditional Desserts</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-5 max-h-[180px] overflow-y-auto">
              {sweetsCategories.length > 0 ? (
                sweetsCategories.slice(0, 12).map((category) => (
                  <Link
                    key={category.id}
                    href={`/anmol-sweets-menu#${category.slug}`}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors py-0.5"
                  >
                    {decodeHtmlEntities(category.name)}
                  </Link>
                ))
              ) : (
                <span className="text-xs text-muted-foreground italic col-span-2">Coming Soon</span>
              )}
            </div>

            <Button asChild variant="outline" size="sm" className="w-full justify-between group text-xs hover:bg-muted/50">
              <Link href="/anmol-sweets-menu">
                Full Sweets Menu
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Bakery Section */}
          <div className="p-5 bg-card">
            <div className="flex items-start gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-foreground flex-shrink-0">
                <Cake className="h-4 w-4" />
              </div>
              <div className="leading-none pt-0.5">
                <h3 className="font-heading text-sm font-semibold text-foreground leading-tight mb-0.5">Bakery</h3>
                <p className="text-[10px] text-muted-foreground leading-tight">Cakes & Pastries</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-5">
              {bakeryChildren.length > 0 ? (
                bakeryChildren.map((category) => (
                  <Link
                    key={category.id}
                    href={`/menu/bakery#${category.slug}`}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors py-0.5"
                  >
                    {decodeHtmlEntities(category.name)}
                  </Link>
                ))
              ) : bakeryCategories.length > 0 ? (
                bakeryCategories.slice(0, 8).map((category) => (
                  <Link
                    key={category.id}
                    href={`/menu/bakery#${category.slug}`}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors py-0.5"
                  >
                    {decodeHtmlEntities(category.name)}
                  </Link>
                ))
              ) : (
                <span className="text-xs text-muted-foreground italic col-span-2">Coming Soon</span>
              )}
            </div>

            <Button asChild variant="outline" size="sm" className="w-full justify-between group text-xs hover:bg-muted/50">
              <Link href="/menu/bakery">
                Full Bakery Menu
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Footer with quick links */}
        <div className="bg-card px-5 py-3 border-t border-border/20 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <Link href="/lunch-buffet-in-stockholm" className="text-[10px] font-medium text-muted-foreground hover:text-primary transition-colors">
              Lunch Buffet
            </Link>
            <Link href="/weekend-brunch-buffet" className="text-[10px] font-medium text-muted-foreground hover:text-primary transition-colors">
              Weekend Brunch
            </Link>
            <Link href="/special-order" className="text-[10px] font-medium text-muted-foreground hover:text-primary transition-colors">
              Catering
            </Link>
          </div>
          <Link href="/menu" className="text-[10px] font-medium text-primary hover:underline">
            View All Menus →
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
