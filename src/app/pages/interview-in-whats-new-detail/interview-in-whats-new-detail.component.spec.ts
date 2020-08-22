import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewInWhatsNewDetailComponent } from './interview-in-whats-new-detail.component';

describe('InterviewInWhatsNewDetailComponent', () => {
  let component: InterviewInWhatsNewDetailComponent;
  let fixture: ComponentFixture<InterviewInWhatsNewDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewInWhatsNewDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewInWhatsNewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
