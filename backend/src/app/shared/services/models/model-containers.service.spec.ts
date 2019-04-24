import { TestBed } from '@angular/core/testing';

import { ModelContainersService } from './model-containers.service';

describe('ModelContainersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModelContainersService = TestBed.get(ModelContainersService);
    expect(service).toBeTruthy();
  });
});
