import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareSocialMediaComponent } from './share-social-media.component';

describe('ShareSocialMediaComponent', () => {
  let component: ShareSocialMediaComponent;
  let fixture: ComponentFixture<ShareSocialMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareSocialMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareSocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
