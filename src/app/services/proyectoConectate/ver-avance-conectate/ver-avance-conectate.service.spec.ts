import {TestBed} from '@angular/core/testing';

import {VerAvanceConectateService} from './ver-avance-conectate.service';

describe('VerAvanceConectateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerAvanceConectateService = TestBed.get(VerAvanceConectateService);
    expect(service).toBeTruthy();
  });
});
