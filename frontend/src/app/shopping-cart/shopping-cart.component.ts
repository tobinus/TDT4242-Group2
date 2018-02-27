import { Component, OnInit } from '@angular/core';

import { ShoppingCartService } from '../_shared/services/shopping-cart.service';
import { ShoppingCartItem } from '../_shared/app.models';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  items : Array<ShoppingCartItem> = [];

  constructor(private shoppingCart : ShoppingCartService) { }

  ngOnInit() {
    this.shoppingCart.getShoppingCart().subscribe((items : Array<ShoppingCartItem>) => {
      this.items = items;
    })
  }

}
