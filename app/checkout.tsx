import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Platform
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { 
  MapPin, 
  CreditCard, 
  Wallet, 
  CheckCircle, 
  ChevronRight,
  ArrowLeft
} from 'lucide-react-native';
import colors from '@/constants/colors';
import { useCartStore } from '@/store/cartStore';
import Button from '@/components/common/Button';

// Mock data
const addresses = [
  {
    id: 'address1',
    name: 'Home',
    addressLine1: '123 Main Street',
    addressLine2: 'Apartment 4B',
    city: 'Chennai',
    state: 'Tamil Nadu',
    postalCode: '600001',
    country: 'India',
    phone: '+91 9876543210',
    isDefault: true,
    label: 'home' as const,
  },
  {
    id: 'address2',
    name: 'Work',
    addressLine1: '456 Office Park',
    addressLine2: 'Building 7, Floor 3',
    city: 'Chennai',
    state: 'Tamil Nadu',
    postalCode: '600002',
    country: 'India',
    phone: '+91 9876543210',
    isDefault: false,
    label: 'work' as const,
  },
];

const paymentMethods = [
  {
    id: 'cash',
    name: 'Cash on Delivery',
    icon: <Wallet size={24} color={colors.text} />,
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: <CreditCard size={24} color={colors.text} />,
  },
  {
    id: 'upi',
    name: 'UPI',
    icon: <Wallet size={24} color={colors.text} />,
  },
];

export default function CheckoutScreen() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAddressSelect = (address: typeof addresses[0]) => {
    setSelectedAddress(address);
  };
  
  const handlePaymentSelect = (payment: typeof paymentMethods[0]) => {
    setSelectedPayment(payment);
  };
  
  const handlePlaceOrder = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Clear cart and navigate to success page
      clearCart();
      router.push({
        pathname: '/order-success',
        params: { orderId: `ORD${Math.floor(Math.random() * 1000000)}` }
      });
    }, 1500);
  };
  
  const subtotal = getTotalPrice();
  const deliveryFee = 40;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Checkout',
          headerLeft: () => (
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView style={styles.scrollView}>
        {/* Delivery Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <TouchableOpacity onPress={() => router.push('/addresses')}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.addressesContainer}>
            {addresses.map((address) => (
              <TouchableOpacity 
                key={address.id}
                style={[
                  styles.addressCard,
                  selectedAddress.id === address.id && styles.selectedAddressCard
                ]}
                onPress={() => handleAddressSelect(address)}
              >
                <View style={styles.addressHeader}>
                  <View style={styles.addressLabelContainer}>
                    <MapPin size={16} color={colors.primary} />
                    <Text style={styles.addressLabel}>{address.name}</Text>
                  </View>
                  
                  {selectedAddress.id === address.id && (
                    <CheckCircle size={20} color={colors.primary} />
                  )}
                </View>
                
                <Text style={styles.addressText}>
                  {address.addressLine1}, {address.addressLine2 && `${address.addressLine2}, `}
                  {address.city}, {address.state} {address.postalCode}
                </Text>
                <Text style={styles.addressPhone}>{address.phone}</Text>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity 
              style={styles.addAddressButton}
              onPress={() => router.push('/add-address')}
            >
              <Text style={styles.addAddressText}>+ Add New Address</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Payment Method */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
          </View>
          
          <View style={styles.paymentContainer}>
            {paymentMethods.map((payment) => (
              <TouchableOpacity 
                key={payment.id}
                style={[
                  styles.paymentCard,
                  selectedPayment.id === payment.id && styles.selectedPaymentCard
                ]}
                onPress={() => handlePaymentSelect(payment)}
              >
                <View style={styles.paymentInfo}>
                  {payment.icon}
                  <Text style={styles.paymentName}>{payment.name}</Text>
                </View>
                
                {selectedPayment.id === payment.id && (
                  <CheckCircle size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          
          <View style={styles.orderItems}>
            {items.map((item) => (
              <View key={item.id} style={styles.orderItem}>
                <Text style={styles.itemName}>
                  {item.name} <Text style={styles.itemQuantity}>x{item.quantity}</Text>
                </Text>
                <Text style={styles.itemPrice}>₹{(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>₹{subtotal.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>₹{deliveryFee.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>₹{tax.toFixed(2)}</Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹{total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.footerTotalLabel}>Total:</Text>
          <Text style={styles.footerTotalValue}>₹{total.toFixed(2)}</Text>
        </View>
        
        <Button
          title="Place Order"
          onPress={handlePlaceOrder}
          loading={isLoading}
          style={styles.placeOrderButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButton: {
    marginRight: 16,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginBottom: 8,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  addressesContainer: {
    marginBottom: 8,
  },
  addressCard: {
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  selectedAddressCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  addressText: {
    fontSize: 14,
    color: colors.gray[700],
    marginBottom: 4,
    lineHeight: 20,
  },
  addressPhone: {
    fontSize: 14,
    color: colors.gray[600],
  },
  addAddressButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  addAddressText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  paymentContainer: {
    marginBottom: 8,
  },
  paymentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  selectedPaymentCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentName: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  orderItems: {
    marginTop: 8,
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    color: colors.text,
  },
  itemQuantity: {
    color: colors.gray[600],
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray[200],
    marginVertical: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.gray[600],
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  totalContainer: {
    flex: 1,
  },
  footerTotalLabel: {
    fontSize: 14,
    color: colors.gray[600],
  },
  footerTotalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  placeOrderButton: {
    width: 150,
  },
});