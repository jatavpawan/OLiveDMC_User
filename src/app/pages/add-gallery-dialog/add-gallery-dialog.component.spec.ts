import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGalleryDialogComponent } from './add-gallery-dialog.component';

describe('AddGalleryDialogComponent', () => {
  let component: AddGalleryDialogComponent;
  let fixture: ComponentFixture<AddGalleryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGalleryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGalleryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
