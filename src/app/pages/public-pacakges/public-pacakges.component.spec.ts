import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPacakgesComponent } from './public-pacakges.component';

describe('PublicPacakgesComponent', () => {
  let component: PublicPacakgesComponent;
  let fixture: ComponentFixture<PublicPacakgesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicPacakgesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicPacakgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
