import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyMapComponent } from './dummy-map.component';

describe('DummyMapComponent', () => {
  let component: DummyMapComponent;
  let fixture: ComponentFixture<DummyMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DummyMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
