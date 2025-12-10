export interface OpeningHours {
    day: string;
    open: string;
    close: string;
    closed?: boolean;
}

export interface RestaurantConfig {
    name: string;
    tagline: string;
    description: string;
    phone: string;
    email: string;
    address: {
        street: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
    };
    openingHours: OpeningHours[];
    deliveryOptions: {
        delivery: {
            enabled: boolean;
            minimumOrder: number;
            deliveryFee: number;
            freeDeliveryThreshold: number;
            estimatedTime: string;
            radius: number; // in km
        };
        pickup: {
            enabled: boolean;
            estimatedTime: string;
            discount: number; // percentage
        };
        dineIn: {
            enabled: boolean;
            reservationRequired: boolean;
        };
    };
    features: {
        halal: boolean;
        vegetarian: boolean;
        vegan: boolean;
        glutenFree: boolean;
        kidsMenu: boolean;
        catering: boolean;
    };
    social: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
    };
}

export const restaurantConfig: RestaurantConfig = {
    name: 'Anmol Sweets & Restaurant',
    tagline: 'Share the Sweetness',
    description: 'Experience the finest authentic Pakistani & Indian cuisine and traditional sweets in Stockholm. From aromatic biryanis to handcrafted mithai, every dish is a celebration of heritage and flavor.',
    phone: '+46 8 88 66 79',
    email: 'info@anmolsweets.se',
    address: {
        street: 'Fagerstagatan 13',
        city: 'Spånga',
        state: 'Stockholm',
        postcode: '163 53',
        country: 'Sweden',
    },
    openingHours: [
        { day: 'Monday', open: '10:00', close: '20:00' },
        { day: 'Tuesday', open: '10:00', close: '20:00' },
        { day: 'Wednesday', open: '10:00', close: '20:00' },
        { day: 'Thursday', open: '10:00', close: '20:00' },
        { day: 'Friday', open: '10:00', close: '20:00' },
        { day: 'Saturday', open: '10:00', close: '19:00' },
        { day: 'Sunday', open: '10:00', close: '19:00' },
    ],
    deliveryOptions: {
        delivery: {
            enabled: true,
            minimumOrder: 500, // SEK
            deliveryFee: 49, // SEK (Base fee, varies by area)
            freeDeliveryThreshold: 1500, // SEK
            estimatedTime: '11:00 - 19:00',
            radius: 10, // km
        },
        pickup: {
            enabled: true,
            estimatedTime: '30 mins',
            discount: 0, // No discount on pickup orders
        },
        dineIn: {
            enabled: true,
            reservationRequired: false,
        },
    },
    features: {
        halal: true,
        vegetarian: true,
        vegan: true,
        glutenFree: true,
        kidsMenu: true,
        catering: true,
    },
    social: {
        facebook: 'https://www.facebook.com/AnmolSweetsStockholm',
        instagram: 'https://www.instagram.com/anmolsweetsstockholm/',
        twitter: 'https://x.com/AnmolSweets',
    },
};

/**
 * Check if restaurant is currently open
 */
export function isRestaurantOpen(): boolean {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
    const currentTime = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    });

    const todayHours = restaurantConfig.openingHours.find(
        (h) => h.day === currentDay
    );

    if (!todayHours || todayHours.closed) {
        return false;
    }

    return currentTime >= todayHours.open && currentTime <= todayHours.close;
}

/**
 * Get next opening time
 */
export function getNextOpeningTime(): { day: string; time: string } | null {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });

    // Find current day index
    const currentDayIndex = restaurantConfig.openingHours.findIndex(
        (h) => h.day === currentDay
    );

    // Check remaining days this week
    for (let i = 1; i <= 7; i++) {
        const nextIndex = (currentDayIndex + i) % 7;
        const nextDay = restaurantConfig.openingHours[nextIndex];

        if (!nextDay.closed) {
            return {
                day: nextDay.day,
                time: nextDay.open,
            };
        }
    }

    return null;
}

/**
 * Get today's opening hours
 */
export function getTodayHours(): OpeningHours | null {
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return restaurantConfig.openingHours.find((h) => h.day === currentDay) || null;
}
