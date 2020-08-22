import { TestBed } from '@angular/core/testing';

import { LatestEventService } from './latest-event.service';

describe('LatestEventService', () => {
  let service: LatestEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatestEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
