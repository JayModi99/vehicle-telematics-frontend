import { SubUser } from './../../model/SubUser';
import { VehicleTelematicsService } from './../../service/vehicle-telematics.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sub-user',
  templateUrl: './sub-user.component.html',
  styleUrls: ['./sub-user.component.css']
})
export class SubUserComponent implements OnInit {

  userId: any;
  isLoggedIn: string;

  subUserList: Array<SubUser>;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private vehicleTelematicsService: VehicleTelematicsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.userId = +atob(sessionStorage.getItem('userId'));
    this.isLoggedIn = atob(sessionStorage.getItem('isLoggedIn'));
    if(!this.userId || this.isLoggedIn != 'true'){
      this.router.navigate(['login']);
    }
    this.findAllSubUser();
  }

  findAllSubUser(){
    this.vehicleTelematicsService.findAllSubUser()
    .subscribe((result: Array<SubUser>) => {
      this.subUserList = result;
    },
    (error) => {
      this.openSnackBar('Failed to load Sub User.');
    });
  }

  deleteSubUser(id: number){
    this.vehicleTelematicsService.deleteSubUser(id)
    .subscribe((result) => {
      if(result){
        this.openSnackBar('Sub-User Deleted');
        this.findAllSubUser();
      }
      else{
        this.openSnackBar('Failed to delete sub-user');
      }
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddSubUserDialog, {disableClose: true, autoFocus: false});

    dialogRef.afterClosed().subscribe(result => {
      this.findAllSubUser();
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

}

@Component({
  selector: 'add-sub-user-dialog',
  templateUrl: 'add-sub-user-dialog.html',
  styleUrls: ['./sub-user.component.css'],
})
export class AddSubUserDialog implements OnInit {

  userId: any;
  isLoggedIn: string;

  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  email = new FormControl('', [
    Validators.required,
    Validators.pattern(this.emailPattern),
  ]);

  invite: boolean = false;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<AddSubUserDialog>,
    private vehicleTelematicsService: VehicleTelematicsService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(){
    this.userId = +atob(sessionStorage.getItem('userId'));
    this.isLoggedIn = atob(sessionStorage.getItem('isLoggedIn'));
    if(!this.userId || this.isLoggedIn != 'true'){
      this.router.navigate(['login']);
    }
   }

   addSubUser(){
     this.existsByEmail();
   }

   existsByEmail(){
    this.invite = true;
    this.vehicleTelematicsService.subUserExistsByEmail(this.email.value)
    .subscribe((result: boolean) => {
      if(result){
        this.openSnackBar('Email already exists');
        this.invite = false;
      }
      else{
        this.vehicleTelematicsService.sendSubUserMail(this.email.value)
        .subscribe((result: boolean) => {
          if(result){
            this.openSnackBar('Mail sent to ' + this.email.value);
            this.dialogRef.close();
            this.invite = false;
          }
          else{
            this.openSnackBar('Failed to send mail. Try again.');
            this.invite = false;
          }
        },
        (error) => {
          this.openSnackBar('Failed to send mail. Try again.');
          this.invite = false;
        });
      }
    })
   }

   openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

}
