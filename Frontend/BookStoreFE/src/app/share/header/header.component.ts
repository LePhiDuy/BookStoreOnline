import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../service/category.service";
import {Category} from "../../model/category";
import { FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categories: Category[];
  formSearch: FormGroup;

  constructor(private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit(): void {
    this.formSearch = new FormGroup({
      searchValue: new FormControl()
    })
    this.findAll();
  }

  findAll() {
    this.categoryService.findAll().subscribe(
      data => {
        this.categories = data;
      }
    )
  }

  onSearch() {
    this.router.navigateByUrl("/search?q=" + this.formSearch.get('searchValue').value + '&page=0');
  }

}
