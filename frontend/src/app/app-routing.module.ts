import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router"

import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {ProductCreationComponent} from "./product-creation/product-creation.component";

const appRoutes: Routes = [
  {
    path: "newProduct",
    component: ProductCreationComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
