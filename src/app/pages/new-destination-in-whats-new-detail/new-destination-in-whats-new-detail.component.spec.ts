import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDestinationInWhatsNewDetailComponent } from './new-destination-in-whats-new-detail.component';

describe('NewDestinationInWhatsNewDetailComponent', () => {
  let component: NewDestinationInWhatsNewDetailComponent;
  let fixture: ComponentFixture<NewDestinationInWhatsNewDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDestinationInWhatsNewDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDestinationInWhatsNewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
