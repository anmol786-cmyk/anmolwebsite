'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Loader2, CheckCircle2, Calendar, Users, Mail, Phone, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { submitCateringQuote } from '@/app/actions/catering';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  eventDate: z.string().min(1, 'Event date is required'),
  eventType: z.string().min(1, 'Event type is required'),
  guestCount: z.string().min(1, 'Number of guests is required'),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface MenuCategory {
  name: string;
  slug: string;
  items: string[];
}

const menuCategories: MenuCategory[] = [
  {
    name: 'Starters Menu',
    slug: 'starters-menu',
    items: [
      'Samosa',
      'Samosa Chaat',
      'Dahi Bhalay',
      'Gol gappa (Pani Puri)',
      'Chana Chat',
      'Chicken Pakora',
      'Mix Pakora',
      'Paneer Pakora',
      'Shami kabab',
      'Aloo Tiki Shami',
      'Papadum',
    ],
  },
  {
    name: 'Chicken Menu',
    slug: 'chicken-menu',
    items: [
      'Chicken Achari',
      'Chicken Biryani',
      'Butter Chicken',
      'Chicken Korma',
      'Chicken Karahi',
      'Chicken Tikka Masala',
      'Tandoori Chicken',
      'Tandoori Chicken Tikka',
      'Chicken Burger for kids',
      'Chicken Nuggets for kids',
    ],
  },
  {
    name: 'Beef Menu',
    slug: 'beef-menu',
    items: [
      'Beef Karahi',
      'Beef Masala',
      'Beef Kofta Curry',
      'Beef Paya',
    ],
  },
  {
    name: 'Lamb Menu',
    slug: 'lamb-menu',
    items: [
      'Lamb Karahi',
      'Lamb Masala',
      'Lamb Nihari',
      'Aloo Gosht (Lamb)',
    ],
  },
  {
    name: 'Biryani Menu',
    slug: 'biryani-menu',
    items: [
      'Lamb Biryani',
      'Vegetable Biryani',
      'Chicken Biryani',
    ],
  },
  {
    name: 'Vegan Menu',
    slug: 'vegan-menu',
    items: [
      'Vegetable Jalfrezi',
      'Paneer Jalfrezi',
      'Paneer Tikka Masala',
      'Palak Paneer',
      'Matar Paneer',
      'Aloo Paneer',
      'Aloo Palak',
      'Lahori Channay',
      'Daal',
    ],
  },
  {
    name: 'Sweets & Desserts Menu',
    slug: 'sweets-desserts-menu',
    items: [
      'Kheer',
      'Gajar halwa',
      'Rasmalai',
      'Gulab Jamun',
      'Dilbahar Bangali Sweet',
    ],
  },
  {
    name: 'Additional',
    slug: 'additional',
    items: [
      'Naan',
      'Zeera Rice',
      'Plain Rice',
      'Poori',
    ],
  },
];

const eventTypes = [
  'Birthday Party',
  'Corporate Event',
  'Mehndi Ceremony',
  'Wedding Reception',
  'Engagement Party',
  'Social Gathering',
  'Anniversary',
  'Other',
];

export function CateringQuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedMenuItems, setSelectedMenuItems] = useState<Record<string, string[]>>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleMenuItemToggle = (category: string, item: string) => {
    setSelectedMenuItems((prev) => {
      const categoryItems = prev[category] || [];
      const isSelected = categoryItems.includes(item);

      return {
        ...prev,
        [category]: isSelected
          ? categoryItems.filter((i) => i !== item)
          : [...categoryItems, item],
      };
    });
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Prepare the quote data including selected menu items
      const quoteData = {
        ...data,
        selectedMenu: selectedMenuItems,
        submittedAt: new Date().toISOString(),
      };

      // Submit to server action
      const result = await submitCateringQuote(quoteData);

      if (result.success) {
        setIsSuccess(true);
        reset();
        setSelectedMenuItems({});

        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Failed to submit quote request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="p-8 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-600 mb-4" />
        <h3 className="text-2xl font-heading font-bold text-primary-950 dark:text-primary-50 mb-2">
          Quote Request Submitted!
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          Thank you for your interest in our catering services. We'll get back to you within 24 hours with a detailed quote.
        </p>
        <Button onClick={() => setIsSuccess(false)}>Submit Another Request</Button>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Personal Information */}
      <div className="space-y-6">
        <h3 className="text-xl font-heading font-bold text-primary-950 dark:text-primary-50">
          Contact Information
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Full Name *
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              {...register('name')}
              className={cn(errors.name && 'border-red-500')}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register('email')}
              className={cn(errors.email && 'border-red-500')}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+46 70 123 4567"
              {...register('phone')}
              className={cn(errors.phone && 'border-red-500')}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventDate" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Event Date *
            </Label>
            <Input
              id="eventDate"
              type="date"
              {...register('eventDate')}
              className={cn(errors.eventDate && 'border-red-500')}
            />
            {errors.eventDate && (
              <p className="text-sm text-red-500">{errors.eventDate.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Event Information */}
      <div className="space-y-6">
        <h3 className="text-xl font-heading font-bold text-primary-950 dark:text-primary-50">
          Event Details
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="eventType">Event Type *</Label>
            <select
              id="eventType"
              {...register('eventType')}
              className={cn(
                'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                errors.eventType && 'border-red-500'
              )}
            >
              <option value="">Select event type</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.eventType && (
              <p className="text-sm text-red-500">{errors.eventType.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="guestCount" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Number of Guests *
            </Label>
            <Input
              id="guestCount"
              type="number"
              placeholder="50"
              min="1"
              {...register('guestCount')}
              className={cn(errors.guestCount && 'border-red-500')}
            />
            {errors.guestCount && (
              <p className="text-sm text-red-500">{errors.guestCount.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Menu Selection */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-heading font-bold text-primary-950 dark:text-primary-50 mb-2">
            Select Menu Items
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Choose items from each category to customize your catering menu
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {menuCategories.map((category) => (
            <Card key={category.slug} className="p-4">
              <h4 className="font-semibold text-primary-950 dark:text-primary-50 mb-3">
                {category.name}
              </h4>
              <div className="space-y-2">
                {category.items.map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${category.slug}-${item}`}
                      checked={selectedMenuItems[category.slug]?.includes(item) || false}
                      onCheckedChange={() => handleMenuItemToggle(category.slug, item)}
                    />
                    <label
                      htmlFor={`${category.slug}-${item}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Special Requests */}
      <div className="space-y-2">
        <Label htmlFor="message" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Special Requests or Additional Information
        </Label>
        <textarea
          id="message"
          rows={4}
          placeholder="Any dietary restrictions, special requirements, or additional notes..."
          {...register('message')}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full md:w-auto min-w-[200px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Request Quote'
          )}
        </Button>
      </div>
    </form>
  );
}
