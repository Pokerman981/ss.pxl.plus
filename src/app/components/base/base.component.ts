import {Component, Input, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {


  constructor(private cookieService: CookieService, private router: Router, private authService: AuthService) { }

  toggle;
  view;

  ngOnInit(): void {
  }

  getSideNavEvent(event){
    this.toggle = event;
  }

  navClicked(event) {
    this.view = event;
  }

}
