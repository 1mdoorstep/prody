import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ShoppingCart } from 'lucide-react-native';
import { useCartStore } from '@/store/cartStore';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import Button from '@/components/common/Button';
import colors from '@/constants/colors';

export default function CartScreen() {
  const router = useRouter();
  const { items } = useCartStore();
  
  const handleCheckout = () => {
    router.push('/checkout');
  };
  
  const handleContinueShopping = () => {
    router.push('/');
  };
  
  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <ShoppingCart size={80} color={colors.gray[300]} />
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptyText}>
          Looks like you haven't added any products to your cart yet.
        </Text>
        <Button 
          title="Continue Shopping" 
          onPress={handleContinueShopping} 
          style={styles.continueButton}
        />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={<CartSummary onCheckout={handleCheckout} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: colors.background,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray[600],
    textAlign: 'center',
    marginBottom: 24,
  },
  continueButton: {
    width: '80%',
  },
});