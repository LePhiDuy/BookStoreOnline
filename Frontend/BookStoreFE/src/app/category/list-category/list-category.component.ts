import { Component, OnInit } from '@angular/core';
import {Category} from "../../model/category";
import {CategoryService} from "../../service/category.service";
import {Slick} from "ngx-slickjs";

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  categories: Category[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.categoryService.findAll().subscribe(
      data => {
        this.categories = data;
      }
    )
  }

  config: Slick.Config={
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: true,
    dots: true,
    speed: 2000,
    autoplaySpeed: 1000,
    autoplay: true,
    arrows: true,
    prevArrow: '<span class="slider-icon-1-prev"><i class="icon-arrow-left"></i></span>',
    nextArrow: '<span class="slider-icon-1-next"><i class="icon-arrow-right"></i></span>',
  };

}
