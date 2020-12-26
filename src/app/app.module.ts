import { FormsModule } from '@angular/forms';
import { ProfileSetModule } from './profile-set/profile-set.module';
import { RegisterModule } from './register/register.module';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    HomeModule,
    LoginModule,
    RegisterModule,
    ProfileSetModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    FormsModule
  ]
})
export class AppModule { }
