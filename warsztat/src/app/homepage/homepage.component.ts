import { Component, Input, OnInit, Output } from '@angular/core';
import { Repair } from '../repair';
import { LoginapiService } from '../loginapi.service';
import { response } from 'express';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  title = "Kokpit";
  @Output() showModal: boolean = false;

  public actualRepairs: Repair[] = [];

  constructor(
    public apiService: LoginapiService,
  ) {
  
   }
   public addRepair() {
    this.showModal = !this.showModal;
  }
  ngOnInit() {
    this.getRepairs();
  }

  getRepairs() {
    this.apiService.getRepairs().subscribe({
      next: (response: any) => {
        this.actualRepairs = [];
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
              this.actualRepairs.push(rp);
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
