import React from 'react';
import { Stack } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { useRouter, useSegments } from 'expo-router';

export default function RootLayout() {
  const { isAuthenticated, userRole } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();

  React.useEffect(() => {
    // Only redirect if we're on the initial render or when auth state changes
    if (segments.length === 0) return;
    
    const inAuthGroup = segments[0] === '(customer)' || segments[0] === '(store)' || segments[0] === '(delivery)';
    const inAuthFlow = segments[0] === 'login' || segments[0] === 'otp-verification' || segments[0] === 'role-selection';
    
    // Use setTimeout to ensure the Root Layout is mounted before navigation
    const timer = setTimeout(() => {
      if (!isAuthenticated && inAuthGroup) {
        // Redirect to role selection if not authenticated but trying to access auth-required screens
        router.replace('/role-selection');
      } else if (isAuthenticated && !inAuthGroup && !inAuthFlow && segments[0] !== 'index' && segments[0] !== 'splash') {
        // Redirect to appropriate role layout if authenticated and not in auth flow
        if (userRole === 'customer') {
          router.replace('/(customer)');
        } else if (userRole === 'store') {
          router.replace('/(store)');
        } else if (userRole === 'delivery') {
          router.replace('/(delivery)');
        } else {
          // If authenticated but no role, go to role selection
          router.replace('/role-selection');
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, segments, userRole]);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTintColor: '#333333',
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="splash" options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="role-selection" options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="otp-verification" options={{ headerShown: false }} />
      <Stack.Screen name="(customer)" options={{ headerShown: false }} />
      <Stack.Screen name="(store)" options={{ headerShown: false }} />
      <Stack.Screen name="(delivery)" options={{ headerShown: false }} />
      <Stack.Screen name="about" options={{ headerShown: true, title: 'About Us' }} />
      <Stack.Screen name="cart" options={{ headerShown: true, title: 'Shopping Cart' }} />
      <Stack.Screen name="checkout" options={{ headerShown: true, title: 'Checkout' }} />
      <Stack.Screen name="order-success" options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="order-details/[id]" options={{ headerShown: true, title: 'Order Details' }} />
      <Stack.Screen name="product/[id]" options={{ headerShown: true, title: 'Product Details' }} />
      <Stack.Screen name="category/[id]" options={{ headerShown: true, title: 'Category' }} />
      <Stack.Screen name="add-address" options={{ headerShown: true, title: 'Add New Address' }} />
      <Stack.Screen name="addresses" options={{ headerShown: true, title: 'My Addresses' }} />
      <Stack.Screen name="orders" options={{ headerShown: true, title: 'My Orders' }} />
      <Stack.Screen name="search" options={{ headerShown: true, title: 'Search' }} />
      <Stack.Screen name="store/[id]" options={{ headerShown: true, title: 'Store Details' }} />
    </Stack>
  );
}