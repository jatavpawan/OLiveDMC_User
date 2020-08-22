import { TestBed } from '@angular/core/testing';

import { TravelUtilityService } from './travel-utility.service';

describe('TravelUtilityService', () => {
  let service: TravelUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
