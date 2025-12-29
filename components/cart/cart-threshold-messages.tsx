'use client';

import { useCartStore } from '@/store/cart-store';
import { formatPrice } from '@/lib/woocommerce';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Gift, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartThresholdMessagesProps {
    className?: string;
    showMinimumOrder?: boolean;
    showFreeShipping?: boolean;
}

const MINIMUM_ORDER = 550;
const FREE_SHIPPING_THRESHOLD = 1500;

export function CartThresholdMessages({
    className,
    showMinimumOrder = true,
    showFreeShipping = true,
}: CartThresholdMessagesProps) {
    const { getSubtotal, freeShippingThreshold, amountToFreeShipping } = useCartStore();

    const subtotal = getSubtotal();
    const minimumOrderMet = subtotal >= MINIMUM_ORDER;
    const freeShippingMet = subtotal >= (freeShippingThreshold || FREE_SHIPPING_THRESHOLD);
    const amountToMinimum = Math.max(0, MINIMUM_ORDER - subtotal);
    const amountToFree = Math.max(0, (freeShippingThreshold || FREE_SHIPPING_THRESHOLD) - subtotal);
    const freeShippingProgress = Math.min((subtotal / (freeShippingThreshold || FREE_SHIPPING_THRESHOLD)) * 100, 100);

    return (
        <div className={cn('space-y-3', className)}>
            {/* Minimum Order Warning */}
            {showMinimumOrder && !minimumOrderMet && (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                        <p className="font-medium">
                            Your current order total is {formatPrice(subtotal, 'SEK')} — you must have
                            an order with a minimum of {formatPrice(MINIMUM_ORDER, 'SEK')} to place
                            your order.
                        </p>
                        <p className="mt-2 text-sm">
                            Add {formatPrice(amountToMinimum, 'SEK')} more to continue.
                        </p>
                    </AlertDescription>
                </Alert>
            )}

            {/* Free Shipping Progress */}
            {showFreeShipping && minimumOrderMet && !freeShippingMet && (
                <Alert className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20">
                    <Gift className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertDescription>
                        <div className="space-y-2">
                            <p className="font-medium text-green-800 dark:text-green-200">
                                You only need {formatPrice(amountToFree, 'SEK')} more to get free
                                shipping!
                            </p>
                            <Progress value={freeShippingProgress} className="h-2" />
                            <div className="flex justify-between text-xs text-green-700 dark:text-green-300">
                                <span>{formatPrice(subtotal, 'SEK')}</span>
                                <span>{formatPrice(freeShippingThreshold || FREE_SHIPPING_THRESHOLD, 'SEK')}</span>
                            </div>
                        </div>
                    </AlertDescription>
                </Alert>
            )}

            {/* Free Shipping Achieved */}
            {showFreeShipping && freeShippingMet && (
                <Alert className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20">
                    <Gift className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertDescription>
                        <p className="font-semibold text-green-800 dark:text-green-200">
                            Congratulations! You qualify for free shipping!
                        </p>
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
}
