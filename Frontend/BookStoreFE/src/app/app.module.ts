import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ShareModule} from "./share/share.module";
import {HomepageModule} from "./homepage/homepage.module";
import {NgxSlickJsModule} from "ngx-slickjs";
import {BookModule} from "./book/book.module";
import {CategoryModule} from "./category/category.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SecurityModule} from "./security/security.module";
import {ToastrModule} from "ngx-toastr";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptor} from "./helper/jwt-interceptor";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShareModule,
    HomepageModule,
    BookModule,
    CategoryModule,
    SecurityModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSlickJsModule.forRoot({
      links: {
        jquery: 'https://code.jquery.com/jquery-3.4.0.min.js',
        slickJs: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js',
        slickCss: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css',
        slickThemeCss: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css'
      }
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
