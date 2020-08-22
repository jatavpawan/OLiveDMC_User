import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicWhatsNewComponent } from './public-whats-new.component';

describe('PublicWhatsNewComponent', () => {
  let component: PublicWhatsNewComponent;
  let fixture: ComponentFixture<PublicWhatsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicWhatsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicWhatsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
