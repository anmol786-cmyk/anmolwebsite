'use client';

import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Truck, Package, MapPin, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/woocommerce';
import { Alert, AlertDescription } from '@/components/ui/alert';

export interface ShippingMethod {
    id: string;
    instance_id: number;
    title: string;
    method_id: string;
    cost: number;
    enabled: boolean;
    description?: string;
}

interface ShippingMethodSelectorProps {
    postcode: string;
    country?: string;
    cartTotal: number;
    selectedMethod?: string;
    onMethodChange: (method: ShippingMethod) => void;
    onShippingCostChange: (cost: number) => void;
    className?: string;
}

export function ShippingMethodSelector({
    postcode,
    country = 'SE',
    cartTotal,
    selectedMethod,
    onMethodChange,
    onShippingCostChange,
    className,
}: ShippingMethodSelectorProps) {
    const [methods, setMethods] = useState<ShippingMethod[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [zoneInfo, setZoneInfo] = useState<{ id: number; name: string } | null>(null);

    useEffect(() => {
        if (!postcode) {
            setMethods([]);
            setError('Please enter a postal code first');
            return;
        }

        fetchShippingMethods();
    }, [postcode, country]);

    const fetchShippingMethods = async () => {
        setLoading(true);
        setError(null);

        try {
            // First validate the postcode and get the zone
            const validateResponse = await fetch('/api/shipping/validate-postcode', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postcode, country }),
            });

            if (!validateResponse.ok) {
                throw new Error('Failed to validate postcode');
            }

            const validateData = await validateResponse.json();

            if (!validateData.valid) {
                setError(validateData.error || 'No shipping available for this postcode');
                setMethods([]);
                setLoading(false);
                return;
            }

            setZoneInfo({ id: validateData.zoneId, name: validateData.zoneName });

            // Get shipping methods for this zone
            const methodsResponse = await fetch(
                `/api/shipping/methods?zoneId=${validateData.zoneId}`,
                { cache: 'no-store' }
            );

            if (!methodsResponse.ok) {
                const errorData = await methodsResponse.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to fetch shipping methods');
            }

            const methodsData = await methodsResponse.json();
            const enabledMethods = methodsData.filter((m: any) => m.enabled);

            // Calculate cost for each method
            const methodsWithCost = enabledMethods.map((method: any) => {
                let cost = 0;

                if (method.method_id === 'flat_rate') {
                    cost = parseFloat(method.settings?.cost?.value || '0');
                } else if (method.method_id === 'free_shipping') {
                    const minAmount = parseFloat(method.settings?.min_amount?.value || '0');
                    cost = cartTotal >= minAmount ? 0 : parseFloat(method.settings?.cost?.value || '0');
                } else if (method.method_id === 'local_pickup') {
                    cost = 0;
                }

                return {
                    id: method.id,
                    instance_id: method.instance_id,
                    title: method.title,
                    method_id: method.method_id,
                    cost,
                    enabled: method.enabled,
                };
            });

            setMethods(methodsWithCost);

            // Auto-select first method if none selected
            if (methodsWithCost.length > 0 && !selectedMethod) {
                const firstMethod = methodsWithCost[0];
                onMethodChange(firstMethod);
                onShippingCostChange(firstMethod.cost);
            }
        } catch (err: any) {
            console.error('Error fetching shipping methods:', err);
            setError(err.message || 'Failed to load shipping methods. Please try again.');
            setMethods([]);
        } finally {
            setLoading(false);
        }
    };

    const handleMethodSelect = (methodId: string) => {
        const method = methods.find((m) => m.id === methodId);
        if (method) {
            onMethodChange(method);
            onShippingCostChange(method.cost);
        }
    };

    const getMethodIcon = (methodId: string) => {
        switch (methodId) {
            case 'local_pickup':
                return <Package className="h-5 w-5" />;
            case 'free_shipping':
                return <Truck className="h-5 w-5 text-green-600" />;
            default:
                return <Truck className="h-5 w-5" />;
        }
    };

    if (loading) {
        return (
            <Card className={cn('p-6', className)}>
                <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
                    <span className="text-neutral-600">Loading shipping methods...</span>
                </div>
            </Card>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive" className={className}>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    if (methods.length === 0) {
        return (
            <Alert className={className}>
                <AlertDescription>
                    No shipping methods available. Please check your postal code.
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
                {zoneInfo && (
                    <p className="mt-1 flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <MapPin className="h-4 w-4" />
                        Shipping zone: {zoneInfo.name}
                    </p>
                )}
            </div>

            <RadioGroup value={selectedMethod} onValueChange={handleMethodSelect}>
                <div className="space-y-3">
                    {methods.map((method) => (
                        <Card
                            key={method.id}
                            className={cn(
                                'cursor-pointer transition-all hover:border-primary-500',
                                selectedMethod === method.id
                                    ? 'border-primary-500 bg-primary-50/50 ring-2 ring-primary-500 dark:bg-primary-950/20'
                                    : 'border-neutral-200 dark:border-neutral-800'
                            )}
                            onClick={() => handleMethodSelect(method.id)}
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
                                                {method.title}
                                            </Label>
                                            <span className="font-bold text-primary-700 dark:text-primary-400">
                                                {method.cost === 0 ? (
                                                    <span className="text-green-600 dark:text-green-400">
                                                        Free
                                                    </span>
                                                ) : (
                                                    formatPrice(method.cost, 'SEK')
                                                )}
                                            </span>
                                        </div>
                                        {method.description && (
                                            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                                                {method.description}
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
