import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartUrl: string = 'http://localhost:4000/cart';

  constructor(private http: HttpClient) {}
  showCart(): Observable<any> {
    return this.http.get(this.cartUrl);
  }
  removeItem(id: any): Observable<any> {
    // console.log(id)
    return this.http.delete(`${this.cartUrl}/remove/${id}`);
  }
  emptyCart(): Observable<any> {
    return this.http.delete(`${this.cartUrl}/empty-cart`);
  }
  reduceItem(id: any): Observable<any> {
    return this.http.delete(`${this.cartUrl}/subtract/${id}`);
  }
  add(update: object): Observable<any> {
    // console.log(update);
    return this.http.post<any>(`${this.cartUrl}`, update);
  }
}
