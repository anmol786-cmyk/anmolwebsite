'use client';

import Image from 'next/image';
import { formatPrice } from '@/lib/woocommerce';
import { useCartStore } from '@/store/cart-store';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag } from 'lucide-react';

interface OrderSummaryProps {
    shippingCost?: number;
    taxRate?: number;
    className?: string;
    discountAmount?: number;
    onApplyCoupon?: (coupon: any) => void;
    appliedCoupon?: string;
}

import { CouponInput } from './coupon-input';

export function OrderSummary({
    shippingCost = 0,
    taxRate = 0,
    className,
    discountAmount = 0,
    onApplyCoupon,
    appliedCoupon
}: OrderSummaryProps) {
    const { items, getTotalPrice } = useCartStore();

    const subtotal = getTotalPrice();
    const tax = subtotal * (taxRate / 100);
    const total = Math.max(0, subtotal + shippingCost + tax - discountAmount);

    if (items.length === 0) {
        return (
            <Card className={className}>
                <div className="flex flex-col items-center justify-center p-8 text-center">
                    <ShoppingBag className="mb-4 h-12 w-12 text-neutral-400" />
                    <p className="text-neutral-600 dark:text-neutral-400">Your cart is empty</p>
                </div>
            </Card>
        );
    }

    return (
        <Card className={className}>
            <div className="p-6">
                <h2 className="mb-6 font-heading text-xl font-bold text-primary-950 dark:text-primary-50">
                    Order Summary
                </h2>

                {/* Cart Items */}
                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={item.key} className="flex gap-4">
                            {/* Product Image */}
                            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border bg-neutral-100 dark:bg-neutral-800">
                                {item.product.images && item.product.images.length > 0 ? (
                                    <Image
                                        src={item.product.images[0].src}
                                        alt={item.product.name}
                                        fill
                                        className="object-cover"
                                        sizes="64px"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center">
                                        <ShoppingBag className="h-6 w-6 text-neutral-400" />
                                    </div>
                                )}
                                <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs">
                                    {item.quantity}
                                </Badge>
                            </div>

                            {/* Product Info */}
                            <div className="flex flex-1 flex-col justify-between">
                                <div>
                                    <p className="font-medium text-primary-950 dark:text-primary-50">
                                        {item.product.name}
                                    </p>
                                    {item.variation && (
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            Variation: {item.variation.id}
                                        </p>
                                    )}
                                </div>
                                <p className="text-sm font-semibold text-primary-700 dark:text-primary-400">
                                    {formatPrice(item.price * item.quantity, 'SEK')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <Separator className="my-6" />

                {/* Totals */}
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
                        <span className="font-medium">{formatPrice(subtotal, 'SEK')}</span>
                    </div>

                    {discountAmount > 0 && (
                        <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                            <span>Discount {appliedCoupon ? `(${appliedCoupon})` : ''}</span>
                            <span>-{formatPrice(discountAmount, 'SEK')}</span>
                        </div>
                    )}

                    {shippingCost > 0 && (
                        <div className="flex justify-between text-sm">
                            <span className="text-neutral-600 dark:text-neutral-400">Shipping</span>
                            <span className="font-medium">{formatPrice(shippingCost, 'SEK')}</span>
                        </div>
                    )}

                    {tax > 0 && (
                        <div className="flex justify-between text-sm">
                            <span className="text-neutral-600 dark:text-neutral-400">
                                Tax ({taxRate}%)
                            </span>
                            <span className="font-medium">{formatPrice(tax, 'SEK')}</span>
                        </div>
                    )}

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                        <span className="text-primary-950 dark:text-primary-50">Total</span>
                        <span className="text-primary-700 dark:text-primary-400">
                            {formatPrice(total, 'SEK')}
                        </span>
                    </div>
                </div>

                {onApplyCoupon && !appliedCoupon && (
                    <>
                        <Separator className="my-6" />
                        <CouponInput onApply={onApplyCoupon} />
                    </>
                )}

                {/* Additional Info */}
                <div className="mt-6 rounded-lg bg-neutral-50 p-4 text-sm dark:bg-neutral-900">
                    <p className="text-neutral-600 dark:text-neutral-400">
                        <strong>Note:</strong> Prices include VAT where applicable. Final shipping costs will be calculated based on your location.
                    </p>
                </div>
            </div>
        </Card>
    );
}
