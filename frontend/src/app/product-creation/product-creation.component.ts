import { Component, OnInit, Input} from '@angular/core';

import { ProductsService } from '../_shared/services/products.service';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.css']
})
export class ProductCreationComponent implements OnInit {

  constructor(private prodService: ProductsService,) { }


  
  prodCredentials = {
    name: "",
    unitPrice: 0,
    description: "",
  }
  
  loading: boolean;
  
  ngOnInit() {
    this.loading = false;
  }
  createProduct(){
    this.loading = true;
    // call product service to create a product
    //name, unitprice, description
    this.prodService.postProduct(this.prodCredentials.name, this.prodCredentials.unitPrice, this.prodCredentials.description).subscribe(res => {
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
