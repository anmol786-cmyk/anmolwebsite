import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, ProductVariation } from '@/types/woocommerce';

export interface CartItem {
  key: string;
  productId: number;
  variationId?: number;
  quantity: number;
  price: number;
  product: Product;
  variation?: ProductVariation;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (product: Product, quantity?: number, variation?: ProductVariation) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Computed values
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

// Generate unique key for cart item
function generateCartKey(productId: number, variationId?: number): string {
  return variationId ? `${productId}-${variationId}` : `${productId}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1, variation) => {
        set((state) => {
          const key = generateCartKey(product.id, variation?.id);
          const existingItem = state.items.find((item) => item.key === key);

          const price = variation
            ? parseFloat(variation.price)
            : parseFloat(product.price);

          if (existingItem) {
            // Update quantity of existing item
            return {
              items: state.items.map((item) =>
                item.key === key
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          // Add new item
          const newItem: CartItem = {
            key,
            productId: product.id,
            variationId: variation?.id,
            quantity,
            price,
            product,
            variation,
          };

          return {
            items: [...state.items, newItem],
          };
        });
      },

      removeItem: (key) => {
        set((state) => ({
          items: state.items.filter((item) => item.key !== key),
        }));
      },

      updateQuantity: (key, quantity) => {
        if (quantity <= 0) {
          get().removeItem(key);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.key === key ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
