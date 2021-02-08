import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SubUser } from '../model/SubUser';
import { VehicleTelematicsService } from '../service/vehicle-telematics.service';

@Component({
  selector: 'app-sub-user-register',
  templateUrl: './sub-user-register.component.html',
  styleUrls: ['./sub-user-register.component.css']
})
export class SubUserRegisterComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  passwordMatch: boolean = true;

  submit: boolean = false;

  subUser: SubUser;

  authRequest: any = {
    "email": null,
    "password": null
  };

  constructor(
    private vehicleTelematicsService: VehicleTelematicsService,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit() {
  }

  firstName = new FormControl('', [
    Validators.required,
  ]);

  lastName = new FormControl('', [
    Validators.required,
  ]);

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

  register(){
    this.submit = true;
    this.subUser = new SubUser();
    this.subUser.firstName = this.firstName.value;
    this.subUser.lastName = this.lastName.value;
    this.subUser.email = this.email.value;
    this.subUser.password = this.password.value;
    this.vehicleTelematicsService.verifySubUserEmail(this.subUser)
    .subscribe((result: any) => {
      this.openSnackBar(result.response);
      if(result.response == 'Registration Successful'){
        this.submit = false;
        this.router.navigate(['login']);
      }
      this.submit = false;
    },
    (error) => {
      this.submit = false;
      this.openSnackBar('Failed to Register');
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

}
