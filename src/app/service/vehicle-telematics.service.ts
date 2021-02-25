import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubUser } from '../model/SubUser';
import { User } from '../model/User';
import { Vehicle } from '../model/Vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleTelematicsService {

  userId = sessionStorage.getItem('userId');

  //url = "http://localhost:8080/api/v1/";
  url = "https://vehicle-telematics.herokuapp.com/api/v1/";

  constructor(
    private http: HttpClient
  ) { }

//User Service

  saveUserProfile(user: User){
    return this.http.post(this.url + 'user/saveUserProfile', user);
  }

  isProfileSet(){
    return this.http.get(this.url + 'user/isProfileSet/' + this.userId);
  }

//Vehicle Service

  findVehicleByVehicleNumber(vehicleNumber: string){
    return this.http.get(this.url + 'vehicle/findByVehicleNumber/' + vehicleNumber + '/' + this.userId);
  }

  addVehicles(vehicleList: Array<Vehicle>){
    return this.http.post(this.url + 'vehicle/addVehicles', vehicleList);
  }

  findAllVehicles(){
    return this.http.get(this.url + 'vehicle/findAllVehicles/' + this.userId);
  }

  deleteVehicle(vehicleId: number){
    return this.http.delete(this.url + 'vehicle/deleteVehicle/' + vehicleId);
  }

//Sub-User Service

  subUserExistsByEmail(email: string){
    return this.http.get(this.url + 'subUser/existsByEmail/' + email);
  }

  findAllSubUser(){
    return this.http.get(this.url + 'subUser/findAll/' + this.userId);
  }

  deleteSubUser(id: number){
    return this.http.delete(this.url + 'subUser/deleteSubUser/' + id);
  }

  verifySubUserEmail(subUser: SubUser){
    return this.http.post(this.url + 'subUser/verifySubUserEmail', subUser);
  }

//Mail Service

  sendSubUserMail(email: string){
    return this.http.get(this.url + 'mail/send-mail/' + email + '/' + this.userId);
  }

}
