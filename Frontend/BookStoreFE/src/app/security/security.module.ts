import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";


@NgModule({
  declarations: [SecurityComponent, AuthenticationComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ]
})
export class SecurityModule { }
