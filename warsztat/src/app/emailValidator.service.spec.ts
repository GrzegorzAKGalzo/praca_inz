/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmailValidatorService } from './emailValidator.service';

describe('Service: EmailValidator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailValidatorService]
    });
  });

  it('should ...', inject([EmailValidatorService], (service: EmailValidatorService) => {
    expect(service).toBeTruthy();
  }));
});
