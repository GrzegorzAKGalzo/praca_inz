import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginapiService {

constructor(
  private http: HttpClient
) { }

  private refreshSubject = new Subject<void>();
  refresh = this.refreshSubject.asObservable();

  triggerRefresh(): void {
    this.refreshSubject.next();
  }




  register(data: any): Observable<any> {
    return this.http.post('http://localhost:5500/register', data);
  }

  login(data: any): Observable<any> {
    return this.http.post('http://localhost:5500/login', data);

  }

  users(): Observable<any> {
    return this.http.get('localhost:5500/user' );

  }
  addClient(data: any): Observable<any>{
    return this.http.post('http://localhost:5500/addClient', data);
  }


}
