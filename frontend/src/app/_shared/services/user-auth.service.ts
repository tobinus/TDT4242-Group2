import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserModel } from "../app.models";

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class UserAuthService {

  private currentUser: UserModel = null;

  constructor(
    // have to use httpclient since http is deprecated :(
    private http: HttpClient,
  ) { }

  login(email: string, password: string): Observable<UserModel> {
    let body = {
      email: email,
      password: password,
    };

    let url = '/api/user/login';
    let obs = this.http.post(url, body).map((result) => new UserModel(result));
    obs.do((result) => {this.currentUser = result});
    return obs;
  }

  logout(): Observable<object>{
    let url = '/api/user/logout';
    this.currentUser = null;
    return this.http.post(url, {});
  }

  register(email: string, password: string): Observable<object>{
    let body = {
      email: email,
      password: password,
    };
    let url = '/api/user';
    return this.http.post(url, body)
  }

  getCurrentUser(): Observable<UserModel> {
    if (this.currentUser) {
      return Observable.of(this.currentUser);
    }
    let url = '/api/user/current';
    let obs = this.http.get(url).map((result) => new UserModel(result));
    obs.do((result) => {this.currentUser = result});
    return obs;
  }

}
