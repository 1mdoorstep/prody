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
  User, 
  MapPin, 
  Package, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Info,
  CreditCard,
  Bell,
  Star,
  Truck,
  Clock,
  DollarSign
} from 'lucide-react-native';
import { useAuthStore } from '@/store/authStore';
import colors from '@/constants/colors';

// Mock user data
const userData = {
  name: 'Vikram Singh',
  phone: '+91 9876543210',
  email: 'vikram.singh@example.com',
  rating: 4.8,
  deliveries: 156,
  vehicle: 'Two-Wheeler',
  image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  wallet: {
    balance: 2500
  }
};

export default function DeliveryProfileScreen() {
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

  const navigateToDeliveryHistory = () => {
    router.push('/(delivery)/earnings');
  };

  const navigateToPaymentMethods = () => {
    Alert.alert('Payment Methods', 'You can manage your payment methods here. This feature will be available soon!');
  };

  const navigateToServiceArea = () => {
    Alert.alert('Service Area', 'You can update your service area here. This feature will be available soon!');
  };

  const navigateToVehicleInfo = () => {
    Alert.alert('Vehicle Information', 'You can update your vehicle information here. This feature will be available soon!');
  };

  const navigateToNotifications = () => {
    Alert.alert('Notifications', 'You can manage your notifications here. This feature will be available soon!');
  };

  const navigateToSettings = () => {
    Alert.alert('Settings', 'You can manage your settings here. This feature will be available soon!');
  };

  const navigateToHelp = () => {
    Alert.alert('Help & Support', 'Contact our support team for assistance. This feature will be available soon!');
  };

  const navigateToAbout = () => {
    router.push('/about');
  };

  const navigateToOngoingDeliveries = () => {
    router.push('/(delivery)/ongoing');
  };

  const handleAddMoney = () => {
    Alert.alert(
      "Add Money to Wallet",
      "How much would you like to add?",
      [
        {
          text: "₹500",
          onPress: () => {
            Alert.alert("Success", "₹500 added to your wallet successfully!");
            // In a real app, you would update the wallet balance here
          }
        },
        {
          text: "₹1000",
          onPress: () => {
            Alert.alert("Success", "₹1000 added to your wallet successfully!");
            // In a real app, you would update the wallet balance here
          }
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  };
  
  const menuItems = [
    {
      icon: <Package size={24} color={colors.primary} />,
      title: 'Delivery History',
      onPress: navigateToDeliveryHistory,
    },
    {
      icon: <Clock size={24} color={colors.primary} />,
      title: 'Ongoing Deliveries',
      onPress: navigateToOngoingDeliveries,
    },
    {
      icon: <DollarSign size={24} color={colors.primary} />,
      title: 'Earnings',
      onPress: navigateToDeliveryHistory,
    },
    {
      icon: <CreditCard size={24} color={colors.primary} />,
      title: 'Payment Methods',
      onPress: navigateToPaymentMethods,
    },
    {
      icon: <MapPin size={24} color={colors.primary} />,
      title: 'Service Area',
      onPress: navigateToServiceArea,
    },
    {
      icon: <Truck size={24} color={colors.primary} />,
      title: 'Vehicle Information',
      onPress: navigateToVehicleInfo,
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
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: user?.avatar || userData.image }} style={styles.profileImage} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user?.name || userData.name}</Text>
            <Text style={styles.phone}>{user?.phone || userData.phone}</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.rating}</Text>
            <View style={styles.ratingContainer}>
              <Star size={14} color={colors.secondary} fill={colors.secondary} />
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.deliveries}</Text>
            <Text style={styles.statLabel}>Deliveries</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.vehicle}</Text>
            <Text style={styles.statLabel}>Vehicle</Text>
          </View>
        </View>
        
        <View style={styles.walletContainer}>
          <View style={styles.walletHeader}>
            <Text style={styles.walletTitle}>Wallet Balance</Text>
            <TouchableOpacity style={styles.addMoneyButton} onPress={handleAddMoney}>
              <Text style={styles.addMoneyText}>+ Add Money</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.walletBalance}>₹{user?.wallet?.balance || userData.wallet.balance}</Text>
          <Text style={styles.walletNote}>
            {(user?.wallet?.balance || userData.wallet.balance) < 500 
              ? "You need to deposit ₹500 to start accepting deliveries" 
              : "You can now accept delivery requests"}
          </Text>
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
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 8,
  },
  editButton: {
    alignSelf: 'flex-start',
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
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: colors.gray[600],
    marginLeft: 4,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: colors.gray[200],
  },
  walletContainer: {
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
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  walletTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  addMoneyButton: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  addMoneyText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  walletBalance: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  walletNote: {
    fontSize: 12,
    color: colors.gray[600],
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
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTitle: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 16,
  },
  lastMenuItem: {
    borderBottomWidth: 0,
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