import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  
  constructor() { }

  ngOnInit() {
  }

  @Output()
  nextPageCb = new EventEmitter();
  
  
  addToCart(id){
    // adding item ID to cart
    let cart = (localStorage.getItem("shopping-cart")) ? JSON.parse(localStorage.getItem("shopping-cart")) : ([])
    cart.push(id);
    localStorage.setItem("shopping-cart", JSON.stringify(cart));
    Materialize.toast('Item added to shopping cart', 4000)
  }
}
