import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicTravelUtilityComponent } from './public-travel-utility.component';

describe('PublicTravelUtilityComponent', () => {
  let component: PublicTravelUtilityComponent;
  let fixture: ComponentFixture<PublicTravelUtilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicTravelUtilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicTravelUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
