import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import colors from '@/constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    let buttonStyle: StyleProp<ViewStyle> = [styles.button];

    // Add variant styles
    switch (variant) {
      case 'primary':
        buttonStyle.push(styles.primaryButton);
        break;
      case 'secondary':
        buttonStyle.push(styles.secondaryButton);
        break;
      case 'outline':
        buttonStyle.push(styles.outlineButton);
        break;
      case 'text':
        buttonStyle.push(styles.textButton);
        break;
    }

    // Add size styles
    switch (size) {
      case 'small':
        buttonStyle.push(styles.smallButton);
        break;
      case 'medium':
        buttonStyle.push(styles.mediumButton);
        break;
      case 'large':
        buttonStyle.push(styles.largeButton);
        break;
    }

    // Add disabled style
    if (disabled) {
      buttonStyle.push(styles.disabledButton);
    }

    return buttonStyle;
  };

  const getTextStyle = () => {
    let textStyleArray: StyleProp<TextStyle> = [styles.buttonText];

    // Add variant text styles
    switch (variant) {
      case 'primary':
        textStyleArray.push(styles.primaryButtonText);
        break;
      case 'secondary':
        textStyleArray.push(styles.secondaryButtonText);
        break;
      case 'outline':
        textStyleArray.push(styles.outlineButtonText);
        break;
      case 'text':
        textStyleArray.push(styles.textButtonText);
        break;
    }

    // Add size text styles
    switch (size) {
      case 'small':
        textStyleArray.push(styles.smallButtonText);
        break;
      case 'medium':
        textStyleArray.push(styles.mediumButtonText);
        break;
      case 'large':
        textStyleArray.push(styles.largeButtonText);
        break;
    }

    // Add disabled text style
    if (disabled) {
      textStyleArray.push(styles.disabledButtonText);
    }

    return textStyleArray;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'text' ? colors.primary : colors.white}
          size={size === 'small' ? 'small' : 'small'}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          <Text style={[getTextStyle(), textStyle, icon && (iconPosition === 'left' ? { marginLeft: 8 } : { marginRight: 8 })]}>
            {title}
          </Text>
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  textButton: {
    backgroundColor: 'transparent',
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  disabledButton: {
    backgroundColor: colors.gray[300],
    borderColor: colors.gray[300],
  },
  buttonText: {
    fontWeight: '600',
  },
  primaryButtonText: {
    color: colors.white,
  },
  secondaryButtonText: {
    color: colors.white,
  },
  outlineButtonText: {
    color: colors.primary,
  },
  textButtonText: {
    color: colors.primary,
  },
  smallButtonText: {
    fontSize: 14,
  },
  mediumButtonText: {
    fontSize: 16,
  },
  largeButtonText: {
    fontSize: 18,
  },
  disabledButtonText: {
    color: colors.gray[600],
  },
});

export default Button;