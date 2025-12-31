// src/app/components/my-profile/my-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { User } from '../../models/user.model';
import { Product } from '../../models/product.model';
import { CartItem } from '../../models/cart-item.model';
import { Purchase } from '../../models/purchase.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  profileForm!: FormGroup;
  changePasswordForm!: FormGroup;
  currentUser: User | null = null;
  genders = ['Male', 'Female', 'Other'];
  interests = ['Sports', 'Reading', 'Gaming', 'Music', 'Movies'];
  profileTabs = ['Personal Information', 'Purchased Products', 'Change Password'];
  activeTab = 'Personal Information';
  successMessage: string = '';
  errorMessage: string = '';
  purchases: Purchase[] = [];
  wishlistItems: Product[] = [];
  expandedSections: { [key: string]: boolean } = {
    purchases: true,
    wishlist: true
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.initChangePasswordForm();
    this.loadUserProfile();
    this.loadPurchases();
    this.loadWishlist();
  }

  /**
   * Initializes the profile form with form controls and validators.
   */
  initForm(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      gender: ['', Validators.required],
      interests: this.fb.array([])
    });
  }

  /**
   * Initializes the change password form with validators.
   */
  initChangePasswordForm(): void {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  /**
   * Custom validator to check if passwords match.
   */
  passwordMatchValidator(control: AbstractControl): { [key: string]: any } | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  /**
   * Loads the current user's profile data into the form.
   */
  loadUserProfile(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.profileForm.patchValue({
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          gender: user.gender
        });
        // Set interests checkboxes
        const interestsArray = this.profileForm.controls['interests'] as FormArray;
        user.interests.forEach(interest => {
          interestsArray.push(this.fb.control(interest));
        });
      } else {
        // If no user, redirect to login or home
        this.router.navigate(['/login']);
      }
    });
  }

  /**
   * Getter for easy access to form fields in the template.
   */
  get f() { return this.profileForm.controls; }

  /**
   * Getter for easy access to change password form fields.
   */
  get cp() { return this.changePasswordForm.controls; }

  /**
   * Selects a tab to display.
   * @param tab The tab name to select.
   */
  selectTab(tab: string): void {
    this.activeTab = tab;
    this.successMessage = '';
    this.errorMessage = '';
    if (tab === 'Purchased Products') {
      this.loadPurchases();
    }
  }

  /**
   * Toggles the expanded state of a section.
   * @param section The section name to toggle.
   */
  toggleSection(section: string): void {
    this.expandedSections[section] = !this.expandedSections[section];
  }

  /**
   * Loads purchases from the cart service.
   */
  loadPurchases(): void {
    this.cartService.getPurchases().subscribe(purchases => {
      this.purchases = purchases;
    });
  }

  /**
   * Loads wish list items from localStorage.
   */
  loadWishlist(): void {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      this.wishlistItems = JSON.parse(stored);
    } else {
      this.wishlistItems = [];
    }
  }

  /**
   * Adds a product to cart from wish list and shows success message.
   * @param product The product to add to cart.
   */
  addToCartFromWishlist(product: Product): void {
    const defaultSize = product.availableSizes[0] || 'Default';
    this.cartService.addToCart(product, defaultSize, 1);
    this.successMessage = `${product.name} added to cart!`;
    setTimeout(() => this.successMessage = '', 3000);
  }

  // /**
  //  * Removes a product from the wish list.
  //  * @param productId The product ID to remove.
  //  */
  // removeFromWishlist(productId: number): void {
  //   this.wishlistItems = this.wishlistItems.filter(p => p.id !== productId);
  //   localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems));
  //   this.successMessage = 'Item removed from wish list';
  //   setTimeout(() => this.successMessage = '', 3000);
  // }

  /**
   * Handles buy again action for a product from purchase history.
   * @param item The cart item to buy again.
   */
  buyAgain(item: CartItem): void {
    const defaultSize = item.selectedSize || item.product.availableSizes[0] || 'Default';
    this.cartService.addToCart(item.product, defaultSize, 1);
    this.successMessage = `${item.product.name} added to cart!`;
    setTimeout(() => this.router.navigate(['/cart']), 2000);
  }

  /**
   * Handles change password form submission.
   */
  onChangePassword(): void {
    if (this.changePasswordForm.invalid) {
      this.errorMessage = 'Please correct the errors in the form.';
      return;
    }

    // Simulate password change (in real app, would call API)
    const currentPassword = this.changePasswordForm.value.currentPassword;
    const newPassword = this.changePasswordForm.value.newPassword;

    // Validate current password (for demo, checking against a simple stored value)
    const storedPassword = localStorage.getItem(`password_${this.currentUser?.id}`);
    if (storedPassword !== currentPassword) {
      this.errorMessage = 'Current password is incorrect.';
      return;
    }

    // Update password
    localStorage.setItem(`password_${this.currentUser?.id}`, newPassword);
    this.successMessage = 'Password changed successfully!';
    this.resetPasswordForm();
    setTimeout(() => this.successMessage = '', 3000);
  }

  /**
   * Resets the change password form.
   */
  resetPasswordForm(): void {
    this.changePasswordForm.reset();
  }

  /**
   * Handles changes to interest checkboxes.
   * @param event The change event.
   */
  onInterestChange(event: any): void {
    const interestsArray = this.profileForm.controls['interests'] as FormArray;
    if (event.target.checked) {
      interestsArray.push(this.fb.control(event.target.value));
    } else {
      const index = interestsArray.controls.findIndex(x => x.value === event.target.value);
      if (index !== -1) {
        interestsArray.removeAt(index);
      }
    }
  }

  /**
   * Checks if a given interest is already selected.
   * Used to pre-check checkboxes.
   * @param interest The interest string to check.
   * @returns True if the interest is in the current user's interests, false otherwise.
   */
  isInterestSelected(interest: string): boolean {
    return this.currentUser?.interests.includes(interest) || false;
  }

  /**
   * Handles form submission for profile update.
   */
  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.profileForm.invalid) {
      this.errorMessage = 'Please correct the errors in the form.';
      return;
    }

    if (!this.currentUser) {
      this.errorMessage = 'No user logged in.';
      return;
    }

    const updatedUser: User = {
      ...this.currentUser, // Keep existing ID and email
      name: this.profileForm.value.name,
      phoneNumber: this.profileForm.value.phoneNumber,
      gender: this.profileForm.value.gender,
      interests: this.profileForm.value.interests
    };

    this.authService.updateProfile(updatedUser).subscribe(
      success => {
        if (success) {
          this.successMessage = 'Profile updated successfully!';
          // No need to reload, AuthService will update currentUserSubject
        } else {
          this.errorMessage = 'Failed to update profile. Please try again.';
        }
      },
      error => {
        this.errorMessage = 'An error occurred during profile update.';
        console.error('Profile update error:', error);
      }
    );
  }

  /**
   * Masks the email address as per requirement: ra****sh@gmail.com
   * @param email The email address to mask.
   * @returns Masked email string.
   */
  maskEmail(email: string): string {
    if (!email) return '';
    const atIndex = email.indexOf('@');
    if (atIndex === -1) return email; // Not a valid email

    const username = email.substring(0, atIndex);
    const domain = email.substring(atIndex);

    if (username.length <= 4) {
      // If username is short, show first char and mask the rest
      return username.charAt(0) + '****' + domain;
    }
    // Show first two and last two characters of username
    return username.substring(0, 2) + '****' + username.substring(username.length - 2) + domain;
  }

  /**
   * Masks the phone number as per requirement: ******7890
   * @param phoneNumber The phone number to mask.
   * @returns Masked phone number string.
   */
  maskPhoneNumber(phoneNumber: string): string {
    if (!phoneNumber || phoneNumber.length < 4) return phoneNumber;
    return '******' + phoneNumber.substring(phoneNumber.length - 4);
  }
}
