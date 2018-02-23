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
import { ProductCreationComponent } from './product-creation/product-creation.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
<<<<<<< HEAD
    MypageComponent,
    ProductCreationComponent,
=======
    ProductCreationComponent
>>>>>>> 0d28fa820c684d59c965d97d0de183f57003cd17
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
<<<<<<< HEAD
    HttpClientModule,
    MaterializeModule,
=======
>>>>>>> 0d28fa820c684d59c965d97d0de183f57003cd17
  ],
  providers: [UserAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
