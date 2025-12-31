// src/app/pipes/product-search.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: 'productSearch'
})
export class ProductSearchPipe implements PipeTransform {
  /**
   * Filters an array of products based on a search term.
   * @param products The array of products to filter.
   * @param searchTerm The string to search for within product names.
   * @returns An array of products that match the search term.
   */
  transform(products: Product[], searchTerm: string): Product[] {
    // If no products or no search term, return all products
    if (!products || !searchTerm) {
      return products;
    }

    // Convert search term to lowercase for case-insensitive comparison
    searchTerm = searchTerm.toLowerCase();

    // Filter products whose name includes the search term
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm)
    );
  }
}
