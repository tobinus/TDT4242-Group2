import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { ProductsService } from '../_shared/services/products.service';
import { ProductModel } from "../_shared/app.models";

declare let Materialize; // Webstorm doesn't recognize Materialize global

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.css']
})
export class ProductCreationComponent implements OnInit {

  private loading: boolean = false;
  private product: ProductModel;
  private percent_sale: number;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    let productObs: Observable<ProductModel> = this.activatedRoute.paramMap.switchMap(
      (params: ParamMap) => {
        if (params.has('productId')) {
          this.loading = true;
          return this.productsService.getProduct(params.get('productId'));
        } else {
          // Not edit so create new
          this.product = <ProductModel>{};
        }
      });

    productObs.subscribe(product => {
      // Product loaded
      this.product = product;
      this.loading = false;
      this.setPercentSale();
      setTimeout(() => Materialize.updateTextFields(), 5); // Fix to not have labels on top of input text
    }, error => {
      if (error.status) alert('An error occurred loading the product details: ' + error.status);
      // else console.log(error);
    });
  }

  private saveProduct() {
    this.loading = true;
    // Call product service to create a new or update existing product
    this.productsService.postOrUpdateProduct(this.product).subscribe(result => {
      this.loading = false;
      this.router.navigate(['/product', result.id]);
    }, error => {
      this.loading = false;
      if (error.status) alert('An error occurred saving the product: ' + error.status);
      console.log(error);
    });
  }

  private setPriceMod(percent_value: number) {
    this.product.price_mod = 1 - percent_value / 100;
  }
  private setPercentSale() {
    this.percent_sale = (1 - this.product.price_mod) * 100;
  }

}
