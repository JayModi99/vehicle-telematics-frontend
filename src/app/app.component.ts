import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'vehicle-telematics';
  isLoggedIn: string = 'false';

  ngOnInit(){
    this.isLoggedIn = atob(sessionStorage.getItem('isLoggedIn'));
  }
}
