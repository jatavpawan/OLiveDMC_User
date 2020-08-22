import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicCareerComponent } from './public-career.component';

describe('PublicCareerComponent', () => {
  let component: PublicCareerComponent;
  let fixture: ComponentFixture<PublicCareerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicCareerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
