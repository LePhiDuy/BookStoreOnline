import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

const API = environment.api;
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getUserFromToken(token: string): Observable<any> {
    return this.http.get<any>(API + 'account/getAccountFromToken?token=' + token);
  }
}
