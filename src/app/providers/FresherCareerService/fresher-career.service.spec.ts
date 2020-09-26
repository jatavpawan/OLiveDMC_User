import { TestBed } from '@angular/core/testing';

import { FresherCareerService } from './fresher-career.service';

describe('FresherCareerService', () => {
  let service: FresherCareerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FresherCareerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
