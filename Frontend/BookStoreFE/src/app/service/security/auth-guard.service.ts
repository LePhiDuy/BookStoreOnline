import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";
import { TokenStorageService } from './token-storage.service';
import {ShareService} from "../share.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth: AuthService,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private shareService: ShareService) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.shareService.sendClickEvent();
      this.tokenStorageService.logOut();
      this.router.navigateByUrl('/authentication');
      return false;
    }
    return true;
  }
}
