'use client';

import { restaurantConfig, isRestaurantOpen, getTodayHours } from '@/config/restaurant.config';
import { brandConfig } from '@/config/brand.config';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface RestaurantStatusProps {
    variant?: 'compact' | 'full';
    className?: string;
}

export function RestaurantStatus({ variant = 'compact', className }: RestaurantStatusProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setIsOpen(isRestaurantOpen());

        // Update status every minute
        const interval = setInterval(() => {
            setIsOpen(isRestaurantOpen());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    if (!mounted) {
        return null; // Prevent hydration mismatch
    }

    const todayHours = getTodayHours();

    if (variant === 'compact') {
        return (
            <div className={cn('flex items-center gap-2', className)}>
                <div className={cn(
                    'h-2 w-2 rounded-full',
                    isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                )} />
                <span className="text-sm font-medium">
                    {isOpen ? 'Open Now' : 'Closed'}
                </span>
                {todayHours && !todayHours.closed && (
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {isOpen ? `until ${todayHours.close}` : `Opens at ${todayHours.open}`}
                    </span>
                )}
            </div>
        );
    }

    return (
        <div className={cn('space-y-4', className)}>
            <div className="flex items-center gap-3">
                <Badge
                    variant={isOpen ? 'default' : 'secondary'}
                    className={cn(
                        'text-sm font-semibold',
                        isOpen && 'bg-green-600 hover:bg-green-700'
                    )}
                >
                    <div className={cn(
                        'mr-2 h-2 w-2 rounded-full',
                        isOpen ? 'bg-white animate-pulse' : 'bg-neutral-400'
                    )} />
                    {isOpen ? 'Open Now' : 'Closed'}
                </Badge>
                {todayHours && !todayHours.closed && (
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {isOpen
                            ? `Closes at ${todayHours.close}`
                            : `Opens ${todayHours.day} at ${todayHours.open}`
                        }
                    </span>
                )}
            </div>

            {/* Opening Hours */}
            <div className="space-y-2">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-primary-950 dark:text-primary-50">
                    <Clock className="h-4 w-4" />
                    Opening Hours
                </h3>
                <div className="space-y-1 text-sm">
                    {restaurantConfig.openingHours.map((hours) => (
                        <div
                            key={hours.day}
                            className={cn(
                                'flex justify-between',
                                hours.day === todayHours?.day && 'font-semibold text-primary-700 dark:text-primary-400'
                            )}
                        >
                            <span>{hours.day}</span>
                            <span>
                                {hours.closed ? 'Closed' : `${hours.open} - ${hours.close}`}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 border-t pt-4">
                <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                    <a
                        href={`tel:${restaurantConfig.phone}`}
                        className="hover:text-primary-600 dark:hover:text-primary-400"
                    >
                        {restaurantConfig.phone}
                    </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                    <a
                        href={`mailto:${restaurantConfig.email}`}
                        className="hover:text-primary-600 dark:hover:text-primary-400"
                    >
                        {restaurantConfig.email}
                    </a>
                </div>
                <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary-600 dark:text-primary-400 mt-0.5" />
                    <address className="not-italic">
                        <a
                            href={brandConfig.contact.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                            {restaurantConfig.address.street}<br />
                            {restaurantConfig.address.postcode} {restaurantConfig.address.city}, {restaurantConfig.address.country}
                        </a>
                    </address>
                </div>
            </div>
        </div>
    );
}
