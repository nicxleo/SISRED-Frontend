import { TestBed } from '@angular/core/testing';

import { AddCommentsService } from './add-comments.service';

describe('AddCommentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddCommentsService = TestBed.get(AddCommentsService);
    expect(service).toBeTruthy();
  });
});
