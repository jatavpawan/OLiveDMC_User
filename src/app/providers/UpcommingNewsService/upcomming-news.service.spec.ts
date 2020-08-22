import { TestBed } from '@angular/core/testing';

import { UpcommingNewsService } from './upcomming-news.service';

describe('UpcommingNewsService', () => {
  let service: UpcommingNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpcommingNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
