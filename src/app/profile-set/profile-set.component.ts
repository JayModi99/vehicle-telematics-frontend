import { Router } from '@angular/router';
import { VehicleTelematicsService } from './../service/vehicle-telematics.service';
import { Vehicle } from './../model/Vehicle';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile-set',
  templateUrl: './profile-set.component.html',
  styleUrls: ['./profile-set.component.scss']
})
export class ProfileSetComponent implements OnInit {

  userId;

  personalDetails: FormGroup;
  vehicleDetails: FormGroup;
  vehicleList: Array<Vehicle> = [];

  constructor(
    private auth: AngularFireAuth,
    private _formBuilder: FormBuilder,
    private vehicleTelematicsService: VehicleTelematicsService,
    private router: Router
    ) {}

  ngOnInit() {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.userId = localStorage.getItem('userId');
        if(this.userId == null){
          this.router.navigate(['login']);
        }
      } else {
        this.router.navigate(['login']);
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
      vehicleNumber: ['', [Validators.required, Validators.pattern("(([A-Za-z]){2}(|-)(?:[0-9]){2}(|-)(?:[A-Za-z]){2}(|-)([0-9]){1,4})")]]
    });
  }

  addVehicle(){
    let vehicle = new Vehicle();
    vehicle.vehicleCompany = this.vehicleDetails.controls.vehicleCompany.value;
    vehicle.vehicleName = this.vehicleDetails.controls.vehicleName.value;
    vehicle.vehicleNumber = this.vehicleDetails.controls.vehicleNumber.value;
    let v = vehicle.vehicleNumber;
    vehicle.vehicleNumber = v.slice(0, 2) + " " + v.slice(2, 4) + " " + v.slice(4, 6) + " " + v.slice(6);
    this.vehicleList.push(vehicle);
    this.vehicleDetails.reset();
  }

  removeVehicle(index){
    this.vehicleList.splice(index, 1);
  }

  submit(){
    this.vehicleTelematicsService.updateUser(this.userId, this.personalDetails.value)
    .then(() => {
      this.vehicleList.forEach(vehicle => {
        this.vehicleTelematicsService.addVehicle(this.userId, vehicle)
        .then(() => {
          this.router.navigate(['home']);
        })
        .catch(error => {
          console.log(error);
        });
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

}
