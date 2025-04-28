import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator,
  Platform
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { ArrowLeft, Filter } from 'lucide-react-native';
import colors from '@/constants/colors';
import SearchBar from '@/components/common/SearchBar';
import ProductCard from '@/components/common/ProductCard';

// Mock data
const allProducts = [
  {
    id: 'product1',
    name: 'Fresh Tomatoes',
    price: 40,
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcabd1c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    unit: '1 kg',
    storeId: 'store3',
    storeName: 'Fresh Grocery Mart',
    inStock: true,
    category: 'grocery',
    description: 'Fresh and juicy tomatoes',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'product2',
    name: 'Onions',
    price: 30,
    image: 'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    unit: '1 kg',
    storeId: 'store3',
    storeName: 'Fresh Grocery Mart',
    inStock: true,
    category: 'grocery',
    description: 'Fresh onions',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'product5',
    name: 'LED Bulb',
    price: 120,
    image: 'https://images.unsplash.com/photo-1532526338225-bc66ea49a8b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    unit: '1 piece',
    storeId: 'store2',
    storeName: 'ElectroTech Solutions',
    inStock: true,
    category: 'electrical',
    description: 'Energy-efficient LED bulb',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'product6',
    name: 'Extension Board',
    price: 250,
    image: 'https://images.unsplash.com/photo-1544252890-c3e95e780aa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    unit: '1 piece',
    storeId: 'store2',
    storeName: 'ElectroTech Solutions',
    inStock: true,
    category: 'electrical',
    description: 'Multi-socket extension board with surge protection',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'product7',
    name: 'Hammer',
    price: 180,
    image: 'https://images.unsplash.com/photo-1586864387789-628af9feed72?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    unit: '1 piece',
    storeId: 'store1',
    storeName: 'City Hardware & Tools',
    inStock: true,
    category: 'hardware',
    description: 'Durable steel hammer',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'product8',
    name: 'Screwdriver Set',
    price: 350,
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    unit: '1 set',
    storeId: 'store1',
    storeName: 'City Hardware & Tools',
    inStock: true,
    category: 'hardware',
    description: 'Complete set of precision screwdrivers',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
];

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof allProducts>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'hammer', 'bulb', 'tomato'
  ]);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const results = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.storeName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  }, [searchQuery]);
  
  const handleSearch = () => {
    if (searchQuery.trim() === '') return;
    
    // Add to recent searches
    if (!recentSearches.includes(searchQuery)) {
      setRecentSearches(prev => [searchQuery, ...prev.slice(0, 4)]);
    }
  };
  
  const handleRecentSearchPress = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleClearRecentSearches = () => {
    setRecentSearches([]);
  };
  
  const renderProductItem = ({ item }: { item: typeof allProducts[0] }) => (
    <ProductCard product={item} size="medium" />
  );
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false,
        }} 
      />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmit={handleSearch}
          placeholder="Search for products, stores..."
          style={styles.searchBar}
          autoFocus
        />
        
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : searchQuery.trim() === '' ? (
        <View style={styles.recentSearchesContainer}>
          <View style={styles.recentSearchesHeader}>
            <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
            {recentSearches.length > 0 && (
              <TouchableOpacity onPress={handleClearRecentSearches}>
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {recentSearches.length > 0 ? (
            <View style={styles.recentSearchesList}>
              {recentSearches.map((query, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.recentSearchItem}
                  onPress={() => handleRecentSearchPress(query)}
                >
                  <Text style={styles.recentSearchText}>{query}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text style={styles.noRecentSearchesText}>
              No recent searches
            </Text>
          )}
        </View>
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.resultsContainer}
          columnWrapperStyle={styles.resultsRow}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>
            No results found for "{searchQuery}"
          </Text>
          <Text style={styles.noResultsSubtext}>
            Try checking your spelling or using different keywords
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: colors.white,
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
  backButton: {
    marginRight: 12,
  },
  searchBar: {
    flex: 1,
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentSearchesContainer: {
    padding: 16,
  },
  recentSearchesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recentSearchesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  clearText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  recentSearchesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  recentSearchItem: {
    backgroundColor: colors.gray[100],
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  recentSearchText: {
    fontSize: 14,
    color: colors.text,
  },
  noRecentSearchesText: {
    fontSize: 14,
    color: colors.gray[500],
    textAlign: 'center',
    marginTop: 16,
  },
  resultsContainer: {
    padding: 16,
  },
  resultsRow: {
    justifyContent: 'space-between',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsSubtext: {
    fontSize: 14,
    color: colors.gray[600],
    textAlign: 'center',
  },
});