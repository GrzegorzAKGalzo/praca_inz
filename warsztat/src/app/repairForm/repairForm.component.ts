import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Repair } from '../repair';
import { LoginapiService } from '../loginapi.service';
import { Mechanic } from '../mechanic';
import { Client } from '../client';
import { Car } from '../car';

@Component({
  selector: 'app-repairForm',
  templateUrl: './repairForm.component.html',
  styleUrls: ['./repairForm.component.css']
})
export class RepairFormComponent implements OnInit {
  mechanics!: Mechanic[];
  clients!: Client[];
  cars!: Car[];
  selectedClientId: any;
  @Output() showModal = new EventEmitter<boolean>();

  @Input() public repair: Repair = {
    id: 0,
    descript: "",
    status: 0,
    mechanic: undefined,
    client: undefined,
    car: undefined,
    entryDate: new Date(),
    leaveDate: new Date()
  };
  @Input() public typeForm = "Dodaj naprawę";
  public error = [];
  constructor(
    private LoginapiService: LoginapiService,
  ) { }
  ngOnInit() {
    this.fetchCars(this.repair.client?.id);

    this.fetchMechanics();
    this.fetchClients();
    console.log(this.showModal);
  }
  fetchMechanics() {
    this.LoginapiService.getMechanics().subscribe(
      mechanics => {
        this.mechanics = mechanics;
      },
      error => {
        console.error('Error fetching mechanics:', error);
      }
    );
  }
  fetchCars(clientId: any) {
    this.LoginapiService.getClientCars(clientId).subscribe(
      cars => {
        this.cars = cars;
      },
      error => {
        console.error('Error fetching cars:', error);
      }
    );
  }
  fetchClients(){
    this.LoginapiService.getClients().subscribe(
      clients => {
        this.clients = clients;
      },
      error => {
        console.error('Error fetching clients:', error);
      }
    );
  }
  onClientChange(clientId: any) {
    // Fetch cars for the selected client
    this.fetchCars(clientId);

    console.log("zmiana " + clientId); 

  }

  public addRepair(){
    this.error = [];
    if(this.typeForm == "Modyfikacja"){
      console.log(this.repair);
      this.LoginapiService.modifyRepair(this.repair).subscribe({
        next:(response: any) =>{
          this.LoginapiService.triggerRefresh();
          alert("Naprawa zmodyfikowna");
        },
        error: (error: any)=>{
          console.log(error);
        }
      });
    
  } else{
    console.log(this.repair);
    this.LoginapiService.addRepair(this.repair).subscribe({
      next:(response: any) =>{
        this.LoginapiService.triggerRefresh();
        alert("Naprawa doddana");
      },
      error: (error: any)=>{
        console.log(error);
      }
    });
  }
  this.showModal.emit(false);
  }






}
