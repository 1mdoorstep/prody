import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Platform,
  Alert
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  ArrowLeft,
  ChevronRight
} from 'lucide-react-native';
import colors from '@/constants/colors';
import { useCartStore } from '@/store/cartStore';
import Button from '@/components/common/Button';

export default function CartScreen() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice, clearCart } = useCartStore();
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleQuantityChange = (id: string, action: 'increase' | 'decrease', currentQty: number) => {
    if (action === 'increase') {
      updateQuantity(id, currentQty + 1);
    } else if (action === 'decrease') {
      if (currentQty > 1) {
        updateQuantity(id, currentQty - 1);
      } else {
        handleRemoveItem(id);
      }
    }
  };
  
  const handleRemoveItem = (id: string) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your cart?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Remove", 
          onPress: () => removeItem(id),
          style: "destructive"
        }
      ]
    );
  };
  
  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert("Empty Cart", "Your cart is empty. Add some items to proceed.");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/checkout');
    }, 1000);
  };
  
  const handleContinueShopping = () => {
    router.back();
  };
  
  const renderCartItem = (item: any) => (
    <View key={item.id} style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      
      <View style={styles.itemDetails}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemUnit}>{item.unit}</Text>
          <Text style={styles.itemPrice}>₹{item.price}</Text>
        </View>
        
        <View style={styles.itemActions}>
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={() => handleRemoveItem(item.id)}
          >
            <Trash2 size={16} color={colors.error} />
          </TouchableOpacity>
          
          <View style={styles.quantityControls}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(item.id, 'decrease', item.quantity)}
            >
              <Minus size={16} color={colors.text} />
            </TouchableOpacity>
            
            <Text style={styles.quantityValue}>{item.quantity}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(item.id, 'increase', item.quantity)}
            >
              <Plus size={16} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: `Cart (${getTotalItems()})`,
          headerLeft: () => (
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }} 
      />
      
      {items.length > 0 ? (
        <>
          <ScrollView style={styles.scrollView}>
            <View style={styles.cartItems}>
              {items.map(renderCartItem)}
            </View>
            
            <View style={styles.couponContainer}>
              <TouchableOpacity 
                style={styles.couponButton}
                onPress={() => router.push('/apply-coupon')}
              >
                <Text style={styles.couponText}>Apply Coupon</Text>
                <ChevronRight size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>₹{getTotalPrice().toFixed(2)}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>₹40.00</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax</Text>
                <Text style={styles.summaryValue}>₹{(getTotalPrice() * 0.05).toFixed(2)}</Text>
              </View>
              
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  ₹{(getTotalPrice() + 40 + (getTotalPrice() * 0.05)).toFixed(2)}
                </Text>
              </View>
            </View>
          </ScrollView>
          
          <View style={styles.checkoutBar}>
            <View style={styles.totalContainer}>
              <Text style={styles.checkoutTotalLabel}>Total:</Text>
              <Text style={styles.checkoutTotalValue}>
                ₹{(getTotalPrice() + 40 + (getTotalPrice() * 0.05)).toFixed(2)}
              </Text>
            </View>
            
            <Button
              title="Checkout"
              onPress={handleCheckout}
              loading={isLoading}
              style={styles.checkoutButton}
            />
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <ShoppingBag size={80} color={colors.gray[300]} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Looks like you haven't added anything to your cart yet.</Text>
          
          <Button
            title="Continue Shopping"
            onPress={handleContinueShopping}
            style={styles.continueButton}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButton: {
    marginRight: 16,
  },
  scrollView: {
    flex: 1,
  },
  cartItems: {
    padding: 16,
  },
  cartItem: {
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
        elevation: 3,
      },
    }),
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  itemUnit: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  removeButton: {
    padding: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.gray[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  couponContainer: {
    padding: 16,
    marginBottom: 8,
  },
  couponButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
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
  couponText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  summaryContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginTop: 8,
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
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.gray[600],
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingTop: 12,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  checkoutBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  totalContainer: {
    flex: 1,
  },
  checkoutTotalLabel: {
    fontSize: 14,
    color: colors.gray[600],
  },
  checkoutTotalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  checkoutButton: {
    width: 150,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.gray[600],
    textAlign: 'center',
    marginBottom: 32,
  },
  continueButton: {
    width: 200,
  },
});