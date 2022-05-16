import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() prod?: Product;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {}

  onAdd(prod: Product): void {
    if (localStorage.getItem('user')) {
      this.orderService.addProduct(prod, 1);
    } else {
      this.orderService.showErrorNotLogin();
    }
  }
}
