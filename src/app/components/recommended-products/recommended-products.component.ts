import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-recommended-products',
  templateUrl: './recommended-products.component.html',
  styleUrls: ['./recommended-products.component.css']
})
export class RecommendedProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data.slice(0, 4);
    });
  }
}