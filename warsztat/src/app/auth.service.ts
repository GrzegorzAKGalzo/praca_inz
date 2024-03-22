import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(
  private http: HttpClient,
) { }


public isAuth(): boolean{
  let jwtHelper: JwtHelperService = new JwtHelperService();
  let rawToken: string;
  rawToken = localStorage.getItem('token') || '';
  return !jwtHelper.isTokenExpired(rawToken);
}
}
