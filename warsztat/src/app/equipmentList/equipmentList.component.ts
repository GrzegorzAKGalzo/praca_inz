import { Component, OnInit } from '@angular/core';
import { LoginapiService } from '../loginapi.service';
import { Equipment } from '../equipment';
import { response } from 'express';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-equipmentList',
  templateUrl: './equipmentList.component.html',
  styleUrls: ['./equipmentList.component.css']
})
export class EquipmentListComponent implements OnInit {

  public eqs: Equipment[] = [];
  public eq: Equipment = {
    id: 0,
    name: '',
    lastCheck: new Date(),
    nextCheck: new Date(),
    desc: '',
  };
  public showModal:boolean = false;
  public typeForm = "";
  public modifyIndex: number = 0;
  public isLoading: boolean = true;

  title = "Maszyny";
  constructor(
    private apiService: LoginapiService,
    private appComp: AppComponent,
  ) { }

  ngOnInit() {
    this.getEqs();
  }

  public addEq(){
    console.log(this.eq);
 
    this.apiService.addEqItem(this.eq).subscribe({
     error(error: any){
          console.log(error);
      },
      complete: () =>{
        
        this.apiService.triggerRefresh();
        this.getEqs();
        this.activateToast("Maszyna Dodana");
      }
    });
  }
  public removeEq(index: number){
    this.apiService.removeEqItem(this.eqs[index].id).subscribe({
      next: (response: any ) => {
   
        this.activateToast("Maszyna Usunięta");

      }, 
      error: (error: any) => {
        console.log(error);
      },
      complete: () =>{
        this.apiService.triggerRefresh();
        this.getEqs();
      }
    });
  }
  public openModal(index: number){

  }
  public closeModal(){

  }
  public modifyEq(){

  }
  public getEqs(){
    this.eqs = [];
    this.apiService.getEqList().subscribe({
      next: (response: any) => {
        response.forEach((el: Equipment) => {
          el.lastCheck  = new Date(el.lastCheck);
          el.nextCheck  = new Date(el.nextCheck);
          this.eqs.push(el);
        });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  private toastTimeoutId: NodeJS.Timeout | null = null;

public activateToast(text: string) {
    const toast: HTMLElement = document.getElementById('toast')!;
    toast.classList.remove("notActive");
    toast.innerHTML = text;
    
    // Clear previous timeout (if any)
    if (this.toastTimeoutId !== null) {
        clearTimeout(this.toastTimeoutId);
    }

    // Set new timeout to hide the toast after 2000ms
    this.toastTimeoutId = setTimeout(() => {
        toast.classList.add("notActive");
        this.toastTimeoutId = null; // Reset the timeout ID
    }, 2000);
}

}
