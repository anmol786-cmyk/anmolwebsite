'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface MenuFiltersProps {
  categories: FilterOption[];
  dietaryOptions: FilterOption[];
  priceRanges: FilterOption[];
  onFilterChange: (filters: MenuFilterState) => void;
  initialFilters?: MenuFilterState;
}

export interface MenuFilterState {
  categories: string[];
  dietary: string[];
  priceRange: string[];
}

export function MenuFilters({
  categories,
  dietaryOptions,
  priceRanges,
  onFilterChange,
  initialFilters,
}: MenuFiltersProps) {
  const [filters, setFilters] = useState<MenuFilterState>(
    initialFilters || {
      categories: [],
      dietary: [],
      priceRange: [],
    }
  );

  const handleFilterToggle = (
    filterType: keyof MenuFilterState,
    value: string
  ) => {
    const newFilters = { ...filters };
    const filterArray = newFilters[filterType];

    if (filterArray.includes(value)) {
      newFilters[filterType] = filterArray.filter((item) => item !== value);
    } else {
      newFilters[filterType] = [...filterArray, value];
    }

    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const emptyFilters: MenuFilterState = {
      categories: [],
      dietary: [],
      priceRange: [],
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.dietary.length > 0 ||
    filters.priceRange.length > 0;

  return (
    <div className="space-y-6">
      {/* Active Filters Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {[...filters.categories, ...filters.dietary, ...filters.priceRange].map(
            (filter) => (
              <Badge key={filter} variant="secondary" className="gap-1">
                {filter}
                <button
                  onClick={() => {
                    if (filters.categories.includes(filter)) {
                      handleFilterToggle('categories', filter);
                    } else if (filters.dietary.includes(filter)) {
                      handleFilterToggle('dietary', filter);
                    } else {
                      handleFilterToggle('priceRange', filter);
                    }
                  }}
                  className="ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )
          )}
        </div>
      )}

      {/* Categories Filter */}
      {categories.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={filters.categories.includes(category.label)}
                  onCheckedChange={() =>
                    handleFilterToggle('categories', category.label)
                  }
                />
                <Label
                  htmlFor={`category-${category.id}`}
                  className="flex flex-1 cursor-pointer items-center justify-between text-sm font-normal"
                >
                  <span>{category.label}</span>
                  {category.count !== undefined && (
                    <span className="text-xs text-muted-foreground">
                      ({category.count})
                    </span>
                  )}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dietary Options Filter */}
      {dietaryOptions.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium">Dietary Options</h4>
          <div className="space-y-2">
            {dietaryOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`dietary-${option.id}`}
                  checked={filters.dietary.includes(option.label)}
                  onCheckedChange={() =>
                    handleFilterToggle('dietary', option.label)
                  }
                />
                <Label
                  htmlFor={`dietary-${option.id}`}
                  className="flex flex-1 cursor-pointer items-center justify-between text-sm font-normal"
                >
                  <span>{option.label}</span>
                  {option.count !== undefined && (
                    <span className="text-xs text-muted-foreground">
                      ({option.count})
                    </span>
                  )}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Range Filter */}
      {priceRanges.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium">Price Range</h4>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <div key={range.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`price-${range.id}`}
                  checked={filters.priceRange.includes(range.label)}
                  onCheckedChange={() =>
                    handleFilterToggle('priceRange', range.label)
                  }
                />
                <Label
                  htmlFor={`price-${range.id}`}
                  className="flex flex-1 cursor-pointer items-center justify-between text-sm font-normal"
                >
                  <span>{range.label}</span>
                  {range.count !== undefined && (
                    <span className="text-xs text-muted-foreground">
                      ({range.count})
                    </span>
                  )}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
