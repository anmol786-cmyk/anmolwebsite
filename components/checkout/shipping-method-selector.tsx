'use client';

import { useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Truck, Package, MapPin, Loader2, AlertTriangle, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/woocommerce';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useCartStore } from '@/store/cart-store';
import { Progress } from '@/components/ui/progress';

interface ShippingMethodSelectorProps {
    className?: string;
}

export function ShippingMethodSelector({ className }: ShippingMethodSelectorProps) {
    const {
        shippingAddress,
        availableShippingMethods,
        selectedShippingMethod,
        restrictedProducts,
        isCalculatingShipping,
        freeShippingThreshold,
        amountToFreeShipping,
        selectShippingMethod,
        getSubtotal,
    } = useCartStore();

    const subtotal = getSubtotal();
    const freeShippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

    const getMethodIcon = (methodId: string) => {
        switch (methodId) {
            case 'local_pickup':
                return <Package className="h-5 w-5" />;
            case 'free_shipping':
                return <Gift className="h-5 w-5 text-green-600" />;
            default:
                return <Truck className="h-5 w-5" />;
        }
    };

    if (!shippingAddress) {
        return (
            <Alert className={className}>
                <MapPin className="h-4 w-4" />
                <AlertTitle>Shipping Address Required</AlertTitle>
                <AlertDescription>
                    Please enter your shipping address to see available shipping methods.
                </AlertDescription>
            </Alert>
        );
    }

    if (isCalculatingShipping) {
        return (
            <Card className={cn('p-6', className)}>
                <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
                    <span className="text-neutral-600">Calculating shipping options...</span>
                </div>
            </Card>
        );
    }

    // Show restricted products error
    if (restrictedProducts.length > 0) {
        return (
            <Alert variant="destructive" className={className}>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Shipping Restrictions</AlertTitle>
                <AlertDescription>
                    <p className="mb-2">
                        Some products in your cart cannot be shipped to your address:
                    </p>
                    <ul className="list-inside list-disc space-y-1">
                        {restrictedProducts.map((product) => (
                            <li key={product.product_id}>
                                <strong>{product.product_name}</strong>: {product.reason}
                            </li>
                        ))}
                    </ul>
                </AlertDescription>
            </Alert>
        );
    }

    if (availableShippingMethods.length === 0) {
        return (
            <Alert className={className}>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>No Shipping Methods Available</AlertTitle>
                <AlertDescription>
                    No shipping methods are available for your address. Please check your postal
                    code or contact us for assistance.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className={cn('space-y-4', className)}>
            <div>
                <h2 className="font-heading text-2xl font-bold text-primary-950 dark:text-primary-50">
                    Shipping Method
                </h2>
                <p className="mt-1 flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <MapPin className="h-4 w-4" />
                    Delivering to: {shippingAddress.postcode}, {shippingAddress.city}
                </p>
            </div>

            {/* Free Shipping Progress Bar */}
            {subtotal < freeShippingThreshold && (
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 dark:from-green-950/20 dark:to-emerald-950/20">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 font-medium text-green-700 dark:text-green-400">
                                <Gift className="h-4 w-4" />
                                Free shipping at {formatPrice(freeShippingThreshold, 'SEK')}
                            </span>
                            <span className="font-semibold text-green-700 dark:text-green-400">
                                {formatPrice(amountToFreeShipping, 'SEK')} to go!
                            </span>
                        </div>
                        <Progress value={freeShippingProgress} className="h-2" />
                    </div>
                </Card>
            )}

            <RadioGroup
                value={selectedShippingMethod?.id}
                onValueChange={(id) => {
                    const method = availableShippingMethods.find((m) => m.id === id);
                    if (method) {
                        selectShippingMethod(method);
                    }
                }}
            >
                <div className="space-y-3">
                    {availableShippingMethods.map((method) => (
                        <Card
                            key={method.id}
                            className={cn(
                                'cursor-pointer transition-all hover:border-primary-500',
                                selectedShippingMethod?.id === method.id
                                    ? 'border-primary-500 bg-primary-50/50 ring-2 ring-primary-500 dark:bg-primary-950/20'
                                    : 'border-neutral-200 dark:border-neutral-800'
                            )}
                            onClick={() => selectShippingMethod(method)}
                        >
                            <div className="flex items-start gap-4 p-4">
                                <RadioGroupItem
                                    value={method.id}
                                    id={method.id}
                                    className="mt-1"
                                />
                                <div className="flex flex-1 items-start gap-3">
                                    <div className="mt-0.5 text-primary-600 dark:text-primary-400">
                                        {getMethodIcon(method.method_id)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <Label
                                                htmlFor={method.id}
                                                className="cursor-pointer font-semibold text-primary-950 dark:text-primary-50"
                                            >
                                                {method.label}
                                            </Label>
                                            <span className="font-bold text-primary-700 dark:text-primary-400">
                                                {method.cost === 0 ? (
                                                    <span className="text-green-600 dark:text-green-400">
                                                        Free
                                                    </span>
                                                ) : (
                                                    formatPrice(method.total_cost, 'SEK')
                                                )}
                                            </span>
                                        </div>
                                        {method.cost > 0 && method.tax > 0 && (
                                            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-500">
                                                (includes {formatPrice(method.tax, 'SEK')} tax)
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </RadioGroup>
        </div>
    );
}
