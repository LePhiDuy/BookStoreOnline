import {Component, ElementRef, OnInit} from '@angular/core';
import {BookService} from "../service/book.service";
import {Slick} from "ngx-slickjs";
import {Book} from "../model/book";
import {CartService} from "../service/cart.service";
import {TokenStorageService} from "../service/security/token-storage.service";
import {ToastrService} from "ngx-toastr";
import {ShareService} from "../service/share.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  images = ["https://cdn0.fahasa.com/media/magentothem/banner7/HoaCuQuy4_banner_840x320_T11.jpg",
                  "https://cdn0.fahasa.com/media/magentothem/banner7/FAHASA_potico_840x320.png",
                  "https://cdn0.fahasa.com/media/magentothem/banner7/VPP_Main_banner_T10_840x320.jpg"];
  config: Slick.Config={
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    dots: true,
    speed: 2000,
    autoplaySpeed: 1000,
    autoplay: true,
    arrows: true,
    prevArrow: '<span class="slider-icon-1-prev"><i class="icon-arrow-left"></i></span>',
    nextArrow: '<span class="slider-icon-1-next"><i class="icon-arrow-right"></i></span>',
  };
  config1: Slick.Config = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: '<button type=\'button\' class=\'prevArrow\'><i class=\'ti-arrow-left\'></i></button>',
    nextArrow: '<button type=\'button\' class=\'nextArrow\'><i class=\'ti-arrow-right\'></i></button>',
    dots: false,
    arrows: false,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]}

  books: Array<Book>;
  id: number;
  bookDetail: any;
  quantity: number;
  numberOfModal: number;
  pointStar: any[];
  noPointStar: any[];

  constructor(private bookService: BookService,
              private cartService: CartService,
              private tokenStorageService: TokenStorageService,
              private toastrService: ToastrService,
              private el: ElementRef,
              private shareService: ShareService) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.bookService.findAll().subscribe(
      data=> {
        this.books = data.content;
      },
      error => {
        console.log(error);
      }
    )
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
