// src/app/models/product.model.ts

export interface Product {
  id: number;
  name: string;
  subtitle: string; // Short description
  description: string; // Detailed description
  price: number;
  category: 'Smartphones & Tablets' | 'Laptops & PCs' | 'Headphones & Audio' | 'Smart Watches & Wearables' | 'Gaming Consoles & Accessories' | 'Cameras & Smart Home Devices';
  imageUrls: string[]; // Array for image slider
  availableSizes: string[]; // e.g., ['S', 'M', 'L', 'XL']
  stock: { [key: string]: number }; // e.g., { 'S': 10, 'M': 5, 'L': 0, 'XL': 3 }
  rating?: number; // e.g., 4.5
  reviewCount?: number; // e.g., 328
  seller?: string; // e.g., 'Best Seller'
  badge?: string | null; // e.g., 'Best Seller', 'Sponsored', or null
}
