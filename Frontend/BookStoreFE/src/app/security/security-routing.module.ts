import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecurityComponent } from './security.component';
import {AuthenticationComponent} from "./authentication/authentication.component";

const routes: Routes = [
  { path: 'authentication', component: AuthenticationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
