import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
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
  MapPin,
  Phone,
  Clock,
  Award,
  Users,
  Utensils,
  Heart,
  Star,
  Sparkles,
  ChefHat,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Anmol Sweets & Restaurant | Best-Rated Pakistani & Indian Cuisine in Stockholm',
  description: 'Welcome to Anmol Sweets & Restaurant, where you\'ll find the best in Pakistani and Indian cuisine in Stockholm. Premium quality food made with the freshest and finest ingredients. Over 10 years of excellence serving authentic Indo-Pak cuisine in Spånga. Rated 4.2/5 by 475+ customers.',
  keywords: 'about Anmol Sweets, best Pakistani restaurant Stockholm, best Indian restaurant Stockholm, Spånga restaurant, authentic halal food, traditional sweets Stockholm, family restaurant Stockholm, highest rated Indo-Pak restaurant',
  openGraph: {
    title: 'About Anmol Sweets & Restaurant - Bringing Flavors of Subcontinent to Stockholm',
    description: 'Stockholm\'s best-rated restaurant for Pakistani & Indian cuisine. Over 10 years of quality, tradition, and authentic flavors.',
    images: [
      {
        url: 'https://backend.royalbr.se/wp-content/uploads/2025/11/royal-Sweets-Restaruatn-stockholm.webp',
        width: 1200,
        height: 630,
        alt: 'Anmol Sweets & Restaurant Stockholm',
      },
    ],
  },
};

// Our Values
const values = [
  { icon: <Heart className="h-5 w-5" />, text: 'Authentic Tradition: Every dish prepared using traditional recipes passed down through generations' },
  { icon: <Award className="h-5 w-5" />, text: 'Quality First: Only the finest, freshest halal ingredients and authentic spices' },
  { icon: <Users className="h-5 w-5" />, text: 'Community Focus: Serving the Indo-Pakistani community with warm hospitality' },
  { icon: <ChefHat className="h-5 w-5" />, text: 'Expert Chefs: Decades of culinary expertise creating dishes that taste like home' },
  { icon: <Sparkles className="h-5 w-5" />, text: 'Made Fresh Daily: Everything prepared fresh in our kitchen daily' },
  { icon: <Star className="h-5 w-5" />, text: 'Excellent Service: Consistently rated 5 stars for quality and service' },
];

// What we offer
const services = [
  { icon: <Utensils className="h-5 w-5" />, text: 'Full Service Restaurant: Dine-in, takeaway, and delivery options' },
  { icon: <Users className="h-5 w-5" />, text: 'Catering & Events: 150+ capacity hall for weddings and corporate events' },
  { icon: <Clock className="h-5 w-5" />, text: 'Weekday Lunch Buffet: Mon-Fri 11:00-14:00 for 139 kr (Closed weekends)' },
  { icon: <MapPin className="h-5 w-5" />, text: 'Convenient Location: Easy access from Stockholm and surrounding areas' },
];

