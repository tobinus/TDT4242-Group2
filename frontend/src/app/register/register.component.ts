import { Component, OnInit } from '@angular/core';
import { UserAuthService } from "../_shared/services/user-auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [],
})
export class RegisterComponent implements OnInit {

  constructor(
    private userAuthService: UserAuthService,
  ) { }

  ngOnInit() {
  }

  userCredentials = {
    email: "",
    password: "",
  };

  register(){
    this.userAuthService.register(this.userCredentials.email, this.userCredentials.password).subscribe(res => {
      // TODO do automatic login on success?
      console.log(res);
    });
  }
}
