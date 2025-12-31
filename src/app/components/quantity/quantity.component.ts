// src/app/components/quantity/quantity.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css']
})
export class QuantityComponent {
  // Input: Initial quantity value
  @Input() quantity: number = 1;
  // Input: Maximum allowed quantity
  @Input() maxQuantity: number = 99; // A reasonable default max quantity

  // Output: Emits when the quantity changes
  @Output() quantityChange = new EventEmitter<number>();

  /**
   * Increases the quantity by 1, up to maxQuantity.
   */
  increment(): void {
    if (this.quantity < this.maxQuantity) {
      this.quantity++;
      this.emitQuantityChange();
    }
  }

  /**
   * Decreases the quantity by 1, down to a minimum of 1.
   */
  decrement(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.emitQuantityChange();
    }
  }

  /**
   * Emits the current quantity value.
   */
  private emitQuantityChange(): void {
    this.quantityChange.emit(this.quantity);
  }
}
