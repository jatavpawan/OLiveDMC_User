import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryVideoModalComponent } from './gallery-video-modal.component';

describe('GalleryVideoModalComponent', () => {
  let component: GalleryVideoModalComponent;
  let fixture: ComponentFixture<GalleryVideoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryVideoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryVideoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
