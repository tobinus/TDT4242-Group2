import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MypageComponent } from './mypage/mypage.component';
import { MaterializeModule } from 'angular2-materialize';

import { UserAuthService } from './_shared/services/user-auth.service';

/**
 * Initialize app and check if a user is logged in
 * @param {UserAuthService} userAuthService
 * @returns {() => Promise<any>}
 */
function init_app(userAuthService: UserAuthService) {
  return () => {
    userAuthService.getCurrentUser().subscribe(next => {});
    return Promise.resolve({});
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    MypageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterializeModule,
    BrowserAnimationsModule,
  ],
  providers: [
    UserAuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [UserAuthService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
