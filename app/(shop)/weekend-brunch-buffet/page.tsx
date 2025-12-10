import { Metadata } from 'next';
import Link from 'next/link';
import { ReservationForm } from '@/components/forms/reservation-form';
import { submitReservation } from '@/app/actions/reservation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  MenuPageLayout,
  MenuSection,
  DayMenuCard,
  InfoCard,
  FeatureList,
  PricingCard,
} from '@/components/menu/menu-page-layout';
import {
  Clock,
  Utensils,
  MapPin,
  Users,
  Calendar,
  Phone,
  Sun,
  Coffee,
  Heart,
  Star,
  Award,
  Leaf,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Weekend Brunch Buffet Stockholm | 129 kr | Anmol Sweets & Restaurant',
  description: 'Enjoy our Weekend Brunch Buffet in Stockholm for only 129 kr. Authentic Indo-Pakistani breakfast & brunch items. Saturday-Sunday 10:30-14:00 in Spånga. Perfect weekend family dining.',
  keywords: 'weekend brunch Stockholm, brunch buffet Stockholm, weekend breakfast Stockholm, Pakistani breakfast, Indian breakfast, halwa puri Stockholm, brunch Spånga, family brunch Stockholm, weekend dining Stockholm',
  openGraph: {
    title: 'Weekend Brunch Buffet Stockholm - 129 kr | Anmol Sweets & Restaurant',
    description: 'Delicious Weekend Brunch Buffet with authentic Indo-Pakistani breakfast favorites. Only 129 kr. Saturday-Sunday 10:30-14:00.',
    images: [
      {
        url: 'https://anmolsweets.se/wp-content/uploads/2025/04/anmol-breakfast-swedish.jpg',
        width: 1200,
        height: 630,
        alt: 'Weekend Brunch Buffet at Anmol Sweets & Restaurant Stockholm',
      },
    ],
  },
};

// Brunch menu items - elegant style with descriptions
const brunchItems = [
  { name: 'Halwa Puri', description: 'Traditional sweet semolina with fluffy fried bread' },
  { name: 'Choley', description: 'Aromatic chickpea curry' },
  { name: 'Aloo Bhaji', description: 'Spiced potato stir-fry' },
  { name: 'Fresh Paratha', description: 'Layered buttery flatbread' },
  { name: 'Pakistani Omelette', description: 'Spiced eggs with onions & herbs' },
  { name: 'Pakistani Sweets', description: 'Traditional desserts' },
  { name: 'Chai', description: 'Authentic spiced tea' },
  { name: 'Coffee', description: 'Fresh brewed' },
  { name: 'Lassi', description: 'Traditional yogurt drink' },
  { name: 'Yogurt & Raita', description: 'Cooling accompaniments' },
];

// Features list
const features = [
  { icon: <Sun className="h-5 w-5" />, text: 'Perfect Weekend Start: Traditional Pakistani breakfast featuring famous Halwa Puri' },
  { icon: <Coffee className="h-5 w-5" />, text: 'Unlimited Chai & Coffee: Authentic Pakistani chai and fresh coffee included' },
  { icon: <Award className="h-5 w-5" />, text: 'Authentic Recipes: Traditional breakfast dishes prepared with care' },
  { icon: <Users className="h-5 w-5" />, text: 'Family-Friendly: Kids love our selection of sweets and familiar favorites' },
  { icon: <Clock className="h-5 w-5" />, text: 'Relaxed Timing: No rush - brunch service runs until 2:00 PM' },
  { icon: <Leaf className="h-5 w-5" />, text: 'Fresh & Generous: All-you-can-eat with unlimited refills' },
  { icon: <Star className="h-5 w-5" />, text: 'Weekend Exclusive: Special menu items not available during weekdays' },
  { icon: <MapPin className="h-5 w-5" />, text: 'Convenient Location: Easy access in Spånga with parking available' },
];

