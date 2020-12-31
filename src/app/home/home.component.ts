import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userId: any;

  constructor(
    private router: Router
    ) { }

  ngOnInit() {
    this.userId = +atob(sessionStorage.getItem('userId'));
    if(!this.userId){
      this.router.navigate(['login']);
    }
  }

  signOut(){
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
