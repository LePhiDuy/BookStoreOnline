import { Component, OnInit } from '@angular/core';
import {BookService} from "../service/book.service";
import {Slick} from "ngx-slickjs";
import {Book} from "../model/book";

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
  bookDetail: Book;
  constructor(private bookService: BookService) { }

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

  changeBook(id) {
    this.bookService.findById(id).subscribe(
      data => {
        this.bookDetail = data;
        console.log(this.bookDetail);
      },
      error => {
        console.log(error);
      }
    )
  }
}
