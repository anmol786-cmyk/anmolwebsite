import { ReactNode } from 'react';
import { Section } from '@/components/craft';
import { Breadcrumbs, BreadcrumbItem } from '@/components/layout/breadcrumbs';
import { ReservationForm, ReservationFormData } from '@/components/forms';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
  hours?: string[];
}

interface ReservationTemplateProps {
  title: string;
  description?: string | ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  contactInfo?: ContactInfo;
  onFormSubmit?: (data: ReservationFormData) => void | Promise<void> | Promise<{ success: boolean; error?: string }>;
  additionalContent?: ReactNode;
  showContactInfo?: boolean;
}

export function ReservationTemplate({
  title,
  description,
  breadcrumbs,
  contactInfo,
  onFormSubmit,
  additionalContent,
  showContactInfo = true,
}: ReservationTemplateProps) {
  return (
    <Section>
      <div className="container px-4 md:px-6">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} className="mb-6" />
        )}

        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold lg:text-5xl">{title}</h1>
          {description && (
            <div className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {typeof description === 'string' ? <p>{description}</p> : description}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Reservation Form */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border bg-card p-6 md:p-8">
              <h2 className="mb-6 text-2xl font-semibold">Make a Reservation</h2>
              <ReservationForm onSubmit={onFormSubmit} />
            </div>

            {/* Additional Content */}
            {additionalContent && (
              <div className="mt-8">{additionalContent}</div>
            )}
          </div>

          {/* Contact Information Sidebar */}
          {showContactInfo && (
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                {/* Contact Info Card */}
                <div className="rounded-lg border bg-muted/50 p-6">
                  <h3 className="mb-4 text-lg font-semibold">Contact Information</h3>
                  <div className="space-y-4">
                    {contactInfo?.address && (
                      <div className="flex gap-3">
                        <MapPin className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Address</p>
                          <p className="text-sm text-muted-foreground">
                            {contactInfo.address}
                          </p>
                        </div>
                      </div>
                    )}

                    {contactInfo?.phone && (
                      <div className="flex gap-3">
                        <Phone className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <a
                            href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                            className="text-sm text-primary hover:underline"
                          >
                            {contactInfo.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    {contactInfo?.email && (
                      <div className="flex gap-3">
                        <Mail className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <a
                            href={`mailto:${contactInfo.email}`}
                            className="text-sm text-primary hover:underline"
                          >
                            {contactInfo.email}
                          </a>
                        </div>
                      </div>
                    )}

                    {contactInfo?.hours && contactInfo.hours.length > 0 && (
                      <div className="flex gap-3">
                        <Clock className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Opening Hours</p>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            {contactInfo.hours.map((hour, index) => (
                              <p key={index}>{hour}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Important Notice */}
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-900/20">
                  <h4 className="mb-2 text-sm font-semibold text-yellow-900 dark:text-yellow-400">
                    Important Notice
                  </h4>
                  <p className="text-xs text-yellow-800 dark:text-yellow-300">
                    Reservations are subject to availability. We&apos;ll confirm your
                    booking within 24 hours. For same-day reservations, please call
                    us directly.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
