import { TestBed } from '@angular/core/testing';

import { OfferAdsService } from './offer-ads.service';

describe('OfferAdsService', () => {
  let service: OfferAdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferAdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
