import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicNewsEventsComponent } from './public-news-events.component';

describe('PublicNewsEventsComponent', () => {
  let component: PublicNewsEventsComponent;
  let fixture: ComponentFixture<PublicNewsEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicNewsEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicNewsEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
