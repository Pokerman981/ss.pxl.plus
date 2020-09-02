/*
 * Copyright (c) 2020. Troy Gidney
 * All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * File Last Modified: 6/14/20, 3:11 AM
 * File: navigation.component.ts
 * Project: ss.pxl.plus
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Input() emitEvent;
  @Output() navClicked = new EventEmitter();


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  click(location) {
    this.navClicked.emit(location);
  }
}
