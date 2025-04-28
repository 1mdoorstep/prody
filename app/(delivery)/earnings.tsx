import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Calendar,
  DollarSign,
  TrendingUp,
  Package,
  Clock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';
import colors from '@/constants/colors';

// Mock data for earnings
const earningsData = {
  today: {
    amount: 850,
    deliveries: 5,
    hours: 6.5,
    tips: 120,
  },
  thisWeek: {
    amount: 5200,
    deliveries: 32,
    hours: 38,
    tips: 780,
  },
  thisMonth: {
    amount: 22500,
    deliveries: 142,
    hours: 165,
    tips: 3400,
  },
};

// Mock data for delivery history
const deliveryHistory = [
  {
    id: 'del1',
    orderId: 'ORD12345',
    date: '15 Jun 2023',
    time: '10:30 AM',
    amount: 180,
    tip: 20,
    customer: 'John Doe',
    store: 'Fresh Mart',
    items: 3,
    distance: 3.2,
  },
  {
    id: 'del2',
    orderId: 'ORD12346',
    date: '15 Jun 2023',
    time: '12:45 PM',
    amount: 150,
    tip: 30,
    customer: 'Jane Smith',
    store: 'Meat Paradise',
    items: 2,
    distance: 4.5,
  },
  {
    id: 'del3',
    orderId: 'ORD12347',
    date: '15 Jun 2023',
    time: '3:15 PM',
    amount: 200,
    tip: 0,
    customer: 'Robert Johnson',
    store: 'Green Basket',
    items: 4,
    distance: 2.8,
  },
  {
    id: 'del4',
    orderId: 'ORD12348',
    date: '15 Jun 2023',
    time: '5:30 PM',
    amount: 170,
    tip: 40,
    customer: 'Emily Davis',
    store: 'Fresh Mart',
    items: 3,
    distance: 3.5,
  },
  {
    id: 'del5',
    orderId: 'ORD12349',
    date: '15 Jun 2023',
    time: '7:45 PM',
    amount: 150,
    tip: 30,
    customer: 'Michael Wilson',
    store: 'Meat Paradise',
    items: 2,
    distance: 2.2,
  },
];

// Filter options
const filterOptions = ['Today', 'This Week', 'This Month', 'Custom'];

