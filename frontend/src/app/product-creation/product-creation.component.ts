import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.css']
})
export class ProductCreationComponent implements OnInit {

  constructor() { }


  
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
    
    // after observable object has done it's job, and it's confirmed that the product has been created in the backend, set this.loading to false and give the admin some "it has been made" message or something
  }
  
  
}
