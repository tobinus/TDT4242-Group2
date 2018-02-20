import { Component, OnInit, Input} from '@angular/core';
import { UserModel } from '../app.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  userModel: UserModel = {
    email: "",
    password: "",
  }
  
  // bool value to display either logout button or login form.
  @Input('isLoggedIn') isLoggedIn: boolean;
  
  login(){
    alert("login");
    // call service object, get observable.
    // this.userservice.login(this.userModel.email, this.userModel.password).then(res => this.handleLoginResult(res));
    
  }
  
  logout(){
    alert("logout");
    // call service object to logout, don't need observable.
    // set global "isloggedin" bool to false from service object.
    // this.userservice.logout();
  }
  
  private handleLoginResult(res){
    if(res === 200){
      // handle successfull login
    }else if( res === 403 || res === 404){
      // handle username or password wrong
    }else{
      // handle system error
    }
  }
}
