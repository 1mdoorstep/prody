import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import { MapPin, Clock, Star } from 'lucide-react-native';
import { Store } from '@/types';
import colors from '@/constants/colors';

interface StoreInfoProps {
  store: Store;
}

const StoreInfo: React.FC<StoreInfoProps> = ({ store }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: store.logo }} style={styles.logo} />
        <View style={styles.headerInfo}>
          <Text style={styles.storeName}>{store.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={16} color={colors.secondary} fill={colors.secondary} />
            <Text style={styles.rating}>{store.rating.toFixed(1)}</Text>
            <Text style={styles.reviews}>({store.reviews} reviews)</Text>
          </View>
        </View>
        <View style={[
          styles.statusBadge, 
          store.isOpen ? styles.openBadge : styles.closedBadge
        ]}>
          <Text style={[
            styles.statusText,
            store.isOpen ? styles.openText : styles.closedText
          ]}>
            {store.isOpen ? 'Open' : 'Closed'}
          </Text>
        </View>
      </View>
      
      <View style={styles.infoRow}>
        <MapPin size={16} color={colors.gray[600]} />
        <Text style={styles.infoText}>{store.address}</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Clock size={16} color={colors.gray[600]} />
        <Text style={styles.infoText}>
          {store.openTime} - {store.closeTime}
        </Text>
      </View>
      
      <View style={styles.deliveryInfo}>
        <View style={styles.deliveryItem}>
          <Text style={styles.deliveryLabel}>Delivery Time</Text>
          <Text style={styles.deliveryValue}>{store.deliveryTime}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.deliveryItem}>
          <Text style={styles.deliveryLabel}>Min Order</Text>
          <Text style={styles.deliveryValue}>${store.minOrder}</Text>
        </View>
      </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 4,
    marginRight: 2,
  },
  reviews: {
    fontSize: 12,
    color: colors.gray[600],
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  openBadge: {
    backgroundColor: '#E8F5E9',
  },
  closedBadge: {
    backgroundColor: '#FFEBEE',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  openText: {
    color: colors.success,
  },
  closedText: {
    color: colors.error,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.gray[700],
    marginLeft: 8,
  },
  deliveryInfo: {
    flexDirection: 'row',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  deliveryItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: colors.gray[200],
    marginHorizontal: 8,
  },
  deliveryLabel: {
    fontSize: 12,
    color: colors.gray[600],
    marginBottom: 4,
  },
  deliveryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
});

export default StoreInfo;