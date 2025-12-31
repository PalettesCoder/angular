import { Component, OnInit, OnDestroy } from '@angular/core'; // Import OnDestroy
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { Observable, Subscription } from 'rxjs'; // Import Subscription

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy { // Implement OnDestroy
  title = 'ecommerce-app';
  cartItemCount!: Observable<number>;
  isLoggedIn: boolean = false; // Public property to expose login status
  searchQuery: string = '';
  searchCategory: string = 'all';
  mobileMenuOpen: boolean = false; // Mobile menu toggle state
  private userSubscription: Subscription; // To unsubscribe from currentUser observable

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user; // Update isLoggedIn based on user presence
    });
  }

  ngOnInit(): void {
    this.cartItemCount = this.cartService.getCartTotalQuantity();
  }

  /**
   * Toggles the mobile menu visibility
   */
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  /**
   * Closes the mobile menu
   */
  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  onSearch(): void {
    if (this.searchQuery && this.searchQuery.trim()) {
      this.router.navigate(['/products'], { queryParams: { q: this.searchQuery.trim(), cat: this.searchCategory !== 'all' ? this.searchCategory : '' } });
    } else {
      this.router.navigate(['/products']);
    }
    this.closeMobileMenu();
  }

  onCategoryChange(): void {
    if (this.searchCategory !== 'all') {
      this.router.navigate(['/products'], { queryParams: { cat: this.searchCategory } });
    } else {
      this.router.navigate(['/products']);
    }
    this.closeMobileMenu();
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe(); // Unsubscribe to prevent memory leaks
  }
}
