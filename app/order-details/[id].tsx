import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Platform,
  ActivityIndicator
} from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { 
  ArrowLeft, 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Truck, 
  XCircle,
  Phone,
  MessageCircle
} from 'lucide-react-native';
import colors from '@/constants/colors';
import Button from '@/components/common/Button';

// Mock data
const getOrderData = (id: string) => {
  const orders = {
    order1: {
      id: 'order1',
      customerId: 'user1',
      storeId: 'store1',
      storeName: 'City Hardware & Tools',
      items: [
        {
          id: 'product7',
          name: 'Hammer',
          price: 180,
          image: 'https://images.unsplash.com/photo-1586864387789-628af9feed72?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          unit: '1 piece',
          quantity: 1,
          storeId: 'store1',
          storeName: 'City Hardware & Tools',
          inStock: true,
          category: 'hardware',
          description: 'Durable steel hammer',
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-01T00:00:00Z',
        },
        {
          id: 'product8',
          name: 'Screwdriver Set',
          price: 350,
          image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          unit: '1 set',
          quantity: 2,
          storeId: 'store1',
          storeName: 'City Hardware & Tools',
          inStock: true,
          category: 'hardware',
          description: 'Complete set of precision screwdrivers',
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-01T00:00:00Z',
        },
      ],
      status: 'delivered',
      total: 880,
      deliveryFee: 40,
      tax: 44,
      discount: 0,
      paymentMethod: 'cash',
      paymentStatus: 'paid',
      deliveryAddress: {
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
        label: 'home',
      },
      deliveryPartner: {
        id: 'delivery1',
        name: 'Rajesh Kumar',
        phone: '+91 9876543210',
        rating: 4.8,
      },
      estimatedDelivery: '2023-06-17T14:00:00Z',
      createdAt: '2023-06-15T10:30:00Z',
      updatedAt: '2023-06-17T14:20:00Z',
    },
    order2: {
      id: 'order2',
      customerId: 'user1',
      storeId: 'store2',
      storeName: 'ElectroTech Solutions',
      items: [
        {
          id: 'product5',
          name: 'LED Bulb',
          price: 120,
          image: 'https://images.unsplash.com/photo-1532526338225-bc66ea49a8b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          unit: '1 piece',
          quantity: 3,
          storeId: 'store2',
          storeName: 'ElectroTech Solutions',
          inStock: true,
          category: 'electrical',
          description: 'Energy-efficient LED bulb',
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-01T00:00:00Z',
        },
      ],
      status: 'shipped',
      total: 360,
      deliveryFee: 40,
      tax: 18,
      discount: 0,
      paymentMethod: 'card',
      paymentStatus: 'paid',
      deliveryAddress: {
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
        label: 'home',
      },
      deliveryPartner: {
        id: 'delivery2',
        name: 'Suresh Patel',
        phone: '+91 9876543211',
        rating: 4.6,
      },
      estimatedDelivery: '2023-06-22T12:00:00Z',
      createdAt: '2023-06-20T15:45:00Z',
      updatedAt: '2023-06-21T09:10:00Z',
    },
  };
  
  // If the order ID is not found, create a mock order with the given ID
  if (!orders[id as keyof typeof orders]) {
    return {
      id,
      customerId: 'user1',
      storeId: 'store3',
      storeName: 'Fresh Grocery Mart',
      items: [
        {
          id: 'product1',
          name: 'Fresh Tomatoes',
          price: 40,
          image: 'https://images.unsplash.com/photo-1546094096-0df4bcabd1c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          unit: '1 kg',
          quantity: 2,
          storeId: 'store3',
          storeName: 'Fresh Grocery Mart',
          inStock: true,
          category: 'grocery',
          description: 'Fresh and juicy tomatoes',
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-01T00:00:00Z',
        },
      ],
      status: 'processing',
      total: 80,
      deliveryFee: 40,
      tax: 4,
      discount: 0,
      paymentMethod: 'cash',
      paymentStatus: 'pending',
      deliveryAddress: {
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
        label: 'home',
      },
      deliveryPartner: null,
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
  
  return orders[id as keyof typeof orders];
};

export default function OrderDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const data = getOrderData(id as string);
      setOrder(data);
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={24} color={colors.gray[600]} />;
      case 'processing':
        return <Package size={24} color={colors.primary} />;
      case 'shipped':
        return <Truck size={24} color={colors.secondary} />;
      case 'delivered':
        return <CheckCircle size={24} color={colors.success} />;
      case 'cancelled':
        return <XCircle size={24} color={colors.error} />;
      default:
        return <Package size={24} color={colors.gray[600]} />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return colors.gray[600];
      case 'processing':
        return colors.primary;
      case 'shipped':
        return colors.secondary;
      case 'delivered':
        return colors.success;
      case 'cancelled':
        return colors.error;
      default:
        return colors.gray[600];
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: `Order #${order.id}`,
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
        {/* Order Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            {getStatusIcon(order.status)}
            <View style={styles.statusTextContainer}>
              <Text 
                style={[
                  styles.statusText, 
                  { color: getStatusColor(order.status) }
                ]}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Text>
              <Text style={styles.statusDate}>
                {order.status === 'delivered' ? 'Delivered on ' : 'Updated on '}
                {formatDate(order.updatedAt)}
              </Text>
            </View>
          </View>
          
          {order.status === 'shipped' && order.deliveryPartner && (
            <View style={styles.deliveryPartnerContainer}>
              <Text style={styles.deliveryPartnerTitle}>Delivery Partner</Text>
              <View style={styles.deliveryPartnerInfo}>
                <View style={styles.deliveryPartnerDetails}>
                  <Text style={styles.deliveryPartnerName}>{order.deliveryPartner.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>{order.deliveryPartner.rating}</Text>
                    <Text style={styles.ratingLabel}>★</Text>
                  </View>
                </View>
                
                <View style={styles.deliveryPartnerActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Phone size={20} color={colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <MessageCircle size={20} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
        
        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressContainer}>
            <MapPin size={20} color={colors.primary} />
            <View style={styles.addressDetails}>
              <Text style={styles.addressName}>{order.deliveryAddress.name}</Text>
              <Text style={styles.addressText}>
                {order.deliveryAddress.addressLine1}, 
                {order.deliveryAddress.addressLine2 && `${order.deliveryAddress.addressLine2}, `}
                {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.postalCode}
              </Text>
              <Text style={styles.addressPhone}>{order.deliveryAddress.phone}</Text>
            </View>
          </View>
        </View>
        
        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          
          <View style={styles.storeContainer}>
            <Text style={styles.storeName}>{order.storeName}</Text>
            
            {order.items.map((item: any) => (
              <View key={item.id} style={styles.orderItem}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemUnit}>{item.unit}</Text>
                  <View style={styles.itemPriceRow}>
                    <Text style={styles.itemPrice}>₹{item.price}</Text>
                    <Text style={styles.itemQuantity}>x{item.quantity}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        {/* Payment Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Payment Method</Text>
            <Text style={styles.paymentValue}>
              {order.paymentMethod === 'cash' ? 'Cash on Delivery' : 
               order.paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI'}
            </Text>
          </View>
          
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Payment Status</Text>
            <Text 
              style={[
                styles.paymentStatus,
                { color: order.paymentStatus === 'paid' ? colors.success : colors.secondary }
              ]}
            >
              {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
            </Text>
          </View>
        </View>
        
        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>₹{order.total.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>₹{order.deliveryFee.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>₹{order.tax.toFixed(2)}</Text>
          </View>
          
          {order.discount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={[styles.summaryValue, { color: colors.success }]}>
                -₹{order.discount.toFixed(2)}
              </Text>
            </View>
          )}
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              ₹{(order.total + order.deliveryFee + order.tax - order.discount).toFixed(2)}
            </Text>
          </View>
        </View>
        
        {/* Order Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Information</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Order ID</Text>
            <Text style={styles.infoValue}>{order.id}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Order Date</Text>
            <Text style={styles.infoValue}>{formatDate(order.createdAt)}</Text>
          </View>
          
          {order.estimatedDelivery && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Estimated Delivery</Text>
              <Text style={styles.infoValue}>{formatDate(order.estimatedDelivery)}</Text>
            </View>
          )}
        </View>
        
        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          {order.status !== 'cancelled' && order.status !== 'delivered' && (
            <Button
              title="Cancel Order"
              variant="outline"
              onPress={() => Alert.alert('Cancel Order', 'This feature is not available yet.')}
              style={styles.cancelButton}
            />
          )}
          
          <Button
            title="Need Help?"
            onPress={() => router.push('/support')}
            style={styles.helpButton}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  backButton: {
    marginRight: 16,
  },
  scrollView: {
    flex: 1,
  },
  statusCard: {
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
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusTextContainer: {
    marginLeft: 12,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  statusDate: {
    fontSize: 14,
    color: colors.gray[600],
  },
  deliveryPartnerContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  deliveryPartnerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  deliveryPartnerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryPartnerDetails: {
    flex: 1,
  },
  deliveryPartnerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondary,
    marginRight: 2,
  },
  ratingLabel: {
    fontSize: 14,
    color: colors.secondary,
  },
  deliveryPartnerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressDetails: {
    flex: 1,
    marginLeft: 12,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
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
  storeContainer: {
    marginBottom: 8,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    paddingBottom: 16,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  itemUnit: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 8,
  },
  itemPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  itemQuantity: {
    fontSize: 14,
    color: colors.gray[600],
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  paymentLabel: {
    fontSize: 14,
    color: colors.gray[600],
  },
  paymentValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  paymentStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
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
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingTop: 12,
    marginTop: 4,
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.gray[600],
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  actionsContainer: {
    padding: 16,
    marginBottom: 24,
  },
  cancelButton: {
    marginBottom: 12,
  },
  helpButton: {},
});