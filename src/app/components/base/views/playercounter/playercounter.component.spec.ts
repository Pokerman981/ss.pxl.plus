/*
 * Copyright (c) 2020. Troy Gidney
 * All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * File Last Modified: 6/14/20, 3:14 AM
 * File: playercounter.component.spec.ts
 * Project: ss.pxl.plus
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlayercounterComponent} from './playercounter.component';

describe('PlayercounterComponent', () => {
  let component: PlayercounterComponent;
  let fixture: ComponentFixture<PlayercounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayercounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayercounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
