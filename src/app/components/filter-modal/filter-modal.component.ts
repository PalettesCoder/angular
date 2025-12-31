// src/app/components/filter-modal/filter-modal.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.css']
})
export class FilterModalComponent implements OnInit {
  @Input() minPrice: number = 0;
  @Input() maxPrice: number = 6000;
  @Input() selectedCategories: string[] = [];

  @Output() applyFiltersEvent = new EventEmitter<{ minPrice: number, maxPrice: number, categories: string[] }>();
  @Output() closeModalEvent = new EventEmitter<void>();

  // Local state for modal inputs
  localMinPrice: number = 0;
  localMaxPrice: number = 6000;
  localSelectedCategories: { [key: string]: boolean } = {
    'Smartphones & Tablets': false,
    'Laptops & PCs': false,
    'Headphones & Audio': false,
    'Smart Watches & Wearables': false,
    'Gaming Consoles & Accessories': false,
    'Cameras & Smart Home Devices': false
  };

  ngOnInit(): void {
    // Initialize local state with input values
    this.localMinPrice = this.minPrice;
    this.localMaxPrice = this.maxPrice;
    this.selectedCategories.forEach(cat => {
      if (this.localSelectedCategories.hasOwnProperty(cat)) {
        this.localSelectedCategories[cat] = true;
      }
    });
  }

  /**
   * Emits the applyFiltersEvent with the current local filter values.
   */
  applyFilters(): void {
    const categoriesToApply = Object.keys(this.localSelectedCategories).filter(
      key => this.localSelectedCategories[key]
    );

    this.applyFiltersEvent.emit({
      minPrice: this.localMinPrice,
      maxPrice: this.localMaxPrice,
      categories: categoriesToApply
    });
  }

  /**
   * Emits the closeModalEvent to indicate the modal should close.
   */
  closeModal(): void {
    this.closeModalEvent.emit();
  }
}
