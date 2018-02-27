
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

class ProductModel{
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
  
  constructor(product){
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.description = product.description;
    this.manufacturer = product.manufacturer;
    this.price_mod = product.price_mod;
    this.package_get_count = product.package_get_count;
    this.package_pay_count = product.package_pay_count;
    this.on_sale = product.on_sale;
    this.stock_count = product.stock_count;
    this.stock_resupply_date = product.stock_resupply_date;
  }
  
}

export {UserModel, ProductModel}
