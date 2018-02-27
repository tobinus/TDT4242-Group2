import { TestBed, inject } from '@angular/core/testing';

import { UserAuthService } from './user-auth.service';

xdescribe('UserAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAuthService]
    });
  });

  it('should be created', inject([UserAuthService], (service: UserAuthService) => {
    expect(service).toBeTruthy();
  }));
});
