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
  addUser(data: any): Observable<any> {
    return this.http.post('http://localhost:5500/addUser', data);
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
  getClients(): Observable<any>{
    return this.http.get('http://localhost:5500/clientsList');
  }
  getClient(number:any): Observable<any>{
    return this.http.get(`http://localhost:5500/client/${number}`);

  }
  getClientCars(number:any): Observable<any>{
    return this.http.get(`http://localhost:5500/clientsCar/${number}`);

  }
  removeClient(number: any): Observable<any>{
    return this.http.delete(`http://localhost:5500/removeClient/${number}`);

  }
  modifyClient(data: any): Observable<any>{
    return this.http.put('http://localhost:5500/modifyClient', data);
  }
  modifyRepair(data: any): Observable<any>{
    return this.http.put('http://localhost:5500/modifyRepair', data);
  }
  getRepairs(): Observable<any>{

    return this.http.get('http://localhost:5500/repairList');
  }
  removeRepair(number: any): Observable<any>{
    return this.http.delete(`http://localhost:5500/removeRepair/${number}`);

  }
  addRepair(data:any): Observable<any>{

    return this.http.post('http://localhost:5500/addRepair', data);
  }
  getUsers(): Observable<any> {
    return this.http.get('http://localhost:5500/usersList');
  }
  removeUser(number: any): Observable<any>{
    return this.http.delete(`http://localhost:5500/removeUser/${number}`);

  }
  modifyUser(data: any): Observable<any>{
    return this.http.put('http://localhost:5500/modifyUser', data);
  }
  
  //MECHANIC
  getMechanics(): Observable<any>{
    return this.http.get('http://localhost:5500/mechanicList');
  }
  removeMechanic(number: any): Observable<any>{
    return this.http.delete(`http://localhost:5500/removeMechanic/${number}`);

  }
  modifyMecahnic(data: any): Observable<any>{
    return this.http.put('http://localhost:5500/modifyMecahnic', data);
  }
  getMechanic(number:any): Observable<any>{
    return this.http.get(`http://localhost:5500/mechanic/${number}`);

  }
  //CARS

  getCars(): Observable<any>{
    return this.http.get('http://localhost:5500/carList');
  }
  getCar(number:any): Observable<any>{
    return this.http.get(`http://localhost:5500/car/${number}`);

  }
  removeCar(number: any): Observable<any>{
    return this.http.delete(`http://localhost:5500/removeCar/${number}`);

  }
  modifyCar(data: any): Observable<any>{
    return this.http.put('http://localhost:5500/modifyCar', data);
  }
  addCar(data: any): Observable<any>{
    return this.http.post('http://localhost:5500/addCar', data);
  }

  //Repair_types
  getRepairTypes(): Observable<any>{
    return this.http.get('http://localhost:5500/repairTypeList')
  }
  getRepairType(number:any): Observable<any>{
    return this.http.get(`http://localhost:5500/repairType/${number}`)
  }
  removeRepairType(number: any){
    return this.http.delete(`http://localhost:5500/removeRepairType/${number}`)
  }

  modifyRepairType(data: any): Observable<any>{
    return this.http.put('http://localhost:5500/modifyRepairType', data);
  }
  addRepairType(data: any): Observable<any>{
    return this.http.post('http://localhost:5500/addrepairType', data);
  }

  //INVOICE
  getInvoice(number: any){
    return this.http.get(`http://localhost:5500/invoice/${number}`)
  }

}
