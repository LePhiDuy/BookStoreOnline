import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import {HttpClientModule} from "@angular/common/http";
import {NgxSlickJsModule} from "ngx-slickjs";
import {CategoryModule} from "../category/category.module";


@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    HttpClientModule,
    NgxSlickJsModule,
    CategoryModule
  ]
})
export class HomepageModule { }
