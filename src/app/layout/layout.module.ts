import { VehicleModule } from './../pages/vehicle/vehicle.module';
import { SubUserModule } from './../pages/sub-user/sub-user.module';
import { HomeModule } from './../pages/home/home.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatRippleModule} from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HomeModule,
    SubUserModule,
    VehicleModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatRippleModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule
  ],
  declarations: [
    LayoutComponent
  ],
  exports: [
    RouterModule,
    LayoutComponent
  ]
})
export class LayoutModule { }
