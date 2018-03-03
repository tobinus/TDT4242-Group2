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

  /**
   *  getting 1 product based on ID
   */
  getProduct(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>('/api/product/' + id);
  }

  /**
   * getting all product objects, with no skip or limit
   * @deprecated Use searchProducts
   */
  getAllProducts(): Observable<ProductModel[]> {
    return this.getProducts('/api/product');
  }

  /**
   * Get products based on filters
   * All parameters are optional
   *
   * @param {number} [limit=20]
   * @param {number} [skip=0]
   * @param {string} [searchTerm='']
   * @param {string} [sort='']        - Add ' ASC'/' DESC'
   * @returns {Observable<ProductModel[]>}
   */
  searchProducts(limit = 20, skip = 0, searchTerm = '', sort = ''): Observable<ProductModel[]>{
    let where = {
      or: [
        { name: {contains: searchTerm} },
        { description: {contains: searchTerm} },
      ],
      listed: true, // We only want products that are still buyable
    };
    // let url = '/api/product?where={"name": {"contains": "' + searchTerm + '"}}' +
    //   '&skip=' + skip + '&limit=' + limit + '&sort=' + sort;
    let url = `/api/product?where=${JSON.stringify(where)}&skip=${skip}&limit=${limit}&sort=${sort}`;
    return this.getProducts(url);
  }

  /**
   * private method to reduce redundancy on getters
   */
  private getProducts(url: string): Observable<ProductModel[]>{
    return this.http.get<ProductModel[]>(url)
  }

  // ----------- posters -----------

  /**
   *  post a new product to the backend
   */
  postProduct(product): Observable<Object> {
    let url = '/api/product';
    return this.http.post(url, product);

  }

}
