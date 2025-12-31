// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Added import for map operator
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import { Purchase } from '../models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<CartItem[]>;
  public cartItems: Observable<CartItem[]>;
  private purchasesSubject: BehaviorSubject<Purchase[]>;
  public purchases: Observable<Purchase[]>;

  constructor() {
    // Initialize cart from local storage if available
    const storedCart = localStorage.getItem('cartItems');
    this.cartItemsSubject = new BehaviorSubject<CartItem[]>(storedCart ? JSON.parse(storedCart) : []);
    this.cartItems = this.cartItemsSubject.asObservable();

    // Initialize purchases from local storage if available
    const storedPurchases = localStorage.getItem('purchases');
    this.purchasesSubject = new BehaviorSubject<Purchase[]>(storedPurchases ? JSON.parse(storedPurchases) : []);
    this.purchases = this.purchasesSubject.asObservable();
  }

  /**
   * Adds a product to the cart or updates its quantity if already present.
   * @param product The product to add.
   * @param selectedSize The size of the product to add.
   * @param quantity The quantity to add.
   */
  addToCart(product: Product, selectedSize: string, quantity: number): void {
    const currentCart = this.cartItemsSubject.value;
    const existingItemIndex = currentCart.findIndex(
      item => item.product.id === product.id && item.selectedSize === selectedSize
    );

    if (existingItemIndex > -1) {
      // Update quantity of existing item
      currentCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      currentCart.push({ product, selectedSize, quantity });
    }
    this.updateCart(currentCart);
  }

  /**
   * Removes a product from the cart.
   * @param productId The ID of the product to remove.
   * @param selectedSize The size of the product to remove.
   */
  removeFromCart(productId: number, selectedSize: string): void {
    const currentCart = this.cartItemsSubject.value.filter(
      item => !(item.product.id === productId && item.selectedSize === selectedSize)
    );
    this.updateCart(currentCart);
  }

  /**
   * Updates the quantity of a specific item in the cart.
   * @param productId The ID of the product.
   * @param selectedSize The size of the product.
   * @param newQuantity The new quantity.
   */
  updateQuantity(productId: number, selectedSize: string, newQuantity: number): void {
    const currentCart = this.cartItemsSubject.value.map(item => {
      if (item.product.id === productId && item.selectedSize === selectedSize) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter((item: CartItem) => item.quantity > 0); // Explicitly type item

    this.updateCart(currentCart);
  }

  /**
   * Returns the total number of items (sum of quantities) in the cart.
   * This is useful for displaying the cart count in the header.
   * @returns Observable<number>
   */
  getCartTotalQuantity(): Observable<number> {
    return this.cartItems.pipe(
      // Map the array of cart items to a single number: the total quantity
      // The `reduce` function sums up the quantity of each item.
      map((items: CartItem[]) => items.reduce((total: number, item: CartItem) => total + item.quantity, 0)) // Explicitly type items and item
    );
  }


  /**
   * Clears all items from the cart.
   */
  clearCart(): void {
    this.updateCart([]);
  }

  /**
   * Saves a purchase to the purchases list.
   * @param purchase The purchase to save.
   */
  savePurchase(purchase: Purchase): void {
    const currentPurchases = this.purchasesSubject.value;
    currentPurchases.push(purchase);
    localStorage.setItem('purchases', JSON.stringify(currentPurchases));
    this.purchasesSubject.next(currentPurchases);
  }

  /**
   * Gets all purchases for the current user.
   * @returns Observable<Purchase[]>
   */
  getPurchases(): Observable<Purchase[]> {
    return this.purchases;
  }

  /**
   * Gets the current purchases value synchronously.
   * @returns Purchase[]
   */
  getPurchasesValue(): Purchase[] {
    return this.purchasesSubject.value;
  }

  private updateCart(cart: CartItem[]): void {
    localStorage.setItem('cartItems', JSON.stringify(cart));
    this.cartItemsSubject.next(cart);
  }
}
