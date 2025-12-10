import { Metadata } from 'next';
import Link from 'next/link';
import { HeroImageGrid } from '@/components/catering/hero-image-grid';
import { CateringCalculator } from '@/components/catering/catering-calculator';
import { CateringQuoteForm } from '@/components/forms/catering-quote-form';
import { ProductCard } from '@/components/shop/product-card';
import { getProducts } from '@/lib/woocommerce/products-direct';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  StaticPageLayout,
  PageSection,
  PageCard,
  PageGrid,
  PageInfoCard,
  PageFeatureList,
} from '@/components/layout/static-page-layout';
import {
  Users,
  Award,
  Star,
  Calendar,
  Utensils,
  Heart,
  Sparkles,
  CheckCircle2,
  Phone,
  MapPin,
  ChefHat,
  Truck,
  Settings
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Special Orders | Catering Services in Stockholm | Anmol Sweets & Restaurant',
  description: 'Elevate your Stockholm events with exceptional catering services from Anmol Sweets & Restaurant. Authentic Pakistani & Indian cuisine for weddings, corporate events, and social gatherings. Custom menus, live cooking, no minimum order.',
  keywords: 'catering Stockholm, special orders Stockholm, Indo-Pakistani catering, wedding catering Stockholm, mehndi catering, corporate events Stockholm, party catering, halal catering Stockholm, bulk orders, event catering Spånga',
  openGraph: {
    title: 'Special Orders | Catering Services Stockholm - Anmol Sweets & Restaurant',
    description: 'From Weddings to Work Lunches: Premium Indo-Pakistani catering services in Stockholm. Custom menus, full-service, 450+ capacity hall.',
    images: [
      {
        url: 'https://backend.royalbr.se/wp-content/uploads/2025/11/royal-catering-scaled-e1764317115815.jpg',
        width: 1200,
        height: 630,
        alt: 'Anmol Sweets Catering Services Stockholm',
      },
    ],
  },
};

// Event types we cater
const eventTypes = [
  { icon: <Heart className="h-5 w-5" />, text: 'Weddings & Mehndi: Make your special day unforgettable with authentic cuisine' },
  { icon: <Users className="h-5 w-5" />, text: 'Corporate Events: Impress clients with diverse menu options and punctual service' },
  { icon: <Calendar className="h-5 w-5" />, text: 'Birthday Parties: Celebrate in style with custom menus for any guest count' },
  { icon: <Sparkles className="h-5 w-5" />, text: 'Engagement Parties: Start your journey with delicious food that brings families together' },
  { icon: <Utensils className="h-5 w-5" />, text: 'Social Gatherings: From intimate dinners to large gatherings, any size event' },
  { icon: <Star className="h-5 w-5" />, text: 'Special Occasions: Anniversary celebrations, religious ceremonies, and more' },
];

// Why choose us
const whyChooseUs = [
  { icon: <ChefHat className="h-5 w-5" />, text: 'Authentic Indo-Pakistani Cuisine: Vibrant flavors with only the freshest ingredients' },
  { icon: <Sparkles className="h-5 w-5" />, text: 'Live Cooking Experience: Witness skilled chefs prepare dishes fresh on-site' },
  { icon: <Users className="h-5 w-5" />, text: 'No Minimum Order: We cater to events of all sizes with full customization' },
  { icon: <Settings className="h-5 w-5" />, text: 'Full-Service Catering: Menu planning, setup, execution, and cleanup included' },
  { icon: <Award className="h-5 w-5" />, text: 'Award-Winning Service: Ranked #1 for Subcontinental catering in Stockholm' },
  { icon: <Truck className="h-5 w-5" />, text: 'Delivery & Pickup: Flexible options to suit your event needs' },
];

