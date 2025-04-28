import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Star, Minus, Plus, ShoppingCart, Heart } from 'lucide-react-native';
import colors from '@/constants/colors';
import { Product } from '@/types';

// Mock products data
const mockProducts: Record<string, Product> = {
  'product1': {
    id: 'product1',
    name: 'Organic Bananas',
    description: 'Fresh organic bananas, pack of 6. Sourced directly from organic farms, these bananas are free from harmful pesticides and chemicals. Rich in potassium and other essential nutrients, they make for a healthy snack option for people of all ages.',
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
  'product2': {
    id: 'product2',
    name: 'Fresh Apples',
    description: 'Red delicious apples, 1kg pack. These juicy and crunchy apples are handpicked from the finest orchards. Perfect for eating fresh, making pies, or adding to your morning oatmeal. A great source of fiber and vitamin C.',
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
  'product3': {
    id: 'product3',
    name: 'Chicken Breast',
    description: 'Boneless chicken breast, 500g pack. Premium quality chicken breast that is perfect for grilling, baking, or stir-frying. High in protein and low in fat, it is an excellent choice for health-conscious individuals and fitness enthusiasts.',
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
  'product4': {
    id: 'product4',
    name: 'Paracetamol',
    description: 'Fever and pain relief, 10 tablets. Effective for relieving mild to moderate pain such as headache, toothache, and reducing high temperature. Always read the label and use only as directed.',
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
  'product5': {
    id: 'product5',
    name: 'Moisturizing Cream',
    description: 'Hydrating face cream, 50ml. This rich, nourishing cream provides intense hydration for dry and normal skin types. Formulated with natural ingredients, it helps restore moisture balance and leaves your skin feeling soft and supple.',
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
};

// Similar products based on category
const getSimilarProducts = (currentProduct: Product): Product[] => {
  return Object.values(mockProducts).filter(
    product => product.category === currentProduct.category && product.id !== currentProduct.id
  ).slice(0, 3);
};

export default function ProductDetailScreen() {
  const params = useLocalSearchParams();
  const id = params.id as string;
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch product details
    setTimeout(() => {
      if (id && mockProducts[id]) {
        const fetchedProduct = mockProducts[id];
        setProduct(fetchedProduct);
        setSimilarProducts(getSimilarProducts(fetchedProduct));
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleBack = () => {
    router.back();
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      // In a real app, this would add the product to the cart
      Alert.alert('Success', `Added ${quantity} ${product.name} to cart`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      // In a real app, this would add the product to the cart and navigate to checkout
      router.push('/cart');
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleStorePress = () => {
    if (product) {
      router.push(`/store/${product.storeId}`);
    }
  };

  const handleSimilarProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading product details...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
        <TouchableOpacity style={styles.backToHomeButton} onPress={() => router.push('/(customer)')}>
          <Text style={styles.backToHomeText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
            <Heart 
              size={20} 
              color={isFavorite ? colors.error : colors.gray[400]} 
              fill={isFavorite ? colors.error : 'none'} 
            />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.productName}>{product.name}</Text>
            
            <View style={styles.ratingContainer}>
              <View style={styles.ratingStars}>
                <Star size={16} color="#FFD700" fill="#FFD700" />
                <Text style={styles.ratingText}>{product.rating}</Text>
                <Text style={styles.reviewsText}>({product.reviews} reviews)</Text>
              </View>
              <TouchableOpacity onPress={handleStorePress}>
                <Text style={styles.storeName}>Sold by {product.storeName}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.price}>₹{product.discountPrice || product.price}</Text>
              {product.discountPrice && (
                <Text style={styles.originalPrice}>₹{product.price}</Text>
              )}
              {product.discountPrice && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                style={[styles.quantityButton, quantity === 1 && styles.quantityButtonDisabled]} 
                onPress={handleDecreaseQuantity}
                disabled={quantity === 1}
              >
                <Minus size={16} color={quantity === 1 ? colors.gray[400] : colors.text} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity style={styles.quantityButton} onPress={handleIncreaseQuantity}>
                <Plus size={16} color={colors.text} />
              </TouchableOpacity>
            </View>

            {similarProducts.length > 0 && (
              <>
                <View style={styles.divider} />
                <Text style={styles.sectionTitle}>Similar Products</Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.similarProductsContainer}
                >
                  {similarProducts.map((item) => (
                    <TouchableOpacity 
                      key={item.id} 
                      style={styles.similarProductCard}
                      onPress={() => handleSimilarProductPress(item.id)}
                    >
                      <Image source={{ uri: item.image }} style={styles.similarProductImage} />
                      <View style={styles.similarProductContent}>
                        <Text style={styles.similarProductName} numberOfLines={1}>{item.name}</Text>
                        <Text style={styles.similarProductPrice}>₹{item.discountPrice || item.price}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
            )}

            <View style={styles.spacer} />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <ShoppingCart size={20} color={colors.primary} />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.buyNowButton}
            onPress={handleBuyNow}
          >
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
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
    backgroundColor: colors.white,
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
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
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
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
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: colors.gray[100],
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 16,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
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
  storeName: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: colors.gray[500],
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discountBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray[200],
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.gray[700],
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonDisabled: {
    opacity: 0.5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginHorizontal: 16,
  },
  similarProductsContainer: {
    paddingVertical: 8,
  },
  similarProductCard: {
    width: 140,
    marginRight: 16,
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
  similarProductImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  similarProductContent: {
    padding: 8,
  },
  similarProductName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  similarProductPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  spacer: {
    height: 80,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    marginRight: 8,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 8,
  },
  buyNowButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  buyNowText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});