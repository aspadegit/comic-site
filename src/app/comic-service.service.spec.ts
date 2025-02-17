import { TestBed } from '@angular/core/testing';

import { ComicServiceService } from './comic-service.service';

describe('ComicServiceService', () => {
  let service: ComicServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComicServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
