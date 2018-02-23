import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.css']
})
export class ProductCreationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  prodCredentials = {
    name: "",
    unitPrice: 0,
    description: "",
  }
}
