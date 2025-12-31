// src/app/components/product-detail/product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  selectedSize: string | undefined;
  quantity: number = 1;
  currentImageIndex: number = 0; // For image slider

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    // Get product ID from route parameters
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(productId).subscribe(product => {
      this.product = product;
    });
  }

  /**
   * Updates the selected size for the product.
   * @param size The size selected by the user.
   */
  onSelectSize(size: string): void {
    this.selectedSize = size;
  }

  /**
   * Updates the quantity received from the QuantityComponent.
   * @param newQuantity The new quantity.
   */
  onQuantityChange(newQuantity: number): void {
    this.quantity = newQuantity;
  }

  /**
   * Adds the selected product with chosen size and quantity to the cart.
   */
  addToCart(): void {
    if (this.product && this.selectedSize && this.quantity > 0) {
      this.cartService.addToCart(this.product, this.selectedSize, this.quantity);
      alert(`${this.quantity} x ${this.product.name} (${this.selectedSize}) added to cart!`);
      this.router.navigate(['/cart']); // Optionally redirect to cart page
    } else {
      alert('Please select a size and quantity before adding to cart.');
    }
  }

  /**
   * Adds the product to cart and redirects to checkout page.
   */
  buyNow(): void {
    if (this.product && this.selectedSize && this.quantity > 0) {
      this.cartService.addToCart(this.product, this.selectedSize, this.quantity);
      this.router.navigate(['/checkout']);
    } else {
      alert('Please select a size and quantity before checkout.');
    }
  }

  /**
   * Checks if a given size is available (in stock) for the current product.
   * @param size The size to check.
   * @returns True if the size is available, false otherwise.
   */
  isSizeAvailable(size: string): boolean {
    return this.product?.stock[size] && this.product.stock[size] > 0 || false;
  }

  // --- Image Slider Logic ---

  /**
   * Changes the displayed image in the slider.
   * @param direction 'next' or 'prev' to navigate images.
   */
  changeImage(direction: 'next' | 'prev'): void {
    if (!this.product || !this.product.imageUrls.length) return;

    if (direction === 'next') {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.product.imageUrls.length;
    } else {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.product.imageUrls.length) % this.product.imageUrls.length;
    }
  }

  /**
   * Set image index directly from thumbnail click
   */
  setImageIndex(index: number): void {
    this.currentImageIndex = index;
  }

  /**
   * Get quantity options array for dropdown
   */
  getQuantityOptions(): number[] {
    const maxQty = this.selectedSize && this.product?.stock[this.selectedSize] 
      ? this.product.stock[this.selectedSize] 
      : 1;
    return Array.from({ length: maxQty }, (_, i) => i + 1);
  }}