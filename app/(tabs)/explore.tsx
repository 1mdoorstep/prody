import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { categories } from '@/mocks/categories';
import { getFeaturedProducts } from '@/mocks/products';
import SearchBar from '@/components/common/SearchBar';
import CategoryCard from '@/components/common/CategoryCard';
import ProductCard from '@/components/common/ProductCard';
import colors from '@/constants/colors';

export default function ExploreScreen() {
  const featuredProducts = getFeaturedProducts();
  
  return (
    <View style={styles.container}>
      <SearchBar />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Browse Categories</Text>
        
        <FlatList
          data={categories}
          renderItem={({ item }) => <CategoryCard category={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
        
        <Text style={styles.sectionTitle}>Featured Products</Text>
        
        <View style={styles.productsGrid}>
          {featuredProducts.map(product => (
            <View key={product.id} style={styles.productItem}>
              <ProductCard product={product} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  categoryList: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  productItem: {
    width: '48%',
    marginBottom: 16,
  },
});