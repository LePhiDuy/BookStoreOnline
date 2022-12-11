import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/security/auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../service/security/token-storage.service";
import {AccountService} from "../../service/account.service";
import {ToastrService} from "ngx-toastr";
import {ShareService} from "../../service/share.service";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  formLogin: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private accountService: AccountService,
              private toastrService: ToastrService,
              private shareService: ShareService) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: []
    })
  }

  login(): void {
    if (this.formLogin.valid) {
      this.authService.login(this.formLogin.value).subscribe(
        dataLogin => {
          this.tokenStorageService.saveTokenSession(dataLogin.accessToken);
          this.accountService.getUserFromToken(dataLogin.accessToken).subscribe(
            data => {
              this.tokenStorageService.saveUserSession(data);
              this.tokenStorageService.saveCartIdSession(dataLogin.cartId);
              this.tokenStorageService.saveLogin();
              this.formLogin.reset();
              this.shareService.sendClickEvent();
              this.toastrService.success('', 'Đăng nhập thành công', {
                timeOut: 2000,
                extendedTimeOut: 1500,
                progressBar: true
              })
              this.router.navigateByUrl('/home');
            }
          );
        },
        err => {
          this.authService.isLoggedIn = false;
          alert("Lỗi");
          this.toastrService.error('Tên đăng nhập hoặc tài khoản không đúng', 'Đăng nhập thất bại: ', {
            timeOut: 2000,
            extendedTimeOut: 1500,
            progressBar: true
          });
        }
      );
    }
  }
  get username() {
    return this.formLogin.get('username');
  }

  get password() {
    return this.formLogin.get('password');
  }
}
