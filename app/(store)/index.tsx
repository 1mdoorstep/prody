import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Platform,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Search, 
  Filter, 
  Clock, 
  Package, 
  CheckCircle, 
  Truck, 
  XCircle,
  ChevronRight
} from 'lucide-react-native';
import colors from '@/constants/colors';

// Mock order data
const orders = [
  {
    id: 'order1',
    customerName: 'John Doe',
    customerAddress: '123 Main St, Anytown',
    items: [
      { name: 'Organic Bananas', quantity: 2, price: 35 },
      { name: 'Fresh Apples', quantity: 1, price: 80 },
    ],
    totalAmount: 150,
    status: 'pending',
    createdAt: '2023-06-15T10:30:00Z',
  },
  {
    id: 'order2',
    customerName: 'Jane Smith',
    customerAddress: '456 Oak St, Anytown',
    items: [
      { name: 'Chicken Breast', quantity: 1, price: 160 },
      { name: 'Whole Wheat Bread', quantity: 2, price: 40 },
    ],
    totalAmount: 240,
    status: 'confirmed',
    createdAt: '2023-06-15T09:45:00Z',
  },
  {
    id: 'order3',
    customerName: 'Mike Johnson',
    customerAddress: '789 Pine St, Anytown',
    items: [
      { name: 'Moisturizing Cream', quantity: 1, price: 220 },
    ],
    totalAmount: 220,
    status: 'preparing',
    createdAt: '2023-06-15T09:15:00Z',
  },
  {
    id: 'order4',
    customerName: 'Sarah Williams',
    customerAddress: '101 Elm St, Anytown',
    items: [
      { name: 'Paracetamol', quantity: 2, price: 30 },
      { name: 'Fresh Apples', quantity: 1, price: 80 },
    ],
    totalAmount: 140,
    status: 'ready',
    createdAt: '2023-06-15T08:30:00Z',
  },
  {
    id: 'order5',
    customerName: 'David Brown',
    customerAddress: '202 Cedar St, Anytown',
    items: [
      { name: 'Chicken Breast', quantity: 2, price: 160 },
    ],
    totalAmount: 320,
    status: 'delivered',
    createdAt: '2023-06-14T16:45:00Z',
  },
  {
    id: 'order6',
    customerName: 'Emily Davis',
    customerAddress: '303 Maple St, Anytown',
    items: [
      { name: 'Whole Wheat Bread', quantity: 1, price: 40 },
      { name: 'Fresh Apples', quantity: 2, price: 80 },
      { name: 'Organic Bananas', quantity: 1, price: 35 },
    ],
    totalAmount: 235,
    status: 'cancelled',
    createdAt: '2023-06-14T15:30:00Z',
  },
];

type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
type OrderFilter = 'all' | 'active' | 'completed';

