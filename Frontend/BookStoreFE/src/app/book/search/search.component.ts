import {Component, ElementRef, OnInit} from '@angular/core';
import {BookService} from "../../service/book.service";
import {ActivatedRoute} from "@angular/router";
import {TokenStorageService} from "../../service/security/token-storage.service";
import {CartService} from "../../service/cart.service";
import {ShareService} from "../../service/share.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  books: any;
  searchValue = "";
  indexPagination = 0;
  id: number;
  bookDetail: any;
  quantity: number;
  numberOfModal: number;
  pointStar: any[];
  noPointStar: any[];
  start : number;
  end : number;
  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private cartService: CartService,
              private shareService: ShareService,
              private toastrService: ToastrService,
              private el: ElementRef) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(p => {
      this.searchValue = p.q;
      this.resultSearch();
      this.start = this.indexPagination * this.books.size + 1;
      this.end = this.books.size * (this.indexPagination + 1) < this.books.totalElements
        ? this.books.size * (this.indexPagination + 1)
        : this.books.totalElements;
    })
  }

  resultSearch() {
    this.bookService.search(this.searchValue, this.indexPagination).subscribe(
      data => {
        this.books = data;
      }
    )
  }

  goToPage(pageNumber) {
    this.indexPagination = pageNumber;
    this.resultSearch();
  }

  goToNextOrPreviousPage(direction) {
    this.goToPage(direction === 'forward' ? this.indexPagination + 1 : this.indexPagination - 1);
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
        console.log(this.bookDetail);
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
