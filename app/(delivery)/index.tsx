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
  MapPin, 
  Package, 
  Clock, 
  ChevronRight,
  Truck
} from 'lucide-react-native';
import colors from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';

// Mock delivery requests
const deliveryRequests = [
  {
    id: 'delivery1',
    orderId: 'order123',
    storeName: 'Fresh Mart',
    storeAddress: '123 Main St, Anytown',
    storeImage: 'https://images.unsplash.com/photo-1604719312566-8912e9c8a213?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    customerName: 'John Doe',
    customerAddress: '456 Oak St, Anytown',
    distance: 2.5,
    estimatedTime: 15,
    amount: 50,
    items: [
      { name: 'Organic Bananas', quantity: 2 },
      { name: 'Fresh Apples', quantity: 1 },
    ],
    createdAt: '2023-06-15T10:30:00Z',
  },
  {
    id: 'delivery2',
    orderId: 'order456',
    storeName: 'Meat Paradise',
    storeAddress: '789 Butcher St, Anytown',
    storeImage: 'https://images.unsplash.com/photo-1585631300237-0deab4c3d773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    customerName: 'Jane Smith',
    customerAddress: '101 Pine St, Anytown',
    distance: 3.2,
    estimatedTime: 20,
    amount: 60,
    items: [
      { name: 'Chicken Breast', quantity: 1 },
      { name: 'Whole Wheat Bread', quantity: 2 },
    ],
    createdAt: '2023-06-15T09:45:00Z',
  },
  {
    id: 'delivery3',
    orderId: 'order789',
    storeName: 'MediQuick',
    storeAddress: '202 Health Ave, Anytown',
    storeImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    customerName: 'Mike Johnson',
    customerAddress: '303 Elm St, Anytown',
    distance: 1.8,
    estimatedTime: 12,
    amount: 40,
    items: [
      { name: 'Paracetamol', quantity: 2 },
    ],
    createdAt: '2023-06-15T09:15:00Z',
  },
  {
    id: 'delivery4',
    orderId: 'order012',
    storeName: 'Beauty Hub',
    storeAddress: '404 Glamour St, Anytown',
    storeImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    customerName: 'Sarah Williams',
    customerAddress: '505 Cedar St, Anytown',
    distance: 4.0,
    estimatedTime: 25,
    amount: 70,
    items: [
      { name: 'Moisturizing Cream', quantity: 1 },
    ],
    createdAt: '2023-06-15T08:30:00Z',
  },
];

