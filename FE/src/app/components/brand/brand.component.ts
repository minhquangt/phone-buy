import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit {
  public brands: string[] = [];
  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.brands = ['xiaomi', 'realme', 'oppo', 'samsung', 'iphone', 'vivo'];
  }

  filterBrand(brand: string) {
    this.productsService.filterBrand(brand);
  }
}
