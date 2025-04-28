import React from 'react';
import { StyleSheet, View, ScrollView, StatusBar } from 'react-native';
import { useStoreSettingsStore } from '@/store/storeSettingsStore';
import { getFeaturedProducts, getNewProducts } from '@/mocks/products';
import { categories } from '@/mocks/categories';
import SearchBar from '@/components/common/SearchBar';
import Banner from '@/components/home/Banner';
import CategoryList from '@/components/home/CategoryList';
import ProductList from '@/components/home/ProductList';
import StoreInfo from '@/components/home/StoreInfo';
import colors from '@/constants/colors';

export default function HomeScreen() {
  const { currentStore } = useStoreSettingsStore();
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SearchBar />
        
        <Banner 
          title="Quality Hardware & Tools"
          subtitle="Find everything you need for your next project"
          image={currentStore.banner}
          targetScreen="/categories"
        />
        
        <StoreInfo store={currentStore} />
        
        <CategoryList 
          title="Categories"
          categories={categories}
        />
        
        <ProductList 
          title="Featured Products"
          products={featuredProducts}
          targetScreen="/search?featured=true"
        />
        
        <ProductList 
          title="New Arrivals"
          products={newProducts}
          targetScreen="/search?new=true"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 24,
  },
});