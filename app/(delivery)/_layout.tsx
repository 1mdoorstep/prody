import React from "react";
import { Tabs } from "expo-router";
import { Home, Package, DollarSign, User } from "lucide-react-native";
import colors from "@/constants/colors";

export default function DeliveryTabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray[500],
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.gray[200],
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
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
          title: "Available",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ongoing"
        options={{
          title: "Ongoing",
          tabBarIcon: ({ color }) => <Package size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="earnings"
        options={{
          title: "Earnings",
          tabBarIcon: ({ color }) => <DollarSign size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}