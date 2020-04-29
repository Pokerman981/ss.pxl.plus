import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {CookieService} from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private cookieService: CookieService) { }

  @Output() toggleSideNav = new EventEmitter();

  toggle = true;
  username: null | string;

  ngOnInit(): void {
    this.getUsername();
  }

  toggleNav() {
    if (this.toggle) {
      this.toggleSideNav.emit(this.toggle);
      this.toggle = !this.toggle;
    } else {
      this.toggleSideNav.emit(this.toggle);
      this.toggle = !this.toggle;
    }
  }

  getUsername() {
    const token = this.cookieService.get('token');
    this.username = jwt_decode(token).data.username;
  }

}
