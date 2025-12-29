'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart-store';
import { MapPin } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface ShippingCalculatorProps {
    className?: string;
}

export function ShippingCalculator({ className }: ShippingCalculatorProps) {
    const { shippingAddress, setShippingAddress } = useCartStore();

    const [postcode, setPostcode] = useState(shippingAddress?.postcode || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [country, setCountry] = useState(shippingAddress?.country || 'SE');

    const handleCalculate = () => {
        if (!postcode || !city) {
            return;
        }

        setShippingAddress({
            postcode,
            city,
            country,
        });
    };

    // Auto-calculate when all fields are filled
    useEffect(() => {
        if (postcode && city) {
            const timer = setTimeout(() => {
                handleCalculate();
            }, 500); // Debounce for 500ms

            return () => clearTimeout(timer);
        }
    }, [postcode, city, country]);

    return (
        <Card className={className}>
            <div className="p-6">
                <h2 className="mb-4 flex items-center gap-2 font-heading text-2xl font-bold text-primary-950 dark:text-primary-50">
                    <MapPin className="h-6 w-6" />
                    Shipping Address
                </h2>

                <div className="space-y-4">
                    {/* Country */}
                    <div className="space-y-2">
                        <Label htmlFor="country">
                            Country <span className="text-destructive">*</span>
                        </Label>
                        <Select value={country} onValueChange={setCountry}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="SE">Sweden</SelectItem>
                                <SelectItem value="NO">Norway</SelectItem>
                                <SelectItem value="DK">Denmark</SelectItem>
                                <SelectItem value="FI">Finland</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {/* Postal Code */}
                        <div className="space-y-2">
                            <Label htmlFor="postcode">
                                Postal Code <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="postcode"
                                placeholder="123 45"
                                value={postcode}
                                onChange={(e) => setPostcode(e.target.value)}
                            />
                            <p className="text-xs text-neutral-500">
                                Enter your postal code to see shipping options
                            </p>
                        </div>

                        {/* City */}
                        <div className="space-y-2">
                            <Label htmlFor="city">
                                City <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="city"
                                placeholder="Stockholm"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Info box for Stockholm restrictions */}
                    {country === 'SE' && (
                        <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-950/20">
                            <p className="text-sm text-amber-800 dark:text-amber-200">
                                <strong>Note:</strong> Restaurant food items can only be delivered
                                within Stockholm area (postcodes 100 00 - 199 99).
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}
