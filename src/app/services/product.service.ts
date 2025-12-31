import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      subtitle: 'Latest Premium Flagship',
      description: 'The ultimate iPhone with advanced camera system, 6.9-inch Super Retina display, and A17 Pro chip. Perfect for professionals and power users.',
      price: 1199.99,
      category: 'Smartphones & Tablets',
      imageUrls: [
        'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      availableSizes: ['256GB', '512GB', '1TB'],
      stock: { '256GB': 15, '512GB': 12, '1TB': 8 },
      rating: 4.8,
      reviewCount: 2543,
      seller: 'Apple Official',
      badge: 'Premium'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      subtitle: 'Most Advanced Android Phone',
      description: 'Ultra-bright display with 120Hz, powerful Snapdragon processor, and AI-enhanced camera. The ultimate Android flagship.',
      price: 1299.99,
      category: 'Smartphones & Tablets',
      imageUrls: [
        'https://images.pexels.com/photos/1447964/pexels-photo-1447964.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      availableSizes: ['256GB', '512GB'],
      stock: { '256GB': 18, '512GB': 10 },
      rating: 4.7,
      reviewCount: 1892,
      seller: 'Samsung Official',
      badge: 'Top Seller'
    },
    {
      id: 3,
      name: 'iPad Pro 12.9"',
      subtitle: 'Portable Powerhouse',
      description: 'Stunning Liquid Retina display with M2 chip for demanding creative work. The most powerful tablet ever.',
      price: 1299.99,
      category: 'Smartphones & Tablets',
      imageUrls: [
        'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1447964/pexels-photo-1447964.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      availableSizes: ['128GB', '256GB', '512GB'],
      stock: { '128GB': 10, '256GB': 14, '512GB': 6 },
      rating: 4.9,
      reviewCount: 1624,
      seller: 'Apple Official',
      badge: 'Premium'
    },
    {
      id: 4,
      name: 'MacBook Pro 14" M3 Max',
      subtitle: 'Professional Laptop Excellence',
      description: 'Exceptional performance for professionals. M3 Max chip, up to 36GB unified memory, stunning Retina display.',
      price: 3499.99,
      category: 'Laptops & PCs',
      imageUrls: [
        'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      availableSizes: ['8-core CPU', '10-core CPU'],
      stock: { '8-core CPU': 8, '10-core CPU': 5 },
      rating: 4.9,
      reviewCount: 2891,
      seller: 'Apple Official',
      badge: 'Premium'
    },
    {
      id: 5,
      name: 'Dell XPS 15 2024',
      subtitle: 'Ultimate Windows Workstation',
      description: 'Ultra-HD OLED display with RTX 4070 GPU. Perfect for creators, engineers, and power users.',
      price: 2799.99,
      category: 'Laptops & PCs',
      imageUrls: [
        'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      availableSizes: ['RTX 4060', 'RTX 4070'],
      stock: { 'RTX 4060': 12, 'RTX 4070': 7 },
      rating: 4.7,
      reviewCount: 1456,
      seller: 'Dell Official',
      badge: 'Top Seller'
    },
    {
      id: 6,
      name: 'ASUS ROG Zephyrus G16',
      subtitle: 'Gaming Beast',
      description: 'Advanced gaming laptop with RTX 4090, 13th gen Intel i9, 240Hz display. Designed for competitive gaming.',
      price: 3199.99,
      category: 'Laptops & PCs',
      imageUrls: [
        'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      availableSizes: ['RTX 4080', 'RTX 4090'],
      stock: { 'RTX 4080': 6, 'RTX 4090': 4 },
      rating: 4.8,
      reviewCount: 987,
      seller: 'ASUS Official',
      badge: null
    },
    {
      id: 7,
      name: 'Sony WH-1000XM5',
      subtitle: 'Industry-Leading Noise Cancellation',
      description: 'Premium wireless headphones with best-in-class noise cancellation, 30-hour battery life, and exceptional sound quality.',
      price: 399.99,
      category: 'Headphones & Audio',
      imageUrls: [
        'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      availableSizes: ['Standard'],
      stock: { 'Standard': 25 },
      rating: 4.9,
      reviewCount: 5234,
      seller: 'Sony Official',
      badge: 'Best Seller'
    },
    {
      id: 8,
      name: 'Apple AirPods Pro 2nd Gen',
      subtitle: 'Premium True Wireless',
      description: 'Active noise cancellation, personalized spatial audio, seamless integration with Apple ecosystem.',
      price: 249.99,
      category: 'Headphones & Audio',
      imageUrls: [
        'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      availableSizes: ['Standard'],
      stock: { 'Standard': 40 },
      rating: 4.8,
      reviewCount: 8921,
      seller: 'Apple Official',
      badge: 'Top Seller'
    },
    {
      id: 9,
      name: 'Bose QuietComfort 45',
      subtitle: 'Legendary Comfort & Sound',
      description: 'Lightweight design with world-class noise cancellation and balanced sound. Perfect for travel and daily use.',
      price: 379.99,
      category: 'Headphones & Audio',
      imageUrls: [
        'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      availableSizes: ['Standard'],
      stock: { 'Standard': 18 },
      rating: 4.7,
      reviewCount: 3456,
      seller: 'Bose Official',
      badge: null
    },
    {
      id: 10,
      name: 'Apple Watch Series 9',
      subtitle: 'Advanced Health & Fitness',
      description: 'All-day fitness tracking, health monitoring, Retina display. Always-on screen with relevant information.',
      price: 399.99,
      category: 'Smart Watches & Wearables',
      imageUrls: [
        'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      availableSizes: ['41mm', '45mm'],
      stock: { '41mm': 20, '45mm': 16 },
      rating: 4.8,
      reviewCount: 4123,
      seller: 'Apple Official',
      badge: 'Premium'
    },
    {
      id: 11,
      name: 'Samsung Galaxy Watch 6 Classic',
      subtitle: 'Elegant Android Smartwatch',
      description: 'Rotating bezel navigation, vibrant AMOLED display, comprehensive health monitoring and battery life.',
      price: 299.99,
      category: 'Smart Watches & Wearables',
      imageUrls: [
        'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      availableSizes: ['43mm', '47mm'],
      stock: { '43mm': 14, '47mm': 11 },
      rating: 4.6,
      reviewCount: 2789,
      seller: 'Samsung Official',
      badge: 'Top Seller'
    },
    {
      id: 12,
      name: 'Garmin Epix Gen 2',
      subtitle: 'Sports Professional Watch',
      description: 'AMOLED touchscreen, 11-day battery, multi-GNSS, body metrics. Built for serious athletes.',
      price: 599.99,
      category: 'Smart Watches & Wearables',
      imageUrls: [
        'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      availableSizes: ['Standard'],
      stock: { 'Standard': 9 },
      rating: 4.9,
      reviewCount: 1234,
      seller: 'Garmin Official',
      badge: null
    },
    {
      id: 13,
      name: 'PlayStation 5',
      subtitle: 'Next-Gen Gaming Console',
      description: '4K gaming at 120fps, ultra-high speed SSD, innovative DualSense controller. Play the latest blockbuster games.',
      price: 499.99,
      category: 'Gaming Consoles & Accessories',
      imageUrls: [
        'https://images.pexels.com/photos/340102/pexels-photo-340102.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      availableSizes: ['Standard Edition'],
      stock: { 'Standard Edition': 22 },
      rating: 4.9,
      reviewCount: 12543,
      seller: 'PlayStation Official',
      badge: 'Best Seller'
    },
    {
      id: 14,
      name: 'Xbox Series X',
      subtitle: 'The World\'s Most Powerful Console',
      description: '12 TFLOPS of GPU performance, 1TB storage, Game Pass included. Ultimate gaming power.',
      price: 499.99,
      category: 'Gaming Consoles & Accessories',
      imageUrls: [
        'https://images.pexels.com/photos/340102/pexels-photo-340102.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      availableSizes: ['Standard Edition'],
      stock: { 'Standard Edition': 19 },
      rating: 4.8,
      reviewCount: 9876,
      seller: 'Microsoft Official',
      badge: 'Top Seller'
    },
    {
      id: 15,
      name: 'Nintendo Switch OLED',
      subtitle: 'Portable Gaming Innovation',
      description: 'Beautiful OLED screen, enhanced audio, versatile play modes. Gaming wherever you go.',
      price: 349.99,
      category: 'Gaming Consoles & Accessories',
      imageUrls: [
        'https://images.pexels.com/photos/340102/pexels-photo-340102.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      availableSizes: ['White', 'Black'],
      stock: { 'White': 28, 'Black': 31 },
      rating: 4.7,
      reviewCount: 5621,
      seller: 'Nintendo Official',
      badge: null
    },
    {
      id: 16,
      name: 'Canon EOS R5 Mark II',
      subtitle: 'Professional Mirrorless Camera',
      description: '45MP full-frame sensor, 8K video recording, advanced autofocus. Professional-grade imaging.',
      price: 5499.99,
      category: 'Cameras & Smart Home Devices',
      imageUrls: [
        'https://images.pexels.com/photos/606933/pexels-photo-606933.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      availableSizes: ['Body Only'],
      stock: { 'Body Only': 5 },
      rating: 4.9,
      reviewCount: 823,
      seller: 'Canon Official',
      badge: 'Premium'
    },
    {
      id: 17,
      name: 'Amazon Echo Dot 5th Gen',
      subtitle: 'Smart Home Companion',
      description: 'Voice control, music streaming, smart home integration. Compact and affordable smart speaker.',
      price: 59.99,
      category: 'Cameras & Smart Home Devices',
      imageUrls: [
        'https://images.pexels.com/photos/3808285/pexels-photo-3808285.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      availableSizes: ['Standard'],
      stock: { 'Standard': 100 },
      rating: 4.5,
      reviewCount: 18934,
      seller: 'Amazon Official',
      badge: 'Best Seller'
    },
    {
      id: 18,
      name: 'Google Nest Hub Max',
      subtitle: 'Smart Display with Camera',
      description: '10-inch touchscreen, video calling, smart home control, Google Assistant. Your home at a glance.',
      price: 229.99,
      category: 'Cameras & Smart Home Devices',
      imageUrls: [
        'https://images.pexels.com/photos/3808285/pexels-photo-3808285.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600'
      ],
      availableSizes: ['Standard'],
      stock: { 'Standard': 35 },
      rating: 4.6,
      reviewCount: 4567,
      seller: 'Google Official',
      badge: 'Top Seller'
    }
  ];

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(product => product.id === id));
  }

  filterProducts(
    searchTerm: string = '',
    minPrice: number = 0,
    maxPrice: number = Infinity,
    categories: string[] = []
  ): Observable<Product[]> {
    let filteredProducts = this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

      const matchesCategory = categories.length === 0 || categories.includes(product.category);

      return matchesSearch && matchesPrice && matchesCategory;
    });

    return of(filteredProducts);
  }
}
