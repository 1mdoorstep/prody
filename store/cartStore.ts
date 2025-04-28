import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemsCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(item => item.productId === product.id);
        
        if (existingItem) {
          set({
            items: items.map(item => 
              item.productId === product.id 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          const newItem: CartItem = {
            id: `cart-item-${Date.now()}`,
            productId: product.id,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            image: product.image,
            quantity,
            storeId: product.storeId,
            storeName: product.storeName
          };
          
          set({ items: [...items, newItem] });
        }
      },
      
      removeItem: (itemId) => {
        const { items } = get();
        set({ items: items.filter(item => item.id !== itemId) });
      },
      
      updateQuantity: (itemId, quantity) => {
        const { items } = get();
        
        if (quantity <= 0) {
          set({ items: items.filter(item => item.id !== itemId) });
        } else {
          set({
            items: items.map(item => 
              item.id === itemId 
                ? { ...item, quantity }
                : item
            )
          });
        }
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const itemPrice = item.discountPrice || item.price;
          return total + (itemPrice * item.quantity);
        }, 0);
      },
      
      getItemsCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);