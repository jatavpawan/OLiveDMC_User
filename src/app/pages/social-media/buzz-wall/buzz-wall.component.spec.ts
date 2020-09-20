import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuzzWallComponent } from './buzz-wall.component';

describe('BuzzWallComponent', () => {
  let component: BuzzWallComponent;
  let fixture: ComponentFixture<BuzzWallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuzzWallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuzzWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
