import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { categories } from '@/mocks/categories';
import { Category } from '@/types';
import SearchBar from '@/components/common/SearchBar';
import colors from '@/constants/colors';

export default function CategoriesScreen() {
  const router = useRouter();

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item.id)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryCount}>{item.productsCount} items</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchBar />
      <Text style={styles.title}>All Categories</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
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
  categoryImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  categoryInfo: {
    padding: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 14,
    color: colors.gray[600],
  },
});