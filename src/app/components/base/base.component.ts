import {Component, Input, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {


  constructor(private cookieService: CookieService, private router: Router) { }

  toggle;

  ngOnInit(): void {
    if (!this.cookieService.check('token')) {
       this.router.navigate(['base']).finally(() => {/**/});
    }
  }

  getSideNavEvent(event){
    this.toggle = event;
  }

}
