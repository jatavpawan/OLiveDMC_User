import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationVideosDetailComponent } from './destination-videos-detail.component';

describe('DestinationVideosDetailComponent', () => {
  let component: DestinationVideosDetailComponent;
  let fixture: ComponentFixture<DestinationVideosDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinationVideosDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationVideosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
