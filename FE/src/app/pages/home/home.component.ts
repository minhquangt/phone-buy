import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public products: Product[] = [];
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    if (this.productsService.products.length === 0) {
      this.productsService.getAllProducts().subscribe((res: any) => {
        this.productsService.products$.next(res.data);
        this.productsService.products = res.data;
      });
    }
    this.productsService.products$.subscribe((products) => {
      this.products = products;
    });
    console.log(this.products);
  }
}
