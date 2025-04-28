import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  XCircle, 
  ChevronRight 
} from 'lucide-react-native';
import { Order } from '@/types';
import colors from '@/constants/colors';

// Mock orders data
const mockOrders: Order[] = [
  {
    id: 'order1',
    items: [],
    total: 125.99,
    status: 'delivered',
    createdAt: '2023-06-15T10:30:00Z',
    updatedAt: '2023-06-17T14:20:00Z',
    address: {
      id: 'addr1',
      name: 'Home',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      isDefault: true
    },
    paymentMethod: 'Credit Card'
  },
  {
    id: 'order2',
    items: [],
    total: 78.50,
    status: 'shipped',
    createdAt: '2023-06-20T15:45:00Z',
    updatedAt: '2023-06-21T09:10:00Z',
    address: {
      id: 'addr1',
      name: 'Home',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      isDefault: true
    },
    paymentMethod: 'Cash on Delivery'
  },
  {
    id: 'order3',
    items: [],
    total: 45.75,
    status: 'processing',
    createdAt: '2023-06-22T11:20:00Z',
    updatedAt: '2023-06-22T11:20:00Z',
    address: {
      id: 'addr2',
      name: 'Office',
      address: '456 Work Blvd',
      city: 'Businesstown',
      state: 'NY',
      zipCode: '67890',
      isDefault: false
    },
    paymentMethod: 'Credit Card'
  },
  {
    id: 'order4',
    items: [],
    total: 210.25,
    status: 'pending',
    createdAt: '2023-06-23T09:15:00Z',
    updatedAt: '2023-06-23T09:15:00Z',
    address: {
      id: 'addr1',
      name: 'Home',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      isDefault: true
    },
    paymentMethod: 'Credit Card'
  },
  {
    id: 'order5',
    items: [],
    total: 89.99,
    status: 'cancelled',
    createdAt: '2023-06-18T14:30:00Z',
    updatedAt: '2023-06-19T10:45:00Z',
    address: {
      id: 'addr1',
      name: 'Home',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      isDefault: true
    },
    paymentMethod: 'Cash on Delivery'
  }
];

export default function OrdersScreen() {
  const router = useRouter();
  
  const handleOrderPress = (orderId: string) => {
    router.push(`/order-details/${orderId}`);
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={20} color={colors.gray[600]} />;
      case 'processing':
        return <Package size={20} color={colors.primary} />;
      case 'shipped':
        return <Truck size={20} color={colors.secondary} />;
      case 'delivered':
        return <CheckCircle size={20} color={colors.success} />;
      case 'cancelled':
        return <XCircle size={20} color={colors.error} />;
      default:
        return <Package size={20} color={colors.gray[600]} />;
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
      month: 'short',
      day: 'numeric'
    });
  };
  
  const renderOrderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity 
      style={styles.orderItem}
      onPress={() => handleOrderPress(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.orderHeader}>
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderIdLabel}>Order ID:</Text>
          <Text style={styles.orderId}>#{item.id}</Text>
        </View>
        <Text style={styles.orderDate}>{formatDate(item.createdAt)}</Text>
      </View>
      
      <View style={styles.orderDetails}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
          <View style={styles.statusContainer}>
            {getStatusIcon(item.status)}
            <Text 
              style={[
                styles.orderStatus, 
                { color: getStatusColor(item.status) }
              ]}
            >
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>
        
        <ChevronRight size={20} color={colors.gray[400]} />
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: "My Orders",
        }} 
      />
      
      <FlatList
        data={mockOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
  },
  orderItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderIdLabel: {
    fontSize: 14,
    color: colors.gray[600],
    marginRight: 4,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  orderDate: {
    fontSize: 14,
    color: colors.gray[600],
  },
  orderDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderInfo: {
    flex: 1,
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
});