export default function AboutPage() {
  return (
    <StaticPageLayout
      title="Anmol Sweets & Restaurant"
      description="Experience the Best of Pakistani & Indian Cuisine in Stockholm. Premium quality food made with the freshest and finest ingredients. Over 10 years of excellence serving authentic Indo-Pak cuisine."
      heroImage="https://anmolsweets.se/wp-content/uploads/2025/12/Restaurant-front-side.jpg"
      badgeText="About Us"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
      ]}
      quickInfo={[
        { icon: <Star className="h-5 w-5" />, label: "Rating", value: "4.2/5 Stars" },
        { icon: <Users className="h-5 w-5" />, label: "Reviews", value: "475+" },
        { icon: <Clock className="h-5 w-5" />, label: "Experience", value: "10+ Years" },
        { icon: <MapPin className="h-5 w-5" />, label: "Location", value: "Spånga" },
      ]}
      cta={{
        title: "Experience Authentic Indo-Pakistani Cuisine",
        description: "Join us today for delicious food, warm hospitality, and a taste of tradition",
        primaryAction: { label: "View Our Menu", href: "/menu" },
        secondaryAction: { label: "Make Reservation", href: "/bookings" },
      }}
    >
      {/* Our Story Section */}
      <PageSection
        id="story"
        title="Our Story"
        subtitle="Bringing the rich flavors and diverse culinary traditions of Indo-Pak to Stockholm"
      >
        <Card className="card-base card-padding">
          <div className="space-y-4 body-text">
            <p>
              Welcome to Anmol Sweets & Restaurant, where you'll find the best in Pakistani and Indian cuisine in Stockholm. Our focus is on providing premium quality food made with the freshest and finest ingredients. We take pride in our high standards for quality and customer service, ensuring that every meal you enjoy with us is nothing short of exceptional.
            </p>
            <p>
              At Anmol Sweets & Restaurant, we are dedicated to bringing the rich flavors and diverse culinary traditions of Indo Pak to Stockholm. Our menu features a wide range of traditional and fusion dishes, made with the freshest ingredients and authentic spices.
            </p>
            <p>
              With over 10 years in the restaurant industry, our team has a deep-rooted passion for Pakistani cuisine and a commitment to quality. We believe that food should not only taste great, but also bring people together. That's why we strive to create an inviting and warm atmosphere.
            </p>
          </div>
        </Card>
      </PageSection>

      {/* Best Rated Section */}
      <PageSection
        id="ratings"
        title="The Best-Rated Restaurant in Stockholm"
        subtitle="Our commitment to quality has earned us an outstanding reputation"
      >
        <div className="grid-2 mb-6">
          <PageInfoCard
            icon={<Star className="h-5 w-5" />}
            title="Average Rating"
            value="4.2 / 5 Stars"
            description="Based on 475+ Google Reviews"
            variant="highlight"
          />
          <PageInfoCard
            icon={<Award className="h-5 w-5" />}
            title="Top Rated"
            value="#1 Pakistani Restaurant"
            description="89% rating on Sluurpy (470 votes)"
            variant="highlight"
          />
        </div>

        <div className="grid-2">
          <Card className="card-base card-padding">
            <h3 className="card-title mb-2">A Commitment to Quality and Affordability</h3>
            <p className="body-text-sm">
              We believe that everyone deserves access to delicious, high-quality food. That's why we strive to deliver the best food at the most affordable prices, making it accessible to everyone.
            </p>
          </Card>
          <Card className="card-base card-padding">
            <h3 className="card-title mb-2">Fresh, Healthy Ingredients</h3>
            <p className="body-text-sm">
              We use the freshest ingredients and authentic spices to create delicious and healthy meals. Our dishes are made from scratch using locally sourced ingredients whenever possible.
            </p>
          </Card>
        </div>
      </PageSection>

      {/* A Place for Everyone */}
      <PageSection
        id="community"
        title="A Place for Everyone"
        subtitle="Food is a social experience that brings people together"
      >
        <Card className="card-base card-padding">
          <p className="body-text mb-4">
            We understand that food is a social experience, and that's why we've created a warm and inviting atmosphere where you can enjoy a meal with friends and family. Whether you're looking for classic Indian sweets, savory desi nashta, or a full-course meal, we have something to suit every taste.
          </p>
          <p className="body-text">
            We believe that everyone deserves a chance to enjoy the rich flavors and diverse culinary traditions of India and Pakistan. Whether you're dining alone, with friends, or with family, we welcome you with open arms. At Anmol Sweets & Restaurant, we're proud to bring the flavors of Pakistan & India to Stockholm!
          </p>
        </Card>
      </PageSection>

      {/* What Makes Us Special */}
      <PageSection
        id="values"
        title="What Makes Us Special"
        subtitle="Our commitment to quality, authenticity, and service sets us apart"
      >
        <PageFeatureList features={values} columns={2} />
      </PageSection>

      {/* What We Offer */}
      <PageSection
        id="services"
        title="What We Offer"
        subtitle="Complete dining and catering solutions for all occasions"
      >
        <PageFeatureList features={services} columns={2} />

        {/* Specialties Card */}
        <Card className="card-highlight card-padding mt-6">
          <h3 className="card-title text-center mb-4">Our Specialties</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">Traditional Sweets</h4>
              <ul className="space-y-1 body-text-xs">
                <li>• Gulab Jamun, Ras Malai, Barfi</li>
                <li>• Jalebi, Ladoo, and more</li>
                <li>• Made fresh daily</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Savory Dishes</h4>
              <ul className="space-y-1 body-text-xs">
                <li>• Chicken & Lamb Biryani</li>
                <li>• Karahi, Korma, Tikka Masala</li>
                <li>• Tandoori & Grill Specialties</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Lunch Buffet</h4>
              <ul className="space-y-1 body-text-xs">
                <li>• Mon-Fri 11:00 - 14:00</li>
                <li>• 139 kr per person</li>
                <li>• Closed on weekends</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Catering Services</h4>
              <ul className="space-y-1 body-text-xs">
                <li>• Weddings & Mehndi Ceremonies</li>
                <li>• Corporate Events & Parties</li>
                <li>• Hall capacity 150+ guests</li>
              </ul>
            </div>
          </div>
        </Card>
      </PageSection>

      {/* Visit Us */}
      <PageSection
        id="visit"
        title="Visit Us"
        subtitle="We look forward to serving you authentic Indo-Pakistani cuisine"
      >
        <div className="grid-3">
          <PageInfoCard
            icon={<MapPin className="h-5 w-5" />}
            title="Location"
            value="Fagerstagatan 13, Spånga"
            description="Stockholm, Sweden"
          />
          <PageInfoCard
            icon={<Phone className="h-5 w-5" />}
            title="Phone"
            value="+46 8 88 66 79"
            description="Call for reservations"
          />
          <PageInfoCard
            icon={<Clock className="h-5 w-5" />}
            title="Hours"
            value="Mon-Fri: 10:00 - 20:00 | Sat-Sun: 10:00 - 19:00"
            description="Open 7 days a week"
          />
        </div>
      </PageSection>
    </StaticPageLayout>
  );
}
