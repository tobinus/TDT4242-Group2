import { Component, OnInit, Input} from '@angular/core';

import { ProductsService } from '../_shared/services/products.service';
import { ProductModel } from "../_shared/app.models";

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.css']
})
export class ProductCreationComponent implements OnInit {

  constructor(private prodService: ProductsService,) { }

  
  prodCredentials: object;
  
  loading: boolean;
  
  ngOnInit() {
    this.loading = false;
    /*this.prodCredentials= {
      id: -1,
      name: "",
      price: 0,
      description: "",
      manufacturer: ""
    }*/
  }

  /*
    id: number;
  name: string;
  price: number;
  description: string;
  manufacturer: string;
  price_mod: number;
  package_get_count: number;
  package_pay_count: number;
  on_sale: string;
  stock_count: number;
  stock_resupply_date: Date; */
  createProduct(){
    this.loading = true;
    // call product service to create a product
    //name, unitprice, description
    this.prodService.postProduct(this.prodCredentials).subscribe(res => {
      console.log(res);
      this.loading = false;
    }, err => {
      this.loading = false;
      console.log("error");
      console.log(err);
    });
    
    
    // after observable object has done it's job, and it's confirmed that the product has been created in the backend, set this.loading to false and give the admin some "it has been made" message or something
  }
  
  
}
