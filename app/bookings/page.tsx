import { ReservationForm } from '@/components/forms/reservation-form';
import { submitReservation } from '@/app/actions/reservation';
import type { Metadata } from 'next';
import { contentConfig } from '@/config/content.config';
import { brandConfig } from '@/config/brand.config';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  StaticPageLayout,
  PageSection,
  PageInfoCard,
  PageFeatureList,
} from '@/components/layout/static-page-layout';
import {
  CheckCircle2,
  Phone,
  MapPin,
  Clock,
  Mail,
  Users,
  Calendar,
  Utensils,
  Star
} from 'lucide-react';

export const metadata: Metadata = {
  title: contentConfig.reservations.metadata.title,
  description: contentConfig.reservations.metadata.description,
};

// Benefits features
const benefits = [
  { icon: <CheckCircle2 className="h-5 w-5" />, text: 'Guaranteed Table: Secure your preferred time and seating arrangement' },
  { icon: <Star className="h-5 w-5" />, text: 'Priority Service: Reserved guests receive attentive, priority service' },
  { icon: <Utensils className="h-5 w-5" />, text: 'Special Requests: Let us know dietary requirements or celebrations in advance' },
];

export default function ReservationsPage() {
  return (
    <StaticPageLayout
      title={contentConfig.reservations.title}
      description={contentConfig.reservations.description}
      badgeText="Reservations"
      heroImage="https://anmolsweets.se/wp-content/uploads/2025/03/Anmol-Iftar-Buffet-e1757457498473.jpg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Reservations", href: "/bookings" },
      ]}
      quickInfo={[
        { icon: <Phone className="h-5 w-5" />, label: "Phone", value: brandConfig.contact.phone },
        { icon: <Clock className="h-5 w-5" />, label: "Hours", value: "10:00 - 20:00" },
        { icon: <MapPin className="h-5 w-5" />, label: "Location", value: "Spånga" },
        { icon: <Users className="h-5 w-5" />, label: "Capacity", value: "150+ Seats" },
      ]}
      cta={{
        title: "Questions About Your Reservation?",
        description: contentConfig.reservations.largeGroups.description,
        primaryAction: { label: `Call ${brandConfig.contact.phone}`, href: `tel:${brandConfig.contact.phone.replace(/\s/g, '')}` },
        secondaryAction: { label: "Visit Contact Page", href: "/contact" },
      }}
    >
      {/* Why Book With Us */}
      <PageSection
        id="benefits"
        title={contentConfig.reservations.benefits.title}
        subtitle="Make your dining experience exceptional by booking in advance"
      >
        <div className="grid-3">
          {contentConfig.reservations.benefits.items.map((benefit, index) => (
            <PageInfoCard
              key={index}
              icon={<CheckCircle2 className="h-5 w-5" />}
              title="Benefit"
              value={benefit.title}
              description={benefit.description}
              variant="highlight"
            />
          ))}
        </div>
      </PageSection>

      {/* How to Book & Walk-ins */}
      <PageSection
        id="how-to-book"
        title="Booking Options"
        subtitle="Multiple ways to secure your table"
      >
        <div className="grid-2">
          <Card className="card-base card-padding">
            <h3 className="card-title mb-4">{contentConfig.reservations.howToBook.title}</h3>
            <ol className="space-y-3">
              {contentConfig.reservations.howToBook.steps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white text-xs font-bold">
                    {index + 1}
                  </span>
                  <span className="body-text-sm pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </Card>

          <Card className="card-highlight card-padding">
            <div className="flex items-start gap-3">
              <div className="icon-box-lg">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="card-title mb-2">{contentConfig.reservations.walkIns.title}</h3>
                <p className="body-text-sm mb-2">
                  {contentConfig.reservations.walkIns.description}
                </p>
                <p className="body-text-xs">
                  {contentConfig.reservations.largeGroups.description}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </PageSection>

      {/* Reservation Form Section */}
      <PageSection
        id="book"
        title="Reserve Your Table"
        subtitle="Fill out the form below and we'll confirm your reservation shortly"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Form - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="card-base card-padding-lg">
              <ReservationForm onSubmit={submitReservation} />
            </Card>

            {/* Reservation Policy */}
            <Card className="card-base card-padding">
              <h3 className="card-title mb-3">{contentConfig.reservations.policy.title}</h3>
              <div className="space-y-1.5">
                {contentConfig.reservations.policy.points.map((point, index) => (
                  <p key={index} className="body-text-xs">{point}</p>
                ))}
              </div>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              {/* Contact Info Card */}
              <Card className="card-base card-padding">
                <h3 className="card-title mb-4">Contact Us</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <p className="label-text">Phone</p>
                      <a
                        href={`tel:${brandConfig.contact.phone.replace(/\s/g, '')}`}
                        className="text-sm text-primary hover:underline font-medium"
                      >
                        {brandConfig.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <MapPin className="h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <p className="label-text">Address</p>
                      <p className="text-sm text-foreground">{brandConfig.contact.address}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <p className="label-text">Email</p>
                      <a
                        href={`mailto:${brandConfig.contact.reservationEmail}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {brandConfig.contact.reservationEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Clock className="h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                      <p className="label-text">Opening Hours</p>
                      <div className="space-y-0.5 text-sm text-muted-foreground">
                        <p>{brandConfig.hours.lunch}</p>
                        <p>{brandConfig.hours.dinner}</p>
                        <p>{brandConfig.hours.weekend}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Important Notice */}
              <Card className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-900/50">
                <h4 className="text-xs font-semibold text-yellow-900 dark:text-yellow-400 mb-1.5">
                  Important Notice
                </h4>
                <p className="text-[11px] text-yellow-800 dark:text-yellow-300 leading-relaxed">
                  Reservations are subject to availability. We'll confirm your booking within 24 hours. For same-day reservations, please call us directly.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </PageSection>
    </StaticPageLayout>
  );
}
