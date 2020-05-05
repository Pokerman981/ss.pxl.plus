import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcotrackerComponent } from './ecotracker.component';

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
