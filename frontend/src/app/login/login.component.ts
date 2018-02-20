import { Component, OnInit, Input} from '@angular/core';
import { UserModel } from '../app.models';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserAuthService],
})
export class LoginComponent implements OnInit {

  constructor(
    private userAuthService: UserAuthService,
  ) { }

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
    this.userAuthService.login(this.userModel.email, this.userModel.password).subscribe(res => {
      console.log(res);
    });
    
  }
  
  logout(){
    alert("logout");
    this.userAuthService.logout().subscribe(res => {
      console.log(res);
    });
    // call service object to logout, don't need observable.
    // set global "isloggedin" bool to false from service object.
    // this.userservice.logout();
  }
  
  currentUser(){
    this.userAuthService.getCurrentUser().subscribe(res => {
      console.log(res);
    });
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
