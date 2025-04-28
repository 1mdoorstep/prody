import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Address } from '@/types';

interface UserState {
  user: User | null;
  recentSearches: string[];
  favoriteProducts: string[];
  setUser: (user: User | null) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (address: Address) => void;
  removeAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  toggleFavoriteProduct: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

// Mock user for demo purposes
const mockUser: User = {
  id: 'user1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '555-123-4567',
  addresses: [
    {
      id: 'addr1',
      name: 'Home',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      isDefault: true
    }
  ],
  defaultAddressId: 'addr1'
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: mockUser, // Using mock user for demo
      recentSearches: [],
      favoriteProducts: [],
      
      setUser: (user) => {
        set({ user });
      },
      
      addAddress: (addressData) => {
        const { user } = get();
        if (!user) return;
        
        const newAddress: Address = {
          ...addressData,
          id: `addr${Date.now()}`,
          isDefault: user.addresses.length === 0 ? true : addressData.isDefault
        };
        
        const updatedAddresses = [...user.addresses, newAddress];
        
        set({
          user: {
            ...user,
            addresses: updatedAddresses,
            defaultAddressId: newAddress.isDefault ? newAddress.id : user.defaultAddressId
          }
        });
      },
      
      updateAddress: (updatedAddress) => {
        const { user } = get();
        if (!user) return;
        
        const updatedAddresses = user.addresses.map(addr => 
          addr.id === updatedAddress.id ? updatedAddress : addr
        );
        
        set({
          user: {
            ...user,
            addresses: updatedAddresses,
            defaultAddressId: updatedAddress.isDefault ? updatedAddress.id : user.defaultAddressId
          }
        });
      },
      
      removeAddress: (addressId) => {
        const { user } = get();
        if (!user) return;
        
        const updatedAddresses = user.addresses.filter(addr => addr.id !== addressId);
        
        // If we removed the default address, set a new default if possible
        let defaultAddressId = user.defaultAddressId;
        if (addressId === user.defaultAddressId && updatedAddresses.length > 0) {
          updatedAddresses[0].isDefault = true;
          defaultAddressId = updatedAddresses[0].id;
        }
        
        set({
          user: {
            ...user,
            addresses: updatedAddresses,
            defaultAddressId
          }
        });
      },
      
      setDefaultAddress: (addressId) => {
        const { user } = get();
        if (!user) return;
        
        const updatedAddresses = user.addresses.map(addr => ({
          ...addr,
          isDefault: addr.id === addressId
        }));
        
        set({
          user: {
            ...user,
            addresses: updatedAddresses,
            defaultAddressId: addressId
          }
        });
      },
      
      addRecentSearch: (query) => {
        const { recentSearches } = get();
        // Remove duplicate if exists
        const filteredSearches = recentSearches.filter(s => s !== query);
        // Add to beginning of array and limit to 10 items
        set({
          recentSearches: [query, ...filteredSearches].slice(0, 10)
        });
      },
      
      clearRecentSearches: () => {
        set({ recentSearches: [] });
      },
      
      toggleFavoriteProduct: (productId) => {
        const { favoriteProducts } = get();
        const isFavorite = favoriteProducts.includes(productId);
        
        if (isFavorite) {
          set({
            favoriteProducts: favoriteProducts.filter(id => id !== productId)
          });
        } else {
          set({
            favoriteProducts: [...favoriteProducts, productId]
          });
        }
      },
      
      isFavorite: (productId) => {
        const { favoriteProducts } = get();
        return favoriteProducts.includes(productId);
      }
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);