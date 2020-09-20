import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialBlogsComponent } from './social-blogs.component';

describe('SocialBlogsComponent', () => {
  let component: SocialBlogsComponent;
  let fixture: ComponentFixture<SocialBlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialBlogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
