import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestEventDetailComponent } from './latest-event-detail.component';

describe('LatestEventDetailComponent', () => {
  let component: LatestEventDetailComponent;
  let fixture: ComponentFixture<LatestEventDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestEventDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
