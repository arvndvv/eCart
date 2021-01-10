import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productsUrl: string = 'http://localhost:4000/product';
  cartUrl: string = 'http://localhost:4000/cart';

  constructor(private http: HttpClient) {}
  list(): Observable<any> {
    return this.http.get<any>(`${this.productsUrl}`);
  }
  add(product: object): Observable<any> {
    console.log(product);
    return this.http.post<any>(`${this.cartUrl}`, product);
  }
}
