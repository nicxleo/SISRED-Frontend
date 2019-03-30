import { TestBed } from '@angular/core/testing';

import { RolesEstadosFasesService } from './roles-estados-fases.service';

describe('RolesEstadosFasesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RolesEstadosFasesService = TestBed.get(RolesEstadosFasesService);
    expect(service).toBeTruthy();
  });
});
