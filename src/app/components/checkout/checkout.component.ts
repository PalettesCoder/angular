import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { CartItem } from '../../models/cart-item.model';
import { Purchase } from '../../models/purchase.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

interface OrderForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVV: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems$: Observable<CartItem[]> | undefined;
  totalPrice$: Observable<number> | undefined;
  orderPlaced = false;
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  orderForm: OrderForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: ''
  };

  constructor(private cartService: CartService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Check if user is logged in
    if (!this.authService.currentUserValue) {
      // If not logged in, redirect to login page
      alert('Please login first to proceed with checkout');
      this.router.navigate(['/login']);
      return;
    }

    this.cartItems$ = this.cartService.cartItems;
    this.totalPrice$ = this.cartItems$.pipe(
      map(items => items.reduce((total, item) => total + (item.product.price * item.quantity), 0))
    );

    // Subscribe to get current values
    this.cartItems$.subscribe(items => this.cartItems = items);
    this.totalPrice$.subscribe(total => this.totalPrice = total);
  }

  /**
   * Validates the order form.
   * @returns true if the form is valid, false otherwise.
   */
  isFormValid(): boolean {
    return this.orderForm.firstName.trim() !== '' &&
           this.orderForm.lastName.trim() !== '' &&
           this.orderForm.email.trim() !== '' &&
           this.orderForm.phone.trim() !== '' &&
           this.orderForm.address.trim() !== '' &&
           this.orderForm.city.trim() !== '' &&
           this.orderForm.state.trim() !== '' &&
           this.orderForm.zipCode.trim() !== '' &&
           this.orderForm.cardNumber.trim() !== '' &&
           this.orderForm.cardExpiry.trim() !== '' &&
           this.orderForm.cardCVV.trim() !== '';
  }

  /**
   * Places the order and clears the cart.
   */
  placeOrder(): void {
    if (this.isFormValid()) {
      const purchase: Purchase = {
        orderId: this.generateOrderID(),
        orderDate: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        customerName: `${this.orderForm.firstName} ${this.orderForm.lastName}`,
        email: this.orderForm.email,
        phone: this.orderForm.phone,
        address: this.orderForm.address,
        city: this.orderForm.city,
        state: this.orderForm.state,
        zipCode: this.orderForm.zipCode,
        items: this.cartItems,
        totalAmount: this.totalPrice,
        status: 'Completed'
      };

      // Save purchase to cart service
      this.cartService.savePurchase(purchase);

      this.orderPlaced = true;
      this.cartService.clearCart();
      setTimeout(() => {
        this.router.navigate(['/products']);
      }, 3000);
    }
  }

  /**
   * Cancels the checkout and returns to cart.
   */
  cancelCheckout(): void {
    this.router.navigate(['/cart']);
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
   * Generates a unique order ID.
   * @returns A unique order ID string.
   */
  generateOrderID(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${timestamp}${random}`.slice(-10);
  }
}
