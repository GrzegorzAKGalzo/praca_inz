import { Component, OnInit } from '@angular/core';
import { LoginapiService } from '../loginapi.service';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { Client } from '../client';
import { Car } from '../car';

@Component({
  selector: 'app-singleClientInfo',
  templateUrl: './singleClientInfo.component.html',
  styleUrls: ['./singleClientInfo.component.css']
})
export class SingleClientInfoComponent implements OnInit {
  public id: number = 0;
  public client: Client = {};
  public cars: Car[] =[];
  constructor(
    private apiService: LoginapiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // 'id' should match the parameter name in the route
    });
    this.getClient(this.id);
    this.getClientCars(this.id);
  }
  getClient(index: number){
    this.apiService.getClient(index).subscribe({
      next: (response: any) => {
        this.client = response[0];
        console.log(this.client);
      }
    });
  }
  getClientCars(index: number){
    this.apiService.getClientCars(index).subscribe({
      next: (response: any) => {
        this.cars = response;
      }
    });
  }
}
