import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../service/category.service";
import {Category} from "../../model/category";
import { FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../service/security/token-storage.service";
import {ShareService} from "../../service/share.service";
import {ToastrService} from "ngx-toastr";
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categories: Category[];
  formSearch: FormGroup;
  username: string;
  role: string;
  isLogin = false;
  totalPrice = 0;
  numberCartItem = 0;

  constructor(private categoryService: CategoryService,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private toastrService: ToastrService,
              private cartService: CartService) {
    this.shareService.getClickEvent().subscribe( () => {
      this.loader();
    })
  }

  ngOnInit(): void {
    this.formSearch = new FormGroup({
      searchValue: new FormControl()
    })
    this.findAll();
    this.loader();
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

  loader() {
    if (this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser().username;
      this.role = this.tokenStorageService.getUser().roles[0].username;
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    if (this.tokenStorageService.isLogin()) {
      return this.cartService.getCartByUsername(this.tokenStorageService.getUser().username).subscribe(
        data => {
          this.totalPrice = 0;
          this.numberCartItem = data.length;
          data.forEach(c => this.totalPrice += (c.book.price * c.amount));
        }
      )
    }
  }

  logOut() {
    this.tokenStorageService.logOut();
    this.ngOnInit();
    this.toastrService.success('Đăng xuất thành công', 'Thông báo', {
      timeOut: 2000,
      extendedTimeOut: 1500,
      progressBar: true
    });
    this.router.navigateByUrl('/home');
  }

}
