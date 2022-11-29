import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../model/book";
import {environment} from "../../environments/environment";

const API = environment.api;
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get<any>(API + "book");
  }

  findById(id): Observable<Book> {
    return this.http.get<Book>(API + "book/" + id);
  }
}
