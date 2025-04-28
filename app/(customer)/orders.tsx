import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  XCircle, 
  ChevronRight 
} from 'lucide-react-native';
import colors from '@/constants/colors';

// Mock orders data
const mockOrders = [
  {
    id: 'order1',
    storeId: 'store1',
    storeName: 'City Hardware & Tools',
    total: 125.99,
    status: 'delivered',
    createdAt: '2023-06-15T10:30:00Z',
    updatedAt: '2023-06-17T14:20:00Z',
    items: 3
  },
  {
    id: 'order2',
    storeId: 'store2',
    storeName: 'ElectroTech Solutions',
    total: 78.50,
    status: 'shipped',
    createdAt: '2023-06-20T15:45:00Z',
    updatedAt: '2023-06-21T09:10:00Z',
    items: 2
  },
  {
    id: 'order3',
    storeId: 'store3',
    storeName: 'Fresh Grocery Mart',
    total: 45.75,
    status: 'processing',
    createdAt: '2023-06-22T11:20:00Z',
    updatedAt: '2023-06-22T11:20:00Z',
    items: 1
  },
  {
    id: 'order4',
    storeId: 'store1',
    storeName: 'City Hardware & Tools',
    total: 210.25,
    status: 'pending',
    createdAt: '2023-06-23T09:15:00Z',
    updatedAt: '2023-06-23T09:15:00Z',
    items: 4
  },
  {
    id: 'order5',
    storeId: 'store3',
    storeName: 'Fresh Grocery Mart',
    total: 89.99,
    status: 'cancelled',
    createdAt: '2023-06-18T14:30:00Z',
    updatedAt: '2023-06-19T10:45:00Z',
    items: 2
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
  
  const renderOrderItem = ({ item }: { item: typeof mockOrders[0] }) => (
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
      
      <Text style={styles.storeName}>{item.storeName}</Text>
      <Text style={styles.itemCount}>{item.items} {item.items === 1 ? 'item' : 'items'}</Text>
      
      <View style={styles.orderDetails}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderTotal}>₹{item.total.toFixed(2)}</Text>
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
      <FlatList
        data={mockOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Package size={60} color={colors.gray[300]} />
            <Text style={styles.emptyText}>No orders yet</Text>
            <Text style={styles.emptySubtext}>Your order history will appear here</Text>
          </View>
        }
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
  storeName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 12,
  },
  orderDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginTop: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.gray[600],
    textAlign: 'center',
  },
});