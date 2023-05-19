import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/common/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input()
  isLoggedIn: boolean = false;
  @Input()
  userType: String = '';
  isDropdownOpen = false;
  public kendokaAvatar =
    'https://www.telerik.com/kendo-angular-ui-develop/components/navigation/appbar/assets/kendoka-angular.png';
  data: Array<any> = [];
  constructor(private router: Router, private sessionService: SessionService) {
    console.log('this.userType', this.userType);
    console.log('this.userType', this.isLoggedIn);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    localStorage.removeItem('user');
    this.sessionService.session.next(null);
    this.userType = '';
    this.router.navigate(['/']);
  }

  onSelectionChange(event: any) {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (event === 'sign in') {
      this.router.navigate(['/sign-in']);
    } else if (event === 'logout') {
      console.log('here logout');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.sessionService.session.next(null);
      this.router.navigate(['/']);
    } else if (event === 'invoice') {
      this.router.navigate(['/invoice']);
    }
  }
}
