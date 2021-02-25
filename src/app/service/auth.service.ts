import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //url = "http://localhost:8080/api/v1/auth/";
  url = "https://vehicle-telematics.herokuapp.com/api/v1/auth/";

  constructor(
    private http: HttpClient
  ) { }

  signUp(authRequest: any) {
    return this.http.post(this.url + 'signup', authRequest);
  }

  signIn(authRequest: any) {
    return this.http.post(this.url + 'signin', authRequest);
  }

}
