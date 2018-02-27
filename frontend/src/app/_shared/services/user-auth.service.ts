import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { UserModel } from "../app.models";

@Injectable()
export class UserAuthService {

  private currentUser: UserModel = null;
  private userAuthEvents: BehaviorSubject<UserModel> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Log in an existing user with an e-mail and password
   * @param {string} email
   * @param {string} password
   * @returns {Observable<UserModel>}
   */
  login(email: string, password: string): Observable<UserModel> {
    let body = {
      email: email,
      password: password,
    };

    let url = '/api/user/login';
    return this.http.post(url, body)
      .map(result => new UserModel(result))
      .do(result => this.userLoggedIn(result));
  }

  /**
   * Logs out a user
   * @returns {Observable<Object>}
   */
  logout(): Observable<object>{
    let url = '/api/user/logout';
    return this.http.post(url, {}).do(
      result => this.userLoggedOut(),
    );
  }

  /**
   * Register a new user
   * @param {string} email
   * @param {string} password
   * @returns {Observable<Object>}
   */
  register(email: string, password: string): Observable<object>{
    let body = {
      email: email,
      password: password,
    };
    let url = '/api/user';
    return this.http.post(url, body)
  }

  /**
   * Get the currently logged in user, either from locally stored object or from backend
   * @returns {Observable<UserModel>}
   */
  getCurrentUser(): Observable<UserModel> {
    if (this.currentUser) {
      return Observable.of(this.currentUser);
    }
    let url = '/api/user/current';
    return this.http.get(url)
      .map(result => new UserModel(result))
      .do(result => this.userLoggedIn(result));
  }

  /**
   * Return an observable that can be subscribed to and listen for login or logout events
   * @returns {Observable<Object>}
   */
  getUserAuthEvents(): Observable<UserModel> {
    return this.userAuthEvents.asObservable();
  }


  /**
   * Stuff to do when a user logs in
   * @param {UserModel} user
   */
  private userLoggedIn(user: UserModel): void {
    this.currentUser = user;
    this.userAuthEvents.next(user);
  }

  /**
   * Stuff to do when a user logs out
   */
  private userLoggedOut(): void {
    this.currentUser = null;
    this.userAuthEvents.next(null);
  }
}
