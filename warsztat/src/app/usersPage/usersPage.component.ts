import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { LoginapiService } from '../loginapi.service';
import { response } from 'express';
import { UserShow } from '../userShow';

@Component({
  selector: 'app-usersPage',
  templateUrl: './usersPage.component.html',
  styleUrls: ['./usersPage.component.css']
})
export class UsersPageComponent implements OnInit {

  
  public users: UserShow[] = [];
  public user!: UserShow;
  public showModal:boolean = false;
  public typeForm = "";
  title = "Użytkownicy";
  constructor(
    private apiService: LoginapiService,
  ) { }

  ngOnInit() {
    this.getUsers();
  }


  public getUsers(){
    this.apiService.getUsers().subscribe({
      next: (response: any)=>{
        this.users = [];
        this.apiService.triggerRefresh();
        response.forEach((el: any) => {
          const rp: UserShow ={
            id: el.id,
            username: el.username,
            password: el.password,
            email: el.email,
            roles: el.roles
          };
          this.users.push(rp);
        })
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
  public closeForm(){
    this.showModal = !this.showModal;
  }
  public addNewuser(){
    this.user = {
      id: 0,
      username: "",
      password: "",
      email: "",
      roles: "",
    }
    this.typeForm = "Dodaj Użytkownika";

    this.showModal = !this.showModal; 
  }
  public modifyUser(number: number){
    this.user = {
      id: this.users[number].id,
      username: this.users[number].username,
      email: this.users[number].email,
      roles: this.users[number].roles,
      password: this.users[number].password
    }
    this.typeForm = "Modyfikacja";
    this.showModal = !this.showModal; 
  
  }
  public removeUser(index: number){
    this.apiService.removeUser(this.users[index].id).subscribe({

      next:(response:any) => {
        this.apiService.triggerRefresh();
        alert("User Usunięty");
        this.apiService.triggerRefresh();
        this.getUsers();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }


}
