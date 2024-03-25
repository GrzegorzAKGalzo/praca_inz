import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { LoginapiService } from '../loginapi.service';
import { response } from 'express';

@Component({
  selector: 'app-clientForm',
  templateUrl: './clientForm.component.html',
  styleUrls: ['./clientForm.component.css']
})
export class ClientFormComponent implements OnInit {
  public client: Client = {
    id: 0,
    name: '',
    lastname: '',
    number: '',
    email: '',
    nip: '',
  };
  public error = [];
  constructor(
    private LoginapiService: LoginapiService,
  ) { }

  ngOnInit() {
  }

  public addClient(){
    this.error = [];
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
