import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { LoginapiService } from '../loginapi.service';
import { ClientPageComponent } from '../clientPage/clientPage.component';
import { response } from 'express';
import { ActivatedRoute, ResolveStart } from '@angular/router';
import { Repair } from '../repair';
import { RepairType } from '../repairType';

@Component({
  selector: 'app-carPage',
  templateUrl: './carPage.component.html',
  styleUrls: ['./carPage.component.css']
})
export class CarPageComponent implements OnInit {
  public car: Car ={}; 
  public index: number = 0;
  public repair: Repair ={
    id: 0,
    descript: "",
    status: 0,
    mechanic:undefined,
    client:  undefined,
    car:  undefined,
    entryDate: new Date,
    leaveDate: new Date
  };
  public historicalRepairs: Repair[] = [];
  public repairTypes: RepairType[] =[];
  constructor(
    private apiService: LoginapiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.index = params['id']; // 'id' should match the parameter name in the route
    });
    this.getCar(this.index);
  }
  getCar(index: number){
    let client_id = 2;
    this.apiService.getCar(index).subscribe({
      next: (response: any) =>{
        this.car = response[0];
        client_id = response[0].client_id;
      },
      complete: () => {
        this.apiService.getClient(client_id).subscribe({
          next: (response: any)=> {
            this.car.client = response[0];
          },
          complete: () => {
            this.getRepair(this.car.id || 0);
            this.getHistroicalRepairs(this.car.id || 0);
          }
        });
      }
    });
   
  }
  getRepair(index: number){
    this.apiService.getCarRepair(index).subscribe({
      next: (response: any) => {
        this.repair = response[0];
        this.repair.entryDate = new Date(response[0].entry_date);
        this.repair.leaveDate = new Date(response[0].leave_date);
        this.getMechanic(response[0].mechanic_id );
        this.getRepairsTypes(index);
      }
    });
  }
  getMechanic(index: number){
    this.apiService.getMechanic(index).subscribe({
      next: (response: any) => {
        this.repair.mechanic = response[0];

      }
    });
  }
  getRepairsTypes(index: number){
    this.apiService.getCarRepairTypes(index).subscribe({
      next: (response: any) => {
        response.forEach((reapirtype : RepairType) => {
          this.repairTypes.push(reapirtype);
        });
      }
    });
  }
  getHistroicalRepairs(index: number){
    this.apiService.getAllCarReapir(index).subscribe({
      next: (response: any) =>{
        response.forEach((reapir : any) => {
          console.log(reapir)
          reapir.entryDate = new Date(reapir.entry_date);
          if(reapir.status == 3){
            this.historicalRepairs.push(reapir); 
          }
        });
      }
    });
  }
}
