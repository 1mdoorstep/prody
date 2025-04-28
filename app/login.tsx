import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import colors from '@/constants/colors';

export default function LoginScreen() {
  const router = useRouter();
  const { setPhoneNumber, userRole } = useAuthStore();
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneChange = (text: string) => {
    // Remove non-numeric characters
    const cleaned = text.replace(/[^0-9]/g, '');
    setPhone(cleaned);
  };

  const handleContinue = () => {
    // Basic validation
    if (phone.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    // Set loading state
    setIsLoading(true);

    // Store phone number in auth store
    setPhoneNumber(phone);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Navigate to OTP verification screen
      router.push('/otp-verification');
    }, 1000);
  };

  const handleChangeRole = () => {
    router.push('/role-selection');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.content}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }}
            style={styles.logo}
          />
          
          <Text style={styles.title}>Login to QuickMart</Text>
          <Text style={styles.subtitle}>
            Enter your phone number to continue as a{' '}
            <Text style={styles.roleText}>
              {userRole === 'customer'
                ? 'Customer'
                : userRole === 'store'
                ? 'Store Owner'
                : 'Delivery Partner'}
            </Text>
          </Text>

          <View style={styles.inputContainer}>
            <View style={styles.countryCode}>
              <Text style={styles.countryCodeText}>+91</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={handlePhoneChange}
              maxLength={10}
              autoFocus
            />
          </View>

          <TouchableOpacity
            style={[styles.continueButton, isLoading && styles.continueButtonDisabled]}
            onPress={handleContinue}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.continueButtonText}>Continue</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.changeRoleButton} onPress={handleChangeRole}>
            <Text style={styles.changeRoleText}>Change Role</Text>
          </TouchableOpacity>

          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
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
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  roleText: {
    fontWeight: '600',
    color: colors.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  countryCode: {
    width: 60,
    height: 56,
    backgroundColor: colors.gray[100],
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRightWidth: 0,
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  input: {
    flex: 1,
    height: 56,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text,
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  continueButtonDisabled: {
    backgroundColor: colors.gray[400],
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  changeRoleButton: {
    alignSelf: 'center',
    marginBottom: 32,
  },
  changeRoleText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  termsText: {
    fontSize: 12,
    color: colors.gray[600],
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: colors.primary,
    fontWeight: '500',
  },
});