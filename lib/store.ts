import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (slug: string, variant?: string) => void;
  updateQuantity: (slug: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) => i.slug === newItem.slug && i.variant === newItem.variant
          );
          if (existingItemIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += newItem.quantity;
            return { items: updatedItems };
          }
          return { items: [...state.items, newItem] };
        });
      },
      removeItem: (slug, variant) => {
        set((state) => ({
          items: state.items.filter((i) => !(i.slug === slug && i.variant === variant))
        }));
      },
      updateQuantity: (slug, quantity, variant) => {
        set((state) => ({
          items: state.items.map((i) => 
            i.slug === slug && i.variant === variant ? { ...i, quantity } : i
          )
        }));
      },
      clearCart: () => set({ items: [] }),
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);