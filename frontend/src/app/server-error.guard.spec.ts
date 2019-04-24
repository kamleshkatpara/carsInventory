import { TestBed, async, inject } from '@angular/core/testing';

import { ServerErrorGuard } from './server-error.guard';

describe('ServerErrorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerErrorGuard]
    });
  });

  it('should ...', inject([ServerErrorGuard], (guard: ServerErrorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
