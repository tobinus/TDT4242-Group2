import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserAuthService } from '../_shared/services/user-auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { UserModel } from '../_shared/app.models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [],
})
export class RegisterComponent implements OnInit, OnDestroy {

  private user: UserModel = null;
  private userAuthEventsSub: Subscription;
  private userCredentials = {
    email: "",
    password: "",
  };

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    // Subscribe to login and logout user auth events
    this.userAuthEventsSub = this.userAuthService.getUserAuthEvents().subscribe(
      user => {
        this.user = user;
      }
    );
  }

  ngOnDestroy() {
    // Un-subscribe from login and logout user auth events to avoid mem leaks
    this.userAuthEventsSub.unsubscribe();
  }

  /**
   * Run when user presses register button
   */
  register(){
    this.userAuthService.register(this.userCredentials.email, this.userCredentials.password).subscribe(res => {
      this.handleRegisterResult(201);
    }, err =>{
      if (err.status) this.handleRegisterResult(err.status);
      else console.log(err);
    });
  }

  /**
   * Handle registering based on http result status code
   * @param statusCode
   */
  private handleRegisterResult(statusCode){
    if(statusCode === 201){
      // this.router.navigate(['/login']);
      this.userAuthService.login(this.userCredentials.email, this.userCredentials.password).subscribe(result => {
        this.router.navigate(['/']);
      });
    }else{
      alert('An unexpected error occurred :(' + statusCode);
    }
  }

}
