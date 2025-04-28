import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import colors from '@/constants/colors';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated, userRole } = useAuthStore();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Animation sequence
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-navigate after 2 seconds if authenticated
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        if (userRole === 'customer') {
          router.replace('/(customer)');
        } else if (userRole === 'store') {
          router.replace('/(store)');
        } else if (userRole === 'delivery') {
          router.replace('/(delivery)');
        } else {
          router.replace('/role-selection');
        }
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, userRole]);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      if (userRole === 'customer') {
        router.replace('/(customer)');
      } else if (userRole === 'store') {
        router.replace('/(store)');
      } else if (userRole === 'delivery') {
        router.replace('/(delivery)');
      } else {
        router.replace('/role-selection');
      }
    } else {
      router.replace('/role-selection');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY }],
          },
        ]}
      >
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }}
          style={styles.logo}
        />
        <Text style={styles.title}>QuickMart</Text>
        <Text style={styles.subtitle}>Your one-stop shop for everything you need</Text>
        
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: width * 0.8,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray[600],
    textAlign: 'center',
    marginBottom: 48,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});