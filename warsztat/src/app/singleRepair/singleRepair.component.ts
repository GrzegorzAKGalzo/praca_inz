import { Component, OnInit } from '@angular/core';
import { Repair } from '../repair';
import { LoginapiService } from '../loginapi.service';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { RepairType } from '../repairType';

@Component({
  selector: 'app-singleRepair',
  templateUrl: './singleRepair.component.html',
  styleUrls: ['./singleRepair.component.css']
})
export class SingleRepairComponent implements OnInit {
  public id: number = 0;
  public repairTypes: RepairType[] =[];
  public repair: Repair = {
    id: 0,
    descript: '',
    status: 0,
    mechanic: undefined,
    client: undefined,
    car: undefined,
    entryDate: new Date(),
    leaveDate: new Date()
  };

  constructor(
    private apiService: LoginapiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // 'id' should match the parameter name in the route
      console.log(this.getRepair(this.id));

    });
  }
  public getRepair(id: number){
    this.apiService.getRepair(id).subscribe({
      next: (response: any) => {
        this.apiService.triggerRefresh();
        combineLatest([
          this.apiService.getClient(response[0].client_id),
          this.apiService.getCar(response[0].car_id),
          this.apiService.getMechanic(response[0].mechanic_id)
        ]).subscribe({

          next: ([clientData, carData, mechanicData]) => {
            const rp: Repair = {
              id: response[0].id,
              descript: response[0].descript,
              status: response[0].status,
              mechanic: mechanicData[0],
              client: clientData[0],
              car: carData[0],
              entryDate: new Date(response[0].entry_date),
              leaveDate: new Date(response[0].leave_date)
            };
            console.log(rp);
            this.repair = rp;
            this.getRepairsTypes(id);
          },
          error: (error: any) => {
            console.log(error);
          }
        });

      },
      
      error: (error: any) => {
        console.log(error);
      }
    });

  }
  public translateStatus(number: number){
    const strings: {[key: number]: string}  = {
      0: 'Przyjęty',
      1: 'Naprawa',
      2: 'Wstrzymany',
      3: 'Zakończony',
    };
  
    return strings[number] || '';
  }

  getRepairsTypes(index: number){

    this.apiService.getCarRepairTypes(index).subscribe({
      next: (response: any) => {
        response.forEach((reapirtype : RepairType) => {
          this.repairTypes.push(reapirtype);

        });
      },
      error: (error: any) => {
        console.log("error");
      }
    });
  }


}
