import { TestBed } from '@angular/core/testing';

import { ComentarImagenService } from './comentar-imagen.service';

describe('ComentarImagenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComentarImagenService = TestBed.get(ComentarImagenService);
    expect(service).toBeTruthy();
  });
});
