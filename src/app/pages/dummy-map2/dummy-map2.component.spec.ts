import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyMap2Component } from './dummy-map2.component';

describe('DummyMap2Component', () => {
  let component: DummyMap2Component;
  let fixture: ComponentFixture<DummyMap2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DummyMap2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyMap2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
