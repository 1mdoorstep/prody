import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, Platform, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import colors from '@/constants/colors';

// Mock data
const categories = [
  { 
    id: 'grocery', 
    name: 'Grocery & Kitchen', 
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Regional Brands Now Online'
  },
  { 
    id: 'fruits', 
    name: 'Fruit & Vegetable', 
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Not From Warehouse'
  },
  { 
    id: 'meat', 
    name: 'Meat & Fish', 
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Freshly Cut, Never Frozen'
  },
  { 
    id: 'pharma', 
    name: 'Pharma & Wellness', 
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Prescription Drugs In Mins.'
  },
  { 
    id: 'beauty', 
    name: 'Beauty & Cosmetics', 
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Makeup, Skincare & More'
  },
  { 
    id: 'pet', 
    name: 'Pet Food & Supplies', 
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Everything For Your Pets'
  },
  { 
    id: 'flowers', 
    name: 'Flowers & Plants', 
    image: 'https://images.unsplash.com/photo-1561181286-d5c92b900f59?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Fresh Flowers & Indoor Plants'
  },
  { 
    id: 'books', 
    name: 'Books & Stationery', 
    image: 'https://images.unsplash.com/photo-1568205612837-017257d2310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Books, Pens & School Supplies'
  },
  { 
    id: 'toys', 
    name: 'Toys & Games', 
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Fun For All Ages',
    isNew: true
  },
  { 
    id: 'sports', 
    name: 'Sports & Fitness', 
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Equipment & Accessories',
    isNew: true
  },
  { 
    id: 'baby', 
    name: 'Baby & Kids', 
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Baby Food & Essentials'
  },
  { 
    id: 'breakfast', 
    name: 'Breakfast & Dairy', 
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Milk, Bread & Morning Essentials'
  },
];

export default function CategoriesScreen() {
  const router = useRouter();
  
  const handleCategoryPress = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };
  
  const handleSearchPress = () => {
    router.push('/search');
  };
  
  const renderCategoryItem = ({ item }: { item: typeof categories[0] }) => (
    <TouchableOpacity 
      style={styles.categoryCard}
      onPress={() => handleCategoryPress(item.id)}
      activeOpacity={0.8}
    >
      <View style={styles.categoryContent}>
        <View style={styles.categoryTextContainer}>
          <Text style={styles.categoryName}>{item.name}</Text>
          <Text style={styles.categoryDescription}>{item.description}</Text>
        </View>
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
        {item.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <View style={styles.locationBadge}>
              <Text style={styles.locationTime}>10</Text>
              <Text style={styles.locationTimeUnit}>mins</Text>
            </View>
            <View>
              <View style={styles.locationRow}>
                <Text style={styles.locationTitle}>560042 - Home</Text>
                <Text style={styles.locationArrow}>▼</Text>
              </View>
              <Text style={styles.locationSubtitle}>Sarjapur Outer Ring Road</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => router.push('/(customer)/profile')}
          >
            <View style={styles.profileIcon}>
              <Text style={styles.profileInitial}></Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.searchBar}
          onPress={handleSearchPress}
          activeOpacity={0.8}
        >
          <Search size={20} color={colors.gray[500]} />
          <Text style={styles.searchPlaceholder}>Search for item or store</Text>
        </TouchableOpacity>
        
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationBadge: {
    backgroundColor: '#1a73e8',
    borderRadius: 4,
    padding: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  locationTime: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  locationTimeUnit: {
    color: colors.white,
    fontSize: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginRight: 4,
  },
  locationArrow: {
    fontSize: 12,
    color: colors.gray[500],
  },
  locationSubtitle: {
    fontSize: 12,
    color: colors.gray[500],
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.gray[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.gray[600],
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  searchPlaceholder: {
    fontSize: 14,
    color: colors.gray[500],
    marginLeft: 8,
  },
  listContent: {
    padding: 12,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.gray[200],
    position: 'relative',
  },
  categoryContent: {
    padding: 12,
    height: 140,
    justifyContent: 'space-between',
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8B4513', // Brown color for category names
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 12,
    color: colors.gray[600],
    lineHeight: 16,
  },
  categoryImage: {
    width: 80,
    height: 80,
    position: 'absolute',
    bottom: 8,
    right: 8,
    borderRadius: 8,
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FFD700', // Gold color for NEW badge
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8B4513', // Brown text for contrast
  },
});