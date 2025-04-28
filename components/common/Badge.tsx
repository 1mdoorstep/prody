import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import colors from '@/constants/colors';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline' | 'ghost';
type BadgeSize = 'small' | 'medium' | 'large';

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Badge: React.FC<BadgeProps> = ({
  text,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
}) => {
  const getBackgroundColor = () => {
    if (variant === 'outline' || variant === 'ghost') {
      return 'transparent';
    }

    switch (variant) {
      case 'primary':
        return colors.primaryLight;
      case 'secondary':
        return colors.secondaryLight;
      case 'success':
        return colors.successLight;
      case 'warning':
        return colors.warningLight;
      case 'error':
        return colors.errorLight;
      default:
        return colors.primaryLight;
    }
  };

  const getBorderColor = () => {
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      case 'success':
        return colors.success;
      case 'warning':
        return colors.warning;
      case 'error':
        return colors.error;
      case 'outline':
      case 'ghost':
        return colors.gray[300];
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      case 'success':
        return colors.success;
      case 'warning':
        return colors.warning;
      case 'error':
        return colors.error;
      case 'outline':
      case 'ghost':
        return colors.text;
      default:
        return colors.primary;
    }
  };

  const getBadgeStyles = () => {
    const baseStyle: ViewStyle = {
      backgroundColor: getBackgroundColor(),
      borderColor: variant === 'outline' ? getBorderColor() : 'transparent',
      borderWidth: variant === 'outline' ? 1 : 0,
      paddingHorizontal: size === 'small' ? 6 : size === 'medium' ? 8 : 12,
      paddingVertical: size === 'small' ? 2 : size === 'medium' ? 4 : 6,
      borderRadius: size === 'small' ? 4 : size === 'medium' ? 6 : 8,
    };

    return baseStyle;
  };

  const getTextStyles = () => {
    const baseStyle: TextStyle = {
      color: getTextColor(),
      fontSize: size === 'small' ? 10 : size === 'medium' ? 12 : 14,
      fontWeight: '600',
    };

    return baseStyle;
  };

  return (
    <View style={[styles.badge, getBadgeStyles(), style]}>
      <Text style={[styles.text, getTextStyles(), textStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
  },
  text: {
    textAlign: 'center',
  },
});

export default Badge;