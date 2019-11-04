import { TestBed } from '@angular/core/testing';

import { StateUpdateService } from './state-update.service';

describe('StateUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateUpdateService = TestBed.get(StateUpdateService);
    expect(service).toBeTruthy();
  });
});
