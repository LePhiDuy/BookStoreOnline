import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookCategoryComponent } from './book-category/book-category.component';


@NgModule({
  declarations: [BookComponent, BookDetailComponent, BookCategoryComponent],
  imports: [
    CommonModule,
    BookRoutingModule
  ]
})
export class BookModule { }
