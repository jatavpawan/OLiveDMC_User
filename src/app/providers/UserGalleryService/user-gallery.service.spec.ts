import { TestBed } from '@angular/core/testing';

import { UserGalleryService } from './user-gallery.service';

describe('UserGalleryService', () => {
  let service: UserGalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserGalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
