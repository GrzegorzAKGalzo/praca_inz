import { Component, Input, OnInit } from '@angular/core';
import { UserShow } from '../userShow';
import { LoginapiService } from '../loginapi.service';

@Component({
  selector: 'app-userFormAdd',
  templateUrl: './userFormAdd.component.html',
  styleUrls: ['./userFormAdd.component.css']
})
export class UserFormAddComponent implements OnInit {
  users!: UserShow[];


  @Input() public user: UserShow = {
    id: 0,
    username: "",
    password: "", 
    email: "",
    roles: "",
  };
  @Input() public typeForm = "Dodaj Użytkownika";
  public error = [];
  constructor(
    private LoginapiService: LoginapiService,
  ) { }
  ngOnInit() {

  }

  public addUser(){
    this.error = [];
    if(this.typeForm == "Modyfikacja"){
      console.log(this.user);
      this.LoginapiService.modifyUser(this.user).subscribe({
        next:(response: any) =>{
          this.LoginapiService.triggerRefresh();
          alert("Użytkownika zmodyfikowny");
        },
        error: (error: any)=>{
          console.log(error);
        }
      });
    
  } else{
    console.log(this.user);
    this.LoginapiService.addUser(this.user).subscribe({
      next:(response: any) =>{
        this.LoginapiService.triggerRefresh();
        alert("User doddana");
      },
      error: (error: any)=>{
        console.log(error);
      }
    });
  }
  }
}
