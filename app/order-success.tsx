import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image,
  Platform
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { CheckCircle, Package } from 'lucide-react-native';
import colors from '@/constants/colors';
import Button from '@/components/common/Button';

export default function OrderSuccessScreen() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  
  const handleViewOrder = () => {
    router.push(`/order-details/${orderId}`);
  };
  
  const handleContinueShopping = () => {
    router.replace('/(customer)');
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <CheckCircle size={80} color={colors.success} />
        </View>
        
        <Text style={styles.title}>Order Placed Successfully!</Text>
        <Text style={styles.subtitle}>Your order has been placed and is being processed.</Text>
        
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderIdLabel}>Order ID:</Text>
          <Text style={styles.orderId}>{orderId}</Text>
        </View>
        
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Package size={20} color={colors.primary} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>Estimated Delivery</Text>
              <Text style={styles.infoValue}>
                {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.thankYouText}>
          Thank you for shopping with Local Marketplace!
        </Text>
        
        <View style={styles.buttonsContainer}>
          <Button
            title="View Order"
            variant="outline"
            onPress={handleViewOrder}
            style={styles.viewOrderButton}
          />
          
          <Button
            title="Continue Shopping"
            onPress={handleContinueShopping}
            style={styles.continueButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: 'center',
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
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
    textAlign: 'center',
    marginBottom: 24,
  },
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  orderIdLabel: {
    fontSize: 16,
    color: colors.gray[600],
    marginRight: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  infoCard: {
    width: '100%',
    backgroundColor: colors.gray[50],
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoTextContainer: {
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  thankYouText: {
    fontSize: 16,
    color: colors.gray[700],
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 12,
  },
  viewOrderButton: {
    width: '100%',
  },
  continueButton: {
    width: '100%',
  },
});