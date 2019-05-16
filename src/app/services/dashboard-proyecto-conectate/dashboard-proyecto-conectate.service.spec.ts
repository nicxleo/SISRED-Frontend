import { TestBed } from '@angular/core/testing';

import { DashboardProyectoConectateService } from './dashboard-proyecto-conectate.service';

describe('DashboardProyectoConectateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardProyectoConectateService = TestBed.get(DashboardProyectoConectateService);
    expect(service).toBeTruthy();
  });
});
