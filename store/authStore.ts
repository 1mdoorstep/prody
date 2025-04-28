import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  userRole: 'customer' | 'store' | 'delivery' | null;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  setUserRole: (role: 'customer' | 'store' | 'delivery') => void;
  login: (user: User) => void;
  logout: () => void;
  switchRole: (role: 'customer' | 'store' | 'delivery') => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      userRole: null,
      phoneNumber: '',
      
      setPhoneNumber: (phoneNumber) => {
        set({ phoneNumber });
      },
      
      setUserRole: (role) => {
        set({ userRole: role });
      },
      
      login: (user) => {
        set({
          isAuthenticated: true,
          user,
          userRole: user.role as 'customer' | 'store' | 'delivery',
        });
      },
      
      logout: () => {
        // Clear all auth-related state
        set({
          isAuthenticated: false,
          user: null,
          userRole: null,
          phoneNumber: '',
        });
      },

      // Add a function to switch between roles without logging out
      switchRole: (role) => {
        const { user } = get();
        if (!user) return;

        // Create a new user object with the updated role
        const updatedUser = {
          ...user,
          role,
        };

        set({
          user: updatedUser,
          userRole: role,
        });
      },

      // Update user data
      updateUser: (userData) => {
        const { user } = get();
        if (!user) return;

        set({
          user: {
            ...user,
            ...userData,
          },
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);