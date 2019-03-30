import { TestBed } from '@angular/core/testing';

import { ProyectoConectateService } from './proyecto-conectate.service';

describe('ProyectoConectateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProyectoConectateService = TestBed.get(ProyectoConectateService);
    expect(service).toBeTruthy();
  });
});
