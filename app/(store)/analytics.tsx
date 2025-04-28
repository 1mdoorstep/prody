import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  Minus,
} from 'lucide-react-native';
import colors from '@/constants/colors';

const { width } = Dimensions.get('window');

// Mock data for analytics
const analyticsData = {
  today: {
    revenue: 12500,
    orders: 18,
    customers: 15,
    averageOrderValue: 694,
    topProducts: [
      { id: '1', name: 'Bosch Power Drill', sales: 3, revenue: 11997 },
      { id: '2', name: 'Stanley Measuring Tape', sales: 5, revenue: 1745 },
      { id: '3', name: 'Philips Screwdriver Set', sales: 4, revenue: 2796 },
      { id: '4', name: 'Claw Hammer', sales: 3, revenue: 1497 },
      { id: '5', name: 'PVC Pipe Cutter', sales: 2, revenue: 1798 },
    ],
    revenueChange: 15,
    ordersChange: 20,
    customersChange: 10,
    averageOrderValueChange: -5,
  },
  thisWeek: {
    revenue: 85000,
    orders: 124,
    customers: 98,
    averageOrderValue: 685,
    topProducts: [
      { id: '1', name: 'Bosch Power Drill', sales: 18, revenue: 71982 },
      { id: '3', name: 'Philips Screwdriver Set', sales: 25, revenue: 17475 },
      { id: '4', name: 'Dewalt Circular Saw', sales: 12, revenue: 83988 },
      { id: '2', name: 'Stanley Measuring Tape', sales: 32, revenue: 11168 },
      { id: '5', name: 'PVC Pipe Cutter', sales: 15, revenue: 13485 },
    ],
    revenueChange: 8,
    ordersChange: 12,
    customersChange: 5,
    averageOrderValueChange: 2,
  },
  thisMonth: {
    revenue: 350000,
    orders: 520,
    customers: 320,
    averageOrderValue: 673,
    topProducts: [
      { id: '1', name: 'Bosch Power Drill', sales: 75, revenue: 299925 },
      { id: '4', name: 'Dewalt Circular Saw', sales: 48, revenue: 335952 },
      { id: '3', name: 'Philips Screwdriver Set', sales: 92, revenue: 64308 },
      { id: '7', name: 'Wire Stripper', sales: 65, revenue: 38935 },
      { id: '2', name: 'Stanley Measuring Tape', sales: 120, revenue: 41880 },
    ],
    revenueChange: 12,
    ordersChange: 8,
    customersChange: 15,
    averageOrderValueChange: 0,
  },
};

// Filter options
const filterOptions = ['Today', 'This Week', 'This Month'];

// Chart data (mock)
const revenueChartData = [
  { day: 'Mon', value: 15000 },
  { day: 'Tue', value: 12000 },
  { day: 'Wed', value: 18000 },
  { day: 'Thu', value: 14000 },
  { day: 'Fri', value: 22000 },
  { day: 'Sat', value: 25000 },
  { day: 'Sun', value: 20000 },
];

