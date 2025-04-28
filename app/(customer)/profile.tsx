import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  Platform,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  User, 
  MapPin, 
  ShoppingBag, 
  CreditCard, 
  Heart, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight
} from 'lucide-react-native';
import { useAuthStore } from '@/store/authStore';
import colors from '@/constants/colors';
import Button from '@/components/common/Button';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            // First logout from the store
            logout();
            // Then navigate to splash screen
            router.replace('/splash');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const navigateToOrders = () => {
    router.push('/orders');
  };

  const navigateToAddresses = () => {
    router.push('/addresses');
  };

  const navigateToPayments = () => {
    Alert.alert('Coming Soon', 'Payment methods feature will be available soon!');
  };

  const navigateToFavorites = () => {
    Alert.alert('Coming Soon', 'Favorites feature will be available soon!');
  };

  const navigateToSettings = () => {
    Alert.alert('Coming Soon', 'Settings feature will be available soon!');
  };

  const navigateToAbout = () => {
    router.push('/about');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }} 
            style={styles.profileImage} 
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name || 'Guest User'}</Text>
            <Text style={styles.profilePhone}>{user?.phone || '+91 XXXXXXXXXX'}</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={navigateToOrders}>
            <View style={styles.menuIconContainer}>
              <ShoppingBag size={20} color={colors.primary} />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>My Orders</Text>
            </View>
            <ChevronRight size={20} color={colors.gray[400]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={navigateToAddresses}>
            <View style={styles.menuIconContainer}>
              <MapPin size={20} color={colors.primary} />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>My Addresses</Text>
            </View>
            <ChevronRight size={20} color={colors.gray[400]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={navigateToPayments}>
            <View style={styles.menuIconContainer}>
              <CreditCard size={20} color={colors.primary} />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>Payment Methods</Text>
            </View>
            <ChevronRight size={20} color={colors.gray[400]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={navigateToFavorites}>
            <View style={styles.menuIconContainer}>
              <Heart size={20} color={colors.primary} />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>Favorites</Text>
            </View>
            <ChevronRight size={20} color={colors.gray[400]} />
          </TouchableOpacity>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={navigateToSettings}>
            <View style={styles.menuIconContainer}>
              <Settings size={20} color={colors.gray[600]} />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>App Settings</Text>
            </View>
            <ChevronRight size={20} color={colors.gray[400]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={navigateToAbout}>
            <View style={styles.menuIconContainer}>
              <HelpCircle size={20} color={colors.gray[600]} />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>About Us</Text>
            </View>
            <ChevronRight size={20} color={colors.gray[400]} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="outline"
            icon={<LogOut size={20} color={colors.error} />}
            textStyle={{ color: colors.error }}
            style={{ borderColor: colors.error }}
          />
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
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
        elevation: 2,
      },
    }),
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuText: {
    fontSize: 14,
    color: colors.text,
  },
  logoutContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  versionText: {
    fontSize: 12,
    color: colors.gray[500],
  },
});