// src/app/components/my-cart/my-cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { CartItem } from '../../models/cart-item.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  cartItems$: Observable<CartItem[]> | undefined;
  totalPrice$: Observable<number> | undefined;
  tax$: Observable<number> | undefined;
  totalWithTax$: Observable<number> | undefined;

  constructor(private cartService: CartService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.cartItems$ = this.cartService.cartItems;
    this.totalPrice$ = this.cartItems$.pipe(
      map(items => items.reduce((total, item) => total + (item.product.price * item.quantity), 0))
    );
    this.tax$ = this.totalPrice$!.pipe(
      map(price => price * 0.08)
    );
    this.totalWithTax$ = this.totalPrice$!.pipe(
      map(price => price * 1.08)
    );
  }

  /**
   * Handles quantity change for a cart item.
   * @param item The cart item to update.
   * @param newQuantity The new quantity.
   */
  onQuantityChange(item: CartItem, newQuantity: number): void {
    this.cartService.updateQuantity(item.product.id, item.selectedSize, newQuantity);
  }

  /**
   * Increase quantity by 1
   */
  increaseQuantity(item: CartItem): void {
    const maxQty = item.product.stock[item.selectedSize];
    if (item.quantity < maxQty) {
      this.cartService.updateQuantity(item.product.id, item.selectedSize, item.quantity + 1);
    }
  }

  /**
   * Decrease quantity by 1
   */
  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.product.id, item.selectedSize, item.quantity - 1);
    }
  }

  /**
   * Removes an item from the cart.
   * @param item The cart item to remove.
   */
  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.product.id, item.selectedSize);
  }

  /**
   * Calculates the subtotal for a single cart item.
   * @param item The cart item.
   * @returns The subtotal price.
   */
  getItemSubtotal(item: CartItem): number {
    return item.product.price * item.quantity;
  }

  /**
   * Handles checkout button click - checks if user is logged in
   */
  proceedToCheckout(): void {
    if (!this.authService.currentUserValue) {
      alert('Please login first to proceed with checkout');
      this.router.navigate(['/login']);
      return;
    }
    // If logged in, navigate to checkout
    this.router.navigate(['/checkout']);
  }
}
