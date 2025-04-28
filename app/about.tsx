import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Linking,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter 
} from 'lucide-react-native';
import colors from '@/constants/colors';

export default function AboutScreen() {
  const router = useRouter();
  
  const handleContactEmail = () => {
    Linking.openURL('mailto:support@localmart.com');
  };
  
  const handleContactPhone = () => {
    Linking.openURL('tel:+919876543210');
  };
  
  const handleWebsite = () => {
    Linking.openURL('https://localmart.com');
  };
  
  const handleSocialMedia = (platform: string) => {
    let url = '';
    switch(platform) {
      case 'facebook':
        url = 'https://facebook.com/localmart';
        break;
      case 'instagram':
        url = 'https://instagram.com/localmart';
        break;
      case 'twitter':
        url = 'https://twitter.com/localmart';
        break;
    }
    Linking.openURL(url);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }} 
            style={styles.logo}
          />
          <Text style={styles.appName}>LocalMart</Text>
          <Text style={styles.tagline}>Everything Local. Delivered Fast.</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.sectionText}>
            LocalMart aims to connect local stores with customers in their neighborhood, 
            making it easier for people to shop locally and support small businesses. 
            We believe in strengthening local economies and reducing environmental impact 
            by facilitating shorter delivery distances.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Browse Local Stores</Text>
              <Text style={styles.stepText}>
                Find products from stores in your neighborhood, all in one place.
              </Text>
            </View>
          </View>
          
          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Place Your Order</Text>
              <Text style={styles.stepText}>
                Add items to your cart and checkout with secure payment options.
              </Text>
            </View>
          </View>
          
          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Fast Delivery</Text>
              <Text style={styles.stepText}>
                Our delivery partners bring your order right to your doorstep.
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={handleContactEmail}
          >
            <Mail size={20} color={colors.primary} />
            <Text style={styles.contactText}>support@localmart.com</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={handleContactPhone}
          >
            <Phone size={20} color={colors.primary} />
            <Text style={styles.contactText}>+91 9876543210</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={handleWebsite}
          >
            <Globe size={20} color={colors.primary} />
            <Text style={styles.contactText}>www.localmart.com</Text>
          </TouchableOpacity>
          
          <View style={styles.contactItem}>
            <MapPin size={20} color={colors.primary} />
            <Text style={styles.contactText}>
              123 Tech Park, Sector 15, Gurugram, Haryana 122001
            </Text>
          </View>
        </View>
        
        <View style={styles.socialContainer}>
          <Text style={styles.socialTitle}>Follow Us</Text>
          <View style={styles.socialIcons}>
            <TouchableOpacity 
              style={styles.socialIcon}
              onPress={() => handleSocialMedia('facebook')}
            >
              <Facebook size={24} color={colors.white} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.socialIcon}
              onPress={() => handleSocialMedia('instagram')}
            >
              <Instagram size={24} color={colors.white} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.socialIcon}
              onPress={() => handleSocialMedia('twitter')}
            >
              <Twitter size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2023 LocalMart. All rights reserved.</Text>
          <Text style={styles.footerText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
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
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: colors.gray[600],
  },
  section: {
    padding: 16,
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: colors.gray[700],
    lineHeight: 22,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  stepText: {
    fontSize: 14,
    color: colors.gray[600],
    lineHeight: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: colors.gray[700],
    marginLeft: 12,
    flex: 1,
  },
  socialContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  socialTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  socialIcons: {
    flexDirection: 'row',
  },
  socialIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  footerText: {
    fontSize: 12,
    color: colors.gray[500],
    marginBottom: 4,
  },
});