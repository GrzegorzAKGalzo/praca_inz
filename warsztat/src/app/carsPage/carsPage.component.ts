import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { LoginapiService } from '../loginapi.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-carsPage',
  templateUrl: './carsPage.component.html',
  styleUrls: ['./carsPage.component.css']
})
export class CarsPageComponent implements OnInit {
  public cars: Car[] =[];
  public car!:  Car;
  public showModal: boolean = false;
  public typeForm = "";
  title = "Samochody";
  constructor(
    private apiService: LoginapiService,
  ) { }

  ngOnInit() {
    this.getCars();
  }
  public getCars(){
    this.apiService.getCars().subscribe({
      next: (response: any) => {
        this.cars = [];
        this.apiService.triggerRefresh();
        response.forEach((el: any) => {
          combineLatest([
            this.apiService.getClient(el.client_id)
          ]).subscribe({
            next: ([clientData]) => {

              const rp: Car = {
                id: el.id,
                mark: el.mark,
                model: el.model,
                reg: el.registration,
                year: el.year,
                client: clientData[0]
              };
              this.cars.push(rp);
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
  public addNewCar(){
    this.car = {
      id: 0,
      mark: "",
      model: "",
      reg: "",
      year: 2000,
      client: undefined
    }
    this.typeForm = "Dodaj Samochód";
    this.showModal = !this.showModal; 

  }
  public closeForm(){
    this.showModal = !this.showModal;
  }
  public modifyCar(index: number){
    this.car = {
      id: this.cars[index].id,
      mark: this.cars[index].mark,
      model: this.cars[index].model,
      year: this.cars[index].year,
      client: this.cars[index].client,
      reg: this.cars[index].reg,

    }
    console.log(this.car);
    this.typeForm = "Modyfikacja";
    this.showModal = !this.showModal; 
  }
  public removeCar(index: number){
    this.apiService.removeCar(this.cars[index].id).subscribe({
      next:(response: any) => {
        this.apiService.triggerRefresh();
        alert("Usunięto" + this.cars[index].id);
        this.cars.splice(index, 1);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
