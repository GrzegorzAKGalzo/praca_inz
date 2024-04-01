import { Component, OnInit } from '@angular/core';
import { Repair } from '../repair';
import { LoginapiService } from '../loginapi.service';
import { response } from 'express';
import { Client } from '../client';
import { DateAdapter } from '@angular/material/core';
import { Car } from '../car';
import { Mechanic } from '../mechanic';
import { combineLatest, forkJoin } from 'rxjs';

@Component({
  selector: 'app-repairPage',
  templateUrl: './repairPage.component.html',
  styleUrls: ['./repairPage.component.css']
})
export class RepairPageComponent implements OnInit {

  public repairs: Repair[] = [];
  public repair!: Repair;
  public showModal:boolean = false;
  public typeForm = "";
  title = "Naprawy";
  constructor(
    private apiService: LoginapiService,
  ) { }

  ngOnInit() {
    this.getRepairs();
  }

  getRepairs() {
    this.apiService.getRepairs().subscribe({
      next: (response: any) => {
        this.repairs = [];
        this.apiService.triggerRefresh();
        response.forEach((el: any) => {
          combineLatest([
            this.apiService.getClient(el.client_id),
            this.apiService.getCar(el.car_id),
            this.apiService.getMechanic(el.mechanic_id)
          ]).subscribe({
            next: ([clientData, carData, mechanicData]) => {

              const rp: Repair = {
                id: el.id,
                descript: el.descript,
                status: el.status,
                mechanic: mechanicData[0],
                client: clientData[0],
                car: carData[0],
                entryDate: new Date(el.entry_date),
                leaveDate: new Date(el.leave_date)
              };
              this.repairs.push(rp);
            },
            error: (error: any) => {
              console.log(error);
            }
          });
        });
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  
  public addNewRepair(){
    this.repair = {
      id: 0,
      descript: "",
      status: 0,
      mechanic: undefined,
      client: undefined,
      car: undefined,
      entryDate: new Date(),
      leaveDate: new Date()
    }
    this.typeForm = "Dodaj Naprawę";
    this.showModal = !this.showModal; 

  }
  public closeForm(){
    this.showModal = !this.showModal; 
  }
  public modifyRepair(index: number){
    this.repair = {
      id: this.repairs[index].id,
      descript: this.repairs[index].descript,
      status: this.repairs[index].status,
      mechanic: this.repairs[index].mechanic,
      client: this.repairs[index].client,
      car: this.repairs[index].car,
      entryDate: this.repairs[index].entryDate,
      leaveDate: this.repairs[index].leaveDate
    }
    console.log(this.repair);
    this.typeForm = "Modyfikacja";
    this.showModal = !this.showModal; 

  }
  public removeRepair(index: number){
    this.apiService.removeRepair(this.repairs[index].id).subscribe({
      next:(response: any) => {
        this.apiService.triggerRefresh();
        alert("Usunięto" + this.repairs[index].id);
        this.repairs.splice(index, 1);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  
  
}
