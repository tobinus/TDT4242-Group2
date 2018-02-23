import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UserAuthService } from "../_shared/services/user-auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  title: string = 'E-commerce';
  private isLoggedIn: boolean = false;
  private userAuthEventsSub: Subscription;

  constructor(
    private userAuthService: UserAuthService,
  ) { }

  ngOnInit() {
    // Subscribe to login and logout user auth events
    this.userAuthEventsSub = this.userAuthService.getUserAuthEvents().subscribe(
      next => {if (next.hasOwnProperty('isLoggedIn')) this.isLoggedIn = next['isLoggedIn']},
    );
  }

  ngOnDestroy() {
    // Un-subscribe from login and logout user auth events to avoid mem leaks
    this.userAuthEventsSub.unsubscribe();
  }

  /**
   * Log out a user when they press the log out link
   */
  private logout() {
    this.userAuthService.logout().subscribe(
      res => {},
      error => {}
    );
  }

}
