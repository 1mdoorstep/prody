import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useAuthStore } from '@/store/authStore';
import colors from '@/constants/colors';
import { User } from '@/types';

export default function OTPVerificationScreen() {
  const router = useRouter();
  const { phoneNumber, login, userRole } = useAuthStore();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isResendActive, setIsResendActive] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (timer > 0 && !isResendActive) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !isResendActive) {
      setIsResendActive(true);
    }
  }, [timer, isResendActive]);

  const handleOtpChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text[0]; // Only take the first character if multiple are pasted
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto focus to next input
    if (text !== '' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = () => {
    if (isResendActive) {
      // Simulate OTP resend
      Alert.alert('OTP Resent', `A new OTP has been sent to ${phoneNumber}`);
      setTimer(30);
      setIsResendActive(false);
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
    
    if (enteredOtp.length !== 4) {
      Alert.alert('Invalid OTP', 'Please enter a valid 4-digit OTP');
      return;
    }

    setIsVerifying(true);

    // Simulate OTP verification (in a real app, this would be an API call)
    setTimeout(() => {
      setIsVerifying(false);

      // For demo purposes, any OTP is valid
      // In a real app, you would validate the OTP with your backend
      
      // Make sure userRole is not null before creating the user
      const role = userRole || 'customer';
      
      // Create a mock user based on the role
      const mockUser: User = {
        id: '123456',
        name: role === 'customer' ? 'John Doe' : 
              role === 'store' ? 'City Hardware & Tools' : 'Vikram Singh',
        phone: phoneNumber,
        email: role === 'customer' ? 'john.doe@example.com' : 
               role === 'store' ? 'cityhardware@example.com' : 'vikram.singh@example.com',
        role: role,
        avatar: role === 'customer' ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' : 
                role === 'store' ? 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' : 
                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        wallet: {
          balance: role === 'delivery' ? 2500 : 0
        }
      };

      // Login the user
      login(mockUser);

      // Navigate to the appropriate screen based on user role
      if (role === 'customer') {
        router.replace('/(customer)');
      } else if (role === 'store') {
        router.replace('/(store)');
      } else if (role === 'delivery') {
        router.replace('/(delivery)');
      }
    }, 1500);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>Verification Code</Text>
          <Text style={styles.subtitle}>
            We have sent the verification code to{' '}
            {phoneNumber}
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={styles.otpInput}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                autoFocus={index === 0}
                selectionColor={colors.primary}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[styles.verifyButton, isVerifying && styles.verifyingButton]}
            onPress={handleVerifyOtp}
            disabled={isVerifying || otp.join('').length !== 4}
          >
            {isVerifying ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.verifyButtonText}>Verify</Text>
            )}
          </TouchableOpacity>

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive the code? </Text>
            {isResendActive ? (
              <TouchableOpacity onPress={handleResendOtp}>
                <Text style={styles.resendActiveText}>Resend</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.timerText}>{`Resend in ${timer}s`}</Text>
            )}
          </View>
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
    padding: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray[600],
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 40,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 12,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.text,
    backgroundColor: colors.gray[100],
  },
  verifyButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyingButton: {
    opacity: 0.7,
  },
  verifyButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    fontSize: 14,
    color: colors.gray[600],
  },
  resendActiveText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  timerText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray[500],
  },
});