export default function EarningsScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('Today');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [expandedDelivery, setExpandedDelivery] = useState<string | null>(null);

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setShowFilterOptions(false);
  };

  const toggleDeliveryDetails = (deliveryId: string) => {
    if (expandedDelivery === deliveryId) {
      setExpandedDelivery(null);
    } else {
      setExpandedDelivery(deliveryId);
    }
  };

  const getEarningsData = () => {
    switch (selectedFilter) {
      case 'Today':
        return earningsData.today;
      case 'This Week':
        return earningsData.thisWeek;
      case 'This Month':
        return earningsData.thisMonth;
      default:
        return earningsData.today;
    }
  };

  const currentEarnings = getEarningsData();

  const renderDeliveryItem = ({ item }: { item: typeof deliveryHistory[0] }) => {
    const isExpanded = expandedDelivery === item.id;
    
    return (
      <TouchableOpacity
        style={styles.deliveryCard}
        onPress={() => toggleDeliveryDetails(item.id)}
        activeOpacity={0.8}
      >
        <View style={styles.deliveryHeader}>
          <View>
            <Text style={styles.deliveryDate}>{item.date}</Text>
            <Text style={styles.deliveryTime}>{item.time}</Text>
          </View>
          <View>
            <Text style={styles.deliveryAmount}>₹{item.amount}</Text>
            {item.tip > 0 && (
              <Text style={styles.deliveryTip}>+ ₹{item.tip} tip</Text>
            )}
          </View>
        </View>
        
        <View style={styles.deliveryBasicInfo}>
          <Text style={styles.deliveryStore}>{item.store}</Text>
          <Text style={styles.deliveryCustomer}>to {item.customer}</Text>
        </View>
        
        {isExpanded && (
          <View style={styles.deliveryDetails}>
            <View style={styles.deliveryDetailRow}>
              <Text style={styles.deliveryDetailLabel}>Order ID:</Text>
              <Text style={styles.deliveryDetailValue}>{item.orderId}</Text>
            </View>
            <View style={styles.deliveryDetailRow}>
              <Text style={styles.deliveryDetailLabel}>Items:</Text>
              <Text style={styles.deliveryDetailValue}>{item.items}</Text>
            </View>
            <View style={styles.deliveryDetailRow}>
              <Text style={styles.deliveryDetailLabel}>Distance:</Text>
              <Text style={styles.deliveryDetailValue}>{item.distance} km</Text>
            </View>
            <View style={styles.deliveryDetailRow}>
              <Text style={styles.deliveryDetailLabel}>Base Pay:</Text>
              <Text style={styles.deliveryDetailValue}>₹{item.amount - item.tip}</Text>
            </View>
            <View style={styles.deliveryDetailRow}>
              <Text style={styles.deliveryDetailLabel}>Tip:</Text>
              <Text style={styles.deliveryDetailValue}>₹{item.tip}</Text>
            </View>
            <View style={styles.deliveryDetailRow}>
              <Text style={styles.deliveryDetailLabel}>Total:</Text>
              <Text style={[styles.deliveryDetailValue, styles.deliveryDetailTotal]}>
                ₹{item.amount}
              </Text>
            </View>
          </View>
        )}
        
        <View style={styles.expandIconContainer}>
          {isExpanded ? (
            <ChevronUp size={20} color={colors.gray[500]} />
          ) : (
            <ChevronDown size={20} color={colors.gray[500]} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Earnings</Text>
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setShowFilterOptions(!showFilterOptions)}
            >
              <Text style={styles.filterButtonText}>{selectedFilter}</Text>
              {showFilterOptions ? (
                <ChevronUp size={16} color={colors.text} />
              ) : (
                <ChevronDown size={16} color={colors.text} />
              )}
            </TouchableOpacity>
            
            {showFilterOptions && (
              <View style={styles.filterOptions}>
                {filterOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.filterOption,
                      selectedFilter === option && styles.selectedFilterOption,
                    ]}
                    onPress={() => handleFilterSelect(option)}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        selectedFilter === option && styles.selectedFilterOptionText,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
        
        <ScrollView>
          <View style={styles.earningsSummary}>
            <View style={styles.totalEarnings}>
              <Text style={styles.totalEarningsLabel}>Total Earnings</Text>
              <Text style={styles.totalEarningsAmount}>₹{currentEarnings.amount}</Text>
            </View>
            
            <View style={styles.earningsStats}>
              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <Package size={20} color={colors.primary} />
                </View>
                <Text style={styles.statValue}>{currentEarnings.deliveries}</Text>
                <Text style={styles.statLabel}>Deliveries</Text>
              </View>
              
              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <Clock size={20} color={colors.primary} />
                </View>
                <Text style={styles.statValue}>{currentEarnings.hours}</Text>
                <Text style={styles.statLabel}>Hours</Text>
              </View>
              
              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <DollarSign size={20} color={colors.primary} />
                </View>
                <Text style={styles.statValue}>₹{currentEarnings.tips}</Text>
                <Text style={styles.statLabel}>Tips</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.deliveryHistoryHeader}>
            <Text style={styles.deliveryHistoryTitle}>Delivery History</Text>
          </View>
          
          <FlatList
            data={deliveryHistory}
            renderItem={renderDeliveryItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.deliveryList}
            scrollEnabled={false}
          />
        </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  filterContainer: {
    position: 'relative',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginRight: 4,
  },
  filterOptions: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 8,
    width: 150,
    zIndex: 10,
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
  filterOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  selectedFilterOption: {
    backgroundColor: colors.primaryLight,
  },
  filterOptionText: {
    fontSize: 14,
    color: colors.text,
  },
  selectedFilterOptionText: {
    color: colors.primary,
    fontWeight: '500',
  },
  earningsSummary: {
    backgroundColor: colors.white,
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
  totalEarnings: {
    alignItems: 'center',
    marginBottom: 24,
  },
  totalEarningsLabel: {
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 8,
  },
  totalEarningsAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
  },
  earningsStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray[600],
  },
  deliveryHistoryHeader: {
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  deliveryHistoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  deliveryList: {
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
        elevation: 2,
      },
    }),
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  deliveryDate: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  deliveryTime: {
    fontSize: 12,
    color: colors.gray[600],
  },
  deliveryAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'right',
  },
  deliveryTip: {
    fontSize: 12,
    color: colors.success,
    textAlign: 'right',
  },
  deliveryBasicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  deliveryStore: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  deliveryCustomer: {
    fontSize: 14,
    color: colors.gray[600],
    marginLeft: 4,
  },
  deliveryDetails: {
    backgroundColor: colors.gray[50],
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  deliveryDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  deliveryDetailLabel: {
    fontSize: 12,
    color: colors.gray[600],
  },
  deliveryDetailValue: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
  },
  deliveryDetailTotal: {
    fontWeight: '700',
  },
  expandIconContainer: {
    alignItems: 'center',
    marginTop: 4,
  },
});