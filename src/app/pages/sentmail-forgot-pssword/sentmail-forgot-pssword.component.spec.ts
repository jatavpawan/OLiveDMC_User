import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentmailForgotPsswordComponent } from './sentmail-forgot-pssword.component';

describe('SentmailForgotPsswordComponent', () => {
  let component: SentmailForgotPsswordComponent;
  let fixture: ComponentFixture<SentmailForgotPsswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentmailForgotPsswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentmailForgotPsswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
