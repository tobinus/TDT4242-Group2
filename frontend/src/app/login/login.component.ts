import { Component, OnInit, Input} from '@angular/core';
import { UserAuthService } from '../_shared/services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [],
})
export class LoginComponent implements OnInit {

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  userCredentials = {
    email: "",
    password: "",
  };

  // bool value to display either logout button or login form.
  @Input('isLoggedIn') isLoggedIn: boolean;

  login(){
    // call service object, get observable.
    this.userAuthService.login(this.userCredentials.email, this.userCredentials.password).subscribe(res => {
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


  private handleLoginResult(res){
    if(res === 200){
      this.router.navigate(['/mypage'])
    }else if(res === 401){
      // handle username or password wrong
      alert("username or password wrong");
    }else{
      // handle system error
      alert("system is broken :(");
    }
  }
}
