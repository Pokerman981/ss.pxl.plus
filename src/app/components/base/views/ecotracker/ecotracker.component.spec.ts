/*
 * Copyright (c) 2020. Troy Gidney
 * All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * File Last Modified: 5/1/20, 1:29 PM
 * File: ecotracker.component.spec.ts
 * Project: ss.pxl.plus
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EcotrackerComponent} from './ecotracker.component';

describe('EcotrackerComponent', () => {
  let component: EcotrackerComponent;
  let fixture: ComponentFixture<EcotrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcotrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcotrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
