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
              console.log(el.entryDate);
              console.log(rp);
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
  
  
  
  
}
