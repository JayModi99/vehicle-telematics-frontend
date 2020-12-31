import { User } from './../model/User';
import { Router } from '@angular/router';
import { VehicleTelematicsService } from './../service/vehicle-telematics.service';
import { Vehicle } from './../model/Vehicle';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-set',
  templateUrl: './profile-set.component.html',
  styleUrls: ['./profile-set.component.scss']
})
export class ProfileSetComponent implements OnInit {

  userId: any;

  personalDetails: FormGroup;
  vehicleDetails: FormGroup;
  vehicleList: Array<Vehicle> = [];

  constructor(
    private _formBuilder: FormBuilder,
    private vehicleTelematicsService: VehicleTelematicsService,
    private router: Router,
    private snackBar: MatSnackBar
    ) {}

  ngOnInit() {
    this.userId = +atob(sessionStorage.getItem('userId'));
    if(!this.userId){
      this.router.navigate(['login']);
    }
    this.vehicleTelematicsService.isProfileSet()
    .subscribe((result: boolean) => {
      if(result){
        this.router.navigate(['home']);
      }
    });

    this.personalDetails = this._formBuilder.group({
      company: ['', ],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
      address: ['', Validators.required]
    });
    this.vehicleDetails = this._formBuilder.group({
      vehicleCompany: ['', Validators.required],
      vehicleName: ['', Validators.required],
      vehicleNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("(([A-Za-z]){2}(|-)(?:[0-9]){2}(|-)(?:[A-Za-z]){2}(|-)([0-9]){1,4})")]]
    });
  }

  addVehicle(){
    var user: User = new User();
    user = this.personalDetails.value;
    user.id = this.userId;
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
          this.vehicleTelematicsService.findVehicleByVehicleNumber(vehicle.vehicleNumber)
          .subscribe((result: Vehicle) => {
            if(result == null){
              this.vehicleList.push(vehicle);
              this.vehicleDetails.reset();
              this.router.navigate(['home']);
            }
            else{
              this.openSnackBar('Vehicle already Exists');
            }
          },
          (error) => {
            this.openSnackBar('Failed to add Vehicle. Try Again');
          });
        }
      });
    }
    else{
      this.vehicleTelematicsService.findVehicleByVehicleNumber(vehicle.vehicleNumber)
      .subscribe((result: Vehicle) => {
        if(result == null){
          this.vehicleList.push(vehicle);
          this.vehicleDetails.reset();
        }
        else{
          this.openSnackBar('Vehicle already Exists');
        }
      },
      (error) => {
        this.openSnackBar('Failed to add Vehicle. Try Again');
      });
    }
  }

  removeVehicle(index){
    this.vehicleList.splice(index, 1);
  }

  submit(){
    var user: User = new User();
    user = this.personalDetails.value;
    user.id = this.userId;
    user.profileSet = 'true';
    this.vehicleTelematicsService.saveUserProfile(user)
    .subscribe((result: User) => {
      this.vehicleTelematicsService.addVehicles(this.vehicleList)
      .subscribe((result) => {
        this.openSnackBar('Profile Successfully Updated');
        this.vehicleList = null;
      },
      (error) => {
        this.openSnackBar('Failed To add Vehicles');
      });
    },
    (error) => {
      this.openSnackBar('Failed to Add Personal Deatils');
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

}
