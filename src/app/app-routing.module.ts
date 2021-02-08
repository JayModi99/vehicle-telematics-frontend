import { SubUserRegisterComponent } from './sub-user-register/sub-user-register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ProfileSetComponent } from './profile-set/profile-set.component';
import { HomeComponent } from './pages/home/home.component';
import { SubUserComponent } from './pages/sub-user/sub-user.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'app', component: AppComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'sub-user-register', component: SubUserRegisterComponent},
  {path: 'set-profile', component: ProfileSetComponent},
  {path: 'home', component: HomeComponent},
  {path: 'sub-users', component: SubUserComponent},
  {path: 'vehicles', component: VehicleComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
