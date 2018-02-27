
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

export {UserModel}
