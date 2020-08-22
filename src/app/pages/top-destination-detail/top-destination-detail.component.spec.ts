import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDestinationDetailComponent } from './top-destination-detail.component';

describe('TopDestinationDetailComponent', () => {
  let component: TopDestinationDetailComponent;
  let fixture: ComponentFixture<TopDestinationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopDestinationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopDestinationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
