import { TestBed } from '@angular/core/testing';

import { DescargarRedService } from './descargar-red.service';

describe('DescargarRedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DescargarRedService = TestBed.get(DescargarRedService);
    expect(service).toBeTruthy();
  });
});
