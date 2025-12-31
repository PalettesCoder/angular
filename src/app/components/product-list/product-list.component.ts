// src/app/components/product-list/product-list.component.ts
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = []; // All products
  filteredProducts: Product[] = []; // Products after search and filter
  @Input() showRecommended: boolean = false;
  searchTerm: string = ''; // Used for search pipe
  isFilterModalOpen: boolean = false; // Controls filter modal visibility
  selectedProduct: Product | null = null;
  private queryParamsSubscription: Subscription | null = null;

  // Filter criteria
  minPrice: number = 0;
  maxPrice: number = 6000; // Updated for electronics pricing
  selectedCategories: string[] = [
    'Smartphones & Tablets',
    'Laptops & PCs',
    'Headphones & Audio',
    'Smart Watches & Wearables',
    'Gaming Consoles & Accessories',
    'Cameras & Smart Home Devices'
  ]; // All selected by default

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Fetch all products when the component initializes
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.applyFilters(); // Apply initial filters (all products, default price range, all categories)
    });

    // Listen to query parameters from the route
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      if (params['q']) {
        // Search query parameter exists
        this.searchTerm = params['q'];
      } else {
        this.searchTerm = '';
      }

      if (params['cat']) {
        // Category filter parameter exists
        const category = params['cat'];
        this.selectedCategories = category ? [category] : [
          'Smartphones & Tablets',
          'Laptops & PCs',
          'Headphones & Audio',
          'Smart Watches & Wearables',
          'Gaming Consoles & Accessories',
          'Cameras & Smart Home Devices'
        ];
      }

      this.applyFilters();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  /**
   * Toggles the visibility of the filter modal.
   */
  toggleFilterModal(): void {
    this.isFilterModalOpen = !this.isFilterModalOpen;
  }

  /**
   * Applies the current search term, price range, and category filters to the product list.
   * This method is called from ngOnInit, after search input changes, and when filter modal applies filters.
   */
  applyFilters(): void {
    this.productService.filterProducts(
      this.searchTerm,
      this.minPrice,
      this.maxPrice,
      this.selectedCategories
    ).subscribe(data => {
      if (this.showRecommended) {
        this.filteredProducts = data.slice(0, 4);
      } else {
        this.filteredProducts = data;
      }
    });
  }

  /**
   * Called by the filter modal when new filter values are applied.
   * @param filters Object containing minPrice, maxPrice, and selectedCategories.
   */
  onFiltersApplied(filters: { minPrice: number, maxPrice: number, categories: string[] }): void {
    this.minPrice = filters.minPrice;
    this.maxPrice = filters.maxPrice;
    this.selectedCategories = filters.categories;
    this.toggleFilterModal(); // Close the modal
    this.applyFilters(); // Re-apply filters with new values
  }

  /**
   * Toggle a category on or off
   */
  onCategoryToggle(category: string): void {
    const index = this.selectedCategories.indexOf(category);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(category);
    }
    this.applyFilters();
  }

  /**
   * Clear all filters and reset to defaults
   */
  clearFilters(): void {
    this.minPrice = 0;
    this.maxPrice = 6000;
    this.selectedCategories = [
      'Smartphones & Tablets',
      'Laptops & PCs',
      'Headphones & Audio',
      'Smart Watches & Wearables',
      'Gaming Consoles & Accessories',
      'Cameras & Smart Home Devices'
    ];
    this.searchTerm = '';
    this.applyFilters();
  }

  quickViewProduct(product: Product): void {
    this.selectedProduct = product;
    console.log('Quick view for:', this.selectedProduct);
    // Here you would typically open a modal with the product details
  }

  // --- Image Slider Logic (basic) ---
  currentImageIndex: number[] = []; // To keep track of current image index for each product

  /**
   * Initializes the current image index for each product to 0.
   * Called for each product card.
   * @param productId The ID of the product.
   */
  initImageSlider(productId: number): void {
    // Only initialize if not already set
    if (this.currentImageIndex[productId] === undefined) {
      this.currentImageIndex[productId] = 0;
    }
  }

  /**
   * Changes the displayed image for a specific product in the slider.
   * @param product The product object.
   * @param direction 'next' or 'prev' to navigate images.
   */
  changeImage(product: Product, direction: 'next' | 'prev'): void {
    let currentIndex = this.currentImageIndex[product.id];
    if (direction === 'next') {
      currentIndex = (currentIndex + 1) % product.imageUrls.length;
    } else {
      currentIndex = (currentIndex - 1 + product.imageUrls.length) % product.imageUrls.length;
    }
    this.currentImageIndex[product.id] = currentIndex;
  }
}
