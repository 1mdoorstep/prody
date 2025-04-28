import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator,
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Filter, Star } from 'lucide-react-native';
import colors from '@/constants/colors';
import { Product, Store } from '@/types';

// Mock categories data
const categories = {
  grocery: {
    id: 'grocery',
    name: 'Grocery & Kitchen',
    description: 'Regional Brands Now Online',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  fruits: {
    id: 'fruits',
    name: 'Fruit & Vegetable',
    description: 'Not From Warehouse',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  meat: {
    id: 'meat',
    name: 'Meat & Fish',
    description: 'Freshly Cut, Never Frozen',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  pharma: {
    id: 'pharma',
    name: 'Pharma & Wellness',
    description: 'Prescription Drugs In Mins.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  beauty: {
    id: 'beauty',
    name: 'Beauty & Cosmetics',
    description: 'Makeup, Skincare & More',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
};

// Mock products
const products = [
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
const stores = [
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

export default function CategoryScreen() {
  const params = useLocalSearchParams();
  const id = params.id as string;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<any>(null);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [categoryStores, setCategoryStores] = useState<Store[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'stores'>('products');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (id && categories[id as keyof typeof categories]) {
        setCategory(categories[id as keyof typeof categories]);
        
        // Filter products by category
        const filteredProducts = products.filter(product => product.category === id);
        setCategoryProducts(filteredProducts);
        
        // Filter stores by category
        const filteredStores = stores.filter(store => store.categories.includes(id as string));
        setCategoryStores(filteredStores);
      }
      setLoading(false);
    }, 500); // Reduced timeout for better UX
  }, [id]);

  const handleBack = () => {
    router.back();
  };

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleStorePress = (storeId: string) => {
    router.push(`/store/${storeId}`);
  };

  const handleAddToCart = (product: Product) => {
    // In a real app, this would add the product to the cart
    alert(`Added ${product.name} to cart`);
  };

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading category...</Text>
      </View>
    );
  }

  if (!category) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Category not found</Text>
        <TouchableOpacity style={styles.backToHomeButton} onPress={() => router.push('/(customer)')}>
          <Text style={styles.backToHomeText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category.name}</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.categoryBanner}>
        <Image source={{ uri: category.image }} style={styles.categoryImage} />
        <View style={styles.categoryOverlay}>
          <Text style={styles.categoryName}>{category.name}</Text>
          <Text style={styles.categoryDescription}>{category.description}</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'products' && styles.activeTab]}
          onPress={() => setActiveTab('products')}
        >
          <Text style={[styles.tabText, activeTab === 'products' && styles.activeTabText]}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'stores' && styles.activeTab]}
          onPress={() => setActiveTab('stores')}
        >
          <Text style={[styles.tabText, activeTab === 'stores' && styles.activeTabText]}>Stores</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'products' ? (
        categoryProducts.length > 0 ? (
          <FlatList
            data={categoryProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found in this category</Text>
          </View>
        )
      ) : (
        categoryStores.length > 0 ? (
          <FlatList
            data={categoryStores}
            renderItem={renderStoreItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No stores found in this category</Text>
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: 36,
    height: 36,
    borderRadius: 18,
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
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBanner: {
    height: 120,
    position: 'relative',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  categoryOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 16,
    height: '100%',
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 16,
    color: colors.white,
  },
  tabContainer: {
    flexDirection: 'row',
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
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.gray[600],
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
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
  storeCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray[600],
    textAlign: 'center',
  },
});