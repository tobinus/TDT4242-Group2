import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { UserAuthService } from "../_shared/services/user-auth.service";
import { UserModel } from "../_shared/app.models";

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit, OnDestroy {

  private currentUser: UserModel;
  private userAuthEventsSub: Subscription;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    // Subscribe to login and logout user auth events
    this.userAuthEventsSub = this.userAuthService.getUserAuthEvents().subscribe(
      next => {
        if (next.hasOwnProperty('isLoggedIn') && next['isLoggedIn']) {
          // User logged in
          this.userAuthService.getCurrentUser().subscribe(
            user => this.currentUser = user,
            error => {alert('An error occurred. Try again later.')}
          );
        } else if (next.hasOwnProperty('isLoggedIn') && !next['isLoggedIn']) {
          // User logged out
          this.currentUser = null;
          this.router.navigate(['/login']);
        }
      },
    );
  }

  ngOnDestroy() {
    // Un-subscribe from login and logout user auth events to avoid mem leaks
    this.userAuthEventsSub.unsubscribe();
  }

}
