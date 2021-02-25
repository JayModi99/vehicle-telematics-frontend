import { Vehicle } from './../../model/Vehicle';
import { VehicleTelematicsService } from './../../service/vehicle-telematics.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as vehicleDatabase from '../../vehicle database/vehicle.json';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  userId: any;
  isLoggedIn: string;
  loading: boolean = false;
  vehicleList: Array<Vehicle> = new Array;

  constructor(
    private router: Router,
    private vehicleTelematicsService: VehicleTelematicsService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.userId = +sessionStorage.getItem('userId');
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if(!this.userId || this.isLoggedIn != 'true'){
      this.router.navigate(['login']);
    }
    this.findAllVehicles();
  }

  findAllVehicles(){
    this.loading = true;
    this.vehicleTelematicsService.findAllVehicles()
    .subscribe((result: Array<Vehicle>) => {
      this.vehicleList = result;
      this.loading = false;
    },
    (error) => {
      this.openSnackBar('Failed to load vehicles');
      this.loading = false;
    });
  }

  deleteVehicle(vehicleId: number){
    this.loading = true;
    this.vehicleTelematicsService.deleteVehicle(vehicleId)
    .subscribe((result: boolean) => {
      if(result){
        this.openSnackBar('Vehicle Deleted');
        this.findAllVehicles();
        this.loading = false;
      }
      else{
        this.openSnackBar('Failed to Delete Vehicle');
        this.loading = false;
      }
    },
    (error) => {
      this.openSnackBar('Failed to Delete Vehicle');
      this.loading = false;
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddVehicleDialog, {disableClose: true, autoFocus: false});

    dialogRef.afterClosed().subscribe(result => {
      this.findAllVehicles();
    });
  }

}

@Component({
  selector: 'add-vehicle-dialog',
  templateUrl: 'add-vehicle-dialog.html',
  styleUrls: ['./add-vehicle-dialog.component.css']
})
export class AddVehicleDialog implements OnInit {

  vehicleData: any = (vehicleDatabase as any).default;
  isCompanySelected: boolean = false;
  companyIndex: number = 0;

  userId: any;
  isLoggedIn: string;
  loading: boolean = false;

  vehicleDetails: FormGroup;
  vehicleList: Array<Vehicle> = [];

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<AddVehicleDialog>,
    private _formBuilder: FormBuilder,
    private vehicleTelematicsService: VehicleTelematicsService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(){
    this.userId = +sessionStorage.getItem('userId');
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if(!this.userId || this.isLoggedIn != 'true'){
      this.router.navigate(['login']);
    }

    this.vehicleDetails = this._formBuilder.group({
      vehicleCompany: ['', Validators.required],
      vehicleName: [{value: '', disabled: true}, Validators.required],
      vehicleNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("(([A-Za-z]){2}(|-)(?:[0-9]){2}(|-)(?:[A-Za-z]){2}(|-)([0-9]){1,4})")]]
    });
   }

   onCompanyChange(index){
     this.isCompanySelected = true;
     this.companyIndex = index;
     console.log(index);
   }

   addVehicle(){
    let vehicle = new Vehicle();
    vehicle.userId = this.userId;
    vehicle.vehicleCompany = this.vehicleDetails.controls.vehicleCompany.value;
    vehicle.vehicleName = this.vehicleDetails.controls.vehicleName.value;
    vehicle.vehicleNumber = this.vehicleDetails.controls.vehicleNumber.value;
    if(this.vehicleList.length >= 1){
      this.vehicleList.forEach(element => {
        if(element.vehicleNumber == vehicle.vehicleNumber){
          this.openSnackBar('Vehicle already Added');
        }
        else{
          this.addVehicleToList(vehicle);
        }
      });
    }
    else{
      this.addVehicleToList(vehicle);
    }
  }

  addVehicleToList(vehicle: Vehicle){
    this.loading = true;
    this.vehicleTelematicsService.findVehicleByVehicleNumber(vehicle.vehicleNumber)
    .subscribe((result: Vehicle) => {
      if(result == null){
        this.vehicleList.push(vehicle);
        this.vehicleDetails.reset();
        this.loading = false;
      }
      else{
        this.openSnackBar('Vehicle already Exists');
        this.loading = false;
      }
    },
    (error) => {
      this.openSnackBar('Failed to add Vehicle. Try Again');
      this.loading = false;
    });
  }

  removeVehicle(index){
    this.vehicleList.splice(index, 1);
  }

  submit(){
    this.loading = true;
    this.vehicleTelematicsService.addVehicles(this.vehicleList)
    .subscribe((result) => {
      this.loading = false;
      this.openSnackBar('Vehicle Successfully Added');
      this.vehicleList = null;
      this.dialogRef.close();
    },
    (error) => {
      this.loading = false;
      this.openSnackBar('Failed To add Vehicles');
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
