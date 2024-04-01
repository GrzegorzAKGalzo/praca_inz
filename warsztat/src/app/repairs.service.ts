import { Injectable } from '@angular/core';
import { Repair } from './repair';
import { LoginapiService } from './loginapi.service';

@Injectable({
  providedIn: 'root'
})
export class RepairsService {
  public repairs: Repair[] = [];

  constructor(
    private apiService: LoginapiService,

  ) { }

  getRepairs(){
    this.apiService.getRepairs().subscribe({
      next:(response:any) => {
        this.repairs =[];
        this.apiService.triggerRefresh();
        response.forEach((el: any) =>{
          console.log(el);
          // this.clients.push(JSON.parse(el));
          const rp: Repair = {
          id: el.id,
          descript: el.descript,
          status: el.status,
          mechanic: el.mechanic_id,
          client: el.client_id,
          car: el.car_id,
          entryDate: el.entryDate,
          leaveDate: el.leaveDate
          };

          this.repairs.push(rp);

        });

      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  getClient(number: number){
    
  }
}
