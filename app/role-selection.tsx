import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  SafeAreaView,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import colors from '@/constants/colors';

const roles = [
  {
    id: 'customer',
    title: 'Customer',
    description: 'Order products from local stores and get them delivered to your doorstep.',
    image: 'https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'store',
    title: 'Store Owner',
    description: 'List your products and manage orders from customers.',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'delivery',
    title: 'Delivery Partner',
    description: 'Deliver products from stores to customers and earn money.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
];

export default function RoleSelectionScreen() {
  const router = useRouter();
  const { setUserRole } = useAuthStore();
  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleContinue = () => {
    if (selectedRole) {
      // Set the selected role in the auth store
      setUserRole(selectedRole as 'customer' | 'store' | 'delivery');
      
      // Navigate to login screen
      router.push('/login');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Choose Your Role</Text>
          <Text style={styles.subtitle}>Select how you want to use the app</Text>
          
          <View style={styles.rolesContainer}>
            {roles.map((role) => (
              <TouchableOpacity
                key={role.id}
                style={[
                  styles.roleCard,
                  selectedRole === role.id && styles.selectedRoleCard,
                ]}
                onPress={() => handleRoleSelect(role.id)}
                activeOpacity={0.8}
              >
                <Image source={{ uri: role.image }} style={styles.roleImage} />
                <View style={styles.roleInfo}>
                  <Text style={styles.roleTitle}>{role.title}</Text>
                  <Text style={styles.roleDescription}>{role.description}</Text>
                </View>
                <View style={styles.radioContainer}>
                  <View
                    style={[
                      styles.radioOuter,
                      selectedRole === role.id && styles.radioOuterSelected,
                    ]}
                  >
                    {selectedRole === role.id && <View style={styles.radioInner} />}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedRole && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!selectedRole}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 32,
    textAlign: 'center',
  },
  rolesContainer: {
    marginBottom: 32,
  },
  roleCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.gray[200],
    alignItems: 'center',
  },
  selectedRoleCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  roleImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  roleInfo: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    color: colors.gray[600],
    lineHeight: 20,
  },
  radioContainer: {
    marginLeft: 12,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.gray[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: colors.gray[300],
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});