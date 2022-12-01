import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../../service/book.service";

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.css']
})
export class BookCategoryComponent implements OnInit {
  books: any;
  categoryId: number;
  indexPagination = 0;
  size = 12;
  constructor(private activatedRoute: ActivatedRoute,
              private bookService: BookService) { }

  ngOnInit(): void {
    this.categoryId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getAll(this.indexPagination, this.size);
  }

  getAll(indexPagination, size) {
    this.books = this.bookService.findByCategory(this.categoryId, indexPagination, this.size).subscribe(
      data => {
        this.books = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  goToPage(pageNumber, size) {
    this.indexPagination = pageNumber;
    this.getAll(this.indexPagination, size);
  }

  goToNextOrPreviousPage(direction, size) {
    this.goToPage(direction === 'forward' ? this.indexPagination + 1 : this.indexPagination - 1, size);
  }

  onChange(event) {
    alert(11111111);
    this.size = event.target.value;
    alert(this.size);
    this.getAll(this.indexPagination, this.size);
  }
}
