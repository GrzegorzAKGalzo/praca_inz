import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService {
  constructor() {}

  public isValid(email: string): boolean {
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    console.log(email);
    return !expression.test(email);
  }
}