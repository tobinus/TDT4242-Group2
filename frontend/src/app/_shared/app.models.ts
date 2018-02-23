
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
  
  constructor(product){
    if(product.hasOwnProperty('id') && product.hasOwnProperty('name') && product.hasOwnProperty('price') && product.hasOwnProperty('description')){
      this.id = product.id;
      this.name = product.name;
      this.price = product.price;
      this.description = product.description;
    }
  }
  
}

export {UserModel, ProductModel}
