import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoSocialComponent } from './go-social.component';

describe('GoSocialComponent', () => {
  let component: GoSocialComponent;
  let fixture: ComponentFixture<GoSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoSocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
