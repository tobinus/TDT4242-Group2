import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ShoppingCartItem, ProductModel } from '../_shared/app.models';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.css']
})
export class ShoppingCartListComponent implements OnChanges {

  @Input("items")
  private cartList : Array<ShoppingCartItem> = [];
  private products : Map<number, ProductModel> = new Map<number, ProductModel>();
  
  @Output("onItemChange")
  private itemQtyEmitter = new EventEmitter<ShoppingCartItem>();

  @Output("onItemDelete")
  private itemDelEmitter = new EventEmitter<ShoppingCartItem>(); 


  constructor() { }

  ngOnChanges() {
    for(let item of this.cartList){
      if(!(item.productId in this.products)){
        item.product.subscribe((product : ProductModel) => {
          this.products[item.productId] = product;
        })
      }
    }
  }

  private updateQty(item : ShoppingCartItem,diff : number){
    item.quantity += diff;
    this.itemQtyEmitter.emit(item);
  }

  private deleteItem(item : ShoppingCartItem){
    this.itemDelEmitter.emit(item);
  }

  private productLoaded(item : ShoppingCartItem){
    return item.productId in this.products;
  }

  private product(item : ShoppingCartItem){
    return this.products[item.productId];
  }
}
