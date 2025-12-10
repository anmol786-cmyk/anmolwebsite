import { siteConfig } from '@/site.config';
import { restaurantConfig } from '@/config/restaurant.config';
import { brandConfig } from '@/config/brand.config';

export function RestaurantSchema() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Restaurant',
        name: siteConfig.site_name,
        image: [
            `${siteConfig.site_domain}/og-image.jpg`,
            // Add more high-quality images here
        ],
        '@id': siteConfig.site_domain,
        url: siteConfig.site_domain,
        telephone: restaurantConfig.phone,
        menu: `${siteConfig.site_domain}/menu`,
        servesCuisine: 'Indian, Pakistani, Bengali',
        priceRange: '$$',
        address: {
            '@type': 'PostalAddress',
            streetAddress: restaurantConfig.address.street,
            addressLocality: restaurantConfig.address.city,
            postalCode: restaurantConfig.address.postcode,
            addressCountry: 'SE',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 59.2587, // Approximate coordinates for Vårby Allé 24
            longitude: 17.8767,
        },
        openingHoursSpecification: restaurantConfig.openingHours.map((day) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: day.day,
            opens: day.open,
            closes: day.close,
        })),
        sameAs: [
            brandConfig.social.facebook,
            brandConfig.social.instagram,
            brandConfig.social.youtube,
            brandConfig.social.tiktok,
        ].filter(Boolean),
        potentialAction: {
            '@type': 'ReserveAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${siteConfig.site_domain}/reservations`,
                inLanguage: 'en-US',
                actionPlatform: [
                    'http://schema.org/DesktopWebPlatform',
                    'http://schema.org/IOSPlatform',
                    'http://schema.org/AndroidPlatform',
                ],
            },
            result: {
                '@type': 'FoodEstablishmentReservation',
                name: 'Reserve a table',
            },
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
