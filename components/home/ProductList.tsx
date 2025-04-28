import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Product } from '@/types';
import ProductCard from '@/components/common/ProductCard';
import colors from '@/constants/colors';

interface ProductListProps {
  title: string;
  products: Product[];
  showAll?: boolean;
  targetScreen?: string;
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  products,
  showAll = true,
  targetScreen = '/products',
}) => {
  const router = useRouter();

  const handleSeeAllPress = () => {
    router.push(targetScreen);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <ProductCard product={item} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {showAll && (
          <TouchableOpacity onPress={handleSeeAllPress}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  seeAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  listContent: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  productItem: {
    width: 180,
    marginRight: 12,
  },
});

export default ProductList;