export default function AnalyticsScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('Today');
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setShowFilterOptions(false);
  };

  const getAnalyticsData = () => {
    switch (selectedFilter) {
      case 'Today':
        return analyticsData.today;
      case 'This Week':
        return analyticsData.thisWeek;
      case 'This Month':
        return analyticsData.thisMonth;
      default:
        return analyticsData.today;
    }
  };

  const currentData = getAnalyticsData();
  
  // Find the maximum value in the chart data for scaling
  const maxChartValue = Math.max(...revenueChartData.map(item => item.value));

  const renderChangeIndicator = (change: number) => {
    if (change > 0) {
      return (
        <View style={[styles.changeIndicator, styles.positiveChange]}>
          <ArrowUp size={12} color={colors.success} />
          <Text style={styles.positiveChangeText}>{change}%</Text>
        </View>
      );
    } else if (change < 0) {
      return (
        <View style={[styles.changeIndicator, styles.negativeChange]}>
          <ArrowDown size={12} color={colors.error} />
          <Text style={styles.negativeChangeText}>{Math.abs(change)}%</Text>
        </View>
      );
    } else {
      return (
        <View style={[styles.changeIndicator, styles.neutralChange]}>
          <Minus size={12} color={colors.gray[600]} />
          <Text style={styles.neutralChangeText}>0%</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Analytics & Reports</Text>
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
        
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <View style={[styles.statIconContainer, styles.revenueIcon]}>
                  <DollarSign size={20} color={colors.primary} />
                </View>
                <View style={styles.statChange}>
                  {renderChangeIndicator(currentData.revenueChange)}
                </View>
              </View>
              <Text style={styles.statValue}>₹{currentData.revenue.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Revenue</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <View style={[styles.statIconContainer, styles.ordersIcon]}>
                  <ShoppingBag size={20} color="#FF9800" />
                </View>
                <View style={styles.statChange}>
                  {renderChangeIndicator(currentData.ordersChange)}
                </View>
              </View>
              <Text style={styles.statValue}>{currentData.orders}</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <View style={[styles.statIconContainer, styles.customersIcon]}>
                  <Users size={20} color="#4CAF50" />
                </View>
                <View style={styles.statChange}>
                  {renderChangeIndicator(currentData.customersChange)}
                </View>
              </View>
              <Text style={styles.statValue}>{currentData.customers}</Text>
              <Text style={styles.statLabel}>Customers</Text>
            </View>
            
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <View style={[styles.statIconContainer, styles.aovIcon]}>
                  <TrendingUp size={20} color="#9C27B0" />
                </View>
                <View style={styles.statChange}>
                  {renderChangeIndicator(currentData.averageOrderValueChange)}
                </View>
              </View>
              <Text style={styles.statValue}>₹{currentData.averageOrderValue}</Text>
              <Text style={styles.statLabel}>Avg. Order</Text>
            </View>
          </View>
          
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Revenue Trend</Text>
            <View style={styles.chart}>
              {revenueChartData.map((item, index) => {
                const barHeight = (item.value / maxChartValue) * 150;
                return (
                  <View key={index} style={styles.chartBarContainer}>
                    <View style={[styles.chartBar, { height: barHeight }]} />
                    <Text style={styles.chartLabel}>{item.day}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          
          <View style={styles.topProductsContainer}>
            <Text style={styles.topProductsTitle}>Top Selling Products</Text>
            {currentData.topProducts.map((product, index) => (
              <View key={product.id} style={styles.productRow}>
                <View style={styles.productRank}>
                  <Text style={styles.productRankText}>{index + 1}</Text>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <View style={styles.productStats}>
                    <Text style={styles.productSales}>{product.sales} sold</Text>
                    <Text style={styles.productRevenue}>₹{product.revenue.toLocaleString()}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
          
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                // In a real app, this would generate a report
                alert('This would generate a detailed report in a real app');
              }}
            >
              <Text style={styles.actionButtonText}>Generate Detailed Report</Text>
            </TouchableOpacity>
          </View>
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
  scrollContainer: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 48) / 2,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    margin: 8,
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
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  revenueIcon: {
    backgroundColor: colors.primaryLight,
  },
  ordersIcon: {
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
  },
  customersIcon: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  aovIcon: {
    backgroundColor: 'rgba(156, 39, 176, 0.1)',
  },
  statChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  positiveChange: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  negativeChange: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  neutralChange: {
    backgroundColor: 'rgba(158, 158, 158, 0.1)',
  },
  positiveChangeText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.success,
    marginLeft: 2,
  },
  negativeChangeText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.error,
    marginLeft: 2,
  },
  neutralChangeText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.gray[600],
    marginLeft: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.gray[600],
  },
  chartContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    margin: 16,
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
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  chart: {
    flexDirection: 'row',
    height: 200,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  chartBarContainer: {
    alignItems: 'center',
    flex: 1,
  },
  chartBar: {
    width: 20,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  chartLabel: {
    fontSize: 12,
    color: colors.gray[600],
    marginTop: 8,
  },
  topProductsContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    margin: 16,
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
  topProductsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  productRank: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  productRankText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  productStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productSales: {
    fontSize: 12,
    color: colors.gray[600],
  },
  productRevenue: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  actionsContainer: {
    padding: 16,
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
});