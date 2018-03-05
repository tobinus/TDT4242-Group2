import { Component, OnInit } from '@angular/core';

import { ProductModel } from "../_shared/app.models";
import { ProductsService } from "../_shared/services/products.service";

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {

  saleProducts: ProductModel[];
  // TODO pagination

  constructor(
    private productsService: ProductsService,
  ) { }

  ngOnInit() {
    this.productsService.getSaleProducts().subscribe((response) => {
      this.saleProducts = response;
    });
  }

}
