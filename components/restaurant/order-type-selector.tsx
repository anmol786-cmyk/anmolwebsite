'use client';

import { useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { restaurantConfig } from '@/config/restaurant.config';
import { Bike, Store, Utensils, Clock, DollarSign, Percent } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/woocommerce';

export type OrderType = 'delivery' | 'pickup' | 'dine-in';

interface OrderTypeState {
    orderType: OrderType;
    setOrderType: (type: OrderType) => void;
}

export const useOrderTypeStore = create<OrderTypeState>()(
    persist(
        (set) => ({
            orderType: 'delivery',
            setOrderType: (type) => set({ orderType: type }),
        }),
        {
            name: 'order-type-storage',
        }
    )
);

interface OrderTypeSelectorProps {
    className?: string;
    showDetails?: boolean;
}

export function OrderTypeSelector({ className, showDetails = true }: OrderTypeSelectorProps) {
    const { orderType, setOrderType } = useOrderTypeStore();
    const config = restaurantConfig.deliveryOptions;

    const orderTypes = [
        {
            id: 'delivery' as OrderType,
            title: 'Delivery',
            description: `${config.delivery.estimatedTime} • Min ${formatPrice(config.delivery.minimumOrder, 'SEK')}`,
            icon: <Bike className="h-5 w-5" />,
            enabled: config.delivery.enabled,
            details: [
                { icon: Clock, text: config.delivery.estimatedTime },
                { icon: DollarSign, text: "Varies upon delivery area. Check website at cart and checkout page for exact amount." },
                { icon: Badge, text: `Free delivery over ${formatPrice(config.delivery.freeDeliveryThreshold, 'SEK')}` },
            ],
        },
        {
            id: 'pickup' as OrderType,
            title: 'Pickup',
            description: `${config.pickup.estimatedTime}`,
            icon: <Store className="h-5 w-5" />,
            enabled: config.pickup.enabled,
            details: [
                { icon: Clock, text: `Ready in ${config.pickup.estimatedTime}` },
            ],
        },
        {
            id: 'dine-in' as OrderType,
            title: 'Dine In',
            description: config.dineIn.reservationRequired ? 'Reservation recommended' : 'Walk-ins welcome',
            icon: <Utensils className="h-5 w-5" />,
            enabled: config.dineIn.enabled,
            details: [
                { icon: Utensils, text: config.dineIn.reservationRequired ? 'Reservation recommended' : 'Walk-ins welcome' },
            ],
        },
    ];

    const enabledTypes = orderTypes.filter((t) => t.enabled);

    return (
        <div className={cn('space-y-6', className)}>
            <div>
                <h3 className="mb-2 font-heading text-xl font-bold text-primary-950 dark:text-primary-50">
                    Order Type
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Choose how you&apos;d like to receive your order
                </p>
            </div>

            <RadioGroup value={orderType} onValueChange={(value) => setOrderType(value as OrderType)}>
                <div className="grid gap-4 sm:grid-cols-3">
                    {enabledTypes.map((type) => (
                        <Card
                            key={type.id}
                            className={cn(
                                'cursor-pointer transition-all duration-300 relative overflow-hidden',
                                orderType === type.id
                                    ? 'border-secondary-500 bg-secondary-50/50 dark:bg-secondary-900/20 shadow-lg shadow-secondary-500/10'
                                    : 'border-neutral-200 dark:border-neutral-800 hover:border-secondary-500/50 hover:shadow-md'
                            )}
                            onClick={() => setOrderType(type.id)}
                        >
                            {orderType === type.id && (
                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-secondary-500/20 to-transparent -mr-8 -mt-8 rounded-full blur-xl" />
                            )}

                            <div className="flex flex-col gap-3 p-5 relative z-10">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value={type.id} id={type.id} className="border-secondary-500 text-secondary-500" />
                                        <div className={cn(
                                            "transition-colors",
                                            orderType === type.id ? "text-secondary-600 dark:text-secondary-400" : "text-neutral-500"
                                        )}>
                                            {type.icon}
                                        </div>
                                    </div>
                                    {orderType === type.id && (
                                        <Badge className="bg-secondary-500 text-white border-none shadow-sm">Selected</Badge>
                                    )}
                                </div>

                                <div>
                                    <Label
                                        htmlFor={type.id}
                                        className="cursor-pointer font-bold text-base text-primary-950 dark:text-primary-50"
                                    >
                                        {type.title}
                                    </Label>
                                    <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                                        {type.description}
                                    </p>
                                </div>

                                {showDetails && orderType === type.id && type.details && (
                                    <div className="space-y-2 border-t border-secondary-200/50 dark:border-secondary-800/50 pt-3 mt-1">
                                        {type.details.map((detail, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                                                <detail.icon className="h-3 w-3 text-secondary-500" />
                                                <span>{detail.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            </RadioGroup>

            {/* Additional Info Based on Selection */}
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                {orderType === 'delivery' && (
                    <div className="rounded-xl border border-secondary-200 bg-secondary-50/50 p-5 text-sm dark:border-secondary-900/30 dark:bg-secondary-950/20 backdrop-blur-sm">
                        <p className="font-bold text-primary-800 dark:text-primary-200 flex items-center gap-2">
                            <Bike className="h-4 w-4" /> Delivery Information
                        </p>
                        <p className="mt-2 text-primary-700 dark:text-primary-300 leading-relaxed">
                            We deliver within {config.delivery.radius}km radius.
                            Minimum order: {formatPrice(config.delivery.minimumOrder, 'SEK')}.
                            Free delivery over {formatPrice(config.delivery.freeDeliveryThreshold, 'SEK')}.
                        </p>
                    </div>
                )}

                {orderType === 'pickup' && (
                    <div className="rounded-xl border border-green-100 bg-green-50/50 p-5 text-sm dark:border-green-900/30 dark:bg-green-950/20 backdrop-blur-sm">
                        <p className="font-bold text-green-900 dark:text-green-100 flex items-center gap-2">
                            <Store className="h-4 w-4" /> Pickup Information
                        </p>
                        <p className="mt-2 text-green-800 dark:text-green-200 leading-relaxed">
                            Pickup is free.
                            Your order will be ready in {config.pickup.estimatedTime}.
                            Pick up at {restaurantConfig.address.street}, {restaurantConfig.address.city}.
                        </p>
                    </div>
                )}

                {orderType === 'dine-in' && (
                    <div className="rounded-xl border border-primary-100 bg-primary-50/50 p-5 text-sm dark:border-primary-900/30 dark:bg-primary-950/20 backdrop-blur-sm">
                        <p className="font-bold text-primary-900 dark:text-primary-100 flex items-center gap-2">
                            <Utensils className="h-4 w-4" /> Dine-In Information
                        </p>
                        <p className="mt-2 text-primary-800 dark:text-primary-200 leading-relaxed">
                            {config.dineIn.reservationRequired
                                ? 'We recommend making a reservation, especially during peak hours.'
                                : 'Walk-ins are welcome! We look forward to serving you.'
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
