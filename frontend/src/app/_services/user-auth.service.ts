import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response} from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserAuthService {

  constructor(
    // have to use httpclient since http is deprecated :(
    private http: HttpClient,
  ) { }
  
  login(email: string, password: string): Observable<object> {
    let body = {
      email: email,
      password: password,
    }
    
    let url = '/api/user/login';
    return this.http.post(url, body); 
  }
  
  logout(): Observable<object>{
    let url = '/api/user/logout';
    return this.http.post(url, {});
  }
  
  register(email: string, password: string): Observable<object>{
    let body = {
      email: email,
      password: password,
    }
    let url = '/api/user';
    return this.http.post(url, body)
  }
  
  getCurrentUser(): Observable<object>{
    let url = '/api/user/current';
    return this.http.get(url);
  }
  
}
