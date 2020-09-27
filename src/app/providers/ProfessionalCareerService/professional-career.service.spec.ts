import { TestBed } from '@angular/core/testing';

import { ProfessionalCareerService } from './professional-career.service';

describe('ProfessionalCareerService', () => {
  let service: ProfessionalCareerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessionalCareerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
