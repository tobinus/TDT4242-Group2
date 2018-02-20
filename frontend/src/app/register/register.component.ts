import { Component, OnInit } from '@angular/core';
import { UserModel } from '../app.models';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserAuthService],
})
export class RegisterComponent implements OnInit {

  constructor(
    private userAuthService: UserAuthService,
  ) { }

  ngOnInit() {
  }

  userModel: UserModel = {
    email: "",
    password: "",
  }
  
  register(){
    this.userAuthService.register(this.userModel.email, this.userModel.password).subscribe(res => {
      console.log(res);
    });
  }
}
