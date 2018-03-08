import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../_shared/services/products.service';
import { ProductModel, SearchForm} from "../_shared/app.models";

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.css']
})
export class ProductContainerComponent implements OnInit {

  // list of product items loaded in on th frontend
  private products: ProductModel[] = [];

  // what "page" of the products you are browsing
  private product_list_page = 0;
  private product_list_limit = 10;

  // loading bool so the scrolling can behave
  private loading: boolean;

  // vars to handle getProducts
  private searchTerm = "";
  private sort = "name ASC";
  private minPrice = 0;

  constructor(private prodService: ProductsService,) { }

  ngOnInit() {
    // add products to the products[]
    this.loading = true;
    this.getProducts();
  }

  /**
   * get products from backend
   */
  getProducts(): void{
    this.prodService.searchProducts(
      this.product_list_limit,
      this.product_list_page * this.product_list_limit,
      this.searchTerm,
      this.sort,
      this.minPrice
    ).subscribe(products => {
      this.products = products;
      this.loading = false;
    });
  }

  /**
   * Get next 'page' of products
   */
  getNextProducts(): void{
    if(this.loading){return;}
    // add +1 to product_list_page
    this.product_list_page += 1;
    this.loading = true;
    this.prodService.searchProducts(
      this.product_list_limit,
      this.product_list_page * this.product_list_limit,
      this.searchTerm,
      this.sort,
      this.minPrice
    ).subscribe(products => {
      this.products = this.products.concat(products);
      this.loading = false;
    });
  }

  /**
   * gets the search form obj from the product-filter component
   */
  updateSearch(searchform: SearchForm): void {
    this.loading = true;
    this.product_list_page = 0;
    this.searchTerm = searchform.curr_search;
    this.sort = searchform.curr_sort;
    this.minPrice = searchform.curr_price;
    this.getProducts();
  }

}
