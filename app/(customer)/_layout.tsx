import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Grid, ShoppingBag, User } from 'lucide-react-native';
import colors from '@/constants/colors';

export default function CustomerLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray[500],
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.gray[200],
          elevation: 0,
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.gray[200],
        },
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color, size }) => <Grid size={size} color={color} />,
          headerTitle: 'All Categories',
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, size }) => <ShoppingBag size={size} color={color} />,
          headerTitle: 'My Orders',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
          headerTitle: 'My Profile',
        }}
      />
    </Tabs>
  );
}