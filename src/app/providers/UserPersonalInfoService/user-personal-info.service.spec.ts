import { TestBed } from '@angular/core/testing';

import { UserPersonalInfoService } from './user-personal-info.service';

describe('UserPersonalInfoService', () => {
  let service: UserPersonalInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPersonalInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
