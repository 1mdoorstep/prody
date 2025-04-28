import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  SafeAreaView,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  MapPin,
  Phone,
  Navigation,
  Package,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react-native';
import colors from '@/constants/colors';

// Mock data for ongoing deliveries
const ongoingDeliveries = [
  {
    id: 'del1',
    orderId: 'ORD12345',
    status: 'pickup',
    pickupLocation: {
      name: 'Fresh Mart',
      address: '123 Main St, Anytown',
      phone: '+91 9876543210',
      coordinates: { lat: 12.9716, lng: 77.5946 },
    },
    dropLocation: {
      name: 'John Doe',
      address: '456 Park Ave, Anytown',
      phone: '+91 9876543211',
      coordinates: { lat: 12.9816, lng: 77.6046 },
    },
    items: [
      { id: 'item1', name: 'Organic Bananas', quantity: 1 },
      { id: 'item2', name: 'Fresh Apples', quantity: 2 },
      { id: 'item3', name: 'Whole Wheat Bread', quantity: 1 },
    ],
    amount: 450,
    distance: 3.2,
    estimatedTime: 15,
    paymentMethod: 'Cash on Delivery',
    createdAt: '2023-06-15T10:30:00Z',
  },
  {
    id: 'del2',
    orderId: 'ORD12346',
    status: 'delivery',
    pickupLocation: {
      name: 'Meat Paradise',
      address: '789 Butcher St, Anytown',
      phone: '+91 9876543212',
      coordinates: { lat: 12.9616, lng: 77.5846 },
    },
    dropLocation: {
      name: 'Jane Smith',
      address: '101 Lake View, Anytown',
      phone: '+91 9876543213',
      coordinates: { lat: 12.9716, lng: 77.5746 },
    },
    items: [
      { id: 'item4', name: 'Chicken Breast', quantity: 2 },
      { id: 'item5', name: 'Mutton', quantity: 1 },
    ],
    amount: 680,
    distance: 4.5,
    estimatedTime: 20,
    paymentMethod: 'Online Payment',
    createdAt: '2023-06-15T11:15:00Z',
  },
];

