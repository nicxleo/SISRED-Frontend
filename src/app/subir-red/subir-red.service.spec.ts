import {TestBed} from '@angular/core/testing';

import {SubirRedService} from './subir-red.service';

describe('SubirRedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubirRedService = TestBed.get(SubirRedService);
    expect(service).toBeTruthy();
  });
});
