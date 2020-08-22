import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicFlightComponent } from './public-flight.component';

describe('PublicFlightComponent', () => {
  let component: PublicFlightComponent;
  let fixture: ComponentFixture<PublicFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
