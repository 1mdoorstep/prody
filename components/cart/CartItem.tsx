import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { CartItem as CartItemType } from '@/types';
import { useCartStore } from '@/store/cartStore';
import colors from '@/constants/colors';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();
  
  const handleIncreaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };
  
  const handleRemove = () => {
    removeItem(item.id);
  };
  
  const price = item.discountPrice || item.price;
  const totalPrice = price * item.quantity;
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
            <Trash2 size={18} color={colors.error} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.category}>{item.category}</Text>
        
        <View style={styles.footer}>
          <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>
          
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={handleDecreaseQuantity} style={styles.quantityButton}>
              <Minus size={16} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity onPress={handleIncreaseQuantity} style={styles.quantityButton}>
              <Plus size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    padding: 4,
  },
  category: {
    fontSize: 14,
    color: colors.gray[600],
    marginVertical: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    overflow: 'hidden',
  },
  quantityButton: {
    padding: 6,
    backgroundColor: colors.gray[100],
  },
  quantity: {
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
});

export default CartItem;