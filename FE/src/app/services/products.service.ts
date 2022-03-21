import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public apiURL: string = 'http://localhost:3000/products';
  public products: Product[] = [];
  public products$ = new BehaviorSubject(<Product[]>[]);
  constructor(private http: HttpClient, private router: Router) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURL}`);
  }

  getSingleProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiURL}/${id}`);
  }

  searchProduct(searchProduct: string) {
    this.router.navigate(['/search'], {
      queryParams: { product: searchProduct.toLowerCase() },
    });
    const productsTemp = this.products.filter((product, index) => {
      return product.productName
        .toLowerCase()
        .includes(searchProduct.toLowerCase());
    });
    console.log(productsTemp);
    this.products$.next(productsTemp);
  }

  filterBrand(brand: string) {
    let productsTemp = this.products;
    console.log(productsTemp);
    if (brand === '') {
      this.router.navigate(['']);
    } else {
      this.router.navigate([''], {
        queryParams: { brand: brand.toLowerCase() },
      });
      productsTemp = this.products.filter(
        (product) => product.productBrand.toLowerCase() === brand
      );
    }
    console.log(productsTemp);
    this.products$.next(productsTemp);
  }
}
