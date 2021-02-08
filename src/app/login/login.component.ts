import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  showPassword: boolean = false;
  submit: boolean = false;

  authRequest: any = {
    "email": null,
    "password": null
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    if(sessionStorage.getItem('userId') && atob(sessionStorage.getItem('isLoggedIn')) == 'true'){
      this.router.navigate(['home']);
    }
  }

  email = new FormControl('', [
    Validators.required,
    Validators.pattern(this.emailPattern),
  ]);

  password = new FormControl('', [
    Validators.required,
  ]);

  showHidePassword(flag){
    this.showPassword = flag;
  }

  async onSignIn(){
    this.submit = true;
    this.authRequest.email = this.email.value;
    this.authRequest.password = this.password.value;
    this.authService.signIn(this.authRequest)
    .subscribe((result) => {
      this.openSnackBar("Login Successful");
      this.submit = false;
      var response: any = result;
      sessionStorage.setItem('isLoggedIn', btoa('true'));
      var userId = btoa(response.id);
      sessionStorage.setItem('userId', userId);
      if(response.company){
        sessionStorage.setItem('name', response.company);
      }
      else{
        sessionStorage.setItem('name', response.firstName + ' ' + response.lastName);
      }
      if(response.profileSet == 'true'){
        this.router.navigate(['home']);
        window.location.reload();
      }
      else{
        this.router.navigate(['set-profile']);
      }
    },
    (error) => {
      this.submit = false;
      if(error.error.message == 'Access Denied'){
        this.openSnackBar("Invalid Credentials");
      }
      else{
        this.openSnackBar("Failed to Login");
      }
    });
  }

  signUp(){
    this.router.navigate(['register']);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

}
