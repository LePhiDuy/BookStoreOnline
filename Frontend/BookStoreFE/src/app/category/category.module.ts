import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import {NgxSlickJsModule} from "ngx-slickjs";
import { ListBookComponent } from './list-book/list-book.component';


@NgModule({
    declarations: [CategoryComponent, ListCategoryComponent, ListBookComponent],
    exports: [
        ListCategoryComponent
    ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    NgxSlickJsModule
  ]
})
export class CategoryModule { }
