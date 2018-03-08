import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { DOCUMENT } from "@angular/platform-browser";

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // search for both name and description
  curr_search = "";
  curr_sort = "name ASC";
  curr_price = "";

  @Output()
  search_form = new EventEmitter<object>();


  search_Cb(){

    let search_obj = {
      curr_search: this.curr_search,
      curr_sort: this.curr_sort,
      curr_price: this.curr_price
    }
    this.search_form.emit(search_obj);
  }

}
