import { getProducts, getProductCategories } from '@/lib/woocommerce';
import { ArchiveTemplate } from '@/components/templates';
import { ShopTopBar } from '@/components/shop/shop-top-bar';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse our delicious menu featuring authentic cuisine, gourmet dishes, and more.',
};

interface ShopPageProps {
  searchParams: Promise<{
    page?: string;
    orderby?: string;
    order?: string;
    category?: string;
    min_price?: string;
    max_price?: string;
    stock_status?: string;
    on_sale?: string;
    featured?: string;
    search?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const perPage = 20; // Increased for full width

  // Get categories for filters
  const categories = await getProductCategories();

  // Build query params
  const queryParams: any = {
    page,
    per_page: perPage,
    orderby: params.orderby || 'popularity',
    order: (params.order as 'asc' | 'desc') || 'desc',
  };

  // Apply filters
  if (params.category) queryParams.category = params.category;
  if (params.min_price) queryParams.min_price = params.min_price;
  if (params.max_price) queryParams.max_price = params.max_price;
  if (params.stock_status) queryParams.stock_status = params.stock_status;
  if (params.on_sale) queryParams.on_sale = params.on_sale === 'true';
  if (params.featured) queryParams.featured = params.featured === 'true';
  if (params.search) queryParams.search = params.search;

  const { data: products, total, totalPages } = await getProducts(queryParams);

  return (
    <ArchiveTemplate
      title="Shop"
      description="Browse our delicious menu featuring authentic cuisine, gourmet dishes, and more."
      breadcrumbs={[{ label: 'Shop' }]}
      products={products}
      totalProducts={total}
      currentPage={page}
      totalPages={totalPages}
      basePath="/shop"
      gridColumns={5}
      filterBar={
        <Suspense fallback={<Skeleton className="h-16 w-full" />}>
          <ShopTopBar
            categories={categories}
            totalProducts={total}
          />
        </Suspense>
      }
    />
  );
}
