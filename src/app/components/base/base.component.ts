/*
 * Copyright (c) 2020. Troy Gidney
 * All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * File Last Modified: 6/14/20, 3:11 AM
 * File: base.component.ts
 * Project: ss.pxl.plus
 */

import {Component, HostListener, OnInit} from '@angular/core';
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
    setTimeout(() => {
      this.adjustHeight();
    }, 50);
  }

  getSideNavEvent(event){
    this.toggle = event;
  }

  navClicked(event) {
    this.view = event;
  }

  @HostListener('window:resize')
  adjustHeight() {
    const toolbar = document.getElementById('toolbar').offsetHeight;
    const windowHeight = window.innerHeight;
    document.getElementById('mainContent').style.height = (windowHeight - toolbar) + 'px';
  }

}
