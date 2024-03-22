/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoginapiService } from './loginapi.service';

describe('Service: Loginapi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginapiService]
    });
  });

  it('should ...', inject([LoginapiService], (service: LoginapiService) => {
    expect(service).toBeTruthy();
  }));
});
