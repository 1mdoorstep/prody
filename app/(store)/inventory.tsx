import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Platform,
  SafeAreaView,
  Modal,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  X,
  Camera,
  Upload,
  ChevronDown,
  Filter,
} from 'lucide-react-native';
import colors from '@/constants/colors';

// Mock product categories
const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'power-tools', name: 'Power Tools' },
  { id: 'hand-tools', name: 'Hand Tools' },
  { id: 'plumbing', name: 'Plumbing' },
  { id: 'electrical', name: 'Electrical' },
  { id: 'paint', name: 'Paint & Supplies' },
];

// Mock products data
const initialProducts = [
  {
    id: '1',
    name: 'Bosch Power Drill',
    description: 'Professional-grade power drill with variable speed control',
    price: 4999,
    discountPrice: 3999,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    category: 'power-tools',
    stock: 15,
    sku: 'PT-001',
  },
  {
    id: '2',
    name: 'Stanley Measuring Tape',
    description: 'Durable 5m measuring tape with lock function',
    price: 399,
    discountPrice: 349,
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    category: 'hand-tools',
    stock: 30,
    sku: 'HT-001',
  },
  {
    id: '3',
    name: 'Philips Screwdriver Set',
    description: 'Complete set of precision screwdrivers for electronics',
    price: 799,
    discountPrice: 699,
    image: 'https://images.unsplash.com/photo-1586864387789-628af9feed72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    category: 'hand-tools',
    stock: 25,
    sku: 'HT-002',
  },
  {
    id: '4',
    name: 'Dewalt Circular Saw',
    description: 'Heavy-duty circular saw with laser guide for precise cutting',
    price: 7999,
    discountPrice: 6999,
    image: 'https://images.unsplash.com/photo-1426927308491-6380b6a9936f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    category: 'power-tools',
    stock: 8,
    sku: 'PT-002',
  },
  {
    id: '5',
    name: 'Claw Hammer',
    description: 'Ergonomic claw hammer with fiberglass handle',
    price: 599,
    discountPrice: 499,
    image: 'https://images.unsplash.com/photo-1629015214226-2c19a3583c78?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    category: 'hand-tools',
    stock: 20,
    sku: 'HT-003',
  },
  {
    id: '6',
    name: 'PVC Pipe Cutter',
    description: 'Professional PVC pipe cutter for clean cuts',
    price: 899,
    discountPrice: null,
    image: 'https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    category: 'plumbing',
    stock: 12,
    sku: 'PL-001',
  },
  {
    id: '7',
    name: 'Wire Stripper',
    description: 'Automatic wire stripper and cutter for electrical work',
    price: 699,
    discountPrice: 599,
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    category: 'electrical',
    stock: 18,
    sku: 'EL-001',
  },
  {
    id: '8',
    name: 'Paint Roller Set',
    description: 'Complete paint roller set with tray and extensions',
    price: 499,
    discountPrice: 449,
    image: 'https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    category: 'paint',
    stock: 22,
    sku: 'PA-001',
  },
];

