import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicEventDetailsComponent } from './public-event-details.component';

describe('PublicEventDetailsComponent', () => {
  let component: PublicEventDetailsComponent;
  let fixture: ComponentFixture<PublicEventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicEventDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
