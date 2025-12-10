import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  StaticPageLayout,
  PageSection,
} from '@/components/layout/static-page-layout';
import { ContactForm } from '@/components/forms/contact-form';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
} from 'lucide-react';
import { restaurantConfig } from '@/config/restaurant.config';
import { brandConfig } from '@/config/brand.config';

export const metadata: Metadata = {
  title: 'Contact Us | Anmol Sweets & Restaurant Stockholm',
  description: 'Get in touch with Anmol Sweets & Restaurant. Visit us in Spånga, Stockholm, call us at +46 8 88 66 79, or send us a message. We\'re here to serve you authentic Pakistani & Indian cuisine.',
  keywords: 'contact Anmol Sweets, restaurant location Stockholm, Pakistani restaurant Spånga, contact details, restaurant hours, directions Stockholm',
  openGraph: {
    title: 'Contact Anmol Sweets & Restaurant Stockholm',
    description: 'Visit us at Fagerstagatan 13, Spånga or call +46 8 88 66 79. Open 7 days a week.',
    images: [
      {
        url: 'https://anmolsweets.se/wp-content/uploads/2025/12/Restaurant-front-side.jpg',
        width: 1200,
        height: 630,
        alt: 'Anmol Sweets & Restaurant Front',
      },
    ],
  },
};

export default function ContactPage() {
  const handleFormSubmit = async (data: any) => {
    'use server';

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('❌ Failed to send contact form:', result);
        throw new Error(result.error || 'Failed to send message');
      }

      console.log('✅ Contact form sent successfully:', result);
      return result;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  };

  // Group hours for display
  const groupedHours = [
    "Monday - Friday: 10:00 - 20:00",
    "Saturday - Sunday: 10:00 - 19:00",
  ];

  return (
    <StaticPageLayout
      title="Contact Anmol Sweets & Restaurant – Authentic Pakistani & Indian Cuisine"
      description="Visit us in Spånga, Stockholm for a true taste of South Asia. We are open 7 days a week offering Dine-in, Takeaway, and Catering services. Call us for reservations!"
      heroImage="https://anmolsweets.se/wp-content/uploads/2025/12/Restaurant-front-side.jpg"
      breadcrumbs={[{ label: 'Contact', href: '/contact' }]}
    >
      <PageSection className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Have a question or feedback? Fill out the form and we&apos;ll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm onSubmit={handleFormSubmit} />
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Info & Links */}
          <div className="space-y-6">
            {/* Info Cards */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="body-text-sm">
                      {restaurantConfig.address.street},<br />
                      {restaurantConfig.address.postcode} {restaurantConfig.address.city}
                    </p>
                    <a
                      href={brandConfig.contact.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="body-text-xs text-primary hover:underline mt-1 inline-block"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="body-text-sm">
                      <a href={`tel:${restaurantConfig.phone.replace(/\s/g, '')}`} className="hover:text-primary">
                        {restaurantConfig.phone}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="body-text-sm">
                      <a href={`mailto:${restaurantConfig.email}`} className="hover:text-primary">
                        {restaurantConfig.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Opening Hours</h3>
                    <ul className="body-text-sm space-y-1">
                      {groupedHours.map((hour, i) => (
                        <li key={i}>{hour}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Options */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Service Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 body-text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-lg">🍽️</span>
                  <div>
                    <strong>Dine-In:</strong> Walk-ins welcome
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-lg">🚚</span>
                  <div>
                    <strong>Delivery:</strong> Available via Foodora & UberEats
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-lg">🏃</span>
                  <div>
                    <strong>Takeaway:</strong> Order for pickup
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-lg">🎉</span>
                  <div>
                    <strong>Catering:</strong> <Link href="/special-order" className="text-primary hover:underline">Events & Parties</Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 body-text-sm">
                  <li>
                    <Link href="/shop/restaurant" className="text-primary transition-colors hover:underline">
                      View Restaurant Menu
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop/sweets" className="text-primary transition-colors hover:underline">
                      Order Sweets
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-primary transition-colors hover:underline">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/bookings" className="text-primary transition-colors hover:underline">
                      Table Reservation
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageSection>

      <PageSection className="max-w-6xl mx-auto pb-12">
        <div className="rounded-xl overflow-hidden shadow-sm border bg-card w-full h-[450px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2031.3466456102306!2d17.8822457!3d59.3939289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9f2556107889%3A0x12d9a2d2203c1fa4!2sAnmol%20Sweets%20%26%20Restaurant!5e0!3m2!1sen!2s!4v1765219267264!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </PageSection>
    </StaticPageLayout>
  );
}
