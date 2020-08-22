import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicTravelDetailsComponent } from './public-travel-details.component';

describe('PublicTravelDetailsComponent', () => {
  let component: PublicTravelDetailsComponent;
  let fixture: ComponentFixture<PublicTravelDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicTravelDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicTravelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
