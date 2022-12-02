import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import {NgxSlickJsModule} from "ngx-slickjs";


@NgModule({
    declarations: [CategoryComponent, ListCategoryComponent],
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
