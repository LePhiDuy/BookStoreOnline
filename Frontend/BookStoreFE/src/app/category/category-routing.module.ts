import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListBookComponent} from "./list-book/list-book.component";
import {ListCategoryComponent} from "./list-category/list-category.component";

const routes: Routes = [
  {
    path: 'category/:id',
    component: ListBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {

}
