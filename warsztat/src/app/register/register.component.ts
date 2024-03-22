import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { EmailValidatorService } from '../emailValidator.service';
import { LoginapiService } from '../loginapi.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public email = '';
  public emailrep = '';
  public password = '';
  public error:Array<string> = [];
  public passwordToggler = false;

  constructor(
    private emailValidationService: EmailValidatorService,
    private LoginapiService: LoginapiService,
    private router: Router,
  ){}

  ngOnInit() {
  }

  registerSubmit(){
    this.error = [];
    if(this.emailValidationService.isValid(this.email)){
      this.error.push("Muisz podać poprawny Email");
      return ;
    }
    if(this.password == ''){
      this.error.push("Muisz wpisać Hasło");
      return ;
    }
    this.LoginapiService.register({username: this.email, password: this.password}).subscribe({
      next:(response: any) => {
        this.LoginapiService.triggerRefresh();
        this.router.navigate(['/login'])
      },
      error: (error: any)=>{
        console.log(error)
      }
    })
  }

}
