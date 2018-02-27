import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.css']
})
export class ProductContainerComponent implements OnInit {

  products = []
  product_list_page = 0;
  
  constructor() { }

  ngOnInit() {
    // add products to the products[]
  }
  
  getProducts(): void{
    // initial call to get products from service
  }
  
  getNextProducts(): void{
    // add +1 to product_list_page
  }
}
