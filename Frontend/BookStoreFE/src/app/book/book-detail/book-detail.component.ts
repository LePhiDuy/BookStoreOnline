import {Component, ElementRef, OnInit} from '@angular/core';
import {BookService} from "../../service/book.service";
import {Book} from "../../model/book";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book;
  id: number;
  numberRating: any[];
  numberNotRating: any[];
  books: any;
  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute,
              private el: ElementRef) { }

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    this.bookService.findById(this.id).subscribe(
      data => {
        this.book = data;
        this.numberRating = new Array(this.book.numberRating);
        this.numberNotRating = new Array(5 - this.book.numberRating);
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

}
