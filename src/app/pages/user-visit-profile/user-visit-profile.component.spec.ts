import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVisitProfileComponent } from './user-visit-profile.component';

describe('UserVisitProfileComponent', () => {
  let component: UserVisitProfileComponent;
  let fixture: ComponentFixture<UserVisitProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVisitProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVisitProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
