import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Star, MapPin, Clock, Search, Filter } from 'lucide-react-native';
import colors from '@/constants/colors';
import { Store, Product, Category } from '@/types';

// Mock stores data
const mockStores: Record<string, Store> = {
  'store1': {
    id: 'store1',
    name: 'Fresh Mart',
    description: 'Your local grocery store with fresh produce, pantry essentials, and household items. We source our products from local farmers and suppliers to ensure the highest quality.',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9c8a213?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    address: '123 Main St, Anytown',
    phone: '+91 9876543210',
    rating: 4.5,
    reviews: 120,
    categories: ['grocery', 'fruits', 'breakfast'],
    deliveryTime: 25,
    minimumOrder: 100,
    openingHours: '8:00 AM - 10:00 PM',
  },
  'store2': {
    id: 'store2',
    name: 'Meat Paradise',
    description: 'Premium meat and seafood shop offering the finest cuts of meat, fresh seafood, and poultry. All our products are sourced from trusted farms and fisheries.',
    image: 'https://images.unsplash.com/photo-1585631300237-0deab4c3d773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    address: '456 Butcher St, Anytown',
    phone: '+91 9876543211',
    rating: 4.7,
    reviews: 85,
    categories: ['meat'],
    deliveryTime: 30,
    minimumOrder: 200,
    openingHours: '7:00 AM - 9:00 PM',
  },
  'store3': {
    id: 'store3',
    name: 'Green Basket',
    description: 'Fresh fruits and vegetables sourced directly from local farms. We ensure that all our produce is pesticide-free and harvested at the peak of freshness.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    address: '789 Garden Rd, Anytown',
    phone: '+91 9876543212',
    rating: 4.3,
    reviews: 95,
    categories: ['fruits'],
    deliveryTime: 20,
    minimumOrder: 150,
    openingHours: '6:00 AM - 8:00 PM',
  },
};

// Mock products data
const mockProducts: Product[] = [
  {
    id: 'product1',
    name: 'Organic Bananas',
    description: 'Fresh organic bananas, pack of 6',
    price: 40,
    discountPrice: 35,
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'fruits',
    rating: 4.5,
    reviews: 28,
    inStock: true,
    storeId: 'store3',
    storeName: 'Green Basket',
  },
  {
    id: 'product2',
    name: 'Fresh Apples',
    description: 'Red delicious apples, 1kg pack',
    price: 80,
    discountPrice: null,
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'fruits',
    rating: 4.3,
    reviews: 42,
    inStock: true,
    storeId: 'store3',
    storeName: 'Green Basket',
  },
  {
    id: 'product3',
    name: 'Chicken Breast',
    description: 'Boneless chicken breast, 500g pack',
    price: 180,
    discountPrice: 160,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'meat',
    rating: 4.7,
    reviews: 36,
    inStock: true,
    storeId: 'store2',
    storeName: 'Meat Paradise',
  },
  {
    id: 'product4',
    name: 'Paracetamol',
    description: 'Fever and pain relief, 10 tablets',
    price: 30,
    discountPrice: null,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'pharma',
    rating: 4.9,
    reviews: 120,
    inStock: true,
    storeId: 'store4',
    storeName: 'MediQuick',
  },
  {
    id: 'product5',
    name: 'Moisturizing Cream',
    description: 'Hydrating face cream, 50ml',
    price: 250,
    discountPrice: 220,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'beauty',
    rating: 4.6,
    reviews: 85,
    inStock: true,
    storeId: 'store5',
    storeName: 'Beauty Hub',
  },
  {
    id: 'product6',
    name: 'Whole Wheat Bread',
    description: 'Freshly baked whole wheat bread, 400g',
    price: 35,
    discountPrice: null,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'grocery',
    rating: 4.2,
    reviews: 56,
    inStock: true,
    storeId: 'store1',
    storeName: 'Fresh Mart',
  },
  {
    id: 'product7',
    name: 'Organic Milk',
    description: 'Farm fresh organic milk, 1L',
    price: 60,
    discountPrice: 55,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'grocery',
    rating: 4.4,
    reviews: 78,
    inStock: true,
    storeId: 'store1',
    storeName: 'Fresh Mart',
  },
  {
    id: 'product8',
    name: 'Breakfast Cereal',
    description: 'Healthy breakfast cereal with nuts and fruits, 500g',
    price: 120,
    discountPrice: 99,
    image: 'https://images.unsplash.com/photo-1545610450-879b8a7b2cdf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'breakfast',
    rating: 4.1,
    reviews: 45,
    inStock: true,
    storeId: 'store1',
    storeName: 'Fresh Mart',
  },
];

