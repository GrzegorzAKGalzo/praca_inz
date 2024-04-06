import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { LoginapiService } from '../loginapi.service';
import { response } from 'express';
import { ClientFormComponent } from '../clientForm/clientForm.component';

@Component({
  selector: 'app-clientPage',
  templateUrl: './clientPage.component.html',
  styleUrls: ['./clientPage.component.css']
})
export class ClientPageComponent implements OnInit {
  public clients: Client[] = [];
  public showModal:boolean = false;
  public client!: Client;
  public isLoading:boolean = true;
  public typeForm = "";
  title = "Klienci" ;
  constructor(
    private apiService: LoginapiService,
  ) { }

  ngOnInit() {
    this.getClients();
  }

  getClients(){
    this.apiService.getClients().subscribe({
      next:(response:any) => {
        this.clients = [];
        this.apiService.triggerRefresh();
        console.log(response);
        response.forEach((el: any) =>{
          // this.clients.push(JSON.parse(el));
          const cl: Client = {

            id: el.id,
            name: el.name,
            email: el.email,
            nip: el.nip,
            lastname: el.lastname,
            number: el.number,
          };
          this.clients.push(cl);
        });
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
          this.isLoading = false; // Set isLoading to false when all requests are completed
      }
    });
  }
  public getClient(id: number): Client | undefined {
    return this.clients.find(client => client.id === id);
  }
  
  public addNewClient(){
    this.client = {
      id: 0,
      name: "",
      email: "",
      nip: "",
      lastname: "",
      number: "",
    }
    this.typeForm = "Dodaj Klienta";

    this.showModal = !this.showModal; 

  }
  public closeForm(){
    this.showModal = !this.showModal; 
  }
  public removeClient(number: any){
    console.log(number);
    this.apiService.removeClient(JSON.stringify(number)).subscribe({

      next:(response:any) => {
        this.apiService.triggerRefresh();
        alert("Klient Usunięty");
        this.apiService.triggerRefresh();
        this.getClients();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  public modifyClient(number: number){
    this.client = {
      id: this.clients[number].id,
      name: this.clients[number].name,
      email: this.clients[number].email,
      nip: this.clients[number].nip,
      lastname: this.clients[number].lastname,
      number: this.clients[number].number,
    }
    this.typeForm = "Modyfikacja";
    this.showModal = !this.showModal; 
  
  }

}
