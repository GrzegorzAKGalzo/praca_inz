import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../client';
import { Car } from '../car';
import { LoginapiService } from '../loginapi.service';

@Component({
  selector: 'app-carForm',
  templateUrl: './carForm.component.html',
  styleUrls: ['./carForm.component.css']
})
export class CarFormComponent implements OnInit {
  clients!: Client[];


  @Input() public car: Car = {
    id: 0,
    mark: "",
    model: "",
    reg: "",
    year: 2000,
    client: undefined,
  };
  @Input() public typeForm = "Dodaj naprawę";
  public error = [];
  constructor(
    private LoginapiService: LoginapiService,
  ) { }
  ngOnInit() {
    this.fetchClients();

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

  public addCar(){
    this.error = [];
    if(this.typeForm == "Modyfikacja"){
      console.log(this.car);
      this.LoginapiService.modifyCar(this.car).subscribe({
        next:(response: any) =>{
          this.LoginapiService.triggerRefresh();
          alert("Car zmodyfikowna");
        },
        error: (error: any)=>{
          console.log(error);
        }
      });
    
  } else{
    console.log(this.car);
    this.LoginapiService.addCar(this.car).subscribe({
      next:(response: any) =>{
        this.LoginapiService.triggerRefresh();
        alert("Naprawa doddana");
      },
      error: (error: any)=>{
        console.log(error);
      }
    });
  }
  }

}
