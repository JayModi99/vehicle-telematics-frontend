import { Router } from '@angular/router';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  @ViewChild('drawer') drawer: MatDrawer;
  sidebarMode = 'side';

  userId: any;
  isLoggedIn: string;
  name: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.userId = +sessionStorage.getItem('userId');
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn');
    this.name = sessionStorage.getItem('name');
    if(!this.userId || this.isLoggedIn != 'true'){
      sessionStorage.clear();
      this.router.navigate(['login']);
    }
    this.getScreenSize();
  }

  signOut(){
    sessionStorage.clear();
    window.location.reload();
    this.router.navigate(['login']);
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    if(window.innerWidth < 800){
      this.sidebarMode = 'over';
      this.drawer?.close();
    }
    else{
      this.sidebarMode = 'side';
      this.drawer?.open();
    }
  }

}
