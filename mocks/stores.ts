import { Store } from '@/types';

export const stores: Store[] = [
  {
    id: 'store-1',
    name: 'Fresh Grocery',
    description: 'Your local grocery store with fresh produce and organic options',
    image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Grocery',
    address: '123 Main St, Anytown, USA',
    distance: '0.8 miles',
    deliveryTime: '15-25 min',
    rating: 4.8,
    reviews: 245,
    isOpen: true
  },
  {
    id: 'store-2',
    name: 'Quick Mart',
    description: 'Convenience store with all your daily essentials',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9c8a213?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Convenience',
    address: '456 Oak Ave, Somewhere, USA',
    distance: '1.2 miles',
    deliveryTime: '20-30 min',
    rating: 4.5,
    reviews: 189,
    isOpen: true
  },
  {
    id: 'store-3',
    name: 'Corner Bakery',
    description: 'Artisanal bakery with fresh bread and pastries',
    image: 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Bakery',
    address: '789 Pine Rd, Elsewhere, USA',
    distance: '1.5 miles',
    deliveryTime: '25-35 min',
    rating: 4.9,
    reviews: 312,
    isOpen: true
  },
  {
    id: 'store-4',
    name: 'Butcher Shop',
    description: 'Premium meats from local farms',
    image: 'https://images.unsplash.com/photo-1545223398-cf636f5b91b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Meat',
    address: '321 Elm St, Nowhere, USA',
    distance: '2.0 miles',
    deliveryTime: '30-40 min',
    rating: 4.7,
    reviews: 178,
    isOpen: true
  },
  {
    id: 'store-5',
    name: 'Health Foods',
    description: 'Organic and natural health food store',
    image: 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Health',
    address: '654 Maple Dr, Anywhere, USA',
    distance: '2.3 miles',
    deliveryTime: '25-40 min',
    rating: 4.6,
    reviews: 203,
    isOpen: true
  },
  {
    id: 'store-6',
    name: 'Farm Fresh',
    description: 'Direct from farm to table produce',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Produce',
    address: '987 Cedar Ln, Everywhere, USA',
    distance: '3.1 miles',
    deliveryTime: '35-50 min',
    rating: 4.8,
    reviews: 156,
    isOpen: false
  }
];