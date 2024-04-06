import { Component, OnInit } from '@angular/core';
import { RepairType } from '../repairType';
import { LoginapiService } from '../loginapi.service';
import { response } from 'express';

@Component({
  selector: 'app-offerPage',
  templateUrl: './offerPage.component.html',
  styleUrls: ['./offerPage.component.css']
})
export class OfferPageComponent implements OnInit {

  public repairsType: RepairType[] = [];
  public repairType: RepairType = {
    id: 0,
    name: '',
    price: 0
  };
  public showModal:boolean = false;
  public typeForm = "";
  public modifyIndex: number = 0;
  public isLoading: boolean = true;
  title = "Usługi";
  constructor(
    private apiService: LoginapiService,
  ) { }

  ngOnInit() {
    this.getRepairsTypes();
  }


  getRepairsTypes(){
  this.apiService.getRepairTypes().subscribe({
    next:(response: any) =>{
      this.apiService.triggerRefresh();
      this.repairsType = response;
    },
    error: (error: any)=>{
      console.log(error);
    } ,
    complete: () => {
      this.isLoading = false; // Set isLoading to false when all requests are completed
  }
  });
}

public removeRepairType(index: number){
  this.apiService.removeRepairType(this.repairsType[index].id).subscribe({
    next: (response: any) => {
      this.apiService.triggerRefresh();
      this.getRepairsTypes();
      alert("Usunięto");

    },
    error: (error: any)=>{
      console.log(error);
    }
  });
}
public modifyRepairType(){
  this.apiService.modifyRepairType(this.repairType).subscribe({
    next: (response: any) => {
      this.apiService.triggerRefresh();
      this.getRepairsTypes();
      alert("Zmodyfikowano");

    },
    error: (error: any)=>{
      console.log(error);
    }
  });
}
public openModal(index: number){
  this.modifyIndex = index;
  this.showModal = !this.showModal;
  this.repairType = this.repairsType[index];
}
public closeModal(){
  this.showModal = !this.showModal;

}
public addRepairType(){
  this.apiService.addRepairType(this.repairType).subscribe({
    next: (response: any) => {
      this.apiService.triggerRefresh();
      this.getRepairsTypes();
      alert("Dodano");
    },
    error: (error: any)=>{
      console.log(error);
    }
  });
}

}
