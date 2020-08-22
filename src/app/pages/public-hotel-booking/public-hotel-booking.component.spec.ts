import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHotelBookingComponent } from './public-hotel-booking.component';

describe('PublicHotelBookingComponent', () => {
  let component: PublicHotelBookingComponent;
  let fixture: ComponentFixture<PublicHotelBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicHotelBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicHotelBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
