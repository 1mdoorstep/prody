import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { useCartStore } from '@/store/cartStore';
import Button from '@/components/common/Button';
import colors from '@/constants/colors';

interface CartSummaryProps {
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ onCheckout }) => {
  const { items, getTotalPrice } = useCartStore();
  
  const subtotal = getTotalPrice();
  const deliveryFee = 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>
      
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Delivery Fee</Text>
        <Text style={styles.value}>${deliveryFee.toFixed(2)}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Tax</Text>
        <Text style={styles.value}>${tax.toFixed(2)}</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>
      
      <Button 
        title="Proceed to Checkout" 
        onPress={onCheckout} 
        fullWidth 
        size="large"
        disabled={items.length === 0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
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
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: colors.gray[600],
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray[200],
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
});

export default CartSummary;