import { Metadata } from 'next';
import Link from 'next/link';
import { ReservationForm } from '@/components/forms/reservation-form';
import { submitReservation } from '@/app/actions/reservation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  MenuPageLayout,
  MenuSection,
  MenuGrid,
  DayMenuCard,
  InfoCard,
  FeatureList,
  PricingCard,
} from '@/components/menu/menu-page-layout';
import {
  Clock,
  Users,
  Calendar,
  Phone,
  Sparkles,
  ChefHat,
  Leaf,
  Award,
  TrendingUp,
  Heart,
  MapPin,
  Utensils,
  CheckCircle2,
  Star,
  Coffee,
  RefreshCw,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Lunch Buffet Stockholm | 139 kr Weekday Buffet | Anmol Sweets & Restaurant',
  description: 'Stockholm\'s Best Value Workday Lunch Buffet in Spånga. Authentic Indo-Pakistani buffet for only 139 kr (119 kr for kids). Monday-Friday 11:00-14:00. Perfect for working professionals near Spånga industrial area.',
  keywords: 'lunch buffet Stockholm, lunch buffet Spånga, affordable lunch Stockholm, Pakistani lunch buffet, Indian lunch buffet, workday lunch, working lunch Spånga, halal lunch buffet, biryani lunch Stockholm, business lunch Stockholm',
  openGraph: {
    title: 'Lunch Buffet Stockholm - 139 kr Weekday Buffet | Anmol Sweets & Restaurant',
    description: 'Stockholm\'s Best Value Workday Lunch Buffet. Authentic Indo-Pakistani cuisine for only 139 kr. Monday-Friday 11:00-14:00 in Spånga.',
    images: [
      {
        url: 'https://anmolsweets.se/wp-content/uploads/2025/09/lunch-buffet-web.jpg',
        width: 1200,
        height: 630,
        alt: 'Lunch Buffet in Stockholm by Anmol Sweets & Restaurant',
      },
    ],
  },
};

// Daily menu data - elegant restaurant style with short descriptions
const dailyMenus = [
  {
    day: 'Monday',
    theme: 'Monday Motivation',
    color: 'from-muted/60 to-muted/40',
    dishes: [
      { name: 'Chicken Tikka', description: 'Marinated grilled chicken' },
      { name: 'Beef Korma', description: 'Tender beef in rich sauce' },
      { name: 'Palak Paneer', description: 'Creamy spinach & cottage cheese' },
      { name: 'Lahori Chanay', description: 'Spiced chickpea curry' },
      { name: 'Basmati Rice', description: 'Aromatic long grain' },
      { name: 'Fresh Naan', description: 'Oven-baked flatbread' },
      { name: 'Garden Salad', description: 'Fresh seasonal greens' },
      { name: 'Beverages', description: 'Tea, coffee & soft drinks' },
      { name: 'Jalebi', description: 'Crispy sweet dessert' },
    ]
  },
  {
    day: 'Tuesday',
    theme: 'Tuesday Treats',
    color: 'from-muted/60 to-muted/40',
    dishes: [
      { name: 'Chicken Tandoori', description: 'Clay oven roasted chicken' },
      { name: 'Chicken Kababish', description: 'Aromatic spiced curry' },
      { name: 'Aloo Palak', description: 'Potato & spinach blend' },
      { name: 'Daal Chana', description: 'Split chickpea lentils' },
      { name: 'Basmati Rice', description: 'Aromatic long grain' },
      { name: 'Fresh Naan', description: 'Oven-baked flatbread' },
      { name: 'Garden Salad', description: 'Fresh seasonal greens' },
      { name: 'Beverages', description: 'Tea, coffee & soft drinks' },
      { name: 'Jalebi', description: 'Crispy sweet dessert' },
    ]
  },
  {
    day: 'Wednesday',
    theme: 'Wow Wednesday',
    color: 'from-muted/60 to-muted/40',
    dishes: [
      { name: 'Seekh Kabab', description: 'Grilled spiced mince skewers' },
      { name: 'Tikka Masala', description: 'Creamy tomato chicken curry' },
      { name: 'Mixed Vegetables', description: 'Seasonal stir-fried veggies' },
      { name: 'Lahori Chanay', description: 'Spiced chickpea curry' },
      { name: 'Basmati Rice', description: 'Aromatic long grain' },
      { name: 'Fresh Naan', description: 'Oven-baked flatbread' },
      { name: 'Garden Salad', description: 'Fresh seasonal greens' },
      { name: 'Beverages', description: 'Tea, coffee & soft drinks' },
      { name: 'Jalebi', description: 'Crispy sweet dessert' },
    ]
  },
  {
    day: 'Thursday',
    theme: 'Thankful Thursday',
    color: 'from-muted/60 to-muted/40',
    dishes: [
      { name: 'Chicken Tandoori', description: 'Clay oven roasted chicken' },
      { name: 'Lamb Korma', description: 'Premium lamb in rich sauce' },
      { name: 'Aloo Bengan', description: 'Potato & eggplant curry' },
      { name: 'Lahori Chanay', description: 'Spiced chickpea curry' },
      { name: 'Basmati Rice', description: 'Aromatic long grain' },
      { name: 'Fresh Naan', description: 'Oven-baked flatbread' },
      { name: 'Garden Salad', description: 'Fresh seasonal greens' },
      { name: 'Beverages', description: 'Tea, coffee & soft drinks' },
      { name: 'Jalebi', description: 'Crispy sweet dessert' },
    ]
  },
  {
    day: 'Friday',
    theme: 'Friday Fiesta',
    color: 'from-muted/60 to-muted/40',
    dishes: [
      { name: 'Lahori Fish Fry', description: 'Crispy spiced fried fish' },
      { name: 'Beef Korma', description: 'Tender beef in rich sauce' },
      { name: 'Mix Vegetables', description: 'Seasonal stir-fried veggies' },
      { name: 'Daal Mash', description: 'Creamy buttered lentils' },
      { name: 'Basmati Rice', description: 'Aromatic long grain' },
      { name: 'Fresh Naan', description: 'Oven-baked flatbread' },
      { name: 'Garden Salad', description: 'Fresh seasonal greens' },
      { name: 'Beverages', description: 'Tea, coffee & soft drinks' },
      { name: 'Jalebi', description: 'Crispy sweet dessert' },
    ]
  },
];

