import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the store type
interface Store {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  address: string;
  distance: string;
  deliveryTime: string;
  rating: number;
  reviews: number;
  isOpen: boolean;
}

// Default store for store owners
const defaultStore: Store = {
  id: 'store-1',
  name: 'My Store',
  description: 'A local grocery store with fresh products',
  image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  category: 'Grocery',
  address: '123 Main St, Anytown, USA',
  distance: '0.5 km',
  deliveryTime: '15-20 min',
  rating: 4.5,
  reviews: 120,
  isOpen: true,
};

interface StoreSettingsState {
  currentStore: Store;
  setCurrentStore: (store: Store) => void;
}

export const useStoreSettingsStore = create<StoreSettingsState>()(
  persist(
    (set) => ({
      currentStore: defaultStore,
      setCurrentStore: (store) => {
        set({ currentStore: store });
      },
    }),
    {
      name: 'store-settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);