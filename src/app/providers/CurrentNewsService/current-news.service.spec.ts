import { TestBed } from '@angular/core/testing';

import { CurrentNewsService } from './current-news.service';

describe('CurrentNewsService', () => {
  let service: CurrentNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
