import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '@/constants/colors';

interface BannerProps {
  title: string;
  subtitle: string;
  image: string;
  targetScreen?: string;
}

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  image,
  targetScreen = '/categories',
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(targetScreen);
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: image }}
        style={styles.background}
        imageStyle={styles.image}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Shop Now</Text>
              <ArrowRight size={16} color={colors.white} />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  image: {
    borderRadius: 16,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    justifyContent: 'flex-end',
    padding: 16,
  },
  content: {
    width: '70%',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
    marginBottom: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
});

export default Banner;