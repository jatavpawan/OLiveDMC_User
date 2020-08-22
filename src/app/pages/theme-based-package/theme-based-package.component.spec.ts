import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeBasedPackageComponent } from './theme-based-package.component';

describe('ThemeBasedPackageComponent', () => {
  let component: ThemeBasedPackageComponent;
  let fixture: ComponentFixture<ThemeBasedPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeBasedPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeBasedPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