export default function StoreHomeScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<OrderFilter>('active');
  const [filteredOrders, setFilteredOrders] = useState(orders);

  useEffect(() => {
    filterOrders(filter);
  }, [filter]);

  const filterOrders = (filterType: OrderFilter) => {
    if (filterType === 'all') {
      setFilteredOrders(orders);
    } else if (filterType === 'active') {
      setFilteredOrders(orders.filter(order => 
        ['pending', 'confirmed', 'preparing', 'ready'].includes(order.status)
      ));
    } else if (filterType === 'completed') {
      setFilteredOrders(orders.filter(order => 
        ['delivered', 'cancelled'].includes(order.status)
      ));
    }
  };

  const handleSearchPress = () => {
    Alert.alert('Search', 'Search functionality will be implemented soon');
  };

  const handleFilterPress = () => {
    Alert.alert('Filter', 'Filter functionality will be implemented soon');
  };

  const handleOrderPress = (orderId: string) => {
    router.push(`/order-details/${orderId}`);
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    // In a real app, this would update the order status in the backend
    Alert.alert(
      'Status Updated',
      `Order #${orderId.slice(-4)} has been updated to ${newStatus}`,
      [{ text: 'OK' }]
    );
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Clock size={20} color={colors.warning} />;
      case 'confirmed':
        return <CheckCircle size={20} color={colors.primary} />;
      case 'preparing':
        return <Package size={20} color={colors.primary} />;
      case 'ready':
        return <Package size={20} color={colors.success} />;
      case 'delivered':
        return <Truck size={20} color={colors.success} />;
      case 'cancelled':
        return <XCircle size={20} color={colors.error} />;
      default:
        return <Clock size={20} color={colors.warning} />;
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'confirmed':
        return 'Confirmed';
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready for Pickup';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return colors.warning;
      case 'confirmed':
      case 'preparing':
        return colors.primary;
      case 'ready':
      case 'delivered':
        return colors.success;
      case 'cancelled':
        return colors.error;
      default:
        return colors.gray[600];
    }
  };

  const getActionButtons = (order: typeof orders[0]) => {
    switch (order.status) {
      case 'pending':
        return (
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.acceptButton]}
              onPress={() => handleStatusChange(order.id, 'confirmed')}
            >
              <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.rejectButton]}
              onPress={() => handleStatusChange(order.id, 'cancelled')}
            >
              <Text style={styles.rejectButtonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        );
      case 'confirmed':
        return (
          <TouchableOpacity 
            style={[styles.actionButton, styles.primaryButton]}
            onPress={() => handleStatusChange(order.id, 'preparing')}
          >
            <Text style={styles.primaryButtonText}>Start Preparing</Text>
          </TouchableOpacity>
        );
      case 'preparing':
        return (
          <TouchableOpacity 
            style={[styles.actionButton, styles.primaryButton]}
            onPress={() => handleStatusChange(order.id, 'ready')}
          >
            <Text style={styles.primaryButtonText}>Mark as Ready</Text>
          </TouchableOpacity>
        );
      case 'ready':
        return (
          <TouchableOpacity 
            style={[styles.actionButton, styles.disabledButton]}
            disabled={true}
          >
            <Text style={styles.disabledButtonText}>Waiting for Pickup</Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  const renderOrderItem = ({ item }: { item: typeof orders[0] }) => (
    <TouchableOpacity 
      style={styles.orderCard}
      onPress={() => handleOrderPress(item.id)}
      activeOpacity={0.8}
    >
      <View style={styles.orderHeader}>
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderIdLabel}>Order #</Text>
          <Text style={styles.orderId}>{item.id.slice(-4)}</Text>
        </View>
        <View style={styles.statusContainer}>
          {getStatusIcon(item.status as OrderStatus)}
          <Text 
            style={[
              styles.statusText, 
              { color: getStatusColor(item.status as OrderStatus) }
            ]}
          >
            {getStatusText(item.status as OrderStatus)}
          </Text>
        </View>
      </View>
      
      <View style={styles.customerInfo}>
        <Text style={styles.customerName}>{item.customerName}</Text>
        <Text style={styles.customerAddress} numberOfLines={1}>{item.customerAddress}</Text>
      </View>
      
      <View style={styles.orderItems}>
        {item.items.map((orderItem, index) => (
          <Text key={index} style={styles.orderItemText}>
            {orderItem.quantity}x {orderItem.name}
          </Text>
        ))}
      </View>
      
      <View style={styles.orderFooter}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>₹{item.totalAmount}</Text>
        </View>
        
        {getActionButtons(item)}
      </View>
      
      <View style={styles.viewDetailsContainer}>
        <Text style={styles.viewDetailsText}>View Details</Text>
        <ChevronRight size={16} color={colors.primary} />
      </View>
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Package size={64} color={colors.gray[300]} />
      <Text style={styles.emptyTitle}>No Orders Found</Text>
      <Text style={styles.emptyDescription}>
        {filter === 'active' 
          ? "You don't have any active orders at the moment."
          : filter === 'completed'
          ? "You don't have any completed orders yet."
          : "You don't have any orders yet."}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Orders</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={handleSearchPress}>
            <Search size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleFilterPress}>
            <Filter size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'all' && styles.activeFilterButton]}
          onPress={() => setFilter('all')}
        >
          <Text 
            style={[
              styles.filterButtonText, 
              filter === 'all' && styles.activeFilterText
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'active' && styles.activeFilterButton]}
          onPress={() => setFilter('active')}
        >
          <Text 
            style={[
              styles.filterButtonText, 
              filter === 'active' && styles.activeFilterText
            ]}
          >
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'completed' && styles.activeFilterButton]}
          onPress={() => setFilter('completed')}
        >
          <Text 
            style={[
              styles.filterButtonText, 
              filter === 'completed' && styles.activeFilterText
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.white,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: colors.primaryLight,
  },
  filterButtonText: {
    fontSize: 14,
    color: colors.gray[600],
  },
  activeFilterText: {
    color: colors.primary,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  orderCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderIdLabel: {
    fontSize: 14,
    color: colors.gray[600],
  },
  orderId: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  customerInfo: {
    marginBottom: 12,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  customerAddress: {
    fontSize: 14,
    color: colors.gray[600],
  },
  orderItems: {
    marginBottom: 12,
  },
  orderItemText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    color: colors.gray[600],
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: colors.successLight,
    marginRight: 8,
  },
  acceptButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.success,
  },
  rejectButton: {
    backgroundColor: colors.errorLight,
  },
  rejectButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.error,
  },
  primaryButton: {
    backgroundColor: colors.primaryLight,
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  disabledButton: {
    backgroundColor: colors.gray[100],
  },
  disabledButtonText: {
    fontSize: 14,
    color: colors.gray[600],
  },
  viewDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingTop: 12,
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginRight: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: colors.gray[600],
    textAlign: 'center',
  },
});