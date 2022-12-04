import { Injectable } from '@angular/core';
import {TokenStorageService} from "./token-storage.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

const API = environment.api
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions: any;
  isLoggedIn: boolean;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  login(loginRequest): Observable<any> {
    return this.http.post(API + 'auth/login', {
      username: loginRequest.username,
      password: loginRequest.password
    }, this.httpOptions);
  }
}