// Features list
const features = [
  { icon: <TrendingUp className="h-5 w-5" />, text: 'Great Value: All-you-can-eat meal including hot dishes, salad, bread, coffee, and dessert for just 139 SEK' },
  { icon: <Clock className="h-5 w-5" />, text: 'Fast & Convenient: No waiting to order. Come in, choose from the buffet, and enjoy immediately' },
  { icon: <RefreshCw className="h-5 w-5" />, text: 'Daily Rotation: Fresh menu variety with balanced meat and vegetarian options every day' },
  { icon: <CheckCircle2 className="h-5 w-5" />, text: 'Unlimited refills on all buffet items - eat to your heart\'s content' },
  { icon: <ChefHat className="h-5 w-5" />, text: 'Fresh food prepared daily with authentic traditional recipes' },
  { icon: <Award className="h-5 w-5" />, text: 'Halal certified meats - quality you can trust' },
  { icon: <Leaf className="h-5 w-5" />, text: 'Multiple vegetarian options available daily' },
  { icon: <Coffee className="h-5 w-5" />, text: 'Free tea and coffee included with every meal' },
];

export default function LunchBuffetPage() {
  return (
    <MenuPageLayout
      title="Stockholm's Best Value Workday Lunch Buffet"
      subtitle="Escape the office and upgrade your lunch break with our generous Indo-Pakistani buffet. Located conveniently near the Spånga industrial area, offering fast, delicious, and satisfying meals for busy professionals."
      heroImage="https://anmolsweets.se/wp-content/uploads/2025/09/lunch-buffet-web.jpg"
      badgeText="Daily Lunch Special"
      pricing={{
        main: "139 kr",
        description: "per person",
        secondary: [{ label: "Kids (5+)", price: "119 kr" }]
      }}
      hours={[{ days: "Monday - Friday", time: "11:00 - 14:00" }]}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Menu", href: "/menu" },
        { label: "Lunch Buffet", href: "/lunch-buffet" },
      ]}
      quickInfo={[
        { icon: <Clock className="h-5 w-5" />, label: "Hours", value: "11:00 - 14:00" },
        { icon: <Calendar className="h-5 w-5" />, label: "Days", value: "Mon - Fri" },
        { icon: <Utensils className="h-5 w-5" />, label: "Items", value: "15+ Dishes" },
        { icon: <MapPin className="h-5 w-5" />, label: "Location", value: "Spånga" },
      ]}
      ctaSection={{
        title: "Join Us for Lunch Today!",
        description: "Experience authentic Indo-Pakistani cuisine at unbeatable prices. Perfect for individuals, families, and working professionals.",
        primaryAction: { label: "Book Your Table", href: "#booking" },
        secondaryAction: { label: "Call Us", href: "tel:+4688866679" },
      }}
    >
      {/* Daily Menu Section - Full Width */}
      <MenuSection
        id="weekly-menu"
        title="What's on the Menu?"
        subtitle="Fresh daily rotations featuring authentic Indo-Pakistani dishes. Each day brings new flavors to explore."
      >
        {/* Horizontal Scrollable Day Cards */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20">
          {dailyMenus.map((dayMenu) => (
            <DayMenuCard
              key={dayMenu.day}
              day={dayMenu.day}
              theme={dayMenu.theme}
              dishes={dayMenu.dishes}
              accentColor={dayMenu.color}
            />
          ))}
        </div>
      </MenuSection>

      {/* Why Choose Section */}
      <MenuSection
        id="why-choose"
        title="The Smart Choice for Your Lunch Break"
        subtitle="Our buffet provides premium-quality meals with maximum efficiency for your valuable lunch break."
      >
        <FeatureList features={features} columns={2} />

        {/* Location Card */}
        <InfoCard
          icon={<MapPin className="h-5 w-5" />}
          title="Location"
          value="Conveniently Located in Spånga"
          description="Easy access from Stockholm. Perfect for your lunch break."
          variant="highlight"
          className="mt-6"
        />
      </MenuSection>

      {/* Pricing Section - Two Column Layout */}
      <MenuSection id="pricing" title="Pricing">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column: Heading & Value Proposition */}
          <div className="space-y-6">
            {/* Heading */}
            <div>
              <h2 className="section-title mb-3">Simple, Affordable Pricing</h2>
              <p className="section-subtitle">
                All-inclusive pricing with no hidden costs. Perfect value for your weekday lunch break.
              </p>
              <div className="section-divider mt-4" />
            </div>

            {/* What's Included */}
            <div className="space-y-4">
              <h3 className="subsection-title">What's Included in Every Price</h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                  </div>
                  <span><strong className="text-foreground">Unlimited buffet access</strong> - All-you-can-eat hot dishes with refills</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                  </div>
                  <span><strong className="text-foreground">Fresh daily menu</strong> - Different authentic dishes every day</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                  </div>
                  <span><strong className="text-foreground">Fresh salad bar</strong> - Healthy accompaniments and condiments</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                  </div>
                  <span><strong className="text-foreground">Naan & rice</strong> - Freshly baked bread and aromatic basmati rice</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                  </div>
                  <span><strong className="text-foreground">Beverages & dessert</strong> - Free coffee, tea, and daily sweet</span>
                </li>
              </ul>
            </div>

            {/* Timing Card */}
            <InfoCard
              icon={<Clock className="h-5 w-5" />}
              title="Operating Hours"
              value="Monday - Friday: 11:00 - 14:00"
              description="Closed on weekends. Come early for the freshest selection!"
              variant="highlight"
            />
          </div>

          {/* Right Column: Pricing Cards */}
          <div className="space-y-4">
            <PricingCard
              title="Adults"
              price="139 kr"
              description="All-you-can-eat"
              icon={<Users className="h-6 w-6" />}
              highlighted
              features={[
                "Unlimited hot dishes",
                "Fresh salad bar",
                "Naan & rice",
                "Coffee & tea",
                "Daily dessert"
              ]}
            />

            <PricingCard
              title="Kids (5+)"
              price="119 kr"
              description="Same great buffet"
              icon={<Heart className="h-6 w-6" />}
              features={[
                "All buffet items",
                "Child-friendly",
                "Drinks included",
                "Dessert included"
              ]}
            />

            <PricingCard
              title="Toddlers (0-4)"
              price="FREE"
              description="Under 5 years"
              icon={<Star className="h-6 w-6" />}
              features={[
                "Free entry",
                "Share with parents",
                "Family friendly"
              ]}
            />
          </div>
        </div>
      </MenuSection>

      {/* Booking Section - Two Column Layout */}
      <MenuSection id="booking" title="Booking">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column: Heading, Description & CTA */}
          <div className="space-y-6">
            {/* Heading */}
            <div>
              <h2 className="section-title mb-3">Reserve Your Table</h2>
              <p className="section-subtitle">
                Book your spot for our delicious lunch buffet. Select &quot;Lunch Buffet&quot; as your booking type and choose your preferred date and time.
              </p>
              <div className="section-divider mt-4" />
            </div>

            {/* Why Book Section */}
            <div className="space-y-4">
              <h3 className="subsection-title">Why Book Ahead?</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span>Guaranteed table during busy lunch hours</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span>Skip the wait and start enjoying immediately</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span>Perfect for group lunches and team meetings</span>
                </li>
              </ul>
            </div>

            {/* Call CTA Card */}
            <Card className="p-5 bg-gradient-to-br from-primary/5 to-primary/10">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">Prefer to Call?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our team is happy to help you book over the phone!
                  </p>
                  <Button
                    size="default"
                    className="w-full bg-primary hover:bg-primary/90"
                    asChild
                  >
                    <Link href="tel:+4688866679">
                      <Phone className="mr-2 h-4 w-4" />
                      Call +46 8 88 66 679
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Booking Form */}
          <div>
            <Card className="p-5 md:p-6 lg:p-8 sticky top-24">
              <ReservationForm onSubmit={submitReservation} />
            </Card>
          </div>
        </div>
      </MenuSection>
    </MenuPageLayout>
  );
}