export default function InventoryScreen() {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  
  // Form state for add/edit product
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    category: '',
    stock: '',
    sku: '',
    image: '',
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    // Reset form data
    setFormData({
      name: '',
      description: '',
      price: '',
      discountPrice: '',
      category: '',
      stock: '',
      sku: '',
      image: 'https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', // Default image
    });
    
    setShowAddModal(true);
  };

  const handleEditProduct = (product: any) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      discountPrice: product.discountPrice ? product.discountPrice.toString() : '',
      category: product.category,
      stock: product.stock.toString(),
      sku: product.sku,
      image: product.image,
    });
    
    setShowEditModal(true);
  };

  const handleDeleteProduct = (productId: string) => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            const updatedProducts = products.filter((product) => product.id !== productId);
            setProducts(updatedProducts);
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleSaveProduct = () => {
    // Validate form data
    if (!formData.name || !formData.price || !formData.category || !formData.stock || !formData.sku) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    if (showAddModal) {
      // Add new product
      const newProduct = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
        image: formData.image,
        category: formData.category,
        stock: parseInt(formData.stock),
        sku: formData.sku,
      };
      
      setProducts([...products, newProduct]);
      setShowAddModal(false);
    } else if (showEditModal && currentProduct) {
      // Update existing product
      const updatedProducts = products.map((product) => {
        if (product.id === currentProduct.id) {
          return {
            ...product,
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
            image: formData.image,
            category: formData.category,
            stock: parseInt(formData.stock),
            sku: formData.sku,
          };
        }
        return product;
      });
      
      setProducts(updatedProducts);
      setShowEditModal(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const renderProductItem = ({ item }: { item: typeof initialProducts[0] }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productContent}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productSku}>SKU: {item.sku}</Text>
        <View style={styles.productPriceRow}>
          <Text style={styles.productPrice}>₹{item.discountPrice || item.price}</Text>
          {item.discountPrice && (
            <Text style={styles.productOriginalPrice}>₹{item.price}</Text>
          )}
        </View>
        <View style={styles.stockContainer}>
          <Text style={[
            styles.stockText,
            item.stock > 10 ? styles.inStockText : item.stock > 0 ? styles.lowStockText : styles.outOfStockText
          ]}>
            {item.stock > 10 ? 'In Stock' : item.stock > 0 ? 'Low Stock' : 'Out of Stock'} ({item.stock})
          </Text>
        </View>
      </View>
      <View style={styles.productActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleEditProduct(item)}
        >
          <Edit size={18} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteProduct(item.id)}
        >
          <Trash2 size={18} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Inventory Management</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddProduct}
          >
            <Plus size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color={colors.gray[500]} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <X size={20} color={colors.gray[500]} />
              </TouchableOpacity>
            )}
          </View>
          
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => setShowCategoryModal(true)}
          >
            <Filter size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
        
        {selectedCategory !== 'all' && (
          <View style={styles.selectedCategoryContainer}>
            <Text style={styles.selectedCategoryText}>
              Category: {categories.find(c => c.id === selectedCategory)?.name}
            </Text>
            <TouchableOpacity onPress={() => setSelectedCategory('all')}>
              <X size={16} color={colors.gray[600]} />
            </TouchableOpacity>
          </View>
        )}
        
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.productList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No products found</Text>
            </View>
          }
        />
        
        {/* Add Product Modal */}
        <Modal
          visible={showAddModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowAddModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add New Product</Text>
                <TouchableOpacity onPress={() => setShowAddModal(false)}>
                  <X size={24} color={colors.text} />
                </TouchableOpacity>
              </View>
              
              <ScrollView style={styles.formContainer}>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Product Name *</Text>
                  <TextInput
                    style={styles.formInput}
                    value={formData.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                    placeholder="Enter product name"
                  />
                </View>
                
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Description</Text>
                  <TextInput
                    style={[styles.formInput, styles.textArea]}
                    value={formData.description}
                    onChangeText={(text) => handleInputChange('description', text)}
                    placeholder="Enter product description"
                    multiline
                    numberOfLines={4}
                  />
                </View>
                
                <View style={styles.formRow}>
                  <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.formLabel}>Price *</Text>
                    <TextInput
                      style={styles.formInput}
                      value={formData.price}
                      onChangeText={(text) => handleInputChange('price', text)}
                      placeholder="0.00"
                      keyboardType="numeric"
                    />
                  </View>
                  
                  <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.formLabel}>Discount Price</Text>
                    <TextInput
                      style={styles.formInput}
                      value={formData.discountPrice}
                      onChangeText={(text) => handleInputChange('discountPrice', text)}
                      placeholder="0.00"
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Category *</Text>
                  <TouchableOpacity
                    style={styles.formSelect}
                    onPress={() => {
                      // Show category selection
                      Alert.alert(
                        'Select Category',
                        '',
                        categories.slice(1).map((category) => ({
                          text: category.name,
                          onPress: () => handleInputChange('category', category.id),
                        }))
                      );
                    }}
                  >
                    <Text style={styles.formSelectText}>
                      {formData.category
                        ? categories.find((c) => c.id === formData.category)?.name
                        : 'Select category'}
                    </Text>
                    <ChevronDown size={20} color={colors.gray[500]} />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.formRow}>
                  <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.formLabel}>Stock *</Text>
                    <TextInput
                      style={styles.formInput}
                      value={formData.stock}
                      onChangeText={(text) => handleInputChange('stock', text)}
                      placeholder="0"
                      keyboardType="numeric"
                    />
                  </View>
                  
                  <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.formLabel}>SKU *</Text>
                    <TextInput
                      style={styles.formInput}
                      value={formData.sku}
                      onChangeText={(text) => handleInputChange('sku', text)}
                      placeholder="Enter SKU"
                    />
                  </View>
                </View>
                
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Product Image</Text>
                  <View style={styles.imageUploadContainer}>
                    {formData.image ? (
                      <Image source={{ uri: formData.image }} style={styles.uploadedImage} />
                    ) : (
                      <View style={styles.uploadPlaceholder}>
                        <Upload size={24} color={colors.gray[500]} />
                        <Text style={styles.uploadText}>Upload Image</Text>
                      </View>
                    )}
                    
                    <View style={styles.imageActions}>
                      <TouchableOpacity
                        style={styles.imageActionButton}
                        onPress={() => {
                          // In a real app, this would open the camera
                          Alert.alert('Camera', 'This would open the camera in a real app');
                        }}
                      >
                        <Camera size={20} color={colors.primary} />
                        <Text style={styles.imageActionText}>Camera</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        style={styles.imageActionButton}
                        onPress={() => {
                          // In a real app, this would open the gallery
                          Alert.alert('Gallery', 'This would open the gallery in a real app');
                          
                          // For demo, set a random image
                          const demoImages = [
                            'https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                            'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                            'https://images.unsplash.com/photo-1586864387789-628af9feed72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                            'https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                          ];
                          
                          const randomImage = demoImages[Math.floor(Math.random() * demoImages.length)];
                          handleInputChange('image', randomImage);
                        }}
                      >
                        <Upload size={20} color={colors.primary} />
                        <Text style={styles.imageActionText}>Gallery</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ScrollView>
              
              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowAddModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveProduct}
                >
                  <Text style={styles.saveButtonText}>Save Product</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        
        {/* Edit Product Modal */}
        <Modal
          visible={showEditModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowEditModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Edit Product</Text>
                <TouchableOpacity onPress={() => setShowEditModal(false)}>
                  <X size={24} color={colors.text} />
                </TouchableOpacity>
              </View>
              
              <ScrollView style={styles.formContainer}>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Product Name *</Text>
                  <TextInput
                    style={styles.formInput}
                    value={formData.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                    placeholder="Enter product name"
                  />
                </View>
                
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Description</Text>
                  <TextInput
                    style={[styles.formInput, styles.textArea]}
                    value={formData.description}
                    onChangeText={(text) => handleInputChange('description', text)}
                    placeholder="Enter product description"
                    multiline
                    numberOfLines={4}
                  />
                </View>
                
                <View style={styles.formRow}>
                  <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.formLabel}>Price *</Text>
                    <TextInput
                      style={styles.formInput}
                      value={formData.price}
                      onChangeText={(text) => handleInputChange('price', text)}
                      placeholder="0.00"
                      keyboardType="numeric"
                    />
                  </View>
                  
                  <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.formLabel}>Discount Price</Text>
                    <TextInput
                      style={styles.formInput}
                      value={formData.discountPrice}
                      onChangeText={(text) => handleInputChange('discountPrice', text)}
                      placeholder="0.00"
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Category *</Text>
                  <TouchableOpacity
                    style={styles.formSelect}
                    onPress={() => {
                      // Show category selection
                      Alert.alert(
                        'Select Category',
                        '',
                        categories.slice(1).map((category) => ({
                          text: category.name,
                          onPress: () => handleInputChange('category', category.id),
                        }))
                      );
                    }}
                  >
                    <Text style={styles.formSelectText}>
                      {formData.category
                        ? categories.find((c) => c.id === formData.category)?.name
                        : 'Select category'}
                    </Text>
                    <ChevronDown size={20} color={colors.gray[500]} />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.formRow}>
                  <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.formLabel}>Stock *</Text>
                    <TextInput
                      style={styles.formInput}
                      value={formData.stock}
                      onChangeText={(text) => handleInputChange('stock', text)}
                      placeholder="0"
                      keyboardType="numeric"
                    />
                  </View>
                  
                  <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.formLabel}>SKU *</Text>
                    <TextInput
                      style={styles.formInput}
                      value={formData.sku}
                      onChangeText={(text) => handleInputChange('sku', text)}
                      placeholder="Enter SKU"
                    />
                  </View>
                </View>
                
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Product Image</Text>
                  <View style={styles.imageUploadContainer}>
                    {formData.image ? (
                      <Image source={{ uri: formData.image }} style={styles.uploadedImage} />
                    ) : (
                      <View style={styles.uploadPlaceholder}>
                        <Upload size={24} color={colors.gray[500]} />
                        <Text style={styles.uploadText}>Upload Image</Text>
                      </View>
                    )}
                    
                    <View style={styles.imageActions}>
                      <TouchableOpacity
                        style={styles.imageActionButton}
                        onPress={() => {
                          // In a real app, this would open the camera
                          Alert.alert('Camera', 'This would open the camera in a real app');
                        }}
                      >
                        <Camera size={20} color={colors.primary} />
                        <Text style={styles.imageActionText}>Camera</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        style={styles.imageActionButton}
                        onPress={() => {
                          // In a real app, this would open the gallery
                          Alert.alert('Gallery', 'This would open the gallery in a real app');
                          
                          // For demo, set a random image
                          const demoImages = [
                            'https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                            'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                            'https://images.unsplash.com/photo-1586864387789-628af9feed72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                            'https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                          ];
                          
                          const randomImage = demoImages[Math.floor(Math.random() * demoImages.length)];
                          handleInputChange('image', randomImage);
                        }}
                      >
                        <Upload size={20} color={colors.primary} />
                        <Text style={styles.imageActionText}>Gallery</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ScrollView>
              
              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowEditModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveProduct}
                >
                  <Text style={styles.saveButtonText}>Update Product</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        
        {/* Category Filter Modal */}
        <Modal
          visible={showCategoryModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowCategoryModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, styles.categoryModalContent]}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Filter by Category</Text>
                <TouchableOpacity onPress={() => setShowCategoryModal(false)}>
                  <X size={24} color={colors.text} />
                </TouchableOpacity>
              </View>
              
              <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.categoryItem,
                      selectedCategory === item.id && styles.selectedCategoryItem,
                    ]}
                    onPress={() => {
                      setSelectedCategory(item.id);
                      setShowCategoryModal(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.categoryItemText,
                        selectedCategory === item.id && styles.selectedCategoryItemText,
                      ]}
                    >
                      {item.name}
                    </Text>
                    {selectedCategory === item.id && (
                      <View style={styles.categorySelectedIndicator} />
                    )}
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.categoryList}
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    padding: 0,
  },
  categoryButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  selectedCategoryText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  productList: {
    padding: 16,
    paddingBottom: 24,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
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
  productImage: {
    width: 80,
    height: 80,
  },
  productContent: {
    flex: 1,
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  productSku: {
    fontSize: 12,
    color: colors.gray[500],
    marginBottom: 8,
  },
  productPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginRight: 8,
  },
  productOriginalPrice: {
    fontSize: 14,
    color: colors.gray[500],
    textDecorationLine: 'line-through',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockText: {
    fontSize: 12,
    fontWeight: '500',
  },
  inStockText: {
    color: colors.success,
  },
  lowStockText: {
    color: colors.warning,
  },
  outOfStockText: {
    color: colors.error,
  },
  productActions: {
    justifyContent: 'center',
    padding: 12,
    borderLeftWidth: 1,
    borderLeftColor: colors.gray[200],
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: colors.errorLight,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray[600],
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  categoryModalContent: {
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  formContainer: {
    padding: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.gray[300],
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  formSelect: {
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.gray[300],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formSelectText: {
    fontSize: 14,
    color: colors.text,
  },
  imageUploadContainer: {
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    overflow: 'hidden',
  },
  uploadedImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  uploadPlaceholder: {
    height: 200,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 14,
    color: colors.gray[600],
    marginTop: 8,
  },
  imageActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.gray[300],
  },
  imageActionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: colors.gray[50],
  },
  imageActionText: {
    fontSize: 14,
    color: colors.primary,
    marginLeft: 8,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray[300],
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  saveButton: {
    flex: 2,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  categoryList: {
    padding: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  selectedCategoryItem: {
    backgroundColor: colors.primaryLight,
  },
  categoryItemText: {
    fontSize: 16,
    color: colors.text,
  },
  selectedCategoryItemText: {
    color: colors.primary,
    fontWeight: '600',
  },
  categorySelectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
});