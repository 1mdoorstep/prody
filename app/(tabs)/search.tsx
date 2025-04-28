import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Filter, Grid, List } from 'lucide-react-native';
import { searchProducts, getNewProducts, getFeaturedProducts } from '@/mocks/products';
import { Product } from '@/types';
import SearchBar from '@/components/common/SearchBar';
import ProductCard from '@/components/common/ProductCard';
import { useStoreSettingsStore } from '@/store/storeSettingsStore';
import colors from '@/constants/colors';

export default function SearchScreen() {
  const params = useLocalSearchParams<{ q?: string, featured?: string, new?: string }>();
  const [searchQuery, setSearchQuery] = useState(params.q || '');
  const [products, setProducts] = useState<Product[]>([]);
  const { viewMode, toggleViewMode } = useStoreSettingsStore();
  
  useEffect(() => {
    if (params.featured === 'true') {
      setProducts(getFeaturedProducts());
    } else if (params.new === 'true') {
      setProducts(getNewProducts());
    } else if (params.q) {
      setSearchQuery(params.q);
      setProducts(searchProducts(params.q));
    }
  }, [params]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setProducts(searchProducts(query));
  };
  
  const renderGridItem = ({ item }: { item: Product }) => (
    <View style={styles.gridItem}>
      <ProductCard product={item} />
    </View>
  );
  
  const renderListItem = ({ item }: { item: Product }) => (
    <ProductCard product={item} horizontal />
  );
  
  const getTitle = () => {
    if (params.featured === 'true') {
      return 'Featured Products';
    } else if (params.new === 'true') {
      return 'New Arrivals';
    } else if (searchQuery) {
      return `Results for "${searchQuery}"`;
    } else {
      return 'Search Products';
    }
  };
  
  return (
    <View style={styles.container}>
      <SearchBar 
        placeholder="Search products..." 
        onSearch={handleSearch}
        autoFocus={!params.featured && !params.new}
      />
      
      <View style={styles.header}>
        <Text style={styles.title}>{getTitle()}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewModeButton} onPress={toggleViewMode}>
            {viewMode === 'grid' ? (
              <List size={20} color={colors.text} />
            ) : (
              <Grid size={20} color={colors.text} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      
      {products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={viewMode === 'grid' ? renderGridItem : renderListItem}
          keyExtractor={(item) => item.id}
          numColumns={viewMode === 'grid' ? 2 : 1}
          key={viewMode} // Force re-render when view mode changes
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={viewMode === 'grid' ? styles.columnWrapper : undefined}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {searchQuery ? `No products found for "${searchQuery}"` : 'Search for products'}
          </Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    padding: 8,
    marginRight: 8,
    backgroundColor: colors.gray[100],
    borderRadius: 8,
  },
  viewModeButton: {
    padding: 8,
    backgroundColor: colors.gray[100],
    borderRadius: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray[600],
    textAlign: 'center',
  },
});