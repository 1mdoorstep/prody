import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  StyleProp, 
  ViewStyle,
  Platform
} from 'react-native';
import { Heart, Plus, Star } from 'lucide-react-native';
import colors from '@/constants/colors';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onPress: (productId: string) => void;
  onAddToCart?: (product: Product) => void;
  style?: StyleProp<ViewStyle>;
  horizontal?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
  style,
  horizontal = false,
}) => {
  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - (product.discountPrice || 0)) / product.price) * 100) 
    : 0;

  if (horizontal) {
    return (
      <TouchableOpacity 
        style={[styles.horizontalContainer, style]} 
        onPress={() => onPress(product.id)}
        activeOpacity={0.8}
      >
        <Image source={{ uri: product.image }} style={styles.horizontalImage} />
        <View style={styles.horizontalContent}>
          <View style={styles.horizontalHeader}>
            <Text style={styles.horizontalName} numberOfLines={1}>{product.name}</Text>
            <TouchableOpacity style={styles.favoriteButton}>
              <Heart size={16} color={colors.gray[400]} />
            </TouchableOpacity>
          </View>
          <Text style={styles.storeName}>{product.storeName}</Text>
          
          <View style={styles.ratingContainer}>
            <Star size={12} color={colors.warning} fill={colors.warning} />
            <Text style={styles.ratingText}>{product.rating} ({product.reviews})</Text>
          </View>
          
          <View style={styles.horizontalFooter}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${product.discountPrice || product.price}</Text>
              {product.discountPrice && (
                <Text style={styles.originalPrice}>${product.price}</Text>
              )}
            </View>
            
            {onAddToCart && (
              <TouchableOpacity 
                style={styles.addButton}
                onPress={handleAddToCart}
              >
                <Plus size={16} color={colors.white} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        {product.discountPrice && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={() => onPress(product.id)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <TouchableOpacity style={styles.favoriteButton}>
          <Heart size={16} color={colors.gray[400]} />
        </TouchableOpacity>
        {product.discountPrice && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.storeName}>{product.storeName}</Text>
        
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.discountPrice || product.price}</Text>
            {product.discountPrice && (
              <Text style={styles.originalPrice}>${product.price}</Text>
            )}
          </View>
          
          {onAddToCart && (
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleAddToCart}
            >
              <Plus size={16} color={colors.white} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    width: 160,
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
    position: 'relative',
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.error,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.white,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
    height: 40,
  },
  storeName: {
    fontSize: 12,
    color: colors.gray[500],
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'column',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  originalPrice: {
    fontSize: 12,
    color: colors.gray[500],
    textDecorationLine: 'line-through',
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    height: 120,
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
  horizontalImage: {
    width: 120,
    height: '100%',
  },
  horizontalContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  horizontalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  horizontalName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  horizontalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  ratingText: {
    fontSize: 12,
    color: colors.gray[600],
    marginLeft: 4,
  },
});

export default ProductCard;