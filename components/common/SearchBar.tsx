import React from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  StyleProp, 
  ViewStyle,
  TextInputProps
} from 'react-native';
import { Search } from 'lucide-react-native';
import colors from '@/constants/colors';

interface SearchBarProps extends TextInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = 'Search...',
  value,
  onChangeText,
  onPress,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity 
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.8 : 1}
    >
      <Search size={20} color={colors.gray[500]} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.gray[500]}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 8,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: colors.text,
  },
});

export default SearchBar;