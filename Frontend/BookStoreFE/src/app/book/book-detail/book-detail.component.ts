import { Component, OnInit } from '@angular/core';
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
  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    this.bookService.findById(this.id).subscribe(
      data => {
        this.book = data;
        this.numberRating = new Array(this.book.numberRating);
        this.numberNotRating = new Array(5 - this.book.numberRating);
      },
      error => {
        console.log(error);
      }
    )
  }

}