export default function DeliveryHomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [availableDeliveries, setAvailableDeliveries] = useState(deliveryRequests);
  const [walletBalance, setWalletBalance] = useState(user?.wallet?.balance || 0);
  const [isVerified, setIsVerified] = useState(walletBalance >= 500);

  useEffect(() => {
    // Update verification status based on wallet balance
    setIsVerified(walletBalance >= 500);
  }, [walletBalance]);

  const handleSearchPress = () => {
    Alert.alert('Search', 'Search functionality will be implemented soon');
  };

  const handleFilterPress = () => {
    Alert.alert('Filter', 'Filter functionality will be implemented soon');
  };

  const handleDeliveryPress = (deliveryId: string) => {
    if (!isVerified) {
      Alert.alert(
        'Verification Required',
        'You need to deposit ₹500 to start accepting deliveries',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Add Money', 
            onPress: () => handleAddMoney()
          }
        ]
      );
      return;
    }
    
    router.push(`/order-details/${deliveryId}`);
  };

  const handleAcceptDelivery = (deliveryId: string) => {
    if (!isVerified) {
      Alert.alert(
        'Verification Required',
        'You need to deposit ₹500 to start accepting deliveries',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Add Money', 
            onPress: () => handleAddMoney()
          }
        ]
      );
      return;
    }
    
    // In a real app, this would update the delivery status in the backend
    Alert.alert(
      'Delivery Accepted',
      `You have accepted delivery #${deliveryId.slice(-4)}`,
      [
        { 
          text: 'OK',
          onPress: () => {
            // Remove the accepted delivery from the list
            setAvailableDeliveries(availableDeliveries.filter(delivery => delivery.id !== deliveryId));
            // Navigate to ongoing deliveries
            router.push('/(delivery)/ongoing');
          }
        }
      ]
    );
  };

  const handleAddMoney = () => {
    Alert.alert(
      'Add Money to Wallet',
      'How much would you like to add?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: '₹500', 
          onPress: () => {
            // Simulate adding money to wallet
            setWalletBalance(walletBalance + 500);
            Alert.alert(
              'Money Added',
              'You have successfully added ₹500 to your wallet. You can now accept deliveries.',
              [{ text: 'OK' }]
            );
          }
        },
        { 
          text: '₹1000', 
          onPress: () => {
            // Simulate adding money to wallet
            setWalletBalance(walletBalance + 1000);
            Alert.alert(
              'Money Added',
              'You have successfully added ₹1000 to your wallet. You can now accept deliveries.',
              [{ text: 'OK' }]
            );
          }
        }
      ]
    );
  };

  const renderDeliveryItem = ({ item }: { item: typeof deliveryRequests[0] }) => (
    <TouchableOpacity 
      style={styles.deliveryCard}
      onPress={() => handleDeliveryPress(item.id)}
      activeOpacity={0.8}
      disabled={!isVerified}
    >
      <View style={styles.deliveryHeader}>
        <View style={styles.storeInfo}>
          <Image source={{ uri: item.storeImage }} style={styles.storeImage} />
          <View>
            <Text style={styles.storeName}>{item.storeName}</Text>
            <Text style={styles.storeAddress} numberOfLines={1}>{item.storeAddress}</Text>
          </View>
        </View>
        <View style={styles.deliveryInfo}>
          <View style={styles.deliveryDetail}>
            <Clock size={16} color={colors.gray[600]} />
            <Text style={styles.deliveryDetailText}>{item.estimatedTime} mins</Text>
          </View>
          <View style={styles.deliveryDetail}>
            <MapPin size={16} color={colors.gray[600]} />
            <Text style={styles.deliveryDetailText}>{item.distance} km</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.customerInfo}>
        <Text style={styles.customerInfoLabel}>Deliver to:</Text>
        <Text style={styles.customerName}>{item.customerName}</Text>
        <Text style={styles.customerAddress}>{item.customerAddress}</Text>
      </View>
      
      <View style={styles.itemsContainer}>
        <Text style={styles.itemsLabel}>Items:</Text>
        {item.items.map((orderItem, index) => (
          <Text key={index} style={styles.itemText}>
            {orderItem.quantity}x {orderItem.name}
          </Text>
        ))}
      </View>
      
      <View style={styles.deliveryFooter}>
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Delivery Fee:</Text>
          <Text style={styles.amount}>₹{item.amount}</Text>
        </View>
        
        <TouchableOpacity 
          style={[
            styles.acceptButton,
            !isVerified && styles.disabledButton
          ]}
          onPress={() => handleAcceptDelivery(item.id)}
          disabled={!isVerified}
        >
          <Text style={[
            styles.acceptButtonText,
            !isVerified && styles.disabledButtonText
          ]}>Accept</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.viewDetailsContainer}>
        <Text style={styles.viewDetailsText}>View Details</Text>
        <ChevronRight size={16} color={colors.primary} />
      </View>
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Truck size={64} color={colors.gray[300]} />
      <Text style={styles.emptyTitle}>No Deliveries Available</Text>
      <Text style={styles.emptyDescription}>
        There are no delivery requests in your area at the moment. Please check back later.
      </Text>
    </View>
  );

  const renderVerificationBanner = () => {
    if (isVerified) return null;
    
    return (
      <View style={styles.verificationBanner}>
        <View style={styles.verificationContent}>
          <Package size={24} color={colors.warning} />
          <View style={styles.verificationTextContainer}>
            <Text style={styles.verificationTitle}>Verification Required</Text>
            <Text style={styles.verificationDescription}>
              Deposit ₹500 to start accepting deliveries
            </Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.addMoneyButton}
          onPress={handleAddMoney}
        >
          <Text style={styles.addMoneyText}>Add Money</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Available Deliveries</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={handleSearchPress}>
            <Search size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleFilterPress}>
            <Filter size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      {renderVerificationBanner()}
      
      <FlatList
        data={availableDeliveries}
        renderItem={renderDeliveryItem}
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
  verificationBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.warningLight,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.warning,
  },
  verificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  verificationTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  verificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  verificationDescription: {
    fontSize: 14,
    color: colors.gray[700],
  },
  addMoneyButton: {
    backgroundColor: colors.warning,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addMoneyText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  deliveryCard: {
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
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  storeImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  storeAddress: {
    fontSize: 14,
    color: colors.gray[600],
    width: 150,
  },
  deliveryInfo: {
    alignItems: 'flex-end',
  },
  deliveryDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  deliveryDetailText: {
    fontSize: 14,
    color: colors.gray[600],
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray[200],
    marginVertical: 12,
  },
  customerInfo: {
    marginBottom: 12,
  },
  customerInfoLabel: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 4,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  customerAddress: {
    fontSize: 14,
    color: colors.gray[600],
  },
  itemsContainer: {
    marginBottom: 12,
  },
  itemsLabel: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 4,
  },
  itemText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 2,
  },
  deliveryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 14,
    color: colors.gray[600],
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 4,
  },
  acceptButton: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  acceptButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  disabledButton: {
    backgroundColor: colors.gray[200],
  },
  disabledButtonText: {
    color: colors.gray[500],
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