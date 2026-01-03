/**
 * WhatsApp Message Formatters
 * Utility functions for formatting WhatsApp messages
 */

import type {
  WhatsAppProductMessage,
  WhatsAppOrderMessage,
  WhatsAppShippingAddress,
  WhatsAppBillingAddress,
} from '@/types/whatsapp';
import type { VariationAttribute } from '@/types/woocommerce';

/**
 * Formats price with currency symbol
 * @param price - Price string (e.g., "99.00")
 * @param currency - Currency code (e.g., "SEK", "USD")
 * @returns Formatted price string (e.g., "99.00 SEK")
 */
export function formatPrice(price: string, currency: string = 'SEK'): string {
  const numPrice = parseFloat(price);
  if (isNaN(numPrice)) return price;

  return `${numPrice.toFixed(2)} ${currency}`;
}

/**
 * Formats product variation attributes as a readable string
 * @param attributes - Array of variation attributes
 * @returns Formatted variation string (e.g., "Size: Large, Color: Red")
 */
export function formatVariation(attributes: VariationAttribute[]): string {
  if (!attributes || attributes.length === 0) return '';

  return attributes
    .map((attr) => `${attr.name}: ${attr.option}`)
    .join(', ');
}

/**
 * Formats shipping or billing address as a readable string
 * @param address - Address object
 * @returns Formatted address string
 */
export function formatAddress(
  address: (WhatsAppShippingAddress | WhatsAppBillingAddress) & {
    first_name?: string;
    last_name?: string;
    phone?: string;
  }
): string {
  const lines: string[] = [];

  if (address.first_name || address.last_name) {
    lines.push(`${address.first_name || ''} ${address.last_name || ''}`.trim());
  }

  lines.push(address.address_1);

  if (address.address_2) {
    lines.push(address.address_2);
  }

  lines.push(`${address.postcode} ${address.city}`);

  if (address.state) {
    lines.push(address.state);
  }

  lines.push(address.country);

  if ('phone' in address && address.phone) {
    lines.push(`Tel: ${address.phone}`);
  }

  return lines.filter(Boolean).join('\n');
}

/**
 * Formats product inquiry message for WhatsApp
 * @param data - Product message data
 * @returns Formatted WhatsApp message
 */
export function formatProductMessage(data: WhatsAppProductMessage): string {
  const lines: string[] = [];

  lines.push('🛍️ *Product Inquiry*');
  lines.push('');

  if (data.customMessage) {
    lines.push(data.customMessage);
    lines.push('');
  } else {
    lines.push('Hi! I am interested in this product:');
    lines.push('');
  }

  lines.push(`*Product:* ${data.productName}`);

  if (data.variation) {
    lines.push(`*Variation:* ${data.variation}`);
  }

  lines.push(`*Quantity:* ${data.quantity}`);
  lines.push(`*Price:* ${data.price}`);
  lines.push('');
  lines.push(`🔗 ${data.productUrl}`);

  return lines.join('\n');
}

/**
 * Formats order message for WhatsApp
 * @param data - Order message data
 * @returns Formatted WhatsApp message
 */
export function formatOrderMessage(data: WhatsAppOrderMessage): string {
  const lines: string[] = [];

  lines.push('🛒 *New Order Placed*');
  lines.push('');
  lines.push(`*Order #:* ${data.orderNumber}`);
  lines.push(`*Order ID:* ${data.orderId}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('📦 *Order Items:*');
  lines.push('');

  // Format items
  data.items.forEach((item, index) => {
    lines.push(`${index + 1}. *${item.name}*`);

    if (item.variation) {
      lines.push(`   ${item.variation}`);
    }

    lines.push(`   Qty: ${item.quantity} × ${item.price}`);
    lines.push('');
  });

  lines.push('---');
  lines.push('');
  lines.push('💰 *Order Total:*');
  lines.push('');
  lines.push(`Subtotal: ${data.subtotal}`);

  if (data.shipping) {
    lines.push(`Shipping: ${data.shipping}`);
  }

  if (data.tax) {
    lines.push(`Tax: ${data.tax}`);
  }

  lines.push(`*Total: ${data.total}*`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('📍 *Shipping Address:*');
  lines.push('');
  lines.push(data.shippingAddress);

  if (data.billingAddress && data.billingAddress !== data.shippingAddress) {
    lines.push('');
    lines.push('📧 *Billing Address:*');
    lines.push('');
    lines.push(data.billingAddress);
  }

  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push(`💳 *Payment Method:* ${data.paymentMethod}`);

  if (data.orderNotes) {
    lines.push('');
    lines.push('📝 *Order Notes:*');
    lines.push(data.orderNotes);
  }

  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('🔗 *Order Details:*');
  lines.push(data.orderUrl);
  lines.push('');
  lines.push('Thank you for your order! 🙏');

  return lines.join('\n');
}

/**
 * Formats cart message for WhatsApp (without order number)
 * @param data - Cart message data with items and totals
 * @returns Formatted WhatsApp message
 */
export function formatCartMessage(data: {
  items: Array<{
    name: string;
    quantity: number;
    price: string;
    variation?: string;
  }>;
  subtotal: string;
  shipping?: string;
  tax?: string;
  total: string;
  customerName?: string;
  customerPhone?: string;
}): string {
  const lines: string[] = [];

  lines.push('🛒 *Cart Summary*');
  lines.push('');

  if (data.customerName) {
    lines.push(`*Customer:* ${data.customerName}`);
  }

  if (data.customerPhone) {
    lines.push(`*Phone:* ${data.customerPhone}`);
  }

  if (data.customerName || data.customerPhone) {
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  lines.push('📦 *Items:*');
  lines.push('');

  data.items.forEach((item, index) => {
    lines.push(`${index + 1}. *${item.name}*`);

    if (item.variation) {
      lines.push(`   ${item.variation}`);
    }

    lines.push(`   Qty: ${item.quantity} × ${item.price}`);
    lines.push('');
  });

  lines.push('---');
  lines.push('');
  lines.push('💰 *Total:*');
  lines.push('');
  lines.push(`Subtotal: ${data.subtotal}`);

  if (data.shipping) {
    lines.push(`Shipping: ${data.shipping}`);
  }

  if (data.tax) {
    lines.push(`Tax: ${data.tax}`);
  }

  lines.push(`*Total: ${data.total}*`);

  return lines.join('\n');
}
