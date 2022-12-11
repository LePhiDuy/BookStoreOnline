import {Component, ElementRef, OnInit} from '@angular/core';
import {BookService} from "../../service/book.service";
import {Book} from "../../model/book";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../service/cart.service";
import {TokenStorageService} from "../../service/security/token-storage.service";
import {ToastrService} from "ngx-toastr";
import {ShareService} from "../../service/share.service";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book;
  id: number;
  pointStar: any[];
  noPointStar: any[];
  books: any;
  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute,
              private el: ElementRef,
              private cartService: CartService,
              private tokenStorageService: TokenStorageService,
              private toastrService: ToastrService,
              private shareService: ShareService) { }

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    this.bookService.findById(this.id).subscribe(
      data => {
        this.book = data;
        this.pointStar = new Array(this.book.pointStar);
        this.noPointStar = new Array(5 - this.book.pointStar);
        this.findByAuthor(this.book.author);
      },
      error => {
        console.log(error);
      }
    )
  }

  findByAuthor(author) {
    this.bookService.findByAuthor(author).subscribe(
      data => {
        this.books = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  subQuantity() {
    const inputQuantity = this.el.nativeElement.querySelector('.cart-plus-minus-box');
    if (inputQuantity.value > 1) {
      inputQuantity.value--;
    }
  }

  addQuantity() {
    const inputQuantity = this.el.nativeElement.querySelector('.cart-plus-minus-box');
    inputQuantity.value++;
  }

  addToCart(bookId, amount) {
    if (this.tokenStorageService.isLogin()) {
      const cartId = this.tokenStorageService.getCartId();
      this.cartService.addToCart(cartId, bookId, amount).subscribe(
        data => {
          this.toastrService.success(data.message, 'Thông báo');
          this.shareService.sendClickEvent();
        }, error => {
          this.toastrService.warning(error.error.message, 'Thông báo');
        }
      )
    }
  }
}
