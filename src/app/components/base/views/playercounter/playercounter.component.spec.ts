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