// Mock categories
const mockCategories: Category[] = [
  { 
    id: 'all', 
    name: 'All', 
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'All products'
  },
  { 
    id: 'grocery', 
    name: 'Grocery', 
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Everyday essentials'
  },
  { 
    id: 'fruits', 
    name: 'Fruits & Veggies', 
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Farm fresh produce'
  },
  { 
    id: 'meat', 
    name: 'Meat & Fish', 
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Fresh cuts daily'
  },
  { 
    id: 'breakfast', 
    name: 'Breakfast', 
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Start your day right'
  },
];

export default function StoreDetailScreen() {
  const params = useLocalSearchParams();
  const id = params.id as string;
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState<Store | null>(null);
  const [storeProducts, setStoreProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Simulate API call to fetch store details
    setTimeout(() => {
      if (id && mockStores[id]) {
        setStore(mockStores[id]);
        
        // Filter products by store ID
        const products = mockProducts.filter(product => product.storeId === id);
        setStoreProducts(products);
        setFilteredProducts(products);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(storeProducts);
    } else {
      setFilteredProducts(storeProducts.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, storeProducts]);

  const handleBack = () => {
    router.back();
  };

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleAddToCart = (product: Product) => {
    // In a real app, this would add the product to the cart
    alert(`Added ${product.name} to cart`);
  };

  const handleSearch = () => {
    router.push('/search');
  };

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity 
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategoryItem
      ]}
      onPress={() => handleCategoryPress(item.id)}
    >
      <Text 
        style={[
          styles.categoryName,
          selectedCategory === item.id && styles.selectedCategoryName
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => handleProductPress(item.id)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productContent}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>{item.description}</Text>
        <View style={styles.productPriceRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.productPrice}>₹{item.discountPrice || item.price}</Text>
            {item.discountPrice && (
              <Text style={styles.productOriginalPrice}>₹{item.price}</Text>
            )}
          </View>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={(e) => {
              e.stopPropagation();
              handleAddToCart(item);
            }}
          >
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading store details...</Text>
      </View>
    );
  }

  if (!store) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Store not found</Text>
        <TouchableOpacity style={styles.backToHomeButton} onPress={() => router.push('/(customer)')}>
          <Text style={styles.backToHomeText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Filter categories to only show those that the store has products for
  const storeCategories = [
    mockCategories[0], // Always include "All" category
    ...mockCategories.filter(category => 
      category.id !== 'all' && store.categories.includes(category.id)
    )
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={20} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{store.name}</Text>
          <TouchableOpacity style={styles.filterButton} onPress={handleSearch}>
            <Search size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.storeImageContainer}>
            <Image source={{ uri: store.image }} style={styles.storeImage} />
          </View>

          <View style={styles.storeInfoContainer}>
            <Text style={styles.storeName}>{store.name}</Text>
            
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>{store.rating}</Text>
              <Text style={styles.reviewsText}>({store.reviews} reviews)</Text>
            </View>
            
            <Text style={styles.storeDescription}>{store.description}</Text>
            
            <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <MapPin size={16} color={colors.primary} />
                <Text style={styles.detailText}>{store.address}</Text>
              </View>
              <View style={styles.detailItem}>
                <Clock size={16} color={colors.primary} />
                <Text style={styles.detailText}>{store.openingHours}</Text>
              </View>
            </View>
            
            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Delivery Time</Text>
                <Text style={styles.infoValue}>{store.deliveryTime} mins</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Minimum Order</Text>
                <Text style={styles.infoValue}>₹{store.minimumOrder}</Text>
              </View>
            </View>
          </View>

          <View style={styles.categoriesContainer}>
            <FlatList
              data={storeCategories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesList}
            />
          </View>

          <View style={styles.productsContainer}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <View key={product.id} style={styles.productWrapper}>
                  {renderProductItem({ item: product })}
                </View>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No products found in this category</Text>
              </View>
            )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.text,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 16,
  },
  backToHomeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backToHomeText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeImageContainer: {
    width: '100%',
    height: 200,
  },
  storeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  storeInfoContainer: {
    padding: 16,
    backgroundColor: colors.white,
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
  storeName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: colors.gray[500],
    marginLeft: 4,
  },
  storeDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.gray[700],
    marginBottom: 16,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.gray[700],
    marginLeft: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    padding: 12,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: colors.gray[600],
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  categoriesContainer: {
    backgroundColor: colors.white,
    paddingVertical: 12,
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
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
    marginRight: 12,
  },
  selectedCategoryItem: {
    backgroundColor: colors.primary,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  selectedCategoryName: {
    color: colors.white,
  },
  productsContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  productWrapper: {
    marginBottom: 16,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
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
  productImage: {
    width: 100,
    height: 100,
  },
  productContent: {
    flex: 1,
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 8,
    height: 40,
  },
  productPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  productOriginalPrice: {
    fontSize: 14,
    color: colors.gray[500],
    textDecorationLine: 'line-through',
    marginLeft: 4,
  },
  addButton: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray[600],
    textAlign: 'center',
  },
});