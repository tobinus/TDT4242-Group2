import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ProductModel } from "../app.models";

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';


class ProductCacheItem{
  public lastUpdate : Date = new Date();
  public life : number = 30;
  constructor(public product : ProductModel){}
}

@Injectable()
export class ProductsService {

  private productCache : Map<number, {}> = new Map<number, {}>();

  constructor(
    private http: HttpClient,
  ) { }

  
  
  // ----------- getters -----------
  
  /* getting 1 product based on ID */
  getProduct(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>('/api/product/' + id);
  }
  
  /* getting all product objects, with no skip or limit */
  getAllProducts(): Observable<ProductModel[]> {
    return this.getProducts('/api/product');
  }
  
  // limit, skip, searchTerm, sort(ASC/DESC), other attributes
  /* Getting producs based on limit, skip, searchterm, and price sort  */
  searchProducts(limit, skip, searchTerm, sort): Observable<ProductModel[]>{
    let url = '/api/product?where={"name": {"contains": "' + searchTerm + '"}}' + '&skip=' + skip + '&limit=' + limit + '&sort=' + sort;
    return this.getProducts(url);
  }
  
  
  /* private method to reduce redundansy on getters */
  private getProducts(url: string): Observable<ProductModel[]>{
    return this.http.get<ProductModel[]>(url)
    
  }

  private updateProductCache(product : ProductModel){
    let now = new Date();
  }

  
  // ----------- posters -----------
  
  /* post a new product to the backend */
  postProduct(product: ProductModel): Observable<Object> {
    let url = '/api/product';
    return this.http.post(url, product);
    
  }

}
