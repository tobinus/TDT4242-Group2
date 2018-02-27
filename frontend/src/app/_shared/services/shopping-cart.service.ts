import { Injectable } from '@angular/core';

import { ShoppingCartItem, ProductModel } from '../app.models';
import { ShoppingCartComponent } from '../../shopping-cart/shopping-cart.component';
import { Subject } from 'rxjs/Subject';

import { ProductsService } from './products.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ShoppingCartService {
  private cart : Array<ShoppingCartItem>;


  private cartSub : BehaviorSubject<ShoppingCartItem[]>;
  
  //let cart = (localStorage.getItem("shopping-cart")) ? JSON.parse(localStorage.getItem("shopping-cart")) : ([])
  //localStorage.setItem("shopping-cart", JSON.stringify(cart));
  //Materialize.toast('Item added to shopping cart', 4000)


  constructor(private prodService: ProductsService) {
    try{
      this.cart = (localStorage.getItem("shopping-cart") ? JSON.parse(localStorage.getItem("shopping-cart")) : []).map((data) => {
        if("prodId" in data && "qty" in data){
          return new ShoppingCartItem((id : number) => {
            return prodService.getProduct(id);
          }, data.prodId, data.qty);
        }
      }).filer((e) => e != null);
      
    } catch {
      // Loading shopping cart failed
      this.cart = [];
    }
    this.cartSub = new BehaviorSubject(this.cart.slice());
    this.updateAndNotify();  
  }

  private findItem(id: number){
    return this.cart.filter((e) => e.productId == id)[0];
  }


  public addItem(productId : number, qty : number = 1){
    let item = this.findItem(productId);
    if(!item){
      item = new ShoppingCartItem((id : number) => {
        return this.prodService.getProduct(id);
      }, productId, qty);
      this.cart.push(item);
    } else {
      item.quantity += qty;
    }
    this.updateAndNotify();
  }

  public removeItem(productId : number){
    this.cart = this.cart.filter((e) => e.productId != productId);
    this.cartSub.next(this.cart.slice());
  }

  public updateItem(newItem : ShoppingCartItem){
    let item = this.findItem(newItem.productId);
    if(item){
      item.quantity = newItem.quantity;
    }
    this.updateAndNotify();
  }

  public getShoppingCart() : Observable<Array<ShoppingCartItem>>{
    return this.cartSub;
  }

  private updateAndNotify(){
    this.cartSub.next(this.cart.slice());
    localStorage.setItem("shopping-cart", JSON.stringify(this.cart.map((e) => {
      return {prodId: e.productId, qty: e.quantity};
    })));
  }

}
