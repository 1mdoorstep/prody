import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { ArrowLeft, Home, Briefcase, Map } from 'lucide-react-native';
import colors from '@/constants/colors';
import Button from '@/components/common/Button';

export default function AddAddressScreen() {
  const router = useRouter();
  
  const [addressData, setAddressData] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    phone: '',
    label: 'home' as 'home' | 'work' | 'other',
    isDefault: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (field: string, value: string) => {
    setAddressData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleLabelSelect = (label: 'home' | 'work' | 'other') => {
    setAddressData(prev => ({
      ...prev,
      label
    }));
  };
  
  const handleToggleDefault = () => {
    setAddressData(prev => ({
      ...prev,
      isDefault: !prev.isDefault
    }));
  };
  
  const handleSaveAddress = () => {
    // Validate form
    if (!addressData.name || !addressData.addressLine1 || !addressData.city || 
        !addressData.state || !addressData.postalCode || !addressData.phone) {
      Alert.alert('Missing Information', 'Please fill all required fields');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.back();
    }, 1000);
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <Stack.Screen 
        options={{
          title: 'Add New Address',
          headerLeft: () => (
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Address Label</Text>
          <View style={styles.labelContainer}>
            <TouchableOpacity 
              style={[
                styles.labelButton,
                addressData.label === 'home' && styles.selectedLabelButton
              ]}
              onPress={() => handleLabelSelect('home')}
            >
              <Home 
                size={20} 
                color={addressData.label === 'home' ? colors.white : colors.primary} 
              />
              <Text 
                style={[
                  styles.labelText,
                  addressData.label === 'home' && styles.selectedLabelText
                ]}
              >
                Home
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.labelButton,
                addressData.label === 'work' && styles.selectedLabelButton
              ]}
              onPress={() => handleLabelSelect('work')}
            >
              <Briefcase 
                size={20} 
                color={addressData.label === 'work' ? colors.white : colors.primary} 
              />
              <Text 
                style={[
                  styles.labelText,
                  addressData.label === 'work' && styles.selectedLabelText
                ]}
              >
                Work
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.labelButton,
                addressData.label === 'other' && styles.selectedLabelButton
              ]}
              onPress={() => handleLabelSelect('other')}
            >
              <Map 
                size={20} 
                color={addressData.label === 'other' ? colors.white : colors.primary} 
              />
              <Text 
                style={[
                  styles.labelText,
                  addressData.label === 'other' && styles.selectedLabelText
                ]}
              >
                Other
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Address Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Address Name *</Text>
            <TextInput
              style={styles.input}
              value={addressData.name}
              onChangeText={(text) => handleChange('name', text)}
              placeholder="E.g., Home, Work, Parent's House"
              placeholderTextColor={colors.gray[400]}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Address Line 1 *</Text>
            <TextInput
              style={styles.input}
              value={addressData.addressLine1}
              onChangeText={(text) => handleChange('addressLine1', text)}
              placeholder="Street address, P.O. box"
              placeholderTextColor={colors.gray[400]}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Address Line 2</Text>
            <TextInput
              style={styles.input}
              value={addressData.addressLine2}
              onChangeText={(text) => handleChange('addressLine2', text)}
              placeholder="Apartment, suite, unit, building, floor, etc."
              placeholderTextColor={colors.gray[400]}
            />
          </View>
          
          <View style={styles.inputRow}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.inputLabel}>City *</Text>
              <TextInput
                style={styles.input}
                value={addressData.city}
                onChangeText={(text) => handleChange('city', text)}
                placeholder="City"
                placeholderTextColor={colors.gray[400]}
              />
            </View>
            
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.inputLabel}>State *</Text>
              <TextInput
                style={styles.input}
                value={addressData.state}
                onChangeText={(text) => handleChange('state', text)}
                placeholder="State"
                placeholderTextColor={colors.gray[400]}
              />
            </View>
          </View>
          
          <View style={styles.inputRow}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.inputLabel}>Postal Code *</Text>
              <TextInput
                style={styles.input}
                value={addressData.postalCode}
                onChangeText={(text) => handleChange('postalCode', text)}
                placeholder="Postal code"
                placeholderTextColor={colors.gray[400]}
                keyboardType="number-pad"
              />
            </View>
            
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.inputLabel}>Country *</Text>
              <TextInput
                style={styles.input}
                value={addressData.country}
                onChangeText={(text) => handleChange('country', text)}
                placeholder="Country"
                placeholderTextColor={colors.gray[400]}
              />
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              value={addressData.phone}
              onChangeText={(text) => handleChange('phone', text)}
              placeholder="Phone number"
              placeholderTextColor={colors.gray[400]}
              keyboardType="phone-pad"
            />
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.defaultContainer}
          onPress={handleToggleDefault}
        >
          <View 
            style={[
              styles.checkbox,
              addressData.isDefault && styles.checkboxChecked
            ]}
          >
            {addressData.isDefault && (
              <View style={styles.checkboxInner} />
            )}
          </View>
          <Text style={styles.defaultText}>Set as default address</Text>
        </TouchableOpacity>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Save Address"
            onPress={handleSaveAddress}
            loading={isLoading}
            fullWidth
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButton: {
    marginRight: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  formSection: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  selectedLabelButton: {
    backgroundColor: colors.primary,
  },
  labelText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 8,
  },
  selectedLabelText: {
    color: colors.white,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.text,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  defaultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  checkboxInner: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: colors.white,
  },
  defaultText: {
    fontSize: 14,
    color: colors.text,
  },
  buttonContainer: {
    marginBottom: 16,
  },
});