export default function OngoingDeliveriesScreen() {
  const router = useRouter();
  const [deliveries, setDeliveries] = useState(ongoingDeliveries);

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleNavigate = (coordinates: { lat: number; lng: number }) => {
    const url = Platform.select({
      ios: `maps:0,0?q=${coordinates.lat},${coordinates.lng}`,
      android: `geo:0,0?q=${coordinates.lat},${coordinates.lng}`,
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  const handleMarkAsPickedUp = (deliveryId: string) => {
    Alert.alert(
      'Confirm Pickup',
      'Have you picked up the order from the store?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, Picked Up',
          onPress: () => {
            // Update the delivery status
            const updatedDeliveries = deliveries.map((delivery) => {
              if (delivery.id === deliveryId) {
                return { ...delivery, status: 'delivery' };
              }
              return delivery;
            });
            setDeliveries(updatedDeliveries);
          },
        },
      ]
    );
  };

  const handleMarkAsDelivered = (deliveryId: string) => {
    Alert.alert(
      'Confirm Delivery',
      'Has the order been delivered to the customer?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, Delivered',
          onPress: () => {
            // Remove the delivery from the list
            const updatedDeliveries = deliveries.filter(
              (delivery) => delivery.id !== deliveryId
            );
            setDeliveries(updatedDeliveries);
            
            // Show success message
            Alert.alert(
              'Delivery Completed',
              'The order has been marked as delivered. Great job!'
            );
          },
        },
      ]
    );
  };

  const renderDeliveryItem = ({ item }: { item: typeof ongoingDeliveries[0] }) => {
    const isPickup = item.status === 'pickup';
    
    return (
      <View style={styles.deliveryCard}>
        <View style={styles.deliveryHeader}>
          <View style={styles.orderIdContainer}>
            <Package size={16} color={colors.primary} />
            <Text style={styles.orderId}>{item.orderId}</Text>
          </View>
          <View style={styles.statusContainer}>
            <Text
              style={[
                styles.statusText,
                isPickup ? styles.pickupStatus : styles.deliveryStatus,
              ]}
            >
              {isPickup ? 'Pickup' : 'Delivery'}
            </Text>
          </View>
        </View>
        
        <View style={styles.locationContainer}>
          <View style={styles.locationItem}>
            <View style={styles.locationDot} />
            <View style={styles.locationInfo}>
              <Text style={styles.locationTitle}>
                {isPickup ? item.pickupLocation.name : item.dropLocation.name}
              </Text>
              <Text style={styles.locationAddress}>
                {isPickup ? item.pickupLocation.address : item.dropLocation.address}
              </Text>
            </View>
          </View>
          
          <View style={styles.locationConnector} />
          
          <View style={styles.locationItem}>
            <View style={[styles.locationDot, styles.destinationDot]} />
            <View style={styles.locationInfo}>
              <Text style={styles.locationTitle}>
                {isPickup ? 'Customer' : 'Delivered to'}
              </Text>
              <Text style={styles.locationAddress}>
                {isPickup ? item.dropLocation.address : item.dropLocation.name}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Clock size={16} color={colors.gray[600]} />
            <Text style={styles.detailText}>{item.estimatedTime} mins</Text>
          </View>
          <View style={styles.detailItem}>
            <MapPin size={16} color={colors.gray[600]} />
            <Text style={styles.detailText}>{item.distance} km</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.amountText}>₹{item.amount}</Text>
            <Text style={styles.paymentMethodText}>{item.paymentMethod}</Text>
          </View>
        </View>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              handleCall(
                isPickup
                  ? item.pickupLocation.phone
                  : item.dropLocation.phone
              )
            }
          >
            <Phone size={20} color={colors.primary} />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              handleNavigate(
                isPickup
                  ? item.pickupLocation.coordinates
                  : item.dropLocation.coordinates
              )
            }
          >
            <Navigation size={20} color={colors.primary} />
            <Text style={styles.actionText}>Navigate</Text>
          </TouchableOpacity>
          
          {isPickup ? (
            <TouchableOpacity
              style={[styles.actionButton, styles.primaryActionButton]}
              onPress={() => handleMarkAsPickedUp(item.id)}
            >
              <CheckCircle size={20} color={colors.white} />
              <Text style={styles.primaryActionText}>Picked Up</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.actionButton, styles.primaryActionButton]}
              onPress={() => handleMarkAsDelivered(item.id)}
            >
              <CheckCircle size={20} color={colors.white} />
              <Text style={styles.primaryActionText}>Delivered</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ongoing Deliveries</Text>
        </View>
        
        {deliveries.length > 0 ? (
          <FlatList
            data={deliveries}
            renderItem={renderDeliveryItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
              }}
              style={styles.emptyImage}
            />
            <Text style={styles.emptyTitle}>No Ongoing Deliveries</Text>
            <Text style={styles.emptyText}>
              You don't have any ongoing deliveries at the moment. New delivery
              requests will appear here.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  deliveryCard: {
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
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: colors.gray[100],
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  pickupStatus: {
    color: colors.primary,
  },
  deliveryStatus: {
    color: colors.success,
  },
  locationContainer: {
    marginBottom: 16,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
    marginTop: 4,
    marginRight: 8,
  },
  destinationDot: {
    backgroundColor: colors.success,
  },
  locationConnector: {
    width: 2,
    height: 20,
    backgroundColor: colors.gray[300],
    marginLeft: 5,
    marginBottom: 8,
  },
  locationInfo: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 12,
    color: colors.gray[600],
    lineHeight: 18,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: colors.gray[600],
    marginLeft: 4,
  },
  amountText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  paymentMethodText: {
    fontSize: 12,
    color: colors.gray[500],
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: colors.gray[100],
  },
  primaryActionButton: {
    backgroundColor: colors.primary,
    flex: 1.5,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginLeft: 4,
  },
  primaryActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyImage: {
    width: 150,
    height: 150,
    marginBottom: 24,
    borderRadius: 75,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: colors.gray[600],
    textAlign: 'center',
    lineHeight: 22,
  },
});