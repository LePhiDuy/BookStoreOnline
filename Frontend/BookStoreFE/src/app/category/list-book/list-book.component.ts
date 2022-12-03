import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../../service/book.service";

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
  constructor(private activatedRoute: ActivatedRoute,
              private bookService: BookService, private router: Router) {
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

}
