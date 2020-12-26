import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../model/User';
import { Vehicle } from '../model/Vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleTelematicsService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  updateUser(userId, user: User){
    return this.firestore.collection('users').doc(userId).update(user);
  }

  addVehicle(userId, vehicle: Vehicle){
    return this.firestore.collection('users').doc(userId).collection('vehicles').doc(vehicle.vehicleNumber).set({...vehicle});
  }

  getVehicle(userId, vehicleNumber){
    return this.firestore.collection('users').doc(userId).collection('vehicles').doc(vehicleNumber).get();
  }

}
