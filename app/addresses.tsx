import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Alert,
  Platform
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { 
  ArrowLeft, 
  MapPin, 
  Home, 
  Briefcase, 
  Map, 
  CheckCircle, 
  Edit, 
  Trash2 
} from 'lucide-react-native';
import colors from '@/constants/colors';
import Button from '@/components/common/Button';

// Mock data
const mockAddresses = [
  {
    id: 'address1',
    name: 'Home',
    addressLine1: '123 Main Street',
    addressLine2: 'Apartment 4B',
    city: 'Chennai',
    state: 'Tamil Nadu',
    postalCode: '600001',
    country: 'India',
    phone: '+91 9876543210',
    isDefault: true,
    label: 'home' as const,
  },
  {
    id: 'address2',
    name: 'Work',
    addressLine1: '456 Office Park',
    addressLine2: 'Building 7, Floor 3',
    city: 'Chennai',
    state: 'Tamil Nadu',
    postalCode: '600002',
    country: 'India',
    phone: '+91 9876543210',
    isDefault: false,
    label: 'work' as const,
  },
  {
    id: 'address3',
    name: 'Parent\'s House',
    addressLine1: '789 Family Street',
    addressLine2: '',
    city: 'Chennai',
    state: 'Tamil Nadu',
    postalCode: '600003',
    country: 'India',
    phone: '+91 9876543210',
    isDefault: false,
    label: 'other' as const,
  },
];

export default function AddressesScreen() {
  const router = useRouter();
  const [addresses, setAddresses] = useState(mockAddresses);
  
  const handleSetDefault = (id: string) => {
    setAddresses(prev => 
      prev.map(address => ({
        ...address,
        isDefault: address.id === id
      }))
    );
  };
  
  const handleEditAddress = (id: string) => {
    router.push({
      pathname: '/edit-address',
      params: { id }
    });
  };
  
  const handleDeleteAddress = (id: string) => {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => {
            setAddresses(prev => prev.filter(address => address.id !== id));
          },
          style: "destructive"
        }
      ]
    );
  };
  
  const getLabelIcon = (label: 'home' | 'work' | 'other') => {
    switch (label) {
      case 'home':
        return <Home size={16} color={colors.primary} />;
      case 'work':
        return <Briefcase size={16} color={colors.primary} />;
      default:
        return <Map size={16} color={colors.primary} />;
    }
  };
  
  const renderAddressItem = ({ item }: { item: typeof mockAddresses[0] }) => (
    <View style={styles.addressCard}>
      <View style={styles.addressHeader}>
        <View style={styles.labelContainer}>
          {getLabelIcon(item.label)}
          <Text style={styles.addressName}>{item.name}</Text>
          {item.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>Default</Text>
            </View>
          )}
        </View>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleEditAddress(item.id)}
          >
            <Edit size={16} color={colors.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleDeleteAddress(item.id)}
          >
            <Trash2 size={16} color={colors.error} />
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={styles.addressText}>
        {item.addressLine1}
        {item.addressLine2 && `, ${item.addressLine2}`}
      </Text>
      <Text style={styles.addressText}>
        {item.city}, {item.state} {item.postalCode}
      </Text>
      <Text style={styles.addressText}>{item.country}</Text>
      <Text style={styles.phoneText}>{item.phone}</Text>
      
      {!item.isDefault && (
        <TouchableOpacity 
          style={styles.setDefaultButton}
          onPress={() => handleSetDefault(item.id)}
        >
          <Text style={styles.setDefaultText}>Set as Default</Text>
        </TouchableOpacity>
      )}
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Saved Addresses',
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
      
      <FlatList
        data={addresses}
        renderItem={renderAddressItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MapPin size={60} color={colors.gray[300]} />
            <Text style={styles.emptyText}>No addresses saved</Text>
            <Text style={styles.emptySubtext}>Add a new address to get started</Text>
          </View>
        }
      />
      
      <View style={styles.footer}>
        <Button
          title="Add New Address"
          onPress={() => router.push('/add-address')}
          fullWidth
        />
      </View>
    </View>
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
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  addressCard: {
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
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
    marginRight: 8,
  },
  defaultBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.primary,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    backgroundColor: colors.gray[100],
  },
  addressText: {
    fontSize: 14,
    color: colors.gray[700],
    marginBottom: 4,
    lineHeight: 20,
  },
  phoneText: {
    fontSize: 14,
    color: colors.gray[600],
    marginTop: 4,
  },
  setDefaultButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  setDefaultText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginTop: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.gray[600],
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
});