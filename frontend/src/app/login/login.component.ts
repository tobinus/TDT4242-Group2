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
    // call service object, get observable.
    this.userAuthService.login(this.userModel.email, this.userModel.password).subscribe(res => {
      // successfull login
      console.log(res);
      this.handleLoginResult(200);
    }, err =>{
      // error
      console.log(err.status);
      this.handleLoginResult(err.status);
    });
    
  }
  
  logout(){
    this.userAuthService.logout().subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err)
    });
  }
  
  currentUser(){
    this.userAuthService.getCurrentUser().subscribe(res => {
      console.log(res);
    });
  }
  
  private handleLoginResult(res){
    if(res === 200){
      // handle successfull login
      alert("logged in");
    }else if( res === 403 || res === 404){
      // handle username or password wrong
      alert("username or password wrong");
    }else{
      // handle system error
      alert("system is broken :(");
    }
  }
}
