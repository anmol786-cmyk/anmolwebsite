import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, User, Tag as TagIcon, ArrowLeft } from 'lucide-react';
import { getPostBySlug } from '@/lib/wordpress';
import { brandConfig } from '@/config/brand.config';
import { decodeHtmlEntities } from '@/lib/utils';
import { BlogSidebar } from '@/components/blog/blog-sidebar';
import { CommentSection } from '@/components/blog/comment-section';
import { TopProductsCarousel } from '@/components/home/top-products-carousel';
import { getProducts } from '@/lib/woocommerce/products-direct';

type Props = {
  params: Promise<{ slug: string }>;
};

// Helper function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Helper function to get featured image URL
function getFeaturedImageUrl(post: any): string | null {
  if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }
  return null;
}

// Helper function to get author info
function getAuthorInfo(post: any): { name: string; avatar?: string } {
  if (post._embedded?.author?.[0]) {
    const author = post._embedded.author[0];
    return {
      name: author.name,
      avatar: author.avatar_urls?.['96'] || author.avatar_urls?.['48']
    };
  }
  return { name: brandConfig.businessName };
}

// Helper function to get categories
function getCategories(post: any): Array<{ id: number; name: string; slug: string }> {
  if (post._embedded?.['wp:term']?.[0]) {
    return post._embedded['wp:term'][0];
  }
  return [];
}

// Helper function to get tags
function getTags(post: any): Array<{ id: number; name: string; slug: string }> {
  if (post._embedded?.['wp:term']?.[1]) {
    return post._embedded['wp:term'][1];
  }
  return [];
}

