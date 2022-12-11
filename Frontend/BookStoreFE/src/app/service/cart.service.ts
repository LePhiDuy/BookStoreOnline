import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

const API = environment.api
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  getCartByUsername(username): Observable<any> {
    return this.http.get<any>(API + 'cart/getCartByUsername?username=' + username);
  }

  updateCartItem(cartId, bookId, amount): Observable<any>{
    return this.http.get<any>(API + 'cart/updateCartItem?cartId=' + cartId + '&bookId=' + bookId + '&amount=' + amount);
  }

  deleteCartItem(cartId, bookId): Observable<any> {
    return this.http.delete<any>(API + 'cart/' + cartId + '/' + bookId);
  }

  addToCart(cartId, bookId, amount): Observable<any> {
    return this.http.get<any>(API + 'cart/addToCart?cartId=' + cartId + '&bookId=' + bookId + '&amount=' + amount);
  }
}
