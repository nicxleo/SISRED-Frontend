import { TestBed } from '@angular/core/testing';

import { BuscarRedsService } from './buscar-reds.service';

describe('BuscarRedsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuscarRedsService = TestBed.get(BuscarRedsService);
    expect(service).toBeTruthy();
  });
});
