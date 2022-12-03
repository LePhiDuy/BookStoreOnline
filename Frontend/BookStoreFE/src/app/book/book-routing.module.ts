import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {BookDetailComponent} from "./book-detail/book-detail.component";
import {SearchComponent} from "./search/search.component";

const routes: Routes = [
  {
    path: 'book/:id',
    component: BookDetailComponent
  },
  {
    path: 'search',
    component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
