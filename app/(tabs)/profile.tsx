import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  User, 
  MapPin, 
  ShoppingBag, 
  Heart, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Info
} from 'lucide-react-native';
import { useUserStore } from '@/store/userStore';
import { useAuthStore } from '@/store/authStore';
import colors from '@/constants/colors';

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useUserStore();
  const { logout } = useAuthStore();
  
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Logout", 
          onPress: () => logout(),
          style: "destructive"
        }
      ]
    );
  };
  
  const menuItems = [
    {
      icon: <ShoppingBag size={24} color={colors.primary} />,
      title: 'My Orders',
      onPress: () => router.push('/orders'),
    },
    {
      icon: <Heart size={24} color={colors.primary} />,
      title: 'Favorites',
      onPress: () => console.log('Favorites pressed'),
    },
    {
      icon: <MapPin size={24} color={colors.primary} />,
      title: 'Addresses',
      onPress: () => router.push('/addresses'),
    },
    {
      icon: <Settings size={24} color={colors.primary} />,
      title: 'Settings',
      onPress: () => console.log('Settings pressed'),
    },
    {
      icon: <HelpCircle size={24} color={colors.primary} />,
      title: 'Help & Support',
      onPress: () => console.log('Help pressed'),
    },
    {
      icon: <Info size={24} color={colors.primary} />,
      title: 'About Us',
      onPress: () => router.push('/about'),
    },
  ];
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <User size={40} color={colors.white} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{user?.name || 'Guest User'}</Text>
          <Text style={styles.phone}>{user?.phone || '+91 1234567890'}</Text>
          <Text style={styles.email}>{user?.email || 'guest@example.com'}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.menuItem,
              index === menuItems.length - 1 && styles.lastMenuItem
            ]}
            onPress={item.onPress}
          >
            <View style={styles.menuItemLeft}>
              {item.icon}
              <Text style={styles.menuItemTitle}>{item.title}</Text>
            </View>
            <ChevronRight size={20} color={colors.gray[400]} />
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <LogOut size={20} color={colors.error} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
      
      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  profileImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 2,
  },
  phone: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 2,
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  menuContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTitle: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
    marginLeft: 8,
  },
  versionText: {
    fontSize: 14,
    color: colors.gray[500],
    textAlign: 'center',
    marginBottom: 32,
  },
});