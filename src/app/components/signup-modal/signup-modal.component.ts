// src/app/components/signup-modal/signup-modal.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent {
  @Input() messages: string[] = []; // Input array of error messages
  @Output() closeModalEvent = new EventEmitter<void>(); // Event to close the modal

  /**
   * Emits the closeModalEvent when the close button is clicked.
   */
  closeModal(): void {
    this.closeModalEvent.emit();
  }
}
