import { Observable } from "rxjs/Observable";

/**
 * User details
 */
class UserModel{

  id: number;
  email: string;
  isAdmin: boolean;

  constructor(user) {
    if (user.hasOwnProperty('id') && user.hasOwnProperty('email') && user.hasOwnProperty('isAdmin')) {
      this.id = user.id;
      this.email = user.email;
      this.isAdmin = user.isAdmin;
    } else {
      throw new Error('Not a valid user object');
    }
  }
}

/**
 * Product details
 */
interface ProductModel{
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
  stock_resupply_date: Date;
}

/**
 * An item in the shopping cart
 */
class ShoppingCartItem{

  private _prodId: number;
  private _qty: number;
  private _productResolver: Function;

  constructor(productResolver: Function, productId: number, qty :number = 1){
    this._prodId = productId;
    this._qty = qty;
    this._productResolver = productResolver;
  }

  public get productId() : number{
    return this._prodId;
  }

  public get product() : Observable<ProductModel>{
    return this._productResolver(this._prodId);
  }

  public get quantity(){
    return this._qty;
  }

  public set quantity(qty: number){
    this._qty = qty;
  }
}

interface SearchForm {
  curr_search: string,
  curr_price: number,
  curr_sort: string,
}

export {UserModel, ProductModel, ShoppingCartItem, SearchForm}
