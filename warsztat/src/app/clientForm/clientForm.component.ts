import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../client';
import { LoginapiService } from '../loginapi.service';
import { response } from 'express';

@Component({
  selector: 'app-clientForm',
  templateUrl: './clientForm.component.html',
  styleUrls: ['./clientForm.component.css']
})
export class ClientFormComponent implements OnInit {
 @Input() public client: Client = {
    id: 0,
    name: '',
    lastname: '',
    number: '',
    email: '',
    nip: '',
  };
  @Input() public typeForm = "Dodaj nowego Klienta";
  public error = [];
  constructor(
    private LoginapiService: LoginapiService,
  ) { }

  ngOnInit() {
  }

  public addClient(){
    this.error = [];
    if(this.typeForm == "Modyfikacja"){
      this.LoginapiService.modifyClient(this.client).subscribe({
        next:(response: any) =>{
          this.LoginapiService.triggerRefresh();
          alert("Klient Zmodyfikowany");

        },
        error: (error: any)=>{
          console.log(error);
        }
      });
  } else{
    this.LoginapiService.addClient(this.client).subscribe({
      next:(response: any) =>{
        this.LoginapiService.triggerRefresh();
        alert("Klient Dodany");
      },
      error: (error: any)=>{
        console.log(error);
      }
    });
  }
  }
}
