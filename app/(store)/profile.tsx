import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Platform, 
  Alert, 
  Image,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Store, 
  MapPin, 
  Clock, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Info,
  CreditCard,
  Bell,
  Users,
  Package,
  BarChart
} from 'lucide-react-native';
import { useAuthStore } from '@/store/authStore';
import colors from '@/constants/colors';

// Mock store data
const storeData = {
  name: 'City Hardware & Tools',
  type: 'Hardware',
  address: '123 Main St, Anytown, Chennai',
  phone: '+91 9876543210',
  openingHours: '8:00 AM - 8:00 PM',
  image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
};

export default function StoreProfileScreen() {
  const router = useRouter();
  const { logout, user } = useAuthStore();
  
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
          onPress: () => {
            // First logout from the store
            logout();
            // Then navigate to splash screen
            router.replace('/splash');
          },
          style: "destructive"
        }
      ]
    );
  };

  const navigateToStoreInfo = () => {
    Alert.alert('Store Information', 'You can update your store details here. This feature will be available soon!');
  };

  const navigateToStaffManagement = () => {
    Alert.alert('Staff Management', 'You can manage your store staff here. This feature will be available soon!');
  };

  const navigateToPaymentMethods = () => {
    Alert.alert('Payment Methods', 'You can manage your payment methods here. This feature will be available soon!');
  };

  const navigateToNotifications = () => {
    Alert.alert('Notifications', 'You can manage your notifications here. This feature will be available soon!');
  };

  const navigateToSettings = () => {
    Alert.alert('Settings', 'You can manage your store settings here. This feature will be available soon!');
  };

  const navigateToHelp = () => {
    Alert.alert('Help & Support', 'Contact our support team for assistance. This feature will be available soon!');
  };

  const navigateToAbout = () => {
    router.push('/about');
  };

  const navigateToInventory = () => {
    router.push('/(store)/inventory');
  };

  const navigateToAnalytics = () => {
    router.push('/(store)/analytics');
  };
  
  const menuItems = [
    {
      icon: <Store size={24} color={colors.primary} />,
      title: 'Store Information',
      onPress: navigateToStoreInfo,
    },
    {
      icon: <Package size={24} color={colors.primary} />,
      title: 'Inventory Management',
      onPress: navigateToInventory,
    },
    {
      icon: <BarChart size={24} color={colors.primary} />,
      title: 'Analytics & Reports',
      onPress: navigateToAnalytics,
    },
    {
      icon: <Users size={24} color={colors.primary} />,
      title: 'Staff Management',
      onPress: navigateToStaffManagement,
    },
    {
      icon: <CreditCard size={24} color={colors.primary} />,
      title: 'Payment Methods',
      onPress: navigateToPaymentMethods,
    },
    {
      icon: <Bell size={24} color={colors.primary} />,
      title: 'Notifications',
      onPress: navigateToNotifications,
    },
    {
      icon: <Settings size={24} color={colors.primary} />,
      title: 'Settings',
      onPress: navigateToSettings,
    },
    {
      icon: <HelpCircle size={24} color={colors.primary} />,
      title: 'Help & Support',
      onPress: navigateToHelp,
    },
    {
      icon: <Info size={24} color={colors.primary} />,
      title: 'About Us',
      onPress: navigateToAbout,
    },
  ];
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.storeImageContainer}>
            <Image source={{ uri: user?.avatar || storeData.image }} style={styles.storeImage} />
          </View>
          <View style={styles.storeInfo}>
            <Text style={styles.storeName}>{user?.name || storeData.name}</Text>
            <Text style={styles.storeType}>{storeData.type}</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <MapPin size={20} color={colors.primary} />
            <Text style={styles.detailText}>{storeData.address}</Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={20} color={colors.primary} />
            <Text style={styles.detailText}>{storeData.openingHours}</Text>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>124</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>16</Text>
            <Text style={styles.statLabel}>Products</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4.7</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.white,
    padding: 16,
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
  storeImageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  storeImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.white,
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
  storeInfo: {
    alignItems: 'center',
  },
  storeName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  storeType: {
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 12,
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
  detailsContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
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
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: colors.gray[700],
    marginLeft: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
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
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.gray[600],
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: colors.gray[200],
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