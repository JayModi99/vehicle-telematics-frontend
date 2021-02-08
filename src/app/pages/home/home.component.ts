import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userId: any;
  isLoggedIn: string;

  constructor(
    private router: Router
    ) { }

  ngOnInit() {
    this.userId = +atob(sessionStorage.getItem('userId'));
    this.isLoggedIn = atob(sessionStorage.getItem('isLoggedIn'));
    if(!this.userId || this.isLoggedIn != 'true'){
      this.router.navigate(['login']);
    }
  }

}
