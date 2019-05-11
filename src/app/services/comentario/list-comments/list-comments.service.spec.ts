import { TestBed } from '@angular/core/testing';

import { ListCommentsService } from './list-comments.service';

describe('ListCommentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListCommentsService = TestBed.get(ListCommentsService);
    expect(service).toBeTruthy();
  });
});
