import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Materialize from "materialize-css";

import { ShoppingCartService } from '../_shared/services/shopping-cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input()
  productList = [];
  @Input()
  loading: boolean;
  
  constructor(private shoppingCart : ShoppingCartService) { }

  ngOnInit() {
  }

  @Output()
  nextPageCb = new EventEmitter();
  
  addToCart(id){
    this.shoppingCart.addItem(id);
    // adding item ID to cart

  }
}
