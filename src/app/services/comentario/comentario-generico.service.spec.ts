import { TestBed } from '@angular/core/testing';

import { ComentarioGenericoService } from './comentario-generico.service';

describe('ComentarioGenericoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComentarioGenericoService = TestBed.get(ComentarioGenericoService);
    expect(service).toBeTruthy();
  });
});
