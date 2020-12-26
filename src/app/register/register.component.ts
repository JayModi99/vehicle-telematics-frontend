import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  passwordMatch: boolean = true;

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
  }

  email = new FormControl('', [
    Validators.required,
    Validators.pattern(this.emailPattern),
  ]);

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  confirmPassword = new FormControl('', [
    Validators.required,
  ]);

  passwordChange(){
    if(this.password.value != this.confirmPassword.value){
      this.passwordMatch = false;
    }
    else{
      this.passwordMatch = true;
    }
  }

  showHidePassword(flag){
    this.showPassword = flag;
  }

  showHideConfirmPassword(flag){
    this.showConfirmPassword = flag;
  }

  onSignUp(){
    this.submit = true;
    this.authRequest.email = this.email.value;
    this.authRequest.password = this.password.value;
    this.authService.signUp(this.authRequest)
    .subscribe((result) => {
      console.log(result);
      this.submit = false;
      var response: any = result;
      if(response.response == "User Registered Successfully"){
        this.openSnackBar("User Registered Successfully");
        this.router.navigate(['login']);
      }
      else if(response.response == "Email already Registered"){
        this.openSnackBar("Email already Registered");
      }
      else{
        this.openSnackBar("Failed to Register");
      }
    },
    (error) => {
      this.submit = false;
      this.openSnackBar("Failed to Register");
    });
  }

  signIn(){
    this.router.navigate(['login']);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

}
