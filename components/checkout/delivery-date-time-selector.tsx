'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, addDays, isWeekend, isSameDay } from 'date-fns';

interface DeliveryDateTimeSelectorProps {
    selectedDate?: Date;
    selectedTime?: string;
    onDateChange: (date: Date) => void;
    onTimeChange: (time: string) => void;
    className?: string;
}

// Weekday time slots: 11:00 AM - 8:00 PM (2-hour slots)
const WEEKDAY_TIME_SLOTS = [
    '11:00 AM - 1:00 PM',
    '1:00 PM - 3:00 PM',
    '3:00 PM - 5:00 PM',
    '5:00 PM - 7:00 PM',
    '7:00 PM - 8:00 PM',
];

// Weekend time slots: 11:00 AM - 7:00 PM (2-hour slots)
const WEEKEND_TIME_SLOTS = [
    '11:00 AM - 1:00 PM',
    '1:00 PM - 3:00 PM',
    '3:00 PM - 5:00 PM',
    '5:00 PM - 7:00 PM',
];

export function DeliveryDateTimeSelector({
    selectedDate,
    selectedTime,
    onDateChange,
    onTimeChange,
    className,
}: DeliveryDateTimeSelectorProps) {
    const [date, setDate] = useState<Date | undefined>(selectedDate);

    // Calculate date range (today + 30 days)
    const today = new Date();
    const maxDate = addDays(today, 30);

    // Get time slots based on selected date
    const getTimeSlots = (selectedDate?: Date) => {
        if (!selectedDate) return [];
        return isWeekend(selectedDate) ? WEEKEND_TIME_SLOTS : WEEKDAY_TIME_SLOTS;
    };

    const timeSlots = getTimeSlots(date);

    // Handle date change
    const handleDateChange = (newDate: Date | undefined) => {
        if (newDate) {
            setDate(newDate);
            onDateChange(newDate);
            // Reset time selection when date changes
            onTimeChange('');
        }
    };

    // Disable dates before today and after 30 days
    const disabledDates = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today || date > maxDate;
    };

    return (
        <Card className={cn('p-6', className)}>
            <div className="space-y-6">
                <div>
                    <h2 className="mb-4 flex items-center gap-2 font-heading text-2xl font-bold text-primary-950 dark:text-primary-50">
                        <CalendarIcon className="h-6 w-6" />
                        Delivery Date & Time
                    </h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Select your preferred delivery date (up to 30 days in advance) and time slot.
                    </p>
                </div>

                {/* Date Picker */}
                <div className="space-y-3">
                    <Label className="text-base font-semibold">
                        Select Date <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex justify-center rounded-lg border p-4">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateChange}
                            disabled={disabledDates}
                            className="rounded-md"
                            initialFocus
                        />
                    </div>
                    {date && (
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Selected: <strong>{format(date, 'EEEE, MMMM d, yyyy')}</strong>
                            {isWeekend(date) && (
                                <span className="ml-2 text-primary-600">(Weekend)</span>
                            )}
                        </p>
                    )}
                </div>

                {/* Time Slot Picker */}
                {date && (
                    <div className="space-y-3">
                        <Label className="flex items-center gap-2 text-base font-semibold">
                            <Clock className="h-4 w-4" />
                            Select Time Slot <span className="text-destructive">*</span>
                        </Label>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            {isWeekend(date)
                                ? 'Weekend hours: 11:00 AM - 7:00 PM'
                                : 'Weekday hours: 11:00 AM - 8:00 PM'}
                        </p>
                        <RadioGroup value={selectedTime} onValueChange={onTimeChange}>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {timeSlots.map((slot) => (
                                    <Card
                                        key={slot}
                                        className={cn(
                                            'cursor-pointer transition-all hover:border-primary-500',
                                            selectedTime === slot
                                                ? 'border-primary-500 bg-primary-50/50 ring-2 ring-primary-500 dark:bg-primary-950/20'
                                                : 'border-neutral-200 dark:border-neutral-800'
                                        )}
                                        onClick={() => onTimeChange(slot)}
                                    >
                                        <div className="flex items-center gap-3 p-4">
                                            <RadioGroupItem value={slot} id={slot} />
                                            <Label
                                                htmlFor={slot}
                                                className="flex-1 cursor-pointer font-medium"
                                            >
                                                {slot}
                                            </Label>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>
                )}

                {!date && (
                    <div className="rounded-lg bg-neutral-50 p-4 text-center dark:bg-neutral-900">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Please select a delivery date first
                        </p>
                    </div>
                )}
            </div>
        </Card>
    );
}
