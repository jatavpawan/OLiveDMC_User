import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPrivacyPolicyComponent } from './public-privacy-policy.component';

describe('PublicPrivacyPolicyComponent', () => {
  let component: PublicPrivacyPolicyComponent;
  let fixture: ComponentFixture<PublicPrivacyPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicPrivacyPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicPrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
