import { TestBed } from '@angular/core/testing';

import { StateProgramService } from './state-program.service';

describe('StateProgramService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateProgramService = TestBed.get(StateProgramService);
    expect(service).toBeTruthy();
  });
});
