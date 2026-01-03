import { WC_API_CONFIG } from './woocommerce/config';

export interface SiteSettings {
    site: {
        name: string;
        description: string;
        url: string;
        logo?: {
            url: string;
            width: number;
            height: number;
            id: number;
        };
        icon?: {
            url: string;
            id: number;
        };
    };
    woocommerce?: {
        store_address?: {
            address_1: string;
            city: string;
            postcode: string;
            country: string;
        };
        currency_symbol: string;
    };
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
        if (!baseUrl) {
            // Return default settings instead of null
            return getDefaultSiteSettings();
        }

        // Try Fourlines MCP endpoint first
        try {
            const mcpResponse = await fetch(`${baseUrl}/wp-json/fourlines-mcp/v1/settings`, {
                next: { revalidate: 3600 }
            });

            if (mcpResponse.ok) {
                return await mcpResponse.json();
            }
        } catch (mcpError) {
            // Fourlines MCP not available, fall through to standard API
        }

        // Fallback to standard WordPress API
        const [siteInfo, wcSettings] = await Promise.allSettled([
            fetch(`${baseUrl}/wp-json/`, { next: { revalidate: 3600 } }).then(r => r.ok ? r.json() : null),
            fetch(`${baseUrl}/wp-json/wc/v3/settings/general`, {
                headers: getWooCommerceAuthHeaders(),
                next: { revalidate: 3600 }
            }).then(r => r.ok ? r.json() : null).catch(() => null)
        ]);

        const site = siteInfo.status === 'fulfilled' ? siteInfo.value : null;
        const wc = wcSettings.status === 'fulfilled' ? wcSettings.value : null;

        if (!site) {
            return getDefaultSiteSettings();
        }

        return {
            site: {
                name: site.name || 'Anmol Sweets & Restaurant',
                description: site.description || 'Best Indian & Pakistani Food in Stockholm',
                url: site.url || baseUrl,
                logo: site.site_logo ? {
                    url: site.site_logo,
                    width: 200,
                    height: 200,
                    id: 0
                } : undefined,
                icon: site.site_icon_url ? {
                    url: site.site_icon_url,
                    id: 0
                } : undefined
            },
            woocommerce: wc ? {
                currency_symbol: wc.find((s: any) => s.id === 'woocommerce_currency')?.value || 'SEK'
            } : undefined
        };
    } catch (error) {
        // Silently fallback to defaults during build
        return getDefaultSiteSettings();
    }
}

function getWooCommerceAuthHeaders(): HeadersInit {
    const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY || process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET || process.env.WC_CONSUMER_SECRET;

    if (consumerKey && consumerSecret) {
        const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
        return {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        };
    }
    return {};
}

function getDefaultSiteSettings(): SiteSettings {
    return {
        site: {
            name: 'Anmol Sweets & Restaurant',
            description: 'Best Indian & Pakistani Food in Stockholm',
            url: process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://anmolsweets.se'
        }
    };
}
