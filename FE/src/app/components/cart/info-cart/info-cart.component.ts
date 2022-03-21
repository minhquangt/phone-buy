import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-cart',
  templateUrl: './info-cart.component.html',
  styleUrls: ['./info-cart.component.scss'],
})
export class InfoCartComponent implements OnInit {
  public orders: Order[] = [];
  public totalPrice: number = 0;
  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.getCart();
    this.totalPrice = this.orderService.getTotal();
    this.orderService.totalOrdering$.subscribe((total) => {
      this.totalPrice = total;
    });
  }

  postCart() {
    this.orderService
      .postCart({ userID: localStorage.getItem('userID'), cart: this.orders })
      .subscribe((cart) => {
        console.log(cart);
        Swal.fire(
          'Đặt hàng thành công !',
          'Cảm ơn bạn đã tin tưởng và ủng hộ cửa hàng.',
          'success'
        );
        this.orderService.cleanCart();
        this.getCart();
        this.orderService.totalOrdering$.next(0);
        this.orderService.quantityOrdering$.next(0);
      });
  }

  deleteItem(id: number, orderName: string) {
    if (confirm(`Bạn có muốn xóa sản phẩm ${orderName} không?`)) {
      this.orderService.deleteProduct(id);
      this.orderService.totalOrdering$.next(this.orderService.getTotal());
      this.orderService.quantityOrdering$.next(this.orderService.orders.length);
      this.getCart();
    } else {
      return;
    }
  }

  emptyCart() {
    if (confirm('Bạn có muốn xóa toàn bộ giỏ hàng không?')) {
      this.orderService.cleanCart();
      this.orderService.totalOrdering$.next(this.orderService.getTotal());
      this.orderService.quantityOrdering$.next(this.orderService.orders.length);
      this.getCart();
    } else {
      return;
    }
  }

  getCart() {
    this.orders = this.orderService.orders;
  }

  backToHome() {
    this.router.navigate(['/']);
  }
}
