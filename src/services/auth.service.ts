import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public router: Router,
    private http: HttpClient
  ) {
  }

  signIn(email: any, password: any){
    let option = {
      email: email,
      password: password
    }
    const url = environment.apis + 'users/login';
    return this.http.put(url, option);
  }

  signUp(data: any){
    let options = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password
    }
    const url = environment.apis + 'users/'
    return this.http.post(url,options);
  }

  isAlreadyLoggedIn(){
    let token = this.getAuthorizationToken();
    return !!token;
  }

  getAuthorizationToken() {
     let user:any = localStorage.getItem('user') || '{}';
       user = JSON.parse(user);
     return user.accessToken;
  }

  signOut(){
    const options= {};
    const url = environment.apis + 'users/logout';
    return this.http.put(url, options);
  }
}
