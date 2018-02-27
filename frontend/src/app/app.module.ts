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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { UserAuthService } from "./_shared/services/user-auth.service";
import { ProductsService } from "./_shared/services/products.service";
import { ProductCreationComponent } from './product-creation/product-creation.component';

import { NotFoundComponent } from './errors/not-found/not-found.component';
import { DealsComponent } from './deals/deals.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductContainerComponent } from './product-container/product-container.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartListComponent } from './shopping-cart-list/shopping-cart-list.component';

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
    MypageComponent,
    NotFoundComponent,
    ProductCreationComponent,
    DealsComponent,
    ProductListComponent,
    ProductContainerComponent,
    ProductFilterComponent,
    ShoppingCartComponent,
    ShoppingCartListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterializeModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
  ],
  providers: [
    UserAuthService,
    ProductsService,
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
