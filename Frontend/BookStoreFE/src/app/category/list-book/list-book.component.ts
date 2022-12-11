import {Component, ElementRef, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../../service/book.service";
import {CartService} from "../../service/cart.service";
import {TokenStorageService} from "../../service/security/token-storage.service";
import {ToastrService} from "ngx-toastr";
import {ShareService} from "../../service/share.service";

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {
  books: any;
  categoryId: number;
  indexPagination = 0;
  size = 12;
  sort = 'name';
  start : number;
  end : number;
  id: number;
  bookDetail: any;
  quantity: number;
  numberOfModal: number;
  pointStar: any[];
  noPointStar: any[];
  constructor(private activatedRoute: ActivatedRoute,
              private bookService: BookService,
              private cartService: CartService,
              private tokenStorageService: TokenStorageService,
              private toastrService: ToastrService,
              private shareService: ShareService,
              private el: ElementRef) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.categoryId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
      this.getAll();
    })
  }
  getAll() {
    this.books = this.bookService.findByCategory(this.categoryId, this.indexPagination, this.size, this.sort).subscribe(
      data => {
        this.books = data;
        this.start = this.indexPagination * this.books.size + 1;
        this.end = this.books.size * (this.indexPagination + 1) < this.books.totalElements
                  ? this.books.size * (this.indexPagination + 1)
                  : this.books.totalElements;
      },
      error => {
        console.log(error);
      }
    )
  }

  goToPage(pageNumber) {
    this.indexPagination = pageNumber;
    this.getAll();
  }

  goToNextOrPreviousPage(direction) {
    this.goToPage(direction === 'forward' ? this.indexPagination + 1 : this.indexPagination - 1);
  }

  onChange(event) {
    this.size = event.target.value;
    this.getAll();
  }

  onSort(sort) {
    this.sort = sort;
    this.getAll();
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

  findById(id: any) {
    if (this.numberOfModal==null){
      this.numberOfModal=id;
      this.quantity = 1;
    }
    else if (this.numberOfModal!=id){
      this.quantity = 1;
    }
    this.bookService.findById(id).subscribe(
      data=>{
        this.bookDetail=data;
        this.pointStar = new Array(this.bookDetail.pointStar);
        this.noPointStar = new Array(5 - this.bookDetail.pointStar);
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
}
