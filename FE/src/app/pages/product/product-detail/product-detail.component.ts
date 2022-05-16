import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { OrderService } from 'src/app/services/order.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  public id: string = '';
  public prod?: Product;
  public quantity: number = 1;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.productsService.getSingleProduct(+this.id).subscribe((res: any) => {
      this.prod = res.data[0];
    });
  }

  increase() {
    if (this.prod) {
      this.quantity < this.prod.quantityInStock
        ? this.quantity++
        : this.prod.quantityInStock;
    }
  }

  decrease() {
    if (this.prod) {
      this.quantity > 1 ? this.quantity-- : 1;
    }
  }

  onAdd(prod: Product) {
    if (localStorage.getItem('user')) {
      this.orderService.addProduct(prod, this.quantity);
    } else {
      this.orderService.showErrorNotLogin();
    }
  }
}
