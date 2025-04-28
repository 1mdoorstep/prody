import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Category } from '@/types';
import colors from '@/constants/colors';

interface CategoryListProps {
  title: string;
  categories: Category[];
  showAll?: boolean;
}

const CategoryList: React.FC<CategoryListProps> = ({
  title,
  categories,
  showAll = true,
}) => {
  const router = useRouter();

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  const handleSeeAllPress = () => {
    router.push('/categories');
  };

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item.id)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
      </View>
      <Text style={styles.categoryName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.categoryCount}>{item.productsCount} items</Text>
    </TouchableOpacity>
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
        data={categories}
        renderItem={renderCategory}
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
  categoryItem: {
    width: 100,
    marginRight: 12,
    alignItems: 'center',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: colors.gray[100],
    marginBottom: 8,
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
    height: '100%',
    resizeMode: 'cover',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 12,
    color: colors.gray[600],
    textAlign: 'center',
  },
});

export default CategoryList;