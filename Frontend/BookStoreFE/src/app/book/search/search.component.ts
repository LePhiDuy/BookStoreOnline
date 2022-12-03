import { Component, OnInit } from '@angular/core';
import {BookService} from "../../service/book.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  books: any;
  searchValue = "";
  indexPagination = 0;
  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(p => {
      this.searchValue = p.q;
      this.resultSearch();
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
}
