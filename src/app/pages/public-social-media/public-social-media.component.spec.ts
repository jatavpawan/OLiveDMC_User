import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSocialMediaComponent } from './public-social-media.component';

describe('PublicSocialMediaComponent', () => {
  let component: PublicSocialMediaComponent;
  let fixture: ComponentFixture<PublicSocialMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicSocialMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicSocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
