import React from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  Image, 
  View,
  StyleProp,
  ViewStyle
} from 'react-native';
import colors from '@/constants/colors';

interface Category {
  id: string;
  name: string;
  image: string;
  color?: string;
}

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  onPress,
  style
}) => {
  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View 
        style={[
          styles.imageContainer, 
          { backgroundColor: category.color || colors.primary }
        ]}
      >
        <Image 
          source={{ uri: category.image }} 
          style={styles.image} 
        />
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
  },
  imageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
    width: 80,
  },
});

export default CategoryCard;