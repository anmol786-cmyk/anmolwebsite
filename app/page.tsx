import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/ui/marquee";
import { TopProductsCarousel } from "@/components/home/top-products-carousel";
import { ProductRecommendations } from "@/components/ai/product-recommendations";
import { LunchBuffetSection } from "@/components/home/lunch-buffet-section";
import { WeekendBrunch } from "@/components/home/weekend-brunch";
import { CateringSection } from "@/components/home/catering-section";
import { Sparkles } from "lucide-react";
import { SocialFeed } from "@/components/home/social-feed";
import { getHomepage, extractHeroContent } from "@/lib/fourlines-mcp";
import { getProducts } from "@/lib/woocommerce/products-direct";
import type { Metadata } from "next";

// Revalidate page every hour (3600 seconds)
export const revalidate = 3600;

// Generate metadata from WordPress
export async function generateMetadata(): Promise<Metadata> {
  // Default metadata
  const defaultMetadata: Metadata = {
    title: "Anmol Sweets & Restaurant - Authentic Indian & Pakistani Cuisine in Stockholm",
    description: "Experience authentic Indian & Pakistani cuisine in Stockholm. Halal-certified dishes, daily lunch buffet, traditional sweets, and catering services.",
    openGraph: {
      title: "Anmol Sweets & Restaurant",
      description: "Experience authentic Indian & Pakistani cuisine in Stockholm.",
      type: "website",
      url: "https://anmolsweets.se",
    },
    twitter: {
      card: "summary_large_image",
      title: "Anmol Sweets & Restaurant",
      description: "Experience authentic Indian & Pakistani cuisine in Stockholm.",
    },
  };

  try {
    const homepage = await getHomepage();

    if (!homepage) {
      return defaultMetadata;
    }

    return {
      title: homepage.title,
      description: homepage.excerpt || defaultMetadata.description,
      openGraph: {
        title: homepage.title,
        description: homepage.excerpt || "Experience authentic Indian & Pakistani cuisine in Stockholm.",
        type: "website",
        url: "https://anmolsweets.se",
      },
      twitter: {
        card: "summary_large_image",
        title: homepage.title,
        description: homepage.excerpt || "Experience authentic Indian & Pakistani cuisine in Stockholm.",
      },
    };
  } catch (error) {
    console.error('Error generating metadata from WordPress:', error);
    return defaultMetadata;
  }
}

export default async function HomePage() {
  // Default hero content (fallback)
  let heroContent = {
    title: "Taste the Authentic Tradition",
    subtitle: "Experience the authentic flavors of Pakistan & India in the heart of Stockholm. Freshly prepared, halal-certified, and served with love.",
    badge: "Stockholm's #1 Sweets & Restaurant"
  };

  // Fetch data in parallel for better performance
  let topProducts: any[] = [];

  try {
    const [homepage, featuredResult] = await Promise.all([
      getHomepage().catch(() => null),
      getProducts({
        per_page: 12,
        featured: true,
        orderby: 'popularity',
      }).catch(() => ({ data: [] }))
    ]);

    // Process WordPress homepage content
    if (homepage?.content) {
      const extracted = extractHeroContent(homepage.content);
      if (extracted) {
        heroContent = {
          ...heroContent,
          title: extracted.title || heroContent.title,
          subtitle: extracted.subtitle || heroContent.subtitle,
        };
      }
    }

    // Process products
    topProducts = featuredResult.data;

    // If no featured products, get popular products instead
    if (topProducts.length === 0) {
      const popularResult = await getProducts({
        per_page: 12,
        orderby: 'popularity',
      });
      topProducts = popularResult.data;
    }
  } catch (error) {
    console.error('Error fetching page data:', error);
    // Continue with default content and empty products
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Hero
        title={heroContent.title}
        subtitle={heroContent.subtitle}
        badge={heroContent.badge}
      />

      <Marquee
        items={[
          "Stockholm's #1 Indo-Pakistani Restaurant",
          "Authentic Flavors Since 2020",
          "100% Halal Certified",
          "Fresh Made Daily",
          "Weekend Brunch Buffet",
          "Premium Catering Services",
          "Lunch Buffet Mon-Fri",
          "Traditional Sweets & Desserts"
        ]}
        separator={<Sparkles className="h-4 w-4" />}
        speed={35}
      />

      <TopProductsCarousel products={topProducts} />

      <LunchBuffetSection />

      <WeekendBrunch />

      <CateringSection />

      {/* AI Recommendations Section */}
      <section className="w-full py-16 bg-primary/5">
        <div className="container px-4 md:px-6">
          <ProductRecommendations maxRecommendations={5} />
        </div>
      </section>

      <SocialFeed />
    </main>
  );
}
