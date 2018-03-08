import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { trigger, state, style, transition, animate} from '@angular/animations';

import { UserModel } from '../_shared/app.models';
import { UserAuthService } from "../_shared/services/user-auth.service";
import { ShoppingCartService } from "../_shared/services/shopping-cart.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('messageChange', [
      state('in', style({transform: 'translateY(0)'})),
      transition(':enter', [
        style({transform: 'translateY(100%)'}),
        animate('500ms ease-in-out')
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({transform: 'translateY(-100%)'}))
      ])
    ]),
  ],
})
export class NavbarComponent implements OnInit, OnDestroy {

  private title: string = 'SPESIALBUA';
  private user: UserModel = null;
  private userAuthEventsSub: Subscription;
  private messageToggle: string = 'A';
  private messageIndex: number = 0;
  private welcomeMessageList: string[] = [
    "Welcome to our wonderful e-commerce site",
    "Shop til you drop ... seriously",
    "DevOps 4 life!",
    "Be sure to check out our super deals",
    "Buy something, please! We're about to go bankrupt...",
    "Special stuff for special people",
    "If we don't have it, you don't want it",
    "FREE universal delivery (within the solar system)",
    "Bitcoin? We don't take coins, just bits",
  ];
  private welcomeMessageA: string = this.welcomeMessageList[this.messageIndex];
  private welcomeMessageB: string = '';

  private itemsInCart = 0;
  private intervalId : number;
  private shoppingCartSub : Subscription;

  constructor(
    private userAuthService: UserAuthService,
    private shoppingCart : ShoppingCartService,
  ) { }

  ngOnInit() {
    // Subscribe to login and logout user auth events and update whether a user is logged in or not
    this.userAuthEventsSub = this.userAuthService.getUserAuthEvents().subscribe(user => {
      this.user = user;
    });

    this.shoppingCartSub = this.shoppingCart.getShoppingCart().subscribe((cart) => {
      this.itemsInCart = cart.length;
    });

    this.intervalId = window.setInterval(() => {
      // Pick random welcome message and rotate on interval
      let prevIndex = this.messageIndex;
      while (this.messageIndex === prevIndex) {
        this.messageIndex = Math.floor(Math.random() * this.welcomeMessageList.length);
      }
      let newMessage = this.welcomeMessageList[this.messageIndex];
      if (this.messageToggle === 'A') this.welcomeMessageB = newMessage;
      if (this.messageToggle === 'B') this.welcomeMessageA = newMessage;
      this.messageToggle = this.messageToggle === 'A' ? 'B' : 'A';
    }, 10000);
  }

  ngOnDestroy() {
    // Un-subscribe from login and logout user auth events to avoid mem leaks
    this.userAuthEventsSub.unsubscribe();
    window.clearInterval(this.intervalId);
    this.shoppingCartSub.unsubscribe();
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