export default function WeekendBrunchBuffetPage() {
  return (
    <MenuPageLayout
      title="Weekend Brunch Buffet in Stockholm"
      subtitle="Start your weekend right with our traditional Pakistani breakfast buffet featuring the famous Halwa Puri, fresh parathas, chai, sweets, and much more. Available Saturday & Sunday 10:00-14:00. Perfect for families and food lovers."
      heroImage="https://anmolsweets.se/wp-content/uploads/2025/04/anmol-breakfast-swedish.jpg"
      badgeText="Weekend Special"
      pricing={{
        main: "129 kr",
        description: "per person",
        secondary: [{ label: "Kids pricing", price: "Ask us" }]
      }}
      hours={[{ days: "Saturday - Sunday", time: "10:00 - 14:00" }]}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Menu", href: "/menu" },
        { label: "Weekend Brunch", href: "/weekend-brunch-buffet" },
      ]}
      quickInfo={[
        { icon: <Sun className="h-5 w-5" />, label: "Days", value: "Sat & Sun" },
        { icon: <Clock className="h-5 w-5" />, label: "Hours", value: "10:00 - 14:00" },
        { icon: <Utensils className="h-5 w-5" />, label: "Items", value: "12+ Dishes" },
        { icon: <MapPin className="h-5 w-5" />, label: "Location", value: "Spånga" },
      ]}
      ctaSection={{
        title: "Make Your Weekend Special!",
        description: "Experience authentic Pakistani breakfast traditions every Saturday and Sunday. Perfect for families, friends, and anyone who loves authentic cuisines.",
        primaryAction: { label: "Book Now", href: "#booking" },
        secondaryAction: { label: "View Weekday Lunch", href: "/lunch-buffet" },
      }}
    >
      {/* What's on Brunch Menu */}
      <MenuSection
        id="brunch-menu"
        title="What's on Our Weekend Brunch?"
        subtitle="Traditional Pakistani breakfast favorites with unlimited servings. A perfect blend of sweet and savory dishes."
      >
        {/* Menu Cards - 2 columns */}
        <div className="grid-3">
          <DayMenuCard
            day="Sweet"
            theme="Traditional Treats"
            accentColor="from-muted/60 to-muted/40"
            dishes={[
              { name: 'Halwa', description: 'Sweet semolina dessert' },
              { name: 'Puri', description: 'Fluffy fried bread' },
              { name: 'Pakistani Sweets', description: 'Assorted mithai' },
            ]}
          />
          <DayMenuCard
            day="Savory"
            theme="Hearty Favorites"
            accentColor="from-muted/60 to-muted/40"
            dishes={[
              { name: 'Choley', description: 'Aromatic chickpea curry' },
              { name: 'Aloo Bhaji', description: 'Spiced potatoes' },
              { name: 'Pakistani Omelette', description: 'Eggs with herbs' },
            ]}
          />
          <DayMenuCard
            day="Drinks"
            theme="Beverages & More"
            accentColor="from-muted/60 to-muted/40"
            dishes={[
              { name: 'Chai', description: 'Authentic spiced tea' },
              { name: 'Coffee', description: 'Fresh brewed' },
              { name: 'Lassi', description: 'Traditional yogurt drink' },
              { name: 'Yogurt & Raita', description: 'Cooling accompaniments' },
            ]}
          />
        </div>

        {/* Halwa Puri Highlight */}
        <InfoCard
          icon={<Star className="h-5 w-5" />}
          title="Signature Dish"
          value="Famous Halwa Puri Included!"
          description="Experience the authentic Pakistani breakfast tradition - a weekend favorite across Pakistan and now in Stockholm!"
          variant="highlight"
          className="mt-6"
        />
      </MenuSection>

      {/* Why Choose Section */}
      <MenuSection
        id="why-brunch"
        title="The Perfect Weekend Experience"
        subtitle="Make your weekend special with authentic Pakistani breakfast traditions."
      >
        <FeatureList features={features} columns={2} />

        {/* Weekend Tradition Card */}
        <InfoCard
          icon={<Calendar className="h-5 w-5" />}
          title="Weekend Tradition"
          value="Authentic Pakistani Brunch in Stockholm"
          description="Weekend breakfast is a cherished tradition in Pakistani culture. Gather with family and friends for a leisurely brunch featuring Halwa Puri, fresh parathas, and aromatic chai."
          variant="highlight"
          className="mt-6"
        />
      </MenuSection>

      {/* Halwa Puri Feature */}
      <MenuSection
        id="halwa-puri"
        title="Authentic Halwa Puri"
        subtitle="A Pakistani Weekend Staple"
      >
        <Card className="card-base card-padding">
          <p className="body-text mb-4">
            Halwa Puri is more than just breakfast - it's a cultural experience. This traditional Pakistani weekend meal
            features soft, fluffy puri (deep-fried bread) served with sweet, aromatic halwa (semolina dessert) and
            savory choley (chickpea curry). It's the ultimate comfort food that brings families together across Pakistan.
          </p>
          <p className="body-text">
            Our chefs prepare authentic Halwa Puri using traditional recipes and methods, ensuring you get the same taste
            and experience as you would in Karachi or Lahore. Pair it with a hot cup of chai, and you have the perfect
            weekend morning meal that's both satisfying and nostalgic.
          </p>
        </Card>
      </MenuSection>

      {/* Pricing Section - Two Column Layout */}
      <MenuSection id="pricing" title="Pricing">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column: Heading & Value Proposition */}
          <div className="space-y-6">
            {/* Heading */}
            <div>
              <h2 className="section-title mb-3">Unbeatable Weekend Value</h2>
              <p className="section-subtitle">
                All-inclusive pricing with no hidden costs. Enjoy unlimited servings of authentic Pakistani breakfast favorites.
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
                  <span><strong className="text-foreground">Unlimited buffet access</strong> - All-you-can-eat with unlimited refills</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                  </div>
                  <span><strong className="text-foreground">Authentic Halwa Puri</strong> - Traditional Pakistani weekend breakfast</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                  </div>
                  <span><strong className="text-foreground">Hot & cold beverages</strong> - Unlimited chai, coffee, and Lassi</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                  </div>
                  <span><strong className="text-foreground">Pakistani sweets</strong> - Traditional mithai for dessert</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                  </div>
                  <span><strong className="text-foreground">Family-friendly atmosphere</strong> - Perfect for all ages</span>
                </li>
              </ul>
            </div>

            {/* Timing Card */}
            <InfoCard
              icon={<Clock className="h-5 w-5" />}
              title="Weekend Hours"
              value="Saturday & Sunday: 10:00 - 14:00"
              description="Available only on weekends. Perfect timing for a leisurely brunch!"
              variant="highlight"
            />
          </div>

          {/* Right Column: Pricing Cards */}
          <div className="space-y-4">
            <PricingCard
              title="Weekend Brunch"
              price="129 kr"
              description="All-you-can-eat"
              icon={<Sun className="h-6 w-6" />}
              highlighted
              features={[
                "Halwa Puri included",
                "All breakfast items",
                "Unlimited chai & coffee",
                "Lassi",
                "Pakistani sweets"
              ]}
            />

            <PricingCard
              title="Kids"
              price="Ask Us"
              description="Special pricing"
              icon={<Heart className="h-6 w-6" />}
              features={[
                "All menu items",
                "Child-friendly portions",
                "Drinks included",
                "Sweets included"
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
              <h2 className="section-title mb-3">Reserve Your Weekend Table</h2>
              <p className="section-subtitle">
                Secure your spot for our authentic Pakistani brunch experience. Select &quot;Weekend Brunch&quot; as your booking type and choose your preferred Saturday or Sunday slot.
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
                  <span>Guaranteed table during popular weekend brunch hours</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span>Perfect for families and weekend gatherings</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span>Start your weekend right with Halwa Puri tradition</span>
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
                    Our team is happy to help you book your weekend brunch!
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
