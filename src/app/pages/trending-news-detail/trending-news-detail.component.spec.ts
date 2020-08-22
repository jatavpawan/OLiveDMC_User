import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingNewsDetailComponent } from './trending-news-detail.component';

describe('TrendingNewsDetailComponent', () => {
  let component: TrendingNewsDetailComponent;
  let fixture: ComponentFixture<TrendingNewsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendingNewsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingNewsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
