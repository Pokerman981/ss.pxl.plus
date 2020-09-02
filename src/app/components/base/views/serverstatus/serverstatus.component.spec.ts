/*
 * Copyright (c) 2020. Troy Gidney
 * All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * File Last Modified: 4/29/20, 11:48 PM
 * File: serverstatus.component.spec.ts
 * Project: ss.pxl.plus
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ServerstatusComponent} from './serverstatus.component';

describe('ServerstatusComponent', () => {
  let component: ServerstatusComponent;
  let fixture: ComponentFixture<ServerstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
