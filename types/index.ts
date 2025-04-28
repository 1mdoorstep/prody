export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  avatar?: string;
  wallet?: {
    balance: number;
  };
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  isNew?: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number | null;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  storeId: string;
  storeName?: string;
}

export interface Store {
  id: string;
  name: string;
  description: string;
  image: string;
  address: string;
  phone?: string;
  rating: number;
  reviews: number;
  categories: string[];
  deliveryTime: number;
  minimumOrder: number;
  openingHours?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  deliveryAddress: Address;
  paymentMethod: string;
  storeId: string;
  storeName: string;
  deliveryFee: number;
  tax: number;
  discount: number;
  subtotal: number;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Address {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  discountPrice: number | null;
  quantity: number;
  image: string;
  storeId: string;
  storeName: string;
}