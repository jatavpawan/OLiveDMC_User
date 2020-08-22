import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelUtilityDetailComponent } from './travel-utility-detail.component';

describe('TravelUtilityDetailComponent', () => {
  let component: TravelUtilityDetailComponent;
  let fixture: ComponentFixture<TravelUtilityDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelUtilityDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelUtilityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
