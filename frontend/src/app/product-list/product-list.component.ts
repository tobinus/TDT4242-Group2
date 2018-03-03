import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  @Output()
  nextPageCb = new EventEmitter();

  constructor(private shoppingCart : ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart(id){
    // adding item ID to cart
    this.shoppingCart.addItem(id);
  }
}
