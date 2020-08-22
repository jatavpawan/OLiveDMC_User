import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicAttractionComponent } from './public-attraction.component';

describe('PublicAttractionComponent', () => {
  let component: PublicAttractionComponent;
  let fixture: ComponentFixture<PublicAttractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicAttractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicAttractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
