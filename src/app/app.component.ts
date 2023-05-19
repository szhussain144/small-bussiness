import { Component, OnInit } from '@angular/core';
import { SessionService } from './services/common/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'small-bussiness';
  isLoggedIn: boolean = false;
  sideBar: boolean = false;
  userType: String = '';

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.sessionService.session.subscribe((res) => {
      if (res) {
        this.userType = res.userType;
        this.isLoggedIn = true;
        this.sideBar = res.userType !== 'BUYER' && this.isLoggedIn
      } else {
        const user: any = localStorage.getItem('user');
        if (user) {
          let jsonUser = JSON.parse(user);
          this.userType = jsonUser.userType;
          this.isLoggedIn = true;
          this.sideBar = jsonUser.userType !== 'BUYER' && this.isLoggedIn
        } else {
          this.isLoggedIn = false;
          this.sideBar = false;
        }
      }
    });
    
  }
}
