import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicDestinationFinderComponent } from './public-destination-finder.component';

describe('PublicDestinationFinderComponent', () => {
  let component: PublicDestinationFinderComponent;
  let fixture: ComponentFixture<PublicDestinationFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicDestinationFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicDestinationFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
