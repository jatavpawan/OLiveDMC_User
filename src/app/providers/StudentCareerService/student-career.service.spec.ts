import { TestBed } from '@angular/core/testing';

import { StudentCareerService } from './student-career.service';

describe('StudentCareerService', () => {
  let service: StudentCareerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentCareerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
