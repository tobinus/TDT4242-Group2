import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_shared/services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [],
})
export class RegisterComponent implements OnInit {

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

  register(){
    this.userAuthService.register(this.userCredentials.email, this.userCredentials.password).subscribe(res => {
      // TODO do automatic login on success?
      console.log(res);
      this.handeRegisterResult(200);
    }, err =>{
      this.handeRegisterResult(err.status);
    });
  }
  
  private handeRegisterResult(res){
    if(res === 200){
      this.router.navigate(['/login']);
    }else{
      alert('error :(')
    }
  }
}
