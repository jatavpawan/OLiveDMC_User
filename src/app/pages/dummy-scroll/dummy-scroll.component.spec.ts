import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyScrollComponent } from './dummy-scroll.component';

describe('DummyScrollComponent', () => {
  let component: DummyScrollComponent;
  let fixture: ComponentFixture<DummyScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DummyScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
