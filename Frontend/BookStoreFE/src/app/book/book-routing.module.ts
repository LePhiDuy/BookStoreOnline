import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {BookDetailComponent} from "./book-detail/book-detail.component";
import {BookCategoryComponent} from "./book-category/book-category.component";

const routes: Routes = [
  {
    path: 'book/:id',
    component: BookDetailComponent
  },
  {
    path: 'book/category/:id',
    component: BookCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
