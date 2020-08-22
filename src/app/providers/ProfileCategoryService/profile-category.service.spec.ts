import { TestBed } from '@angular/core/testing';

import { ProfileCategoryService } from './profile-category.service';

describe('ProfileCategoryService', () => {
  let service: ProfileCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
