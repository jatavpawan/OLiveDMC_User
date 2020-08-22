import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelUtilityFormComponent } from './travel-utility-form.component';

describe('TravelUtilityFormComponent', () => {
  let component: TravelUtilityFormComponent;
  let fixture: ComponentFixture<TravelUtilityFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelUtilityFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelUtilityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
