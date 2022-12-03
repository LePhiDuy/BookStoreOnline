import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [BookComponent, BookDetailComponent, SearchComponent],
  imports: [
    CommonModule,
    BookRoutingModule
  ]
})
export class BookModule { }
