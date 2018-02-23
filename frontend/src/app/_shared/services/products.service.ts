import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ProductModel } from "../app.models";

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
@Injectable()
export class ProductsService {

  constructor(
    private http: HttpClient,
  ) { }

  
  
  // ----------- getters -----------
  
  /* getting 1 product based on ID */
  getProduct(id: number): Observable<ProductModel> {
    return this.http.get('/api/product/' + id).map(result => new ProductModel(result));
  }
  
  /* getting all product objects, with no skip or limit */
  getAllProducts(): Observable<ProductModel[]> {
    return this.getProducts('/api/movie');
  }
  
  // limit, skip, searchTerm, sort(ASC/DESC), other attributes
  /* Getting producs based on limit, skip, searchterm, and price sort  */
  searchProducts(limit, skip, searchTerm, sort): Observable<ProductModel[]>{
    let url = '/api/movie?where={"name": {"contains": "' + searchTerm + '"}}' + '&skip=' + skip + '&limit=' + limit + '&sort=' + sort;
    return this.getProducts(url);
  }
  
  
  /* private method to reduce redundansy on getters */
  private getProducts(url: string): Observable<ProductModel[]>{
    return this.http.get(url).map(response => response as ProductModel[])
    
  }
  
  // ----------- posters -----------
  
  /* post a new product to the backend */
  postProduct(name, unitprice, description): Observable<Object> {
    let body = {
      name: name,
      price: unitprice,
      description: description,
    }
    let url = '/api/product';
    return this.http.post(url, body);
    
  }

}
