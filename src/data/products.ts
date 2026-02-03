export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
  badge?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: number;
  productId: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.8,
    reviews: 256,
    description:
      "High-quality wireless headphones with noise cancellation and premium sound.",
    inStock: true,
    badge: "Sale",
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 449.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.6,
    reviews: 189,
    description: "Advanced smartwatch with health monitoring and GPS tracking.",
    inStock: true,
    badge: "New",
  },
  {
    id: 3,
    name: "Minimalist Backpack",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Fashion",
    rating: 4.5,
    reviews: 124,
    description: "Stylish and functional backpack for everyday use.",
    inStock: true,
  },
  {
    id: 4,
    name: "Organic Coffee Beans",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    category: "Food",
    rating: 4.9,
    reviews: 432,
    description: "Premium organic coffee beans from sustainable farms.",
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: 5,
    name: "Running Shoes Ultra",
    price: 179.99,
    originalPrice: 229.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Sports",
    rating: 4.7,
    reviews: 312,
    description:
      "Lightweight running shoes with advanced cushioning technology.",
    inStock: true,
    badge: "Sale",
  },
  {
    id: 6,
    name: "Ceramic Plant Pot Set",
    price: 45.99,
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
    category: "Home",
    rating: 4.4,
    reviews: 87,
    description: "Beautiful ceramic pots perfect for indoor plants.",
    inStock: false,
  },
  {
    id: 7,
    name: "Mechanical Keyboard RGB",
    price: 159.99,
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.8,
    reviews: 543,
    description:
      "Professional mechanical keyboard with customizable RGB lighting.",
    inStock: true,
  },
  {
    id: 8,
    name: "Yoga Mat Premium",
    price: 69.99,
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    category: "Sports",
    rating: 4.6,
    reviews: 198,
    description: "Eco-friendly yoga mat with excellent grip and cushioning.",
    inStock: true,
    badge: "Eco",
  },
];

export const reviews: Review[] = [
  {
    id: 1,
    productId: 1,
    author: "John D.",
    rating: 5,
    comment: "Amazing sound quality! The noise cancellation is top-notch.",
    date: "2026-01-15",
    helpful: 24,
  },
  {
    id: 2,
    productId: 1,
    author: "Sarah M.",
    rating: 4,
    comment: "Great headphones, comfortable for long listening sessions.",
    date: "2026-01-10",
    helpful: 18,
  },
  {
    id: 3,
    productId: 1,
    author: "Mike R.",
    rating: 5,
    comment: "Best purchase I've made this year. Highly recommended!",
    date: "2026-01-05",
    helpful: 32,
  },
  {
    id: 4,
    productId: 2,
    author: "Emily L.",
    rating: 5,
    comment: "Love the health features. Battery life is impressive.",
    date: "2026-01-20",
    helpful: 15,
  },
  {
    id: 5,
    productId: 2,
    author: "David K.",
    rating: 4,
    comment: "Great watch, GPS is very accurate for running.",
    date: "2026-01-18",
    helpful: 12,
  },
];

export const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Food",
  "Sports",
  "Home",
];
