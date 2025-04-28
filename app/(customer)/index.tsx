import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  FlatList,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search, MapPin, ChevronDown, Star } from 'lucide-react-native';
import colors from '@/constants/colors';
import { Product, Category, Store } from '@/types';

// Mock categories
const categories: Category[] = [
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
    id: 'pharma', 
    name: 'Pharmacy', 
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Medicines & more'
  },
  { 
    id: 'beauty', 
    name: 'Beauty', 
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'Makeup & skincare'
  },
];

// Mock products
const products: Product[] = [
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
];

// Mock stores
const stores: Store[] = [
  {
    id: 'store1',
    name: 'Fresh Mart',
    description: 'Your local grocery store',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9c8a213?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    address: '123 Main St, Anytown',
    rating: 4.5,
    reviews: 120,
    categories: ['grocery', 'fruits', 'breakfast'],
    deliveryTime: 25,
    minimumOrder: 100,
  },
  {
    id: 'store2',
    name: 'Meat Paradise',
    description: 'Premium meat and seafood',
    image: 'https://images.unsplash.com/photo-1585631300237-0deab4c3d773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    address: '456 Butcher St, Anytown',
    rating: 4.7,
    reviews: 85,
    categories: ['meat'],
    deliveryTime: 30,
    minimumOrder: 200,
  },
  {
    id: 'store3',
    name: 'Green Basket',
    description: 'Fresh fruits and vegetables',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    address: '789 Garden Rd, Anytown',
    rating: 4.3,
    reviews: 95,
    categories: ['fruits'],
    deliveryTime: 20,
    minimumOrder: 150,
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [nearbyStores, setNearbyStores] = useState<Store[]>([]);

  useEffect(() => {
    // Simulate API call to fetch popular products
    setPopularProducts(products);
    
    // Simulate API call to fetch nearby stores
    setNearbyStores(stores);
  }, []);

  const handleSearchPress = () => {
    router.push('/search');
  };

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleStorePress = (storeId: string) => {
    router.push(`/store/${storeId}`);
  };

  const handleViewAllCategories = () => {
    router.push('/(customer)/categories');
  };

  const handleViewAllProducts = () => {
    router.push('/search?filter=popular');
  };

  const handleViewAllStores = () => {
    router.push('/search?filter=stores');
  };

  const handleAddToCart = (product: Product) => {
    // In a real app, this would add the product to the cart
    alert(`Added ${product.name} to cart`);
  };

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity 
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item.id)}
      activeOpacity={0.8}
    >
      <View style={styles.categoryImageContainer}>
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
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

  const renderStoreItem = ({ item }: { item: Store }) => (
    <TouchableOpacity 
      style={styles.storeCard}
      onPress={() => handleStorePress(item.id)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.storeImage} />
      <View style={styles.storeContent}>
        <View style={styles.storeHeader}>
          <Text style={styles.storeName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.storeDescription} numberOfLines={1}>{item.description}</Text>
        <View style={styles.storeFooter}>
          <Text style={styles.deliveryTime}>{item.deliveryTime} mins</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.minimumOrder}>₹{item.minimumOrder} minimum</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <MapPin size={20} color={colors.primary} />
          <View style={styles.locationTextContainer}>
            <View style={styles.locationRow}>
              <Text style={styles.locationTitle}>Home</Text>
              <ChevronDown size={16} color={colors.text} />
            </View>
            <Text style={styles.locationSubtitle}>123 Main St, Anytown</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => router.push('/(customer)/profile')}
        >
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }} 
            style={styles.profileImage} 
          />
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

      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' }} 
          style={styles.bannerImage} 
        />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>20% OFF</Text>
          <Text style={styles.bannerSubtitle}>On your first order</Text>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>Order Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <TouchableOpacity onPress={handleViewAllCategories}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      />

      {/* Popular Products */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular Products</Text>
        <TouchableOpacity onPress={handleViewAllProducts}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={popularProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productsContainer}
      />

      {/* Nearby Stores */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Nearby Stores</Text>
        <TouchableOpacity onPress={handleViewAllStores}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.storesContainer}>
        {nearbyStores.map((store) => (
          <View key={store.id} style={styles.storeWrapper}>
            {renderStoreItem({ item: store })}
          </View>
        ))}
      </View>

      <View style={styles.footer} />
    </ScrollView>
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
    paddingTop: 16,
    paddingBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationTextContainer: {
    marginLeft: 8,
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
  locationSubtitle: {
    fontSize: 12,
    color: colors.gray[500],
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: 40,
    height: 40,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
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
  bannerContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
    height: 160,
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
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bannerOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 16,
    height: '100%',
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 16,
  },
  bannerButton: {
    backgroundColor: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
  },
  categoryImageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
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
  categoryImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
  productsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  productCard: {
    width: 160,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginRight: 16,
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
    width: '100%',
    height: 120,
  },
  productContent: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: colors.gray[600],
    marginBottom: 8,
    height: 32,
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
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  productOriginalPrice: {
    fontSize: 12,
    color: colors.gray[500],
    textDecorationLine: 'line-through',
    marginLeft: 4,
  },
  addButton: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  storesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  storeWrapper: {
    marginBottom: 16,
  },
  storeCard: {
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
  storeImage: {
    width: 100,
    height: 100,
  },
  storeContent: {
    flex: 1,
    padding: 12,
  },
  storeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 2,
  },
  storeDescription: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 8,
  },
  storeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryTime: {
    fontSize: 12,
    color: colors.gray[600],
  },
  dot: {
    fontSize: 12,
    color: colors.gray[600],
    marginHorizontal: 4,
  },
  minimumOrder: {
    fontSize: 12,
    color: colors.gray[600],
  },
  footer: {
    height: 20,
  },
});