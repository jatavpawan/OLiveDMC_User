import { TestBed } from '@angular/core/testing';

import { AreaofexpertiseService } from './areaofexpertise.service';

describe('AreaofexpertiseService', () => {
  let service: AreaofexpertiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaofexpertiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
