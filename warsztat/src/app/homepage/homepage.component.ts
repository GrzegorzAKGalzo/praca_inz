import { Component, Input, OnInit, Output } from '@angular/core';
import { Repair } from '../repair';
import { LoginapiService } from '../loginapi.service';
import { response } from 'express';
import { combineLatest } from 'rxjs';
import { Equipment } from '../equipment';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  title = "Kokpit";
  @Output() showModal: boolean = false;
  public todayDate = new Date();
  public startDate = this.formatDate(new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), 1));
  public endDate = this.formatDate(new Date(this.todayDate.getFullYear(), this.todayDate.getMonth() + 1, 0));
  public actualRepairs: Repair[] = [];
  public repairsChange:number = 0; 
  public currentRepairsCount = 0;
  public LastRepairsCount = 0;

  public equipments: Equipment[] = [];



  public today: Date = new Date(Date.now());
  constructor(
    public apiService: LoginapiService,
  ) {
  
   }
   public addRepair() {
    this.showModal = !this.showModal;
  }
  ngOnInit() {
    this.getEquipments();
    this.getRepairs();
    this.apiService.getMonthRepairs(this.startDate, this.endDate).subscribe({
      next: (response: any) => {
        this.currentRepairsCount = response[0].repairs;

      },
      complete: () => {
        this.apiService.getMonthRepairs(this.startDate, this.endDate).subscribe({
          next: (response: any) => {
            this.LastRepairsCount = response[0].repairs;
          },
          complete: () => {
            this.repairsChange =  (this.currentRepairsCount / this.LastRepairsCount - 1) * 100;
    
          }
        });
      }
    }); 

      this.startDate = this.formatDate (new Date(this.todayDate.getFullYear(), this.todayDate.getMonth() - 1, 1));
// Get the last day of the previous month
    this.endDate = this.formatDate (new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), 0));
  
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  getEquipments(){
    this.apiService.getEqList().subscribe({
      next:(response: any) =>  {
        this.apiService.triggerRefresh();
        response.forEach((element: Equipment) => {
          element.lastCheck = new Date(element.lastCheck);
          element.nextCheck = new Date(element.nextCheck);
          if (element.desc.length > 25) {
            element.desc = element.desc.substring(0, 24) + "...";
          }
          this.equipments.push(element);
        });
      },
      error: (error: any) => {
        console.log(error);
      }
    });
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
            },
            complete: () => {
              this.actualRepairs = this.actualRepairs.filter((repair) => repair.status !== 3);

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
