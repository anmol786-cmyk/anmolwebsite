/**
 * Shipping Service
 * Handles all shipping calculations and validations via WordPress REST API
 */

const WP_API_BASE = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://cms.anmolsweets.se';

export interface ShippingMethod {
  id: string;
  method_id: string;
  label: string;
  cost: number;
  total_cost: number;
  tax: number;
  meta_data: Record<string, any>;
}

export interface RestrictedProduct {
  product_id: number;
  product_name: string;
  reason: string;
}

export interface ShippingCalculationResult {
  success: boolean;
  cart_subtotal?: number;
  cart_weight?: number;
  available_methods?: ShippingMethod[];
  restricted_products?: RestrictedProduct[];
  free_shipping_threshold?: number;
  free_shipping_available?: boolean;
  amount_to_free_shipping?: number;
}

export interface ShippingZone {
  zone_id: number;
  zone_name: string;
  zone_locations: any[];
  shipping_methods: Array<{
    id: string;
    title: string;
    enabled: boolean;
    method_id: string;
  }>;
}

export interface CartItem {
  productId: number;
  variationId?: number;
  quantity: number;
}

/**
 * Calculate shipping for cart items and address
 */
export async function calculateShipping(
  items: CartItem[],
  postcode: string,
  city: string = '',
  country: string = 'SE'
): Promise<ShippingCalculationResult> {
  try {
    const response = await fetch(`${WP_API_BASE}/wp-json/anmol/v1/shipping/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        postcode,
        city,
        country,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Shipping calculation error:', errorData);
      return {
        success: false,
        available_methods: [],
        restricted_products: [],
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to calculate shipping:', error);
    return {
      success: false,
      available_methods: [],
      restricted_products: [],
    };
  }
}

/**
 * Get all shipping zones
 */
export async function getShippingZones(): Promise<{ success: boolean; zones: ShippingZone[] }> {
  try {
    const response = await fetch(`${WP_API_BASE}/wp-json/anmol/v1/shipping/zones`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch shipping zones');
      return { success: false, zones: [] };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch shipping zones:', error);
    return { success: false, zones: [] };
  }
}

/**
 * Validate shipping for cart
 */
export async function validateShipping(
  items: CartItem[],
  postcode: string,
  city: string = '',
  country: string = 'SE'
): Promise<{
  success: boolean;
  valid: boolean;
  restricted_products: RestrictedProduct[];
  minimum_order_met: boolean;
  cart_subtotal: number;
}> {
  try {
    const response = await fetch(`${WP_API_BASE}/wp-json/anmol/v1/shipping/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        postcode,
        city,
        country,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        valid: false,
        restricted_products: [],
        minimum_order_met: false,
        cart_subtotal: 0,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to validate shipping:', error);
    return {
      success: false,
      valid: false,
      restricted_products: [],
      minimum_order_met: false,
      cart_subtotal: 0,
    };
  }
}

/**
 * Check if postcode is in Stockholm area
 */
export function isStockholmPostcode(postcode: string): boolean {
  const normalized = postcode.replace(/\s+/g, '');
  const prefix = normalized.substring(0, 3);

  if (prefix.length < 3 || !/^\d+$/.test(prefix)) {
    return false;
  }

  const prefixNum = parseInt(prefix, 10);
  return prefixNum >= 100 && prefixNum <= 199;
}

/**
 * Format shipping cost for display
 */
export function formatShippingCost(cost: number): string {
  if (cost === 0) {
    return 'Free';
  }
  return `${cost.toFixed(2)} kr`;
}
