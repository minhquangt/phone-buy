import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order';
import { Product } from '../models/product';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  public apiURL: string = 'http://localhost:3000/order';
  public orders: Order[] = [];
  public totalOrdering$ = new BehaviorSubject(<number>0);
  public quantityOrdering$ = new BehaviorSubject(<number>0);
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  postCart(cart: any) {
    return this.http.post<any>(`${this.apiURL}`, cart);
  }

  checkProduct(prod: Product, quantity: number = 1): void {
    const orderExist = this.orders.find((o) => o.productID === prod.productID);
    if (orderExist) {
      this.orders = this.orders.map((o) => {
        if (o.productID === prod.productID) {
          o.quantityOrdered = o.quantityOrdered + quantity;
        }
        return o;
      });
    } else {
      const orderNew = {
        productID: prod.productID,
        orderImg: prod.productImage,
        orderName: prod.productName,
        orderPrice: prod.buyPrice,
        quantityOrdered: quantity,
      };
      this.orders.push(orderNew);
    }
  }

  addProduct(product: Product, quantity: number) {
    this.showSuccess();
    this.checkProduct(product, quantity);
    this.totalOrdering$.next(this.getTotal());
    this.quantityOrdering$.next(this.orders.length);
  }

  showSuccess() {
    this.toastr.success('Sản phẩm đã được thêm vào giỏ hàng.');
  }

  showErrorNotLogin() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Bạn cần đăng nhập mới có thể mua hàng.',
    });
  }

  deleteProduct(id: number) {
    this.orders = this.orders.filter((o) => o.productID !== id);
  }

  cleanCart() {
    this.orders = [];
  }

  getTotal(): number {
    let total = 0;
    this.orders.forEach((o: Order) => {
      total += o.orderPrice * o.quantityOrdered;
    });
    return total;
  }
}
