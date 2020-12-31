import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Vehicle } from '../model/Vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleTelematicsService {

  userId = atob(sessionStorage.getItem('userId'));

  url: string = 'http://localhost:8080/api/v1/';

  constructor(
    private http: HttpClient
  ) { }

  saveUserProfile(user: User){
    return this.http.post(this.url + 'user/saveUserProfile', user);
  }

  findVehicleByVehicleNumber(vehicleNumber: string){
    return this.http.get(this.url + 'vehicle/findByVehicleNumber/' + vehicleNumber + '/' + this.userId);
  }

  addVehicles(vehicleList: Array<Vehicle>){
    return this.http.post(this.url + 'vehicle/addVehicles', vehicleList);
  }

  isProfileSet(){
    return this.http.get(this.url + 'user/isProfileSet/' + this.userId);
  }

}
