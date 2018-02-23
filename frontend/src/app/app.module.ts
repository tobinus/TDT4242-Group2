import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MypageComponent } from './mypage/mypage.component';
import { MaterializeModule } from 'angular2-materialize';

import { UserAuthService } from "./_shared/services/user-auth.service";
import { ProductsService } from "./_shared/services/products.service";
import { ProductCreationComponent } from './product-creation/product-creation.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    MypageComponent,
    ProductCreationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterializeModule,
  ],
  providers: [UserAuthService,
             ProductsService
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
