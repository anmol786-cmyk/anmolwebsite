/**
 * Brand Configuration
 *
 * Centralized branding for easy customization.
 * Change these values to rebrand the entire application.
 */

export const brandConfig = {
  // Business Information
  businessName: "Anmol Sweets & Restaurant",
  tagline: "Share the Sweetness",
  description: "Experience the authentic flavors of Pakistan & India in Stockholm",

  // Cuisine Type
  cuisineType: "Pakistani & Indian",
  cuisineDescription: "authentic Pakistani & Indian cuisine",

  // Contact Information
  contact: {
    address: "Fagerstagatan 13, 163 53 Spånga, Stockholm, Sweden",
    phone: "+46 8 88 66 79",
    phoneSecondary: "+46 76 917 84 56",
    whatsapp: "+46 76 917 84 56",
    email: "info@anmolsweets.se",
    reservationEmail: "info@anmolsweets.se",
    privacyEmail: "privacy@anmolsweets.se",
    googleMapsUrl: "https://maps.app.goo.gl/HWwZJyuCgem7AnEh7",
    googleBusinessProfile: "https://share.google/vOrxeEQR7Xgyg6K4U",
  },

  // Business Hours
  hours: {
    weekday: "Monday - Friday: 10:00 – 20:00",
    saturday: "Saturday: 10:00 – 19:00",
    sunday: "Sunday: 10:00 – 19:00",
    lunch: "Lunch Buffet: Mon-Fri 11:00 – 14:00 (139 SEK)",
    dinner: "Dinner: 17:00 – 20:00",
    weekend: "Weekend Breakfast (Halwa Puri): 10:30 – 14:00 (129 SEK)",
  },

  // Features
  features: {
    hasHalalCertification: true,
    hasVegetarianOptions: true,
    hasVeganOptions: true,
    hasDelivery: true,
    hasReservations: true,
    hasCatering: true,
  },

  // Dietary Options (for menu filters)
  dietaryOptions: [
    { id: 'vegetarian', label: 'Vegetarian', enabled: true },
    { id: 'vegan', label: 'Vegan', enabled: true },
    { id: 'spicy', label: 'Spicy', enabled: true },
    { id: 'halal', label: 'Halal', enabled: true },
    { id: 'gluten-free', label: 'Gluten Free', enabled: false },
  ],

  // Social Media
  social: {
    facebook: "https://www.facebook.com/AnmolSweetsStockholm",
    instagram: "https://www.instagram.com/anmolsweetsstockholm/",
    twitter: "https://x.com/AnmolSweets",
    youtube: "https://www.youtube.com/@anmolsweetsstockholm",
    tiktok: "https://www.tiktok.com/@anmolsweetsstockholm",
  },

  // Currency
  currency: {
    code: "SEK",
    symbol: "kr",
  },

  // SEO
  seo: {
    defaultTitle: "Anmol Sweets & Restaurant",
    titleTemplate: "%s - Anmol Sweets & Restaurant",
    defaultDescription: "Experience authentic Pakistani & Indian cuisine with traditional recipes and fresh ingredients in Stockholm",
    keywords: ["restaurant", "Pakistani", "Indian", "halal", "sweets", "mithai", "biryani", "curry", "Stockholm", "Spånga"],
  },
} as const;

// Type export for TypeScript
export type BrandConfig = typeof brandConfig;
