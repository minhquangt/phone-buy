import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public searchInput: string = '';
  public quantity: number = 0;
  public name: string = '';

  constructor(
    private productsService: ProductsService,
    private orderService: OrderService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderService.quantityOrdering$.subscribe((quantity) => {
      this.quantity = quantity;
    });
    this.loginService.name$.subscribe((name) => {
      this.name = name;
      console.log(name);
    });
  }

  logOut() {
    if (confirm('Bạn có muốn đăng xuất không?')) {
      localStorage.removeItem('userID');
      this.loginService.name$.next('');
      this.router.navigateByUrl('/login');
      this.orderService.quantityOrdering$.next(0);
      this.orderService.totalOrdering$.next(0);
      this.orderService.cleanCart();
    } else {
      return;
    }
  }

  searchProduct() {
    this.productsService.searchProduct(this.searchInput);
  }

  filterBrand(brand: string) {
    this.productsService.filterBrand(brand);
  }
}