export default async function CateringPage() {
  // Fetch catering deal products
  const { data: allProducts } = await getProducts({ per_page: 100 });
  const cateringDeals = allProducts.filter(
    (product) =>
      product.categories?.some(
        (cat) => cat.slug === 'catering' || cat.slug === 'catering-deals'
      )
  ).slice(0, 5);

  return (
    <StaticPageLayout
      title="Premium Catering Services in Stockholm"
      description="Authentic Indo-Pakistani cuisine for weddings, mehndi ceremonies, corporate events, and special celebrations. Custom menus, live cooking, and professional service for events of all sizes."
      badgeText="Catering Services"
      heroImage="https://anmolsweets.se/wp-content/uploads/2025/10/anmol-catering-web.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Catering", href: "/special-order" },
      ]}
      quickInfo={[
        { icon: <Users className="h-5 w-5" />, label: "Capacity", value: "450+ Guests" },
        { icon: <Award className="h-5 w-5" />, label: "Rating", value: "#1 Rated" },
        { icon: <Utensils className="h-5 w-5" />, label: "Cuisine", value: "Indo-Pak" },
        { icon: <Settings className="h-5 w-5" />, label: "Service", value: "Full-Service" },
      ]}
      cta={{
        title: "Contact us for Catering and Bulk Orders",
        description: "Let's exceed your expectations! Contact us today for a personalized quote.",
        primaryAction: { label: "Request Quote", href: "#quote" },
        secondaryAction: { label: "Call Us", href: "tel:+4688866679" },
      }}
    >
      {/* Quick Features */}
      <PageSection id="features">
        <div className="grid-4">
          <PageInfoCard
            icon={<Users className="h-5 w-5" />}
            title="Experience"
            value="450+ Events"
            description="Proven track record with large events"
          />
          <PageInfoCard
            icon={<Award className="h-5 w-5" />}
            title="Reviews"
            value="Excellent"
            description="Highly rated for quality"
          />
          <PageInfoCard
            icon={<Utensils className="h-5 w-5" />}
            title="Cuisine"
            value="Authentic"
            description="Traditional Indo-Pakistani"
          />
          <PageInfoCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            title="Service"
            value="Full-Service"
            description="Setup to cleanup included"
          />
        </div>
      </PageSection>

      {/* Why Choose Us */}
      <PageSection
        id="why-choose"
        title="Why Choose Anmol Sweets & Restaurant Catering?"
        subtitle="Exceptional catering services designed to impress. We create a customized culinary experience that reflects your vision."
      >
        <PageFeatureList features={whyChooseUs} columns={2} />

        {/* Award Card */}
        <PageInfoCard
          icon={<Award className="h-5 w-5" />}
          title="Award-Winning"
          value="An Award-Winning Culinary Journey"
          description="We use only the freshest and highest-quality ingredients. Rest assured, you can relax and enjoy your special occasion while your guests experience a culinary journey they won't forget."
          variant="highlight"
          className="mt-6"
        />
      </PageSection>

      {/* Diverse Menu */}
      <PageSection
        id="menu"
        title="Explore Our Diverse Catering Menu"
        subtitle="We believe that food has the power to bring people together. That's why we offer a wide variety of options."
      >
        <div className="grid-2">
          <Card className="card-base card-padding">
            <h3 className="card-title mb-3">Tailored Menus: Reflect Your Vision</h3>
            <p className="body-text-sm mb-3">
              Our diverse menu allows you to customize your catering experience perfectly. We work closely with you to create a menu that reflects your vision.
            </p>
            <ul className="space-y-1.5">
              {['Classic curries and aromatic biryanis', 'Innovative fusion dishes', 'Vegetarian and vegan options', 'Traditional sweets and desserts'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="card-base card-padding">
            <h3 className="card-title mb-3">Beyond the Plate: Unmatched Service</h3>
            <p className="body-text-sm mb-3">
              We are dedicated to making your event a success. We handle everything from setup and service to cleanup.
            </p>
            <ul className="space-y-1.5">
              {['Freshness & quality as cornerstones', 'Stress-free event management', 'Professional setup and service', 'Complete cleanup included'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </PageSection>

      {/* Events We Cater */}
      <PageSection
        id="events"
        title="Events We Cater"
        subtitle="From intimate gatherings to grand celebrations, we provide exceptional catering services for all occasions."
      >
        <PageFeatureList features={eventTypes} columns={2} />

        {/* Community Card */}
        <Card className="card-highlight card-padding mt-6 text-center">
          <h3 className="card-title mb-2">Serving the Indo-Pakistani Community in Stockholm</h3>
          <p className="body-text-sm">
            We understand the importance of authentic flavors and traditional presentation for your cultural celebrations.
            Our team specializes in Pakistani and Indian cuisine, ensuring your guests enjoy an authentic culinary experience.
          </p>
        </Card>
      </PageSection>

      {/* Catering Deals */}
      {cateringDeals.length > 0 && (
        <PageSection
          id="deals"
          title="Our Catering Packages"
          subtitle="Choose from our specially curated packages designed for different events. All packages can be customized."
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {cateringDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-6">
            <Button variant="outline" asChild>
              <Link href="/shop?category=catering">View All Catering Products</Link>
            </Button>
          </div>
        </PageSection>
      )}

      {/* Request Quote Form */}
      <PageSection
        id="quote"
        title="Request a Custom Quote"
        subtitle="Fill out the form below and we'll get back to you within 24 hours with a detailed quote."
      >
        <div className="max-w-3xl mx-auto">
          <Card className="card-base card-padding-lg">
            <CateringQuoteForm />
          </Card>
        </div>
      </PageSection>

      {/* Contact Cards */}
      <PageSection id="contact">
        <div className="grid-2 max-w-3xl mx-auto">
          <Card className="card-base card-padding">
            <div className="flex items-start gap-3">
              <div className="icon-box-lg">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="card-title mb-2">Call Us</h3>
                <div className="space-y-2">
                  <div>
                    <p className="label-text">Restaurant Phone</p>
                    <a href="tel:+4688866679" className="text-sm text-primary hover:underline">+46 8 88 66 79</a>
                  </div>
                  <div>
                    <p className="label-text">WhatsApp | Call</p>
                    <a href="https://api.whatsapp.com/send?phone=46769178456" className="text-sm text-primary hover:underline">+46 76 917 84 56</a>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="card-base card-padding">
            <div className="flex items-start gap-3">
              <div className="icon-box-lg">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="card-title mb-2">Visit Us</h3>
                <div className="space-y-1">
                  <p className="label-text">Address</p>
                  <p className="text-sm font-medium">Fagerstagatan 13</p>
                  <p className="text-sm font-medium">163 53 Spånga, Sweden</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </PageSection>
    </StaticPageLayout>
  );
}
