import {Component, ElementRef, OnInit} from '@angular/core';
import {CartService} from "../service/cart.service";
import {TokenStorageService} from "../service/security/token-storage.service";
import {AuthService} from "../service/security/auth.service";
import {ToastrService} from "ngx-toastr";
import {CartItem} from "../model/cart-item";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice = 0;
  cartItem: CartItem;

  constructor(private cartService: CartService,
              private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private el: ElementRef,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getCartByUsername();
  }

  getCartByUsername() {
    if (this.tokenStorageService.isLogin()) {
      return this.cartService.getCartByUsername(this.tokenStorageService.getUser().username).subscribe(
        data => {
          this.cartItems = data;
          this.calcTotalPrice();
        }
      )
    }
  }

  subQuantity(cartId: number, bookId: number) {
    const inputQuantity = this.el.nativeElement.querySelector('#inputQuantity' + cartId + bookId);
    if (this.tokenStorageService.isLogin()) {
      if (Number(inputQuantity.value) > 1) {
        this.cartService.updateCartItem(cartId, bookId, Number(inputQuantity.value) - 1).subscribe(
          data => {
            inputQuantity.value--;
            this.getCartByUsername();
          }, error => {
            this.toastrService.warning(error.error.message, 'Thông báo');
          }
        )
      }
    }
  }

  addQuantity(cartId: number, bookId: number) {
    const inputQuantity = this.el.nativeElement.querySelector('#inputQuantity' + cartId + bookId);
    if (this.tokenStorageService.isLogin()) {
      this.cartService.updateCartItem(cartId, bookId, Number(inputQuantity.value) + 1).subscribe(
        data => {
          inputQuantity.value++;
          this.getCartByUsername();
        }, error => {
          this.toastrService.warning(error.error.message, 'Thông báo');
        }
      )
    }
  }

  changeQuantity(cartId: number, bookId: number, i: number) {
    const inputQuantity = this.el.nativeElement.querySelector('#inputQuantity' + cartId + bookId);
    if (this.tokenStorageService.isLogin()) {
      if (Number(inputQuantity.value) > 1) {
        this.cartService.updateCartItem(cartId, bookId, Number(inputQuantity.value)).subscribe(
          data => {
            this.getCartByUsername();
          }, error => {
            this.toastrService.warning(error.error.message, 'Thông báo');
            this.getCartByUsername();
          }
        )
      } else {
        this.getCartByUsername();
      }
    }
  }

  deleteCartItem(cartId: number, bookId: number) {
    this.cartService.deleteCartItem(cartId, bookId).subscribe(
      data => {
        this.toastrService.success(data.message, 'Thông báo');
        this.getCartByUsername();
      }, error => {
        this.toastrService.warning(error.error.message, 'Thông báo');
        this.getCartByUsername();
      }
    )
  }

  calcTotalPrice() {
      this.totalPrice = 0;
      this.cartItems.forEach(c => this.totalPrice += (c.book.price * c.amount));
  }
}
