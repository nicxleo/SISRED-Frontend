import { TestBed } from '@angular/core/testing';

import { VerVersionRedService } from './ver-version-red.service';

describe('VerVersionRedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerVersionRedService = TestBed.get(VerVersionRedService);
    expect(service).toBeTruthy();
  });
});
