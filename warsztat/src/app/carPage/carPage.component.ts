import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { LoginapiService } from '../loginapi.service';
import { ClientPageComponent } from '../clientPage/clientPage.component';

@Component({
  selector: 'app-carPage',
  templateUrl: './carPage.component.html',
  styleUrls: ['./carPage.component.css']
})
export class CarPageComponent implements OnInit {
  public cars: Car[] = [];
  public showModal: Boolean = false;
  public car!: Car;
  title = "Samochody";
  constructor(
    private apiService: LoginapiService,
    private clientComp: ClientPageComponent
  ) { }

  ngOnInit() {
    this.getCars();
  }
  getCars(){
    this.apiService.getClients().subscribe({
      next:(response:any) => {
        this.cars = [];
        this.apiService.triggerRefresh();
        console.log(response);
        response.forEach((el: any) =>{
          // this.clients.push(JSON.parse(el));
          const cl: Car = {

            id: el.id,
            mark: el.mark,
            model: el.model,
            reg: el.reg,
            year: el.year,
            client: this.clientComp.getClient(el.client),
          };
          this.cars.push(cl);
        });
      },
      error: (error: any) => {
        console.log(error);
      }
    });
}
public getCar(id: number): Car | undefined {
  return this.cars.find(car => car.id === id);
}
}