// Helper function to strip HTML for meta description
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').substring(0, 160);
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getPostBySlug(slug);

    if (!post) {
      return {
        title: 'Post Not Found',
      };
    }

    const excerpt = stripHtml(post.excerpt.rendered);
    const imageUrl = getFeaturedImageUrl(post);
    const decodedTitle = decodeHtmlEntities(post.title.rendered);

    return {
      title: `${decodedTitle} - ${brandConfig.businessName}`,
      description: excerpt,
      openGraph: {
        title: decodedTitle,
        description: excerpt,
        type: 'article',
        publishedTime: post.date,
        modifiedTime: post.modified,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Post Not Found',
    };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  // Fetch Post and Products in parallel for performance (though post is needed for layout)
  let post: any = null;
  let productsData: any = { data: [] };

  try {
    post = await getPostBySlug(slug);
    // Fetch random assortment of products for carousel
    productsData = await getProducts({ per_page: 8, on_sale: true });
  } catch (error) {
    console.error('Error fetching data:', error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  const imageUrl = getFeaturedImageUrl(post);
  const author = getAuthorInfo(post);
  const categories = getCategories(post);
  const tags = getTags(post);
  const decodedTitle = decodeHtmlEntities(post.title.rendered);

  // Use products if found, otherwise empty array
  const products = productsData.data || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Back to Blog Link */}
      <div className="bg-background border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-30">
        <div className="container px-4 md:px-6 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors font-medium text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-12 md:py-16 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content Column */}
          <main className="lg:col-span-8">
            <article>
              {/* Categories */}
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {categories.map((category) => (
                    <span
                      key={category.id}
                      className="px-3 py-1 bg-background border border-border text-secondary-800 dark:text-secondary-200 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-950 dark:text-primary-50 mb-6 leading-tight">
                {decodedTitle}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-neutral-600 dark:text-neutral-400 mb-8 pb-8 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-3">
                  {author.avatar && (
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      width={44}
                      height={44}
                      className="rounded-full border-2 border-primary-100"
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary-900 dark:text-primary-100 text-sm">{author.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              {imageUrl && (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-lg">
                  <Image
                    src={imageUrl}
                    alt={decodedTitle}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Custom Overrides for WordPress Content */}
              <style dangerouslySetInnerHTML={{
                __html: `
                /* 1. Remove background colors from any constrained block or group */
                .prose div[class*="wp-block-group"],
                .prose div[class*="wp-block-cover"],
                .prose [class*="has-background"],
                .prose [style*="background-color"] {
                    background: transparent !important;
                    background-color: transparent !important;
                    padding: 0 !important;
                    box-shadow: none !important;
                }
                /* Ensure text is visible */
                .prose [class*="has-background"] p,
                .prose [class*="has-background"] li, 
                .prose [class*="has-background"] h1,
                .prose [class*="has-background"] h2,
                .prose [class*="has-background"] h3 {
                    color: inherit !important;
                }

                /* 2. Force Horizontal Carousel for Product Lists */
                .prose ul.products,
                .prose ul.wc-block-grid__products,
                .prose .woocommerce ul.products {
                    display: flex !important;
                    flex-wrap: nowrap !important;
                    overflow-x: auto !important;
                    gap: 20px !important;
                    padding-bottom: 20px !important;
                    margin-left: -5px !important;
                    margin-right: -5px !important;
                    padding-left: 5px !important;
                    padding-right: 5px !important;
                    list-style: none !important;
                    scroll-snap-type: x mandatory;
                }
                .prose ul.products li,
                .prose ul.wc-block-grid__products li,
                .prose .woocommerce ul.products li {
                    flex: 0 0 250px !important;
                    min-width: 250px !important;
                    background: var(--card) !important;
                    border: 1px solid var(--border) !important;
                    border-radius: 12px !important;
                    padding: 0 !important; 
                    margin: 0 !important;
                    list-style-type: none !important;
                    display: flex !important;
                    flex-direction: column !important;
                    scroll-snap-align: start;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05) !important;
                }
                .prose ul.products li img,
                .prose .woocommerce ul.products li img {
                    width: 100% !important;
                    height: 160px !important;
                    object-fit: cover !important;
                    border-radius: 12px 12px 0 0 !important;
                    margin: 0 !important;
                }
                .prose ul.products li a,
                .prose .woocommerce ul.products li a {
                    text-decoration: none !important;
                    color: inherit !important;
                }
                .prose ul.products li .woocommerce-loop-product__title,
                .prose ul.products li h2 {
                    font-size: 1rem !important;
                    font-weight: 700 !important;
                    padding: 10px 10px 5px !important;
                    margin: 0 !important;
                    line-height: 1.3 !important;
                }
                .prose ul.products li .price {
                    font-size: 0.95rem !important;
                    color: var(--primary) !important;
                    padding: 0 10px 15px !important;
                    margin: 0 !important;
                    font-weight: 600 !important;
                }
                .prose ul.products li::before {
                    display: none !important;
                }
                .prose ul.products li .button, 
                .prose ul.products li .added_to_cart {
                    display: none !important;
                }
              `}} />

              {/* Post Content */}
              <div
                className="prose prose-lg dark:prose-invert max-w-none
                  prose-headings:font-heading prose-headings:font-bold prose-headings:text-primary-950 dark:prose-headings:text-primary-50
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-neutral-700 dark:prose-p:text-neutral-300
                  prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-primary-600 dark:prose-a:text-primary-400
                  prose-a:no-underline hover:prose-a:underline hover:prose-a:text-primary-700
                  prose-strong:text-primary-900 dark:prose-strong:text-primary-100
                  prose-img:rounded-xl prose-img:shadow-lg
                  prose-blockquote:border-l-4 prose-blockquote:border-secondary-500
                  prose-blockquote:bg-transparent prose-blockquote:pl-6
                  prose-blockquote:py-4 prose-blockquote:rounded-r-lg
                  prose-blockquote:text-xl prose-blockquote:italic prose-blockquote:text-secondary-800 dark:prose-blockquote:text-secondary-200
                  prose-li:text-neutral-700 dark:prose-li:text-neutral-300"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />

              {/* Tags */}
              {tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-neutral-500 dark:text-neutral-400 mt-1.5 flex-shrink-0">
                      <TagIcon className="h-4 w-4" />
                      Tags:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Link
                          key={tag.id}
                          href={`/blog/tag/${tag.slug}`}
                          className="px-3 py-1 bg-background border border-border text-neutral-700 dark:text-neutral-300 text-sm rounded-md hover:bg-primary-50 hover:text-primary-700 border-transparent hover:border-primary-200 transition-all font-medium"
                        >
                          # {tag.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Comments Section */}
            <div className="mt-16 pt-16 border-t border-neutral-200 dark:border-neutral-800">
              <CommentSection postId={post.id} />
            </div>
          </main>

          {/* Sidebar Column */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24">
              <BlogSidebar />
            </div>
          </aside>
        </div>
      </div>

      {/* Related Products Carousel */}
      {products.length > 0 && (
        <TopProductsCarousel
          products={products}
          title="You Might Also Like"
          subtitle="Pair your reading with our delicious signature dishes"
        />
      )}
    </div>
  );
}
