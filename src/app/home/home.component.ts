import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userId: any;

  constructor(
    private auth: AngularFireAuth,
    private router: Router
    ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    if(this.userId == null){
      this.router.navigate(['login']);
    }
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
