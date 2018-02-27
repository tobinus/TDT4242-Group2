import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../_shared/services/products.service';

import { ProductModel } from "../_shared/app.models";

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.css']
})
export class ProductContainerComponent implements OnInit {

  // list of product items loaded in on th frontend
  products = []
  
  // what "page" of the products you are browsing
  product_list_page = 0;
  
  // loading bool so the scrolling can behave
  loading: boolean;
  
  constructor(private prodService: ProductsService,) { }

  ngOnInit() {
    // add products to the products[]
    this.getProducts();
    this.loading = false;
  }
  
  getProducts(): void{
    // get producs from backend based on skip etc.
    // limit, skip, searchTerm, sort
    
    // searchterm and sort is blank for now as they are being implemented in a later story.
    this.prodService.searchProducts(5, this.product_list_page*5, "", "").subscribe(products => {
      this.products = this.products.concat(products);
      this.loading = false;
    });
  }
  
  getNextProducts(): void{
    // add +1 to product_list_page
    if(this.loading){return;}
    
    this.product_list_page += 1;
    this.loading = true;
    this.getProducts();
  }
}
