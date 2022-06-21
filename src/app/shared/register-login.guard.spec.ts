import { TestBed } from '@angular/core/testing';

import { RegisterLoginGuard } from './register-login.guard';

describe('RegisterLoginGuard', () => {
  let guard: RegisterLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RegisterLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
