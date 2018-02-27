import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input()
  productList = [];
  constructor() { }

  ngOnInit() {
  }

  @Output()
  nextPageCb = new EventEmitter();
  
  
  addToCart(){
    // add item to cart
    alert("add item to cart");
  }
}
