'use client';

import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Users, Calculator, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';

// Base prices per person (SEK)
const prices = {
    wedding: 350,
    corporate: 250,
    birthday: 200,
    party: 220,
    other: 200,
};

const serviceFeePerGuest = 100; // Waiters, setup, cleanup

export function CateringCalculator() {
    const [guests, setGuests] = useState([50]);
    const [eventType, setEventType] = useState('wedding');
    const [includeService, setIncludeService] = useState(false);
    const [estimatedPrice, setEstimatedPrice] = useState(0);

    useEffect(() => {
        const basePrice = prices[eventType as keyof typeof prices] || 200;
        let total = basePrice * guests[0];

        if (includeService) {
            total += serviceFeePerGuest * guests[0];
        }

        // Bulk discount
        if (guests[0] > 100) total *= 0.95;
        if (guests[0] > 200) total *= 0.90;

        setEstimatedPrice(Math.round(total));
    }, [guests, eventType, includeService]);

    const scrollToQuote = () => {
        const element = document.getElementById('quote');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Card className="overflow-hidden border-none bg-white shadow-xl dark:bg-neutral-900">
            <div className="bg-primary-900 p-6 text-white">
                <div className="flex items-center gap-3">
                    <Calculator className="h-6 w-6 text-secondary-500" />
                    <h3 className="font-heading text-xl font-bold">Quick Price Estimator</h3>
                </div>
                <p className="mt-2 text-sm text-primary-200">
                    Get an instant estimate for your event catering.
                </p>
            </div>

            <div className="space-y-8 p-6">
                {/* Guest Count Slider */}
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <Label className="text-base font-medium">Number of Guests</Label>
                        <span className="font-bold text-primary-700 dark:text-primary-400">
                            {guests[0]} people
                        </span>
                    </div>
                    <Slider
                        value={guests}
                        onValueChange={setGuests}
                        max={500}
                        min={20}
                        step={10}
                        className="py-4"
                    />
                    <div className="flex justify-between text-xs text-neutral-500">
                        <span>20</span>
                        <span>250</span>
                        <span>500+</span>
                    </div>
                </div>

                {/* Event Type */}
                <div className="space-y-2">
                    <Label>Event Type</Label>
                    <Select value={eventType} onValueChange={setEventType}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="wedding">Wedding / Mehndi (Premium)</SelectItem>
                            <SelectItem value="corporate">Corporate Event</SelectItem>
                            <SelectItem value="birthday">Birthday Party</SelectItem>
                            <SelectItem value="party">Social Gathering</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Service Toggle */}
                <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
                    <div className="space-y-0.5">
                        <Label htmlFor="service-mode" className="text-base">Full Service</Label>
                        <p className="text-xs text-neutral-500">
                            Includes waiters, setup, and cleanup
                        </p>
                    </div>
                    <Checkbox
                        id="service-mode"
                        checked={includeService}
                        onCheckedChange={(checked) => setIncludeService(checked as boolean)}
                    />
                </div>

                {/* Total Estimate */}
                <div className="rounded-lg bg-neutral-50 p-6 text-center dark:bg-neutral-800/50">
                    <p className="text-sm font-medium text-neutral-500">Estimated Total</p>
                    <motion.div
                        key={estimatedPrice}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="my-2 font-heading text-4xl font-bold text-primary-900 dark:text-primary-100"
                    >
                        {formatPrice(estimatedPrice.toString(), 'SEK')}
                    </motion.div>
                    <p className="text-xs text-neutral-400">
                        *Approximate price. Final quote may vary based on menu selection.
                    </p>
                </div>

                <Button
                    onClick={scrollToQuote}
                    className="w-full bg-secondary-500 text-primary-950 hover:bg-secondary-400 font-bold"
                    size="lg"
                >
                    Get Official Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </Card>
    